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
import {useSelectedEmployeeContext} from "../../../../context/selectedEmployeeContext";

interface ClockHistoryTableProps {
    employee?: Employee;
}

const ClockHistoryTable: FC<ClockHistoryTableProps> = ({employee}) => {
    const {selectedEmployee} = useSelectedEmployeeContext();
    /* Either use the employee passed as a prop, or use the
    selectedEmployee from context. This is so the extra-page can use the table */
    const employeeToUse = employee || selectedEmployee;
    const {clockHistoryData, isLoading} = useClockHistory(employeeToUse);

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