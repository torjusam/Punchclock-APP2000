/*
    Author: Torjus A.M, Thomas H, Magnus A, Ask I.P.A
    This component is responsible for rendering a single row in the clock-history table.
    It receives a clockHistoryData object as a prop, which contains information about the check-in and check-out times,
    the work interval, and the overtime interval for a specific date.
    This data is then formatted and displayed in the appropriate columns of the row.
*/

import React from 'react';
/*import ArrowIn from '../../../../assets/arrowIn.svg';
import ArrowOut from '../../../../assets/arrowOut.svg';*/
import {formatInterval} from '../features/clockHistory/services/formatInterval';
import {ClockHistoryData} from '../lib/types/types'
import moment from 'moment';
import styles from './extra.module.css';

interface ClockHistoryRowProps {
    clockHistoryData: ClockHistoryData;
}

const ExtraTableRow = ({clockHistoryData}: ClockHistoryRowProps) => {
    // Destructs the object to get the specific values
    const {checkin, checkout} = clockHistoryData;

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