// Authors: Thomas H, Ask A
import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeFix: any = {timeZone:'Europe/Oslo', hour:'2-digit', minute:'2-digit'};
            const osloTime = now.toLocaleTimeString('nb-NO', timeFix);

            setTime(osloTime);
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