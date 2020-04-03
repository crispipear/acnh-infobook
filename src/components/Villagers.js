import React, { useState, useEffect } from 'react';

export default function Villagers(props) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        //one time actions
    }, []);

    useEffect(() => {
        return () => {
            //clean up
        };
    });

    return (
        <section id="villagers"> Villagers </section>
    );
}