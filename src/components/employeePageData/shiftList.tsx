// Author: Thomas H (Edited: Torjus A.M)
import React, { useEffect, FC } from 'react';
import { Employee } from '../../lib/employee';
import Shifts from '../../assets/shifts.svg';
import Expand from '../../assets/expand.svg'
import styles from './shiftList.module.css';
import layout from './employeePageLayout.module.css';
import moment from 'moment';

moment.locale('nb');

interface ShiftListProps {
    employee: Employee;
}

// Temp data, bytt med reell data fra backend
const tempData = [
    { id: '1', date: '19', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00' },
    { id: '2', date: '20', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00' },
    { id: '3', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00' },
    { id: '4', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00' },
    { id: '4', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00' },
    { id: '4', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00' },
]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ShiftList: FC<ShiftListProps> = ({ employee }) => {
    const shifts = tempData; // Bytt med reell data

    useEffect(() => {
        // Add your code here
        // This code will run when the component mounts

        return () => {
            // Add your cleanup code here
            // This code will run when the component unmounts
        };
    }, []);

    return (
        <div className={`${layout.module} ${styles.module}`}>
            <div className={`${layout.moduleHeader} ${styles.moduleHeader}`}>
                <div className={`${layout.iconContainer}`} style={{ padding: '0.57em' }}>
                    <Shifts className={layout.icon} />
                </div>
                <h1>Vaktliste</h1>
                <Expand className={styles.expandIcon} />
            </div>
            <div className={styles.monthContainer}>
                <hr />
                <h2 className={styles.monthText}>{capitalizeFirstLetter(moment().format('MMM YYYY'))}</h2>
                <hr />
            </div>
            <div className={`${layout.moduleContent} ${styles.moduleContent}`}>
                {shifts.map((shift) => (
                    <div key={shift.id} className={styles.shiftItem}>
                        <div className={styles.shiftDateContainer}>
                            <div className={styles.shiftDate}>{shift.date}</div>
                            <div className={styles.dayOfWeek}>{shift.dayOfWeek}</div>
                        </div>
                        <div className={styles.shiftTime}>{`${shift.startTime} - ${shift.endTime}`}</div>
                        <div className={styles.shiftExpandIcon}>
                            <Expand className={styles.expandIcon} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShiftList;