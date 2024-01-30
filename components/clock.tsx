// Author: Thomas H
import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours().toString();
            let minutes = now.getMinutes().toString();
            if (hours.length < 2) hours = '0' + hours;
            if (minutes.length < 2) minutes = '0' + minutes;

            setTime(`${hours}:${minutes}`);
        };

        // Updates the clock on screen
        const intervalId = setInterval(updateClock, 1000);

        // Set initial time
        updateClock();

        return () => clearInterval(intervalId);
    },
        []);
    //Author Torjus: Styles
    return (
        <ul className="flex items-center justify-center w-full">
        <li className="clock text-white text-center flex items-center justify-center ">
          {time}
        </li>
      </ul>
    );

};

export default Clock;