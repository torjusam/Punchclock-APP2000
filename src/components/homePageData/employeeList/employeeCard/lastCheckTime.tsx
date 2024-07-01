import React, {FC, useEffect, useState} from 'react';
import Employee from '../../../../utils/employee';
import ArrowIn from '../../../../assets/arrowIn.svg';
import ArrowOut from '../../../../assets/arrowOut.svg';
import moment from 'moment';
import styles from './employeeCard.module.css';

const LastCheckTime: FC<{ employee: Employee }> = ({employee}) => {
    const [lastCheckTime, setLastCheckTime] = useState('');
    const [lastAction, setLastAction] = useState('');

    // Changing the last check time and action based on the employees last check in/out time.
    // Done in a hook incase the automatic clockout feature is implemented.
    useEffect(() => {
        const time = employee.isClockedIn ? moment(employee.lastCheckIn) : moment(employee.lastCheckOut);
        setLastCheckTime(time.isValid() ? time.format('HH:mm') : '?');
        setLastAction(employee.isClockedIn ? 'in' : 'out');
    }, [employee]);

    const Arrow = lastAction === 'in' ? ArrowIn : ArrowOut;

    return (
        <div className={styles.lastCheckContainer}>
            <Arrow className={styles.icon}/>
            <div className={styles.lastCheckTime}>
                {lastCheckTime}
            </div>
        </div>
    );
}

export default LastCheckTime;