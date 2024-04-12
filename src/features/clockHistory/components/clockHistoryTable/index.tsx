/*
    Author: Torjus A.M, Thomas H
    Main file for the clock-history table. Responsible for setting up the header, and rendering the rows.
*/
import React, {FC} from 'react';
import useClockHistory from "../../hooks/useClockHistory";
import {Employee} from "../../../../lib/types/employee";
import ClockHistoryRow from "./clockHistoryRow";
import LoadingRows from "./clockHistoryRowLoading";
import styles from './clockHistoryTable.module.css';

interface ClockHistoryTableProps {
    employee: Employee;
}

const ClockHistoryTable: FC<ClockHistoryTableProps> = ({employee}) => {
    const {clockHistoryData, isLoading} = useClockHistory(employee);

    return (
        <div className={styles.tableContainer}>
            {/* Table header row */}
            <div className={`${styles.tableRow} ${styles.heading}`}>
                <div className={styles.rowItem}>Dato</div>
                <div className={styles.rowItem}>Stempling</div>
                <div className={styles.rowItem}>Arbeidstid</div>
                <div className={`${styles.rowItem}`} style={{color: '#0DB714'}}>Saldo</div>
            </div>
            {/* Either loadingRows, or map over the data and render rows with it */}
            {isLoading ? <LoadingRows/> :
                clockHistoryData.map((data) => (
                    <ClockHistoryRow
                        key={data.id}
                        clockHistoryData={data}
                    />
                ))
            }
        </div>
    );
};

export default ClockHistoryTable;