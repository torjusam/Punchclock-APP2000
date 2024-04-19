/**
 * @file Responsible for setting up table, the header, and rendering the rows.
 * @module ClockHistory
 * @memberof EmployeePage
 * @author Torjus A.M, Thomas H
 */
import React, {FC} from 'react';
import useClockHistory from "../../hooks/useClockHistory";
import ClockHistoryRow from "./clockHistoryRow";
import LoadingRows from "./clockHistoryRowLoading";
import styles from './clockHistoryTable.module.css';

const ClockHistoryTable: FC = () => {
    const {clockHistoryData, isLoading} = useClockHistory();

    if (isLoading)
        return <LoadingRows/>;

    return (
        <div className={styles.tableContainer}>
            {/* Table header row */}
            <div className={`${styles.tableRow} ${styles.heading}`}>
                <div className={styles.rowItem}>Dato</div>
                <div className={styles.rowItem}>Stempling</div>
                <div className={styles.rowItem}>Arbeidstid</div>
                <div className={`${styles.rowItem}`} style={{color: '#0DB714'}}>Saldo</div>
            </div>
            {/* Map over the data and render rows with it */}
            {clockHistoryData.map((data) => (
                <ClockHistoryRow
                    key={data.id}
                    clockHistoryData={data}
                />
            ))}
        </div>
    );
};
export default ClockHistoryTable;