// Author: Thomas

'use client'
import React, { useState, useEffect} from 'react';

const Clock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString();
            const minutes = now.getMinutes().toString();
            setTime(`${hours}:${minutes}`);
        };

        // Updates the clock on screen
        const intervalId = setInterval(updateClock, 1000);

        // Set initial time
        updateClock();

        return () => clearInterval(intervalId);
    },
    []);

    return (
        <div className="clock">{time}</div>
    );

};

export default Clock;