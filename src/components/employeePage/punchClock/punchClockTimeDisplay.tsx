/* 
    Author: Torjus A.M
    Component responsible for displaying the timr on the punchClock module.
*/
import React from 'react';
import { Employee } from '../../../lib/employee';
import moment from 'moment';
import { useEmployeeContext } from '../../../hooks/employeeContext';
import styles from './punchClock.module.css';

interface PunchClockTimeDisplayProps {
    timer: number;
    employee: Employee;
}

const PunchClockTimeDisplay: React.FC<PunchClockTimeDisplayProps> = ({ timer, employee }) => {
    // Helper function to format time: hh't' mm'm' ss's'
    const formatTime = (seconds: number) => {
        const duration = moment.duration(seconds, 'seconds');
        const hours = duration.hours().toString().padStart(2, '0');
        const minutes = duration.minutes().toString().padStart(2, '0');
        const secs = duration.seconds().toString().padStart(2, '0');
        return `${hours}t ${minutes}m ${secs}s`;
    };
    
    return (
        <div className={styles.timeDisplay}>
            {timer > 0 && (
                <>
                    <h1>{formatTime(timer)}</h1>
                    <h2>
                        {moment(employee.lastCheckIn).format('LT')} -
                        {employee.isClockedIn ? ' ?' : moment(employee.lastCheckOut).format(' LT')}
                    </h2>
                </>
            )}
        </div>
    );
};

export default PunchClockTimeDisplay;