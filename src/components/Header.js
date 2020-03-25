import React, { useState, useEffect } from 'react';
import LOGO from '../assets/logo.png';

const dateOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
}

export default function Header(props) {
    let [timer, setTimer] = useState(null);
    const [timerText, setTimerText] = useState(new Date().toLocaleTimeString('en-US', dateOption))

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
                    setTimerText(new Date().toLocaleTimeString('en-US', dateOption))
                }, 60000)
            )
        }
    }

    return (
        <div id='header'>
            <div className='left'>
                <img src={LOGO} alt='logo'/>
                <h1>ACNH Info Book</h1>
            </div>
            <div className='right'>
                <h4>Current Time: {timerText}</h4>
            </div>
        </div>
    );
}