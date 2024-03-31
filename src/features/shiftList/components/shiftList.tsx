/*
    Author: Torjus A.M, Thomas H
    Responsible for displaying the shifts of a specific employee.
    Defines the layout of the headers, then maps over the shifts themselves, groups them by month
    and displays them in a list.
*/
import React, {FC} from 'react';
import {Employee} from '../../../lib/types/employee';
import styles from './shiftList.module.css';
import 'moment/locale/nb';
import useShifts from "../../../hooks/useShifts";
import ShiftDisplay from "./shiftCard";
import {groupShiftsByMonth, sortMonths} from "../services/sortShifts";
import NoShifts from "./noShifts";
import '@fontsource/lato';
import Loading from "./shiftListLoading";

interface RenderShiftListProps {
    employee: Employee;
}

const RenderShiftList: FC<RenderShiftListProps> = ({employee}) => {
    const {shifts, isLoading} = useShifts(employee);

    if (isLoading)
        return <Loading/>

    else if (!shifts || shifts.length === 0)
        return <NoShifts/>

    const shiftsByMonth = groupShiftsByMonth(shifts);
    const sortedMonths = sortMonths(shiftsByMonth);

    return (
        <>
            {sortedMonths.map(month => (
                <div key={month} style={{paddingBottom: '0.5rem'}}>
                    <div className={styles.monthContainer}>
                        <hr/>
                        <h2 className={styles.monthText}>
                            {month.charAt(0).toUpperCase() + month.slice(1)}
                        </h2>
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
            }
        </>
    );
};

export default RenderShiftList;