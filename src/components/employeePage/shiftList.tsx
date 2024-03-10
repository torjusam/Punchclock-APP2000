import React, { useEffect, FC } from 'react';
import { Employee } from '../../lib/employee';
import Shifts from '../../lib/assets/svg/shifts.svg';
import Expand from '../../lib/assets/svg/expand.svg'
import styles from './employeePageLayout.module.css';

interface ShiftListProps {
    employee: Employee;
}

const ShiftList: FC<ShiftListProps> = ({ employee }) => {

    useEffect(() => {
        // Add your code here
        // This code will run when the component mounts

        return () => {
            // Add your cleanup code here
            // This code will run when the component unmounts
        };
    }, []);

    return (
        <div className={styles.module}>
            <div className={styles.moduleHeader}>
                <div className={`${styles.iconContainer}`} style={{ padding: '0.57em' }}>
                    <Shifts className={styles.icon} />
                </div>
                <h1 className={styles.headerText}>Vaktliste</h1>
                <Expand className={styles.expandIcon}/>
            </div>
            <div className={styles.monthContainer}>
                <hr />
                <h2 className={styles.monthText}>Feb 2024</h2>
                <hr />
            </div>
            <div className={styles.moduleContent}>
                <h1>Put content here</h1>
            </div>
        </div>
    );
};

export default ShiftList;