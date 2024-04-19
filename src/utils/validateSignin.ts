/**
 * @file Validate function for the signin-form.
 * @module Authentication
 * @author Torjus A.M, Thomas H
 */
import {FormikErrors} from 'formik';

export interface FormValues {
    email: string;
    password: string;
}

/**
 * @function login_validate
 * @description Validates the signin-form. It checks if the email and password fields are not empty and if they meet the required conditions.
 * If a field does not meet the conditions, an error message is assigned to that field in the errors object.
 * @param {FormValues} values - The values of the form fields.
 * @returns {FormikErrors<FormValues>} An object containing error messages for the form fields that do not meet the required conditions.
 */
export default function login_validate(values: FormValues) {
    let errors: FormikErrors<FormValues> = {};

    if (!values.email) {
        errors.email = 'Required';
        // Needs to include a @ and . to be a valid mail
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.includes(" ")) {
        errors.password = 'Invalid password';
    }

    return errors;
}