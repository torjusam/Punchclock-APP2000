/* 
    Author: Torjus A.M
    Component responsible for displaying the timer on the punchClock module.
*/
import React from 'react';
import moment from 'moment';
import {Employee} from '../../../lib/types/employee';
import styles from './punchClock.module.css';

interface PunchClockTimeDisplayProps {
    timer: number;
    employee: Employee;
    isLoading: boolean;
    errorMessage: string | null;
}

// Helper function to format timer to a human readable format.
const formatTime = (seconds: number) => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const secs = duration.seconds().toString().padStart(2, '0');
    return `${hours}t ${minutes}m ${secs}s`;
};

const PunchClockTimeDisplay: React.FC<PunchClockTimeDisplayProps> = ({timer, employee, isLoading, errorMessage}) => {

    return (
        <div className={styles.timeDisplay}>
            <>
                {/* While clock-in/out is being performed, display skeleton loading styles for the timer */}
                {isLoading || (employee.isClockedIn && !timer) ? (
                    <>
                        <div className={styles.line}></div>
                        <div className={`${styles.line} ${styles.w2}`}></div>
                    </>
                ) : (
                    timer >= 0 && (
                        <>
                            {/* Display timer since clocking in, and when it was started */}
                            <h1>{formatTime(timer)}</h1>
                            <h2>
                                {moment(employee.lastCheckIn).format('LT')} -
                                {/* Shows the time between clock operations, after clocking out: '19:00 - 23:00' / '19:00 - ?' */}
                                {employee.isClockedIn ? ' ?' : moment(employee.lastCheckOut).format(' LT')}
                            </h2>
                        </>
                    )
                )}
            </>
        </div>
    );
};

export default PunchClockTimeDisplay;
