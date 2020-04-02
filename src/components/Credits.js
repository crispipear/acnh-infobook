import React, { useState, useEffect } from 'react';
import Package from '../../package.json';
import LOGO from '../assets/logo.png';
import LOGO2 from '../assets/logo2.png';

export default function Credits(props) {

    function handleClick(){
        props.setShowCredits(false);
    }
    
    return (
        <div id="credits">
            <div id="credits-bg" onClick={handleClick}/>
            <div id="credits-container">
                <h3>HELLO!</h3>
                <p>Thanks for visiting! My sister and I got tired of reading from an excel sheet so we made this website to
                    help us keep track of the fishes and bugs in <b>Animal Crossing: New Horizons</b>.
                    The data is gathered from online sources so some of them might be off.
                </p>
                <p>
                    crafted by: <a href="https://lisuying.com" target="_blank"><img src={LOGO}/>Su Li</a><a href="https://www.behance.net/minzli" target="_blank"><img src={LOGO2}/>Min Li</a>
                </p>
                <p>
                    powered by: React + Firebase
                </p>
                <p>
                    Disclaimer: Nookie's Book is a personal project and  is neither owned by nor affiliated with Nintendo or the creators of Animal Crossing in any way.
                </p>
                <h6 style={{textAlign: 'right', fontSize: '0.8rem', opacity: 0.5}}>Nookie's Book v.{Package.version}</h6>
            </div>
        </div>
    );
}