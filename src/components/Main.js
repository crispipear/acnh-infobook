import React, { useState, useEffect } from 'react';
import Helpers from '../utils/helpers';
import getAvailability from '../utils/availability';
import Month from './Month';

const listHeader = ['','Name', 'Price', 'Location', 'Size', 'Time', 'Month', 'Now?']
const bg = 'rgba(204, 219, 221, 0.15)'
const ListItem = ({data, north, type, bgColor}) => 
    <div className="list-item" style={{backgroundColor: bgColor ? bg : 'white'}}>
        <div className="list-col">
            <img src={data.img} alt={data.name}/>
        </div>
        <div className="list-col"><span>{data.name}</span></div>
        <div className="list-col"><span>{data.price || ''}</span></div>
        <div className="list-col"><span>{data.location || ''}</span></div>
        <div className="list-col"><span>{data.size ? Helpers.size[data.size] : ''}</span></div>
        <div className="list-col"><span>{Helpers.time[type][data.time - 1]}</span></div>
        <div className="list-col">
            {
                data.allYear
                ? <span>All year</span>
                : <Month highlight={north ? data.monthsN : data.monthsS}/>
            }
        </div>
        <div className="list-col">
                {
                    getAvailability(data, north, type)
                    ? <span className="text-hl">YAS</span>
                    : <span className="text-d">No</span>
                }
        </div>
    </div>

const ListItemMobile = ({data, north, type, bgColor}) => 
<div className="list-item" style={{backgroundColor: bgColor ? bg : 'white'}}>
    <div className="list-col">
        <span>{data.name}</span>
        <img src={data.img} alt={data.name}/>
    </div>
    <div className="list-col">
        <span>Price: {data.price || 'N/A'}</span>
        <span>Location: {data.location || 'N/A'}</span>
    </div>
    <div className="list-col">
        <span>Time: {Helpers.time[type][data.time - 1]}</span>
        <span>Size: {data.size ? Helpers.size[data.size] : 'N/A'}</span>
    </div>
    <div className="list-col">
        {
            data.allYear
            ? <span>All year</span>
            : <Month highlight={north ? data.monthsN : data.monthsS}/>
        }
    </div>
    <div className="list-col">
        <span>Available now?</span>
        {
            getAvailability(data, north, type)
            ? <span className="text-hl">YAS</span>
            : <span className="text-d">No</span>
        }
    </div>
</div>

export default function Main(props) {
    function congruMod(num){
        //check if incoming *num* is congruent to 2 or 3 mod 4.
        //this formula is for tablet list item background color
        const numMod = num % 4;
        if(numMod == 2 % 4){
            return true
        }else if (numMod  == 3 % 4){
            return true
        }
        return false;
    }

    return (
        <div id="main">
            <div id="list">
                {
                    window.innerWidth > 1100 &&
                    <div id="list-header" className="list-item">
                        {
                            listHeader.map(item => <div key={'header-'+item} className='list-col'><b>{item}</b></div>)
                        }
                    </div>
                }
                {
                    props.loaded?
                    Object.keys(props.data).map((item, key) => 
                        window.innerWidth > 1100 ? 
                        <ListItem bgColor={key % 2 !== 0} index={key} data={props.data[item]} key={item} north={props.north} type={props.type}/>
                        :
                        <ListItemMobile bgColor={window.innerWidth > 600 ? congruMod(key+1) : key%2 !==0 } data={props.data[item]} key={item} north={props.north} type={props.type}/>
                    )
                    :
                    <div id="loader">
                        <h4>loading...</h4>
                    </div>
                }
            </div>
        </div>
    );
}