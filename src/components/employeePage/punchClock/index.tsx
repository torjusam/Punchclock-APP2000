/*
    Author: Torjus A.M
    This component is the "Stemplingsklokke" on the personal page.
    It keeps track of current clock-in time and status and allows the user to clock in and out.
*/
import React, { useEffect, FC } from 'react';
import { Employee } from '../../../lib/employee';
import Clock from '../../../lib/assets/svg/clock.svg';
import styles from '../employeePageLayout.module.css';
import ClockInOutButton from './clockInOutButton';

interface PunchClockProps {
    employee: Employee;
}

const PunchClock: FC<PunchClockProps> = ({ employee }) => {

    useEffect(() => {
        // Add your code here
        // This code will run when the component mounts

        return () => {
            // Add your cleanup code here
            // This code will run when the component unmounts
        };
    }, []);

    return (
        <div className={styles.module}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{ background: '#1BDA0A' }}>
                    <Clock className={styles.icon} />
                </div>
                <h1 className={styles.headerText}>Stemplingsklokke</h1>
            </div>
            <hr />
            <div className={styles.moduleContent}>
                <h1>Put content here</h1>
            </div>
            <ClockInOutButton employee={employee} />
        </div>
    );
};

export default PunchClock;