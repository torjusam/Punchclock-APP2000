// Displays the list of shifts. Maps over the emplyoees shifts, then uses the shiftCard component to display each shift.
import React, {FC} from 'react';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import {groupShiftsByMonth, sortMonths} from "../services/sortShifts";
import ShiftCard from "./shiftCard";
import useShifts from "../hooks/useShifts";
import NoShifts from "./noShifts";
import Loading from "./shiftListLoading";
import styles from './shiftList.module.css';

const RenderShiftList: FC = () => {
    const {selectedEmployee} = useSelectedEmployeeContext();
    const {shifts, isLoading} = useShifts(selectedEmployee);

    if (isLoading)
        return <Loading/>

    else if (!shifts || shifts.length === 0)
        return <NoShifts/>

    const shiftsByMonth = groupShiftsByMonth(shifts);
    const sortedMonths = sortMonths(shiftsByMonth);

    return (
        <>
            {/* Separate by month, with a separator showing month in text */}
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
                        <ShiftCard
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