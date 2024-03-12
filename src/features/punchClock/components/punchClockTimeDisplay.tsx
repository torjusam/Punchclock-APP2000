/* 
    Author: Torjus A.M
    Component responsible for displaying the timr on the punchClock module.
*/
import React from 'react';
import moment from 'moment';
import { Employee } from '../../../lib/employee';
import { formatTime } from '../services/formatTime';
import styles from './punchClock.module.css';

interface PunchClockTimeDisplayProps {
    timer: number;
    employee: Employee;
    isLoading: boolean;
}

const PunchClockTimeDisplay: React.FC<PunchClockTimeDisplayProps> = ({ timer, employee, isLoading }) => {

    return (
        <div className={styles.timeDisplay}>
            {isLoading || !timer ? (
                <>
                    <div className={styles.line}></div>
                    <div className={`${styles.line} ${styles.w2}`}></div>
                </>
            ) : (
                timer >= 0 && (
                    <>
                        <h1>{formatTime(timer)}</h1>
                        <h2>
                            {moment(employee.lastCheckIn).format('LT')} -
                            {employee.isClockedIn ? ' ?' : moment(employee.lastCheckOut).format(' LT')}
                        </h2>
                    </>
                )
            )}
        </div>
    );
};
export default PunchClockTimeDisplay;