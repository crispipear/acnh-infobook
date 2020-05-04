import React, { useState, useEffect } from 'react';
import LOGO from '../assets/logo.png';
import LOGO2 from '../assets/logo2.png';
import ICON_ABOUT   from '../assets/icon-about.svg';

const fullDateOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
}

const timeOption = {
    hour: '2-digit',
    minute: '2-digit'
}

export default function Header(props) {
    let [timer, setTimer] = useState(null);
    const [timerText, setTimerText] = useState(new Date().toLocaleTimeString('en-US', fullDateOption));
    const [timeText, setTimeText] = useState(new Date().toLocaleTimeString('en-US', timeOption));

    useEffect(() => {
        startTimer();
        return () => {
           clearInterval(timer);
           timer = null;
        };
    }, []);

    function startTimer(){
        if(timer == null){
            setTimer(
                setInterval(() => {
                    setTimerText(new Date().toLocaleTimeString('en-US', fullDateOption))
                    setTimeText(new Date().toLocaleTimeString('en-US', timeOption))
                }, 60000)
            )
        }
    }

    return (
        <div id='header'>
            <div className='left'>
                <img src={LOGO} alt='logo'/>
                <h1>Nookie's Book</h1>
                <img id='icon-about' src={ICON_ABOUT} alt='about icon' style={{cursor: 'pointer'}} onClick={() => props.setShowCredits(true)}/>
            </div>
           {
               window.innerWidth <= 1100 ?
               <div className='right'>
                <img src={LOGO2} alt='logo'/>
                <h4>Current Time: {timeText}</h4>
              </div>
              :
              <div className='right'>
                <h4>Current Time: {timerText}</h4>
                <img src={LOGO2} alt='logo'/>
              </div>
           }
        </div>
    );
}