// Kinda scuffed login handling, but it works.
import React, {FC, useState} from 'react'
import {signIn} from 'next-auth/react'
import {useFormik} from 'formik';
import login_validate from "../../utils/validateSignin"
import styles from './signInPage.module.css'
import {toast} from "react-toastify";

const SignInForm: FC = () => {
    // Status text for displaying error messages
    const [statusText, setStatusText] = useState('')

    // Formik hook for handling login info on submit
    const formik = useFormik({
        initialValues: {email: "", password: ""},
        // Handles login info
        onSubmit: async (values) => {
            try {
                const result = await signIn(
                    "credentials", {...values, redirect: false}
                );
                // Redirect to home page, or display error message
                result.ok ? window.location.replace('/') : setStatusText(result.error);
            } catch (error) {
                setStatusText(error.message);
                toast.error(error.message);
            }
        },
        validate: login_validate
    });

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