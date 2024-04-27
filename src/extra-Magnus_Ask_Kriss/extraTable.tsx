/**
 * @file Copied from original component and altered to present a table only displaying information relevant to extraEditShift.
 * @description original component: .src/features/clockHistory/components/clockHistoryTable/index.tsx
 * @module Extra
 * @author Torjus A.M, Thomas H
 * @Editor Magnus A, Ask I.P.A
 */
import React, {FC} from 'react';
import useClockHistory from '../features/clockHistory/hooks/useClockHistory';
import Employee from "../utils/employee";
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
                <div className={styles.rowItem}>Utstempling</div>
            </div>
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