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
        for (let i = 0; i < 8; i++) {
            emptyRows.push(
                <tr key={i} className={styles.row}>
                    <td className={styles.date}>
                        <h1>{day}</h1>
                        <h2>{dayOfWeek}</h2>
                    </td>
                    <td className={styles.time}>1</td>
                    <td className={styles.time}>1</td>
                    <td className={styles.number}>1</td>
                </tr>
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
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Dato</th>
                            <th>Stempling</th>
                            <th>Arbeidstid</th>
                            <th style={{ color: '#0DB714' }}>Fleks Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ClockHistoryTable;