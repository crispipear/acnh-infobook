import React, { useState, useEffect } from 'react';

export default function Month(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        let months = [
            {name: 'Jan', highlight: false},
            {name: 'Feb', highlight: false},
            {name: 'Mar', highlight: false},
            {name: 'Apr', highlight: false},
            {name: 'May', highlight: false},
            {name: 'Jun', highlight: false},
            {name: 'Jul', highlight: false},
            {name: 'Aug', highlight: false},
            {name: 'Sep', highlight: false},
            {name: 'Oct', highlight: false},
            {name: 'Nov', highlight: false},
            {name: 'Dec', highlight: false},
        ]
        props.highlight.map(month => {
            months[month - 1].highlight = true;
        })
        setData(months)
    }, [props.highlight])
    return (
        <div id="month">
            {
                data.map((m, key) =>
                    <div className={m.highlight ? 'month-item month-highlight' : 'month-item'} key={'month' + (key+1)}>
                        {m.name}
                    </div>
                )
            }
        </div>
    );
}