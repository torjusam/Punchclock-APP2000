/**
 * @file Root for creating a shift. Defines the layout and defines shared states for the child components.
 * @module CrudPage
 * @author Torjus A.M, Thomas H
 */
import React, {FC, useEffect, useState} from 'react';
import {addDays} from 'date-fns';
import {registerLocale} from "react-datepicker";
import {nb} from 'date-fns/locale/nb';
import Employee from "../../../../utils/employee";
import CreateShiftButton from "./createShiftBtn";
import DatePickers from "./datePickers";
import DescriptionForm from "./descriptionForm";
import styles from "./createShift.module.css";
// Norwegian bokmål locale for datepicker
registerLocale('nb', nb)

interface createShiftProps {
    employee?: Employee;
}

const CreateShift: FC<createShiftProps> = ({employee}) => {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(addDays(new Date(), 1));
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(!employee);
    }, [employee]);

    return (
        <div className={styles.container}>
            <h1>Opprett vakt</h1>
            <h2>{employee ? `For ${employee.name}` : 'Velg en ansatt'}</h2>
            {/* Displays error message if it exists */}
            {errorMsg &&
                <div className={styles.errorMsg}>
                    <h2>
                        <span className={styles.strongText}>Feil - </span>{errorMsg}
                    </h2>
                </div>}
            <DatePickers
                isDisabled={isDisabled}
                start={start}
                end={end}
                setStart={setStart}
                setEnd={setEnd}
            />
            <DescriptionForm
                isDisabled={isDisabled}
                setErrorMsg={setErrorMsg}
                description={description}
                setDescription={setDescription}
            />
            <CreateShiftButton
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                employee={employee}
                start={start}
                end={end}
                description={description}
                setErrorMsg={setErrorMsg}
            />
        </div>
    );
};

export default CreateShift;