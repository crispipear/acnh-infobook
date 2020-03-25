import React, { useState, useEffect } from 'react';
import Helpers from '../utils/helpers';
import getAvailability from '../utils/availability';
import Month from './Month';

const listHeader = ['','Name', 'Price', 'Location', 'Size', 'Time', 'Month', 'Now?']

export default function Main(props) {
    const {time, size} = Helpers;
    const data = props.data;

    return (
        <div id="main">
            <div id="list">
                <div id="list-header" className="list-item">
                    {
                        listHeader.map(item => <div key={'header-'+item} className='list-col'><b>{item}</b></div>)
                    }
                </div>
                {
                    Object.keys(data).map(item => 
                        <div className="list-item" key={item}>
                            <div className="list-col"><div className='list-img-temp'/></div>
                            <div className="list-col"><span>{data[item].name}</span></div>
                            <div className="list-col"><span>{data[item].price || 'N/A'}</span></div>
                            <div className="list-col"><span>{data[item].location || 'N/A'}</span></div>
                            <div className="list-col"><span>{data[item].size ? size[data[item].size] : 'N/A'}</span></div>
                            <div className="list-col"><span>{time[data[item].time - 1]}</span></div>
                            <div className="list-col">
                                {
                                    data[item].allYear
                                    ? <span>All year</span>
                                    : <Month highlight={props.north ? data[item].monthsN : data[item].monthsS}/>
                                }
                            </div>
                            <div className="list-col">
                                    {
                                        getAvailability(data[item], props.north)
                                        ? <span className="text-hl">YAS</span>
                                        : <span className="text-d">No</span>
                                    }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}