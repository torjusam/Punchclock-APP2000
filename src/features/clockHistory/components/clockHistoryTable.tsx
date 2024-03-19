/*
    Author: Torjus A.M
    Component that generates rows for the table of employees clock history.
*/
import React, { FC } from 'react';
import ArrowIn from '../../../assets//arrowIn.svg';
import ArrowOut from '../../../assets//arrowOut.svg';
import { ClockHistoryData } from '../../../lib/types';
import { formatInterval } from '../services/formatInterval';
import styles from './clockHistory.module.css';
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface ClockHistoryTableProps {
    data: Array<ClockHistoryData>;
    isLoading: boolean;
}

const ClockHistoryTable: FC<ClockHistoryTableProps> = ({ data, isLoading }) => {

    const renderLoadingRows = () => {
        let rows = [];
        for (let i = 0; i < 7; i++) {
            rows.push(
                <div key={i} className={styles.tableRow}>
                    <div className={`${styles.rowItem} ${styles.date}`}>
                        <div className={styles.loading}></div>
                        <div className={styles.loading}></div>
                    </div>
                    <div className={styles.rowSubContainer}>
                        <div className={styles.rowItem}>
                            <div className={styles.icon} />
                            <h1>-</h1>
                        </div>
                        <div className={styles.rowItem}>
                            <div className={styles.icon} />
                            <h1>-</h1>
                        </div>
                    </div>
                    <div className={styles.rowItem}> -- </div>
                    <div className={styles.rowItem}> -- </div>
                </div>
            );
        }
        return rows;
    };
    // Renders 7 rows.
    const renderRows = () => {
        if (isLoading || !data) {
            return renderLoadingRows();
        }
        console.log(data);
        return data.map((entry, i) => (
            <div key={i} className={styles.tableRow}>
                <div className={`${styles.rowItem} ${styles.date}`}>
                    <h1>{moment(entry.checkin).format('DD')}</h1>
                    <h2>{moment(entry.checkin).format('ddd')}</h2>
                </div>
                <div className={styles.rowSubContainer}>
                    <div className={styles.rowItem}>
                        <ArrowIn className={styles.icon} />
                        <h1>{moment(entry.checkin).format('LT')}</h1>
                    </div>
                    <div className={styles.rowItem}>
                        <ArrowOut className={styles.icon} />
                        <h1>{entry.checkout ? moment(entry.checkout).format('LT') : '-'}</h1>
                    </div>
                </div>
                <div className={styles.rowItem}>
                    <h3>{formatInterval(entry.workinterval)}</h3>
                </div>
                <div className={styles.rowItem}>
                    <h3 style={{ color: '#0DB714' }}>{entry.overtimeinterval ? formatInterval(entry.overtimeinterval) : '+00t 00m'}</h3>
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={`${styles.tableRow} ${styles.heading}`}>
                    <div className={styles.rowItem}>Dato</div>
                    <div className={styles.rowItem}>Stempling</div>
                    <div className={styles.rowItem}>Arbeidstid</div>
                    <div className={`${styles.rowItem}`} style={{ color: '#0DB714' }}>Saldo</div>
                </div>
                {renderRows()}
            </div>
        </>
    );
};

export default ClockHistoryTable;