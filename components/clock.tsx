// Authors: Thomas H, Ask A
import React, { useState, useEffect } from 'react';
import container from '../lib/styles/flexContainers.module.css';
import styles from '../lib/styles/layout.module.css'

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: any = { timeZone: 'Europe/Oslo', hour: '2-digit', minute: '2-digit' };
      const osloTime = now.toLocaleTimeString('nb-NO', options);

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
      <div className={styles.clock}>{time}</div>
  );

};

export default Clock;