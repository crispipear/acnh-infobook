import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Options from '../utils/options';

export default function Menu(props) {
    return (
        <div id='menu'>
            <div className='menu-group'>
                <h6>Type</h6>
                <button onClick={() => props.setType('fish')}className={props.type=='fish' ? 'btn-active': ''}>FISH</button>
                <button onClick={()=>alert('not done yet')} className={props.type=='bugs' ? 'btn-active': ''}>BUGS</button>
            </div>
            <div className='menu-group'>
                <h6>Hemisphere</h6>
                <Dropdown items={Options.hemisphere} setValue={props.setNorth}/>
            </div>
            <div className='menu-group'>
                <h6>Location</h6>
                <Dropdown items={Options.location} setValue={props.setLoc}/>
            </div>
            <div className='menu-group'>
                <h6>Availability</h6>
                <Dropdown items={Options.availability} setValue={props.setAvai}/>
            </div>
            <div className='menu-group'>
                <h6>Search</h6>
                <input id="search-input" onKeyDown={props.search} type="text"/>
            </div>
        </div>
    );
}