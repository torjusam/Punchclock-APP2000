/**
 * @file Copied from original component and altered to edit existing shift.
 * @description original component: .src/features/CRUD-page-features/components/createShift/index.tsx
 * @module Extra
 * @author Torjus A.M
 * @Editors Magnus A, Ask I.P.A
 */
import React, {FC, useEffect, useState} from 'react';
import {addDays} from 'date-fns';
import {registerLocale} from "react-datepicker";
import {nb} from 'date-fns/locale/nb';
import Employee from "../utils/employee";
import ExtraPickers from './extraDatePickers';
import EditShiftButton from './extraEditShiftButton';
import styles from '../features/CRUD-page-features/components/createShift/createShift.module.css';
//import EditShiftButton from './extraEditShiftButton';
// Norwegian bokmål locale for datepicker
registerLocale('nb', nb)

interface changeShiftProps {
    employee?: Employee;
}

const ExtraEditShift: FC<changeShiftProps> = ({employee}) => {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(addDays(new Date(), 1));
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <div className={styles.container}>
            <h1>Endre Stemplinger</h1>
            <h2>{employee ? `For ${employee.name}` : 'Velg en ansatt'}</h2>
            {/* Displays error message if it exists */}
            {errorMsg &&
                <div className={styles.errorMsg}>
                    <h2>
                        <span className={styles.strongText}>Feil - </span>{errorMsg}
                    </h2>
                </div>}
            <ExtraPickers
                start={start}
                end={end}
                setStart={setStart}
                setEnd={setEnd}
            />
            <EditShiftButton
                start={start}
                end={end}
                nySlDato='nySlDato'
                nyStDato='nyStDato'
                setErrorMsg={setErrorMsg}/>
        </div>
    );
};

export default ExtraEditShift;