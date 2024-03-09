/*
    Author: Torjus A.M
    Component that generates a table for the employees clock history.
*/
import React from 'react';
import { Employee } from '../../../lib/employee';
import { formatDay } from '../../../lib/dateFormatter';
import ArrowIn from '../../../lib/assets/svg/arrowIn.svg';
import ArrowOut from '../../../lib/assets/svg/arrowOut.svg';
import useClockHistory from '../../../hooks/useClockHistory';
import styles from './clockHistoryTable.module.css';

interface ClockHistoryTableProps {
    employee: Employee;
}

const date = new Date();
const { day, dayOfWeek } = formatDay(date);

const ClockHistoryTable: React.FC<ClockHistoryTableProps> = (employee) => {
    const clockHistory = useClockHistory(employee);

    // Renders 7 rows.
    const renderRows = () => {
        const emptyRows = []; // Declare emptyRows array
        for (let i = 0; i < 7; i++) { // Declare i variable
            emptyRows.push(
                <div key={i} className={styles.tableRow}>
                    <div className={`${styles.rowItem} ${styles.date}`}>
                        <h1>{day}</h1>
                        <h2>{dayOfWeek}</h2>
                    </div>
                    <div className={styles.rowSubContainer}>
                        <div className={styles.rowItem}>
                            <ArrowIn className={styles.icon} />
                            <h1>08:00</h1>
                        </div>
                        <div className={styles.rowItem}>
                            <ArrowOut className={styles.icon} />
                            <h1>16:00</h1>
                        </div>
                    </div>
                    <div className={styles.rowItem}>
                        <h3>08t 00m</h3>
                    </div>
                    <div className={styles.rowItem}>
                        <h3 style={{ color: '#0DB714' }}>+00t 00m</h3>
                    </div>
                </div>
            );
        }
        return emptyRows; // Return the emptyRows array
    };

    return (
        <>
            {/* The two time modules */}
            <div className={styles.timeModulesContainer}>
                <div className={`${styles.timeModules}`} style={{ marginRight: '1.5rem' }}>
                    <h1>Arbeidstid</h1>
                    <h2>23t 00m</h2>
                </div>
                <div className={styles.timeModules}>
                    <h1 style={{ color: '#0DB714' }}>Fleks saldo</h1>
                    <h2 style={{ color: '#0DB714' }}>23t 00m</h2>
                </div>
            </div>
            {/* Table */}
            <div className={styles.tableContainer}>
                <div className={`${styles.tableRow} ${styles.heading}`}>
                    <div className={styles.rowItem}>Dato</div>
                    <div className={styles.rowItem}>Stempling</div>
                    <div className={styles.rowItem}>Arbeidstid</div>
                    <div className={`${styles.rowItem}`} style={{ color: '#0DB714' }}>Fleks Saldo</div>
                </div>
                {renderRows()}
            </div>
        </>
    );
};

export default ClockHistoryTable;