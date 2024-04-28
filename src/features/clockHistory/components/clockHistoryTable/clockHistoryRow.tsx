/**
 * @file Responsible for defining the layout of a row in the clock-history table.
 * @module ClockHistory
 * @memberof EmployeePage
 * @author Torjus A.M, Thomas H
 */
import React from 'react';
import ArrowIn from '../../../../assets/arrowIn.svg';
import ArrowOut from '../../../../assets/arrowOut.svg';
import {formatInterval} from '../../services/formatInterval';
import {ClockHistoryData} from "../../../../utils/types";
import moment from 'moment';
import styles from './clockHistoryTable.module.css';

interface ClockHistoryRowProps {
    clockHistoryData: ClockHistoryData;
}

/**
 * Component for a row in the clock-history table. Formats and displays data.
 * @param clockHistoryData Object containing information about the check-in and check-out times,
 * working interval and overtimeinterval.
 */
const ClockHistoryRow = ({clockHistoryData}: ClockHistoryRowProps) => {
    const {checkin, checkout, workinterval, overtimeinterval} = clockHistoryData;
    // Helper function takes in date and how to format it. If date is null, return '-'
    const formatDate = (date: Date, format: string) => date ? moment(date).format(format) : '-';

    // Each row has a div for each column in the table.
    return (
        <div className={styles.tableRow}>
            <div className={`${styles.rowItem} ${styles.date}`}>
                <h1>{formatDate(checkin, 'DD')}</h1>
                <h2>{formatDate(checkin, 'ddd')}</h2>
            </div>
            <div className={styles.rowSubContainer}>
                <div className={styles.rowItem}>
                    <ArrowIn className={styles.icon}/>
                    <h1>{formatDate(checkin, 'LT')}</h1>
                </div>
                <div className={styles.rowItem}>
                    <ArrowOut className={styles.icon}/>
                    <h1>{formatDate(checkout, 'LT')}</h1>
                </div>
            </div>
            <div className={styles.rowItem}>
                <h3>{formatInterval(workinterval)}</h3>
            </div>
            <div className={styles.rowItem}>
                <h3 style={{color: '#0DB714'}}>
                    {overtimeinterval ? '+' + formatInterval(overtimeinterval) : '+00t 00m'}
                </h3>
            </div>
        </div>
    )
}

export default ClockHistoryRow;