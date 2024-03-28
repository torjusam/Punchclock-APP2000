/*
    Author: Torjus A.M
    The form for description. Uses formik library.
    Has a limit of 254, because the DB field is VARCHAR(255)
*/
import React, {Dispatch, FC, SetStateAction} from "react";
import {Formik, Form} from 'formik';
import styles from './createShift.module.css'

interface DescriptionFormProps {
    isDisabled: boolean,
    setErrorMsg: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>,
}

const DescriptionForm: FC<DescriptionFormProps> = ({
                                                       isDisabled,
                                                       description,
                                                       setDescription,
                                                   }) => {
    return (
        <Formik
            initialValues={{description: description}}
            onSubmit={async (values) => {
                setDescription(values.description);
            }}
        >
            <Form>
                <div className={isDisabled ? styles.container : styles.containerDisabled}>
                    <div className={styles.textFieldContainer}>
                        <label>
                            <h2>Description</h2>
                            <input
                                name="description"
                                type="text"
                                maxLength={254}
                                disabled={isDisabled}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default DescriptionForm;