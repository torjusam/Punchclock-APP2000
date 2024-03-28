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
                <div className={styles.contentContainer}>
                    <h2>Beskrivelse</h2>
                    <input
                        className={styles.contentField}
                        name="description"
                        type="text"
                        maxLength={254}
                        disabled={isDisabled}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
            </Form>
        </Formik>
    );
};

export default DescriptionForm;