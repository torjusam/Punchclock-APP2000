/* 
    Author: Torjus A.M
    This is the signin page for the application. Redirects to this page if the user is not authenticated.
    To-Do:
        Update vercel url
        Remove console.log around the app
        Protect api routes
        Github provider
*/
import React, {FormEvent, useState} from 'react'
import {useRouter} from 'next/router'
import {signIn} from 'next-auth/react'
import {useFormik, ErrorMessage} from 'formik';
import login_validate, {FormValues} from "../../lib/validate"
import styles from './signInPage.module.css'


export default function SignInPage() {
    const router = useRouter()
    const [loggedIn, setIsLoggedIn] = useState(false)
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
                callbackUrl: "/",
                redirect: false
            })

            // If the user is authenticated, redirect to the home page
            if (status.ok) {
                router.push('/');
            } else {
                console.log(status.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div
                    className={`${styles.inputGroup} ${formik.errors.password && formik.touched.password ? styles.errorMsg : ''}`}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        {...formik.getFieldProps('email')}
                        required/>
                </div>
                {/* formik.errors.email && formik.touched.email ? <span className={styles.errorMsg}>{formik.errors.email as string}</span> : <></> */}
                <div
                    className={`${styles.inputGroup} ${formik.errors.password && formik.touched.password ? styles.errorMsg : ''}`}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        {...formik.getFieldProps('password')}
                        required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}