/**
 * @file Loading rows for the clock history table. Displays 7 empty rows.
 * @module ClockHistory
 * @Author Thomas H
 */
import React from "react";
import styles from './clockHistoryTable.module.css';

const LoadingRows = () => {
    // Array fill creates an array with 7 identical elements
    return (
        <>
            {Array(7).fill(
                <div className={styles.tableRow}>
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
            )}
        </>
    );
};

export default LoadingRows;