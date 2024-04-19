/**
 * @file Component for displaying the description field for the shift.
 * @module CrudPage
 * @description Uses formik library for improved data validation before submitting.
 * @author Torjus A.M
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