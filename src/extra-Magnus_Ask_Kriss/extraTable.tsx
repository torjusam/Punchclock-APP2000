/**
 * @file Copied from original component and altered to remove two columns, and use the altered row item component.
 * @description original component: .src/features/clockHistory/components/clockHistoryTable/index.tsx
 * @module Extra
 * @Author Torjus A.M, Thomas H
 * @Editor Magnus A, Ask I.P.A
 */
import React, {FC} from 'react';
import useClockHistory from '../features/clockHistory/hooks/useClockHistory';
import Employee from "../lib/types/employee";
import LoadingRows from '../features/clockHistory/components/clockHistoryTable/clockHistoryRowLoading';
import styles from '../features/clockHistory/components/clockHistoryTable/clockHistoryTable.module.css';
import ExtraTableRow from './extraTableRow';

interface ClockHistoryTableProps {
    employee?: Employee;
}

const ExtraTable: FC<ClockHistoryTableProps> = ({employee}) => {
    const {clockHistoryData, isLoading} = useClockHistory();

    return (
        <div className={styles.tableContainer}>
            <div className={`${styles.tableRow} ${styles.heading}`}>
                <div className={styles.rowItem}>Dato</div>
                <div className={styles.rowItem}>Stempling</div>
                {/*<div className={styles.rowItem}>Arbeidstid</div>
                <div className={`${styles.rowItem}`} style={{color: '#0DB714'}}>Saldo</div>*/}
            </div>
            {/* Either loadingRows, or map over the data and render rows with it */}
            {isLoading ? <LoadingRows/> :
                clockHistoryData.map((data) => (
                    <ExtraTableRow
                        key={data.id}
                        clockHistoryData={data}
                    />
                ))
            }
        </div>
    );
};

export default ExtraTable;