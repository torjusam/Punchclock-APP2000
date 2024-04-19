/**
 * @file Copied from original component and altered to remove two columns.
 * @description original component: .src/features/clockHistory/components/clockHistoryTable/clockHistoryRow.tsx
 * @module Extra
 * @author Torjus A.M, Thomas H
 * @Editors Magnus A, Ask I.P.A
 */
import React from 'react';
import {ClockHistoryData} from '../utils/types'
import moment from 'moment';
import styles from '../features/clockHistory/components/clockHistoryTable/clockHistoryTable.module.css';

interface ClockHistoryRowProps {
    clockHistoryData: ClockHistoryData;
}

const ExtraTableRow = ({clockHistoryData}: ClockHistoryRowProps) => {
    // Destructs the object to get the specific values
    const {checkin, checkout, workinterval, overtimeinterval} = clockHistoryData;

    // Helper function takes in date and how to format it. If date is null, return '-'
    const formatDate = (date, format) => date ? moment(date).format(format) : '-';

    return (
        <div className={styles.tableRow}>
            <div className={`${styles.rowItem} ${styles.date}`}>
                <h1>{formatDate(checkin, 'DD')}</h1>
                <h2>{formatDate(checkin, 'ddd')}</h2>
            </div>
            <div className={styles.rowSubContainer}>
                <div className={styles.rowItem}>
                    {/*<ArrowIn className={styles.icon}/>*/}
                    <h1>{formatDate(checkin, 'LT')}</h1>
                </div>
                <div className={styles.rowItem}>
                    {/*<ArrowOut className={styles.icon}/>*/}
                    <h1>{formatDate(checkout, 'LT')}</h1>
                </div>
            </div>
        </div>
    )
}

export default ExtraTableRow;