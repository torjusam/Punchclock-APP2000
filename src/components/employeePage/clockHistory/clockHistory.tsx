/*
    Author: Torjus A.M
    Responsible for defining the layout and content of 
    the "Stemplingshistorikk" module.
*/
import React from 'react';
import { Employee } from '../../../lib/employee';
import ClockCheck from '../../../lib/assets/svg/clockCheck.svg';
import ClockHistoryTable from './clockHistoryTable';
import styles from '../personalPage.module.css';

interface ClockHistoryProps {
    employee: Employee;
}

const ClockHistory: React.FC<ClockHistoryProps> = ({ employee }) => {

    return (
        <div className={styles.clockHistoryContainer}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{ padding: '0.57em' }}>
                    <ClockCheck className={`${styles.icon} ${styles.clockHistoryIcon}`} />
                </div>
                <h1>Stemplingshistorikk</h1>
            </div>
            <hr />
            <ClockHistoryTable employee={employee} />
        </div>
    );
};

export default ClockHistory;