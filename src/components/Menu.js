import React, { useState, useEffect } from 'react';
import Dropdown     from './Dropdown';
import Options      from '../utils/options';
import ICON_MENU    from '../assets/icon-menu.svg';
import ICON_CLOSE   from '../assets/icon-close.svg';

export default function Menu(props) {
    const [locationData, setLocationData] = useState(Options.location[props.type]);
    const [menuToggle, setMenuToggle] = useState(false);
    const [menuStyle, setMenuStyle] = useState({pointerEvents: 'none', opacity: 0})

    useEffect(() => {
        setLocationData(
            Options.location[props.type]
        )
    }, [props.type])

    useEffect(() => {
        if(menuToggle){
            setMenuStyle({
                pointerEvents: 'all', opacity: 1
            })
        }else{
            setMenuStyle({
                pointerEvents: 'none', opacity: 0
            })
        }
    }, [menuToggle])

    return (
        <div id='menu'>
            {
                window.innerWidth <= 1100 &&
                <div id='menu-icon' onClick={() => setMenuToggle(!menuToggle)}>
                    <img src={menuToggle ? ICON_CLOSE : ICON_MENU}/>
                </div>
            }
            <div id='menu-container' style={window.innerWidth <= 1100 ? menuStyle : {}}>
                <div className='menu-group'>
                    <h6>Type</h6>
                    <button onClick={() => props.setType('fish')}className={props.type=='fish' ? 'btn-active': ''}>FISH</button>
                    <button onClick={()=> props.setType('bugs')} className={props.type=='bugs' ? 'btn-active': ''}>BUGS</button>
                </div>
                <div className='menu-group'>
                    <h6>Hemisphere</h6>
                    <Dropdown items={Options.hemisphere} setValue={props.setNorth}/>
                </div>
                <div className='menu-group'>
                    <h6>Location</h6>
                    <Dropdown items={locationData} setValue={props.setLoc} resetTrigger={props.type}/>
                </div>
                <div className='menu-group'>
                    <h6>Availability</h6>
                    <Dropdown items={Options.availability} setValue={props.setAvai}/>
                </div>
                <div className='menu-group'>
                    <h6>Search</h6>
                    <input id="search-input" onKeyUp={props.search} type="text"/>
                </div>
            </div>
        </div>
    );
}