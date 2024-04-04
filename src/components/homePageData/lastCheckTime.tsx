/* 
    Author: Torjus A.M
    This component is used to display the last check time of an employee
    along with an icon indicating the action (checked in / out).
    TODO: Fix this? Need for state?
*/
import React, {useState, useEffect, FC} from 'react';
import {Employee} from '../../lib/types/employee';
import ArrowIn from '../../assets//arrowIn.svg';
import ArrowOut from '../../assets/arrowOut.svg';
import moment from 'moment';
import styles from './employeeList.module.css';

const LastCheckTime: FC<{ employee: Employee }> = ({employee}) => {
    // Two states are defined, one for the formatted time and one for the last action (in/out).
    const [lastCheckTime, setLastCheckTime] = useState('');
    const [lastAction, setLastAction] = useState('');

    useEffect(() => {
        // Sets last action to in or out based on if employee is clocked in or not.
        if (employee.isClockedIn) {
            setLastCheckTime(moment(employee.lastCheckIn).format('HH:mm'))
            setLastAction('in');
        } else {
            setLastCheckTime(moment(employee.lastCheckOut).format('HH:mm'))
            setLastAction('out');
        }

    }, [employee.lastCheckIn, employee.lastCheckOut]);

    // The arrow is set based on the last action of the employee.
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