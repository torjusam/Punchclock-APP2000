import {FormikErrors} from 'formik';

export interface FormValues {
    email: string;
    password: string;
}

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