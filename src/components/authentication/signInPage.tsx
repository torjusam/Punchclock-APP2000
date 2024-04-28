/**
 * @file This is the signin page for the application. Redirects to this page if the user is not authenticated.
 * @module Authentication
 * @description Formik library is used for form handling to simplify form management and validation.
 * @author Torjus A.M, Ask I.P.A
 */
import React, {FC, useState} from 'react'
import {signIn} from 'next-auth/react'
import {useFormik} from 'formik';
import login_validate from "../../utils/validateSignin"
import styles from './signInPage.module.css'
import {toast} from "react-toastify";

const SignInForm: FC = () => {
    // Status text for displaying error messages
    const [statusText, setStatusText] = useState('')

    // Define formik hook
    const formik = useFormik({
        initialValues: {email: "", password: ""},
        /**
         * Function to handle form submission.
         * @description Authenticates users using custom implementation of NextAuth's signIn function for credentials-provider.
         * Details, refer to: .pages/api/auth/[...nextauth].ts
         *
         * @param {object} values Form values containing email and password.
         * @author Torjus A.M
         */
        onSubmit: async (values) => {
            try {
                // Next-auth signIn function
                const result = await signIn(
                    "credentials", {...values, redirect: false}
                );
                // If sign in is successful, redirect to the home page, otherwise display an error message
                result.ok ? window.location.replace('/') : setStatusText(result.error);
            } catch (error) {
                setStatusText(error.message);
                toast.error(error.message);
            }
        },
        validate: login_validate
    });

    // Author: Ask I.P.A
    return (
        <div className={styles.outerContainer}>
            <div className={styles.formContainer}>
                <h1>Logg inn</h1>
                {/* Display error message if there is one */}
                {statusText &&
                    <div className={styles.errorMsg}>
                        <h2>
                            <span className={styles.strongText}>Feil -</span>{statusText}
                        </h2>
                    </div>}
                {/* Formik form */}
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputGroup}>
                        <h2>Brukernavn</h2>
                        <input
                            type="email" {...formik.getFieldProps('email')}
                            required
                            style={{
                                borderColor: formik.errors.email && formik.touched.email ? 'red' : undefined
                            }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <h2>Passord</h2>
                        <input
                            type="password" {...formik.getFieldProps('password')}
                            required
                            style={{
                                borderColor: formik.errors.password && formik.touched.password ? 'red' : undefined
                            }}
                        />
                    </div>
                    <button
                        className={styles.submitBtn}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignInForm;