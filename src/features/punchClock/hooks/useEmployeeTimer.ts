/*
    Author: Torjus A.M
    This hook is used to calculate the time elapsed since last check-in and the last checkout time.
*/
import { useState, useEffect } from 'react';
import { useTimerContext } from '../../../context/timerContext';
import moment from 'moment';

export const useEmployeeTimer = (employee) => {
    // State variables for keeping track of time elapsed since last checkin, and the last checkout time.
    const [timer, setTimer] = useState<number>(0);
    const [lastCheckOut, setLastCheckOut] = useState<string>('');
    const { currentTime } = useTimerContext();
    
    // Hook sets up interval that updates the timer state every second while employee is clockedIn.
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (employee.isClockedIn) {
            setTimer(0);
            const startTime = moment(employee.lastCheckIn);
            interval = setInterval(() => {
                setTimer(moment().diff(startTime, 'seconds'));
            }, 1000);
        } else {
            setLastCheckOut(moment().format('LT'));
            // After clocking out, set the timer to the workinterval value from the clockHistoryTable.
            const seconds = moment.duration(currentTime).asSeconds();
            setTimer(seconds);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [employee.isClockedIn, employee.lastCheckIn, currentTime]);

    return { timer, lastCheckOut };
};