/*
    Author: Torjus A.M
    Component for displaying the date picker for start and end dates of the shift.
    Uses react-datepicker library.
*/
import styles from "./createShift.module.css";
import DatePicker from "react-datepicker";
import {addDays, addHours} from "date-fns";
import React, {FC} from "react";
import {Employee} from "../../../../lib/employee";
import "react-datepicker/dist/react-datepicker.css";

interface datePickersProps {
    employee?: Employee;
    isDisabled: boolean;
    start: Date;
    end: Date;
    setStart: (date: Date) => void;
    setEnd: (date: Date) => void;
    onClick: () => void;
}

const DatePickers: FC<datePickersProps> = ({
                                               isDisabled,
                                               start,
                                               end,
                                               setStart,
                                               setEnd,
                                           }) => {
    return (
        <>
            <div className={styles.datePickerContainer}>
                <h2>Start</h2>
                <DatePicker
                    locale="nb"
                    selected={start}
                    onChange={date => setStart(date)}
                    showTimeSelect
                    shouldCloseOnSelect={true}
                    disabled={isDisabled}/>
            </div>
            <div className={styles.datePickerContainer}>
                <h2>Slutt</h2>
                <DatePicker
                    locale="nb"
                    selected={end}
                    onChange={date => setEnd(date)}
                    minDate={addHours(start, 1)}
                    maxDate={addDays(start, 2)}
                    shouldCloseOnSelect={true}
                    showTimeSelect
                    disabled={isDisabled}/>
            </div>
        </>
    );
};

export default DatePickers;