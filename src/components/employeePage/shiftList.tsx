import React, { useEffect, FC } from 'react';
import { Employee } from '../../lib/employee';
import Shifts from '../../assets/shifts.svg';
import Expand from '../../assets/expand.svg'
import styles from './employeePageLayout.module.css';

interface ShiftListProps {
    employee: Employee;
}

// Temp data, bytt med reell data fra backend
const tempData = [
    {id: '1', date: '19', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00'},
    {id: '2', date: '20', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00'},
    {id: '3', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00'},
    {id: '4', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00'},
    {id: '4', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00'},
    {id: '4', date: '21', dayOfWeek: 'Man', startTime: '16:00', endTime: '19:00'},
]

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
                {shifts.map((shift) => (
                  <div key={shift.id} className={styles.shiftItem}>
                    <div className={styles.shiftDateContainer}>
                        <div className={styles.shiftDate}>{shift.date}</div>
                        <div className={styles.dayOfWeek}>{shift.dayOfWeek}</div>
                    </div>
                    <div className={styles.shiftTime}>{`${shift.startTime} - ${shift.endTime}`}</div>
                    <div className={styles.shiftExpandIcon}>
                        <Expand className={styles.expandIcon}/>
                   </div>
              </div>
            ))}
        </div>
    </div>
   );
};

export default ShiftList;