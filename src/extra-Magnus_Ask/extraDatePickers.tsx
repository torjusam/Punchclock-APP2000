/**
 * @file for setting up an alternative datepickers which can support four individual datepickers
 * @module Extra
 * @author Magnus A, Torjus A.M
 * @editor Ask I.P.A
 */

import styles from "../features/CRUD-page-features/components/createShift/createShift.module.css";
import DatePicker from "react-datepicker";
import React,{Dispatch, FC, SetStateAction} from "react";
import Employee from "../utils/employee";
import "react-datepicker/dist/react-datepicker.css";

interface pickersProps {
    employee?: Employee;
    start: Date;
    end: Date;
    startDato: string;
    sluttDato: string;
    setStart: (date: Date) => void;
    setEnd: (date: Date) => void;
    setStartDato: Dispatch<SetStateAction<string>>;
    setSluttDato: Dispatch<SetStateAction<string>>;
}

const ExtraPickers: FC<pickersProps> = ({
                                               start,
                                               end,
                                               startDato,
                                               sluttDato,
                                               setStart,
                                               setEnd,
                                               setStartDato,
                                               setSluttDato,
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
                        name = "startDato"
                        value = {startDato}
                        onChange={(event) => setStartDato(event.target.value)}/>
            </div>
            <div className={styles.contentContainer} style={{marginLeft: '0.4rem'}}>
                <h2>Ny Utstempling</h2>
                <input className={styles.datePickerField}
                        name = "sluttDato"
                        value = {sluttDato}
                        onChange={(event) => setSluttDato(event.target.value)}/>
            </div>
        </div>
    </div>
    );
};

export default ExtraPickers;