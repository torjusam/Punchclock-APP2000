/* 
    Author: Torjus A.M, Ask I.P Aspholm
    This is the signin page for the application. Redirects to this page if the user is not authenticated.
*/
import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {signIn} from 'next-auth/react'
import {useFormik} from 'formik';
import login_validate, {FormValues} from "../../utils/validateSignin"
import styles from './signInPage.module.css'


export default function SignInPage() {
    const router = useRouter()
    const [statusText, setStatusText] = useState('')
    // formik hook
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validate: (values: FormValues) => login_validate(values)
    })

    async function onSubmit(values) {
        try {
            const status = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            })

            // If the user is authenticated, redirect to the home page
            if (status.ok) {
                await router.push('/');
            } else {
                setStatusText(status.error);
            }
        } catch (error) {
            if (error instanceof RateLimitError) {
                setStatusText(error.message);
                // Disable submit button for 5 seconds
            }
            setStatusText(error.message);
        }
    }

    return (
        <div className={styles.outerContainer}>
            <div className={styles.formContainer}>
                <h1>Logg inn</h1>
                {/* Error message */}
                {statusText &&
                    <div className={styles.errorMsg}>
                        <h2>
                            <span className={styles.strongText}>Feil - </span>{statusText}
                        </h2>
                    </div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputGroup}>
                        <h2>Brukernavn</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            {...formik.getFieldProps('email')}
                            required
                            style={{
                                ...(formik.errors.email && formik.touched.email ? {borderColor: 'red'} : {})
                            }}
                        />
                    </div>
                    {/* formik.errors.email && formik.touched.email ? <span className={styles.errorMsg}>{formik.errors.email as string}</span> : <></> */}
                    <div className={styles.inputGroup}>
                        <h2>Passord</h2>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            {...formik.getFieldProps('password')}
                            required
                            style={{
                                ...(formik.errors.password && formik.touched.password ? {borderColor: 'red !important'} : {})
                            }}
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>Login</button>
                </form>
            </div>
        </div>
    )
}