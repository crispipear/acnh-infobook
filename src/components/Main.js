import React, { useState, useEffect } from 'react';

export default function Main(props) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        //one time actions
    }, []);

    return (
        <div id="main">

        </div>
    );
}