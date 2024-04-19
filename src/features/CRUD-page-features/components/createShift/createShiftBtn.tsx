/*
    Author: Torjus A.M
    Responsible for rendering the button, and handling the onClick event.
*/
import React, {FC} from 'react';
import styles from "./createShift.module.css";
import {setShift} from "../../services/performSetShift";
import {toast} from "react-toastify";
import moment from "moment/moment";
import Employee from "../../../../lib/types/employee";

interface CreateShiftButtonProps {
    employee?: Employee;
    isDisabled: boolean;
    setIsDisabled: (isDisabled: boolean) => void;
    start: Date;
    end: Date;
    description: string;
    setErrorMsg: (errorMsg: string) => void;
}

const CreateShiftButton: FC<CreateShiftButtonProps> = ({
                                                           isDisabled,
                                                           setIsDisabled,
                                                           employee,
                                                           start,
                                                           end,
                                                           setErrorMsg,
                                                           description
                                                       }) => {

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
        <button
            className={styles.createShiftBtn}
            onClick={onClick}
            disabled={isDisabled}>
            Opprett vakt
        </button>
    );
};

export default CreateShiftButton;