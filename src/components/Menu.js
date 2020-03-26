import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Options from '../utils/options';

export default function Menu(props) {
    const [locationData, setLocationData] = useState(Options.location[props.type]);

    useEffect(() => {
        setLocationData(
            Options.location[props.type]
        )
    }, [props.type])
    return (
        <div id='menu'>
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
    );
}