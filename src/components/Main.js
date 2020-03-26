import React, { useState, useEffect } from 'react';
import Helpers from '../utils/helpers';
import getAvailability from '../utils/availability';
import Month from './Month';

const listHeader = ['','Name', 'Price', 'Location', 'Size', 'Time', 'Month', 'Now?']

const ListItem = ({data, north, type}) => 
    <div className="list-item">
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

export default function Main(props) {
    return (
        <div id="main">
            <div id="list">
                <div id="list-header" className="list-item">
                    {
                        listHeader.map(item => <div key={'header-'+item} className='list-col'><b>{item}</b></div>)
                    }
                </div>
                {
                    props.loaded?
                    Object.keys(props.data).map(item => 
                        <ListItem data={props.data[item]} key={item} north={props.north} type={props.type}/>
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