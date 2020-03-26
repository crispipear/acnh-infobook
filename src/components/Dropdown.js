import React, { useState, useEffect } from 'react';

export default function Dropdown(props) {
    const [current, setCurrent] = useState(props.items[0]);
    const [show, setShow] = useState(false);
    const [targetClassName, setTargetClassName] = useState("");
    const dp_names = ['dropdown-current', 'dropdown-arrow', 'dropdown-item'];

    useEffect(() => {
        window.addEventListener('click', handleClick)
        return(() => {
            window.removeEventListener('click', handleClick)
        })
    }, [])

    useEffect(() => {
        setCurrent(
            props.items[0]
        )
    }, [props.resetTrigger])

    function handleClick(e){
       setTargetClassName(e.target.className);
    }

    useEffect(() => {
        if(!dp_names.includes(targetClassName)){
            setShow(false);
        }
    }, [targetClassName])

    useEffect(() => {
        props.setValue(current.val)
    }, [current])

    return (
        <div className='dropdown'>
            <div className='dropdown-current' onClick={() => setShow(!show)}>
                <span>{current.name}</span>
                <span className='dropdown-arrow'/>
            </div>
            {
                show && 
                <div className='dropdown-list'>
                    {
                        props.items.map(item => 
                            <div key={item.name} className='dropdown-item' onClick={() => {setCurrent(item); setShow(false)}}>
                                <span>{item.name}</span>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}