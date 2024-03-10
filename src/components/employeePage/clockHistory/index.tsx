/*
    Author: Torjus A.M
    Responsible for defining the layout and content of 
    the "Stemplingshistorikk" module.
*/
import React from 'react';
import { Employee } from '../../../lib/employee';
import ClockCheck from '../../../lib/assets/svg/clockCheck.svg';
import ClockHistoryTable from './clockHistoryTable';
import useClockHistory from '../../../hooks/useClockHistory';
import TimeModules from './timeModules';
import styles from '../employeePageLayout.module.css';

interface ClockHistoryProps {
    employee: Employee;
}

const ClockHistory: React.FC<ClockHistoryProps> = ({ employee }) => {
    /* Uses the custom hook to fetch the employees clock history, 
    then passes it to both children that need it */
    const { data, isLoading } = useClockHistory(employee);

    return (
        <div className={styles.clockHistoryContainer}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{ padding: '0.57em' }}>
                    <ClockCheck className={`${styles.icon} ${styles.clockHistoryIcon}`} />
                </div>
                <h1>Stemplingshistorikk</h1>
            </div>
            <hr />
            <TimeModules data={data} isLoading={isLoading} />
            <ClockHistoryTable data={data} isLoading={isLoading} />
        </div>
    );
};

export default ClockHistory;