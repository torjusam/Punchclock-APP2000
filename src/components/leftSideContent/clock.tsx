// Authors: Thomas H, Ask A, Torjus A.M
import React, { useState, useEffect } from 'react';
import { formatDate } from '../../lib/dateFormatter';
import styles from './leftContent.module.css'

const Clock = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { timeZone: 'Europe/Oslo', hour: '2-digit', minute: '2-digit' };
      const osloTime = now.toLocaleTimeString('nb-NO', options);
      const formattedOsloDate = formatDate(now);
      
      // Placeholder. To-Do: Greeting based on time of day
      setGreeting("God morgen!")
      setDate(formattedOsloDate);
      setTime(osloTime);
    };

    // Updates the clock on screen
    const intervalId = setInterval(updateClock, 1000);

    // Set initial time
    updateClock();

    return () => clearInterval(intervalId);
  },
    []);

  return (
    <div className={styles.outerDateContainer}>
      <div className={styles.greetingText}>{greeting}</div>
      <div className={styles.clock}>{time}</div>
      <div className={styles.dateText}>{date}</div>
    </div>
  );

};

export default Clock;