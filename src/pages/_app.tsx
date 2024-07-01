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