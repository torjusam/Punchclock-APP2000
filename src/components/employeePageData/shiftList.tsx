/*
    Author: Torjus A.M, Thomas H
    Responsible for displaying the shifts of a specific employee.
    Defines the layout of the headers, then maps over the shifts themselves, groups them by month
    and displays them in a list.
*/
import React, {FC} from 'react';
import {Employee} from '../../lib/employee';
import Shifts from '../../assets/shifts.svg';
import Expand from '../../assets/expand.svg'
import styles from './shiftList.module.css';
import layout from './employeePageLayout.module.css';
import moment from 'moment';
import 'moment/locale/nb';
import useShifts from "../../hooks/useShifts";
import ShiftDisplay from "./shiftDisplay";
import {Shift} from "../../lib/types/types";

moment.locale('nb');

interface ShiftListProps {
    employee: Employee;
}

// Capitalize the first letter of the months
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ShiftList: FC<ShiftListProps> = ({employee}) => {
    const {shifts, isLoading} = useShifts(employee);

    // Group shifts by month
    const shiftsByMonth: { [month: string]: Shift[] } = {};
    if (shifts) {
        shifts.forEach(shift => {
            const monthYear = moment(shift.start).format('MMM YYYY');
            if (!shiftsByMonth[monthYear]) {
                shiftsByMonth[monthYear] = [];
            }
            shiftsByMonth[monthYear].push(shift);
        });
    }

    return (
        <div className={`${layout.module} ${styles.module}`}>
            <div className={`${layout.moduleHeader} ${styles.moduleHeader}`}>
                <div className={`${layout.iconContainer}`} style={{padding: '0.57em'}}>
                    <Shifts className={layout.icon}/>
                </div>
                <h1>Vaktliste</h1>
                <Expand className={styles.expandIcon}/>
            </div>
            <div className={styles.moduleContent}>
                {isLoading ? (
                    // Display loading indicator while isLoading is true
                    <div>Loading...</div>
                ) : (
                    Object.keys(shiftsByMonth).map(month => (
                        <div key={month}>
                            <div className={styles.monthContainer}>
                                <hr/>
                                <h2 className={styles.monthText}>{capitalizeFirstLetter(month)}</h2>
                                <hr/>
                            </div>
                            {shiftsByMonth[month].map((shift) => (
                                <ShiftDisplay
                                    key={shift.id}
                                    shift={shift}
                                />
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShiftList;