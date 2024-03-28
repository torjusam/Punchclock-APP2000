/*
    Author: Torjus A.M
    Parent component responsible for putting together the module for creating shifts.
    Sets up shared states passed down to each child and puts together child components.
*/
import React, {FC, useEffect, useState} from 'react';
import {addDays} from 'date-fns';
import {registerLocale} from "react-datepicker";
import {nb} from 'date-fns/locale/nb';
import {Employee} from "../../../../lib/employee";
import {setShift} from "../../services/performSetShift";
import {toast} from 'react-toastify';
import moment from "moment";
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
        if (employee) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [employee]);
    const onClick = async () => {
        try {
            setIsDisabled(true);
            await setShift(employee, description, start, end, setErrorMsg);

            toast.success(`
                Opprettet skift for ${employee.name}, 
                fra ${moment(start).format('LTS')} - ${moment(end).format('LTS')} 
                den ${moment(start).format('DD.MM')}
                `, {
                    autoClose: 10000
                }
            );
        } catch (error) {
            setErrorMsg(error.message);
        }
        setIsDisabled(false);
    };

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
                onClick={onClick}
            />
            <DescriptionForm
                isDisabled={isDisabled}
                setErrorMsg={setErrorMsg}
                description={description}
                setDescription={setDescription}
            />
            <button
                className={styles.createShiftBtn}
                onClick={onClick}
                disabled={isDisabled}>
                Opprett vakt
            </button>
        </div>
    );
};

export default CreateShift;