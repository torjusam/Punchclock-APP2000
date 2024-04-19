/**
 * @file This component is responsible for rendering the button, and handling the onClick event.
 * @module CrudPage
 * @author Torjus A.M
 */
import React, {FC} from 'react';
import moment from "moment/moment";
import Employee from "../../../../utils/employee";
import {setShift} from "../../services/performSetShift";
import {toast} from "react-toastify";
import styles from "./createShift.module.css";

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
    /**
     * @function onClick
     * @description This function is called when the button is clicked. It sets the disabled state of the button to true,
     * creates the shift, and then sets the disabled state of the button back to false. If an error occurs while creating
     * the shift, it sets the error message.
     */
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