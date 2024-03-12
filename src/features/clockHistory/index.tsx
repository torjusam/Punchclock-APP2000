/*
    Author: Torjus A.M
    Responsible for defining the layout and content of 
    the "Stemplingshistorikk" module.
*/
import React from 'react';
import { Employee } from '../../lib/employee';
import ClockCheck from '../../assets/clockCheck.svg';
import ClockHistoryTable from './components/clockHistoryTable';
import useClockHistory from './hooks/useClockHistory';
import TimeModules from './components/timeModules';
import styles from '../../components/employeePage/employeePageLayout.module.css';

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
                <h2>Stemplingshistorikk</h2>
            </div>
            <hr />
            <TimeModules employee={employee} />
            <ClockHistoryTable data={data} isLoading={isLoading} />
        </div>
    );
};

export default ClockHistory;