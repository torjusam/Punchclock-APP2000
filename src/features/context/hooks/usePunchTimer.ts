/**
 * @file Context provider for the employee work data context. Provides the timer, balance, and timer limit for the employee.
 * @author Torjus A.M
 */
import {useState, useEffect} from 'react';
import {Employee} from '../../../lib/types/employee';
import moment from 'moment';

/**
 * Hook to manage the timer for an employee.
 *
 * @param {Employee} employee - The employee object.
 * @returns {Object} An object containing:
 *   - timer: Current timer value.
 *   - setTimer: Setter function for the timer.
 *   - timerLimit: Boolean indicating if the timer limit has been reached.
 *   - setTimerLimit: Function to set the timer limit.
 *   - isTimerLoading: Boolean indicating if the timer data is loading.
 */
export const useEmployeeTimer = (employee: Employee) => {
    const [timer, setTimer] = useState(0);
    const [isTimerLoading, setIsTimerLoading] = useState(false);
    const [timerLimit, setTimerLimit] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (employee.isClockedIn) {
            setIsTimerLoading(true);
            interval = setInterval(() => {
                // Calculate time difference between now and the last check-in time in seconds
                const timeDifference = moment().diff(moment(employee.lastCheckIn), 'seconds');
                setTimer(timeDifference);
                setIsTimerLoading(false);

                /* If the timer exceeds 15 hours, send signal to clock the employee out.
                15 hours is a placeholder value for the limit, this would have to include
                logic from vismas system in order to variate the limit depending on the employee's work hours. */
                setTimerLimit(timeDifference >= 54000);

                // Interval runs every second
            }, 1000);
        }

        // Cleanup function to clear the interval when the component unmounts, or before the effect runs again
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [employee]);

    return {
        timer,
        setTimer,
        timerLimit,
        setTimerLimit,
        isTimerLoading
    };
};