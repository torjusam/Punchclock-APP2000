// Component responsible for displaying time, date and a greeting.
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/nb';
import '@fontsource/lato';
import '@fontsource/dm-sans';
import styles from './layout.module.css'

moment.locale('nb');

// Array of different greetings, and their start and end times.
const greetings = [
    {start: 0, end: 12, greeting: "God morgen!"},
    {start: 12, end: 17, greeting: "God dag!"},
    {start: 17, end: 24, greeting: "God kveld!"},
];

const Clock = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [greeting, setGreeting] = useState('');

    // useEffect hook to update the clock every second
    useEffect(() => {
        const updateClock = () => {
            const now = moment();
            const hour = now.hours();

            // Find the correct greeting based on the current hour.
            const {greeting} = greetings.find(({start, end}) => hour >= start && hour < end) || {};
            setGreeting(greeting);
            setDate(now.format('Do MMMM YYYY'));
            setTime(now.format('HH:mm'));
        };
        // Update clock every second
        const intervalId = setInterval(updateClock, 1000);

        // Set initial time
        updateClock();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.outerDateContainer}>
            <div className={styles.greetingText}>{greeting}</div>
            <div className={styles.clock}>{time}</div>
            <div className={styles.dateText}>{date}</div>
        </div>
    );
};

export default Clock;