/* 
    Author: Torjus A.M, Ask I.P Aspholm
    This is the signin page for the application. Redirects to this page if the user is not authenticated.
*/
import React, {useState} from 'react'
import {signIn} from 'next-auth/react'
import {useFormik} from 'formik';
import login_validate from "../../utils/validateSignin"
import styles from './signInPage.module.css'
import {toast} from "react-toastify";

export default function SignInPage() {
    // Author: Torjus A.M
    const [statusText, setStatusText] = useState('')

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        onSubmit: async (values) => {
            try {
                const result = await signIn("credentials", {...values, redirect: false});
                // Window.location.replace is used to redirect AND refresh main page
                result.ok ? window.location.replace('/') : setStatusText(result.error);
            } catch (error) {
                setStatusText(error.message);
                toast.error(error.message);
            }
        },
        validate: login_validate
    });

    // Author: Ask I.P Aspholm
    return (
        <div className={styles.outerContainer}>
            <div className={styles.formContainer}>
                <h1>Logg inn</h1>
                {statusText &&
                    <div className={styles.errorMsg}><h2><span className={styles.strongText}>Feil - </span>{statusText}
                    </h2></div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputGroup}>
                        <h2>Brukernavn</h2>
                        <input type="email" {...formik.getFieldProps('email')} required
                               style={{borderColor: formik.errors.email && formik.touched.email ? 'red' : undefined}}/>
                    </div>
                    <div className={styles.inputGroup}>
                        <h2>Passord</h2>
                        <input type="password" {...formik.getFieldProps('password')} required
                               style={{borderColor: formik.errors.password && formik.touched.password ? 'red' : undefined}}/>
                    </div>
                    <button type="submit" className={styles.submitBtn}>Login</button>
                </form>
            </div>
        </div>
    )
}