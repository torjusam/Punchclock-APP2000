/* 
    Author: Torjus A.M
    This component is used to display the last check time of an employee
    along with an icon indicating the action (checked in / out).
*/
import React, {FC, useEffect, useState} from 'react';
import Employee from '../../../../lib/types/employee';
import ArrowIn from '../../../../assets/arrowIn.svg';
import ArrowOut from '../../../../assets/arrowOut.svg';
import moment from 'moment';
import styles from './employeeCard.module.css';

const LastCheckTime: FC<{ employee: Employee }> = ({employee}) => {
    const [lastCheckTime, setLastCheckTime] = useState('');
    const [lastAction, setLastAction] = useState('');

    useEffect(() => {
        const time = employee.isClockedIn ? moment(employee.lastCheckIn) : moment(employee.lastCheckOut);
        setLastCheckTime(time.isValid() ? time.format('HH:mm') : '?');
        setLastAction(employee.isClockedIn ? 'in' : 'out');
    }, [employee.lastCheckIn, employee.lastCheckOut]);

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