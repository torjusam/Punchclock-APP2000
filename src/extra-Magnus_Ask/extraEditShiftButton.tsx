/**
 * @file that creates button to edit shifts according to inputs in extraEditShift
 * @module Extra 
 * @author Torjus A.
 * @editor Magnus A.
 */

import React, {FC} from 'react';
import moment from "moment/moment";
import Employee from "../utils/employee";
import {toast} from "react-toastify";
import styles from "../features/CRUD-page-features/components/createShift/createShift.module.css";
import {clockChange} from '../features/clock-operation/services/extras/clockChange';

interface EditShiftButtonProps {
    employee?: Employee;
    start: Date;
    end: Date;
    startDato: string;
    sluttDato: string;
    setErrorMsg: (errorMsg: string) => void;
}

const EditShiftButton: FC<EditShiftButtonProps> = ({
                                                           employee,
                                                           start,
                                                           end,
                                                           setErrorMsg,
                                                           startDato,
                                                           sluttDato
                                                       }) => {

    const extraOnClick = async () => {
        try {
            const nyStempling = new Date(startDato);
            const nyUtstempling = new Date(sluttDato);

            await clockChange(employee, start, end, nyStempling, nyUtstempling);

            toast.success(`
                Endret stempling for ${employee.name}, 
                ny stempling er ${moment(nyStempling).format('LTS')} - ${moment(nyUtstempling).format('LTS')} 
                den ${moment(start).format('DD.MM')}
                `, {
                    autoClose: 10000
                }
            );
        } catch (error) {
            setErrorMsg(error.message);
        }
    };


    return (
        <button
            className={styles.createShiftBtn}
            onClick={extraOnClick}>
            Endre stempling
        </button>
    );
};
 export default EditShiftButton;