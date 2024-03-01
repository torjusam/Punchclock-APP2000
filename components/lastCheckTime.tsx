import React, { useState, useEffect } from 'react';
import { Employee } from '../lib/employee';
import { formatTime } from '../lib/dateFormatter';
import ArrowIn from '../lib/assets/svg/arrowIn.svg';
import ArrowOut from '../lib/assets/svg/arrowOut.svg';
import styles from '../lib/styles/flexContainers.module.css'

const LastCheckTime: React.FC<{ employee: Employee }> = ({ employee }) => {
    const [lastCheckTime, setLastCheckTime] = useState('');
    const [lastAction, setLastAction] = useState('');

    useEffect(() => {
        const lastCheck = employee.lastCheck();
        setLastCheckTime(lastCheck ? formatTime(lastCheck) : '?');

        if (employee.isClockedIn) {
            setLastCheckTime(formatTime(employee.lastCheckIn))
            setLastAction('in');
        } else {
            setLastCheckTime(formatTime(employee.lastCheckOut))
            setLastAction('out');
        }

    }, [employee.lastCheckIn, employee.lastCheckOut]);

    return (
        <div className={styles.rowContainer}>
            {lastAction === 'in' ? <ArrowIn /> : <ArrowOut />}
            <div className={styles.timeText}>
            {lastCheckTime}
            </div>
        </div>
    );
}

export default LastCheckTime;