/**
 * @file _app.tsx functions as a wrapper for all pages, and is used to define the layout of the application.
 * @description Only file where global styles can be imported and global context can be wrapped around the content.
 * @author Torjus A.M
 */
import type {AppProps} from 'next/app';
import EmployeeContextProvider from '../features/context/employeeContext';
import {SessionProvider} from "next-auth/react"
import LeftContent from '../components/layout';
import './globals.css';
import '../lib/keyboard/index.css'
import CustomToastContainer from '../lib/toastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/public-sans';
import '@fontsource/lato'
import styles from '../styles/layout.module.css';

/**
 * Main App component for the Next.js application. It wraps all pages in the application and provides global styles, context providers,
 * and layout components. It also handles session management using the SessionProvider from next-auth.
 *
 * @function App
 * @param {AppProps} {Component, pageProps} - The properties for the App component. Component is the page component that will be rendered, and pageProps are the properties for that component.
 * @returns {JSX.Element}
 */
export default function App({Component, pageProps}: AppProps) {

    return (
        <div className={styles.veryOuterContainer}>
            <div className={styles.leftContainer}>
                <LeftContent/>
            </div>
            {/* SessionProvider wraps all of app to keep session data and status synced */}
            <SessionProvider session={pageProps.session}>
                <div className={styles.rightContainer}>
                    {/* Custom ContextProvider around the pagecontent, so every component has access to employees state */}
                    <EmployeeContextProvider>
                        <Component {...pageProps} />
                        <CustomToastContainer/> {/* Toast container for notifications */}
                    </EmployeeContextProvider>
                </div>
            </SessionProvider>
        </div>
    );
};