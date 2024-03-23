// Author: Thomas H (Edited: Torjus A.M)
import React, { useEffect, FC } from 'react';
import { Employee } from '../../lib/employee';
import Shifts from '../../assets/shifts.svg';
import Expand from '../../assets/expand.svg'
import styles from './shiftList.module.css';
import layout from './employeePageLayout.module.css';
import moment from 'moment';
import 'moment/locale/nb';
moment.locale('nb');

interface ShiftListProps {
    employee: Employee;
}

// Temp data, bytt med reell data fra backend
const shifts = [
    { id: '1', startTime: new Date(2022, 1, 1, 16, 0), endTime: new Date(2022, 1, 1, 19, 0) },
{ id: '2', startTime: new Date(2022, 1, 2, 16, 0), endTime: new Date(2022, 1, 2, 19, 0) },
    { id: '3', startTime: new Date(2022, 1, 3, 16, 0), endTime: new Date(2022, 1, 3, 19, 0) },
    { id: '4', startTime: new Date(2022, 1, 4, 16, 0), endTime: new Date(2022, 1, 4, 19, 0) },
    { id: '5', startTime: new Date(2022, 1, 5, 16, 0), endTime: new Date(2022, 1, 5, 19, 0) },
    { id: '6', startTime: new Date(2022, 1, 6, 16, 0), endTime: new Date(2022, 1, 6, 19, 0) },
];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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


    const isLoading = false;
    const renderRows = () => {
        if (isLoading || !shifts) {
            // return renderLoading();
        }

        return shifts.map((shift, i) => (
            <div key={shift.id} className={styles.shiftItem}>
                <div className={styles.shiftDateContainer}>
                    <h1>{moment(shift.startTime).format('DD')}</h1>
                    <h2>{moment(shift.startTime).format('ddd')}</h2>
                </div>
            </div>
        ));
    };

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
                    <div key={shift.id} className={styles.shiftItemContainer}>
                        <div className={styles.shiftDateContainer}>
                            <h1>{moment(shift.startTime).format('DD')}</h1>
                            <h2>{moment(shift.startTime).format('ddd')}</h2>
                        </div>
                        <div className={styles.shiftItem}>
                            <div className={styles.shiftTime}>
                                {`${moment(shift.startTime).format('LT')} - ${moment(shift.endTime).format('LT')}`}
                            </div>
                            <div className={styles.shiftExpandIcon}>
                                <Expand className={styles.expandIcon} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShiftList;