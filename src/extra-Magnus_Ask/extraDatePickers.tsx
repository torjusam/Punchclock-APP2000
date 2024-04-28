/**
 * @file for setting up an alternative datepickers which can support four individual datepickers
 * @module Extra
 * @author Magnus A, Torjus A.M
 * @editor Ask I.P.A
 */

import styles from "../features/CRUD-page-features/components/createShift/createShift.module.css";
import DatePicker from "react-datepicker";
import React, {FC} from "react";
import Employee from "../utils/employee";
import "react-datepicker/dist/react-datepicker.css";

interface pickersProps {
    employee?: Employee;
    start: Date;
    end: Date;
    setStart: (date: Date) => void;
    setEnd: (date: Date) => void;
}

const ExtraPickers: FC<pickersProps> = ({
                                               start,
                                               end,
                                               setStart,
                                               setEnd,
                                           }) => {
    return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className={styles.contentContainer} style={{marginRight: '0.4rem'}}>
                <h2>Nåværende Innstempling</h2>
                <DatePicker
                    className={styles.datePickerField}
                    locale="nb"
                    selected={start}
                    onChange={date => setStart(date)}
                    showTimeSelect
                    shouldCloseOnSelect={true}
                    dateFormat="yyyy-MM-d, HH:mm"/>
            </div>
            <div className={styles.contentContainer} style={{marginLeft: '0.4rem'}}>
                <h2>Nåværende Utstempling</h2>
                <DatePicker
                    className={styles.datePickerField}
                    locale="nb"
                    selected={end}
                    onChange={date => setEnd(date)}
                    shouldCloseOnSelect={true}
                    showTimeSelect
                    dateFormat="yyyy-MM-d, HH:mm"/>
            </div>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className={styles.contentContainer} style={{marginRight: '0.4rem'}}>
                <h2>Ny Innstempling</h2>
                <input className={styles.datePickerField}
                        name = "nyStDato"/>
            </div>
            <div className={styles.contentContainer} style={{marginLeft: '0.4rem'}}>
                <h2>Ny Utstempling</h2>
                <input className={styles.datePickerField}
                        name = "nySlDato"/>
            </div>
        </div>
    </div>
    );
};

export default ExtraPickers;