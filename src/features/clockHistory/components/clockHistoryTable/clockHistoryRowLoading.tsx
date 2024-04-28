/**
 * @file Loading rows for the clock history table. Displays 7 empty rows.
 * @module ClockHistory
 * @memberof EmployeePage
 * @author Thomas H
 */
import React from "react";
import styles from './clockHistoryTable.module.css';

const LoadingRows = () => {
    return (
        <>
            {/* Create an array of 7 undefined elements, then map over it to generate a list of divs */}
            {Array.from({length: 7}).map((_, index) => (
                <div key={index} className={styles.tableRow}>
                    <div className={`${styles.rowItem} ${styles.date}`}>
                        <div className={styles.loading}></div>
                        <div className={styles.loading}></div>
                    </div>
                    <div className={styles.rowSubContainer}>
                        <div className={styles.rowItem}>
                            <div className={styles.icon}/>
                            <h1>-</h1>
                        </div>
                        <div className={styles.rowItem}>
                            <div className={styles.icon}/>
                            <h1>-</h1>
                        </div>
                    </div>
                    <div className={styles.rowItem}>--</div>
                    <div className={styles.rowItem}>--</div>
                </div>
            ))}
        </>
    );
};

export default LoadingRows;