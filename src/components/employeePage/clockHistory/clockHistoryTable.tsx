/*
    Author: Torjus A.M
    Component that generates a table for the employees clock history.
*/
import React from 'react';
import { Employee } from '../../../lib/employee';
import { formatDay } from '../../../lib/dateFormatter';
import styles from './clockHistoryTable.module.css';

interface ClockHistoryTableProps {
    employee: Employee;
}

const date = new Date();
const { day, dayOfWeek } = formatDay(date);

const ClockHistoryTable: React.FC<ClockHistoryTableProps> = (employee) => {
    const renderRows = () => {
        const emptyRows = [];
        for (let i = 0; i < 7; i++) {
            emptyRows.push(
                <div key={i} className={styles.tableRow}>
                    <div className={`${styles.rowItem} ${styles.date}`}>
                        <h1>{day}</h1>
                        <h2>{dayOfWeek}</h2>
                    </div>
                    <div className={styles.rowSubContainer}>
                        <div className={styles.rowItem}>08:00</div>
                        <div className={styles.rowItem}>16:00</div>
                    </div>
                    <div className={styles.rowItem}>1</div>
                    <div className={styles.rowItem}>1</div>
                </div>
            );
        }
        return emptyRows;
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