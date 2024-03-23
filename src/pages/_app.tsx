/* 
  Author: Torjus A.M
  In next.js, _app.tsx functions as a wrapper for all pages, and is used to define the layout of the application.
  Only file where global styles can be imported, and context providers can be wrapped around the page-content component.
*/
import type { AppProps } from 'next/app';
import EmployeeContextProvider from '../context/employeeContext';
import { SessionProvider } from "next-auth/react"
import LeftContent from '../components/layout';
import './globals.css';
import '../features/keyboard/index.css'
import CustomToastContainer from '../lib/toastContainer';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/layout.module.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps
) {
  return (
    <div className={styles.veryOuterContainer}>
      <div className={styles.leftContainer}>
        <LeftContent />
      </div>
      <div className={styles.rightContainer}>
        {/* SessionProvider wraps all of app to keep session data and status synced */}
        <SessionProvider session={session}>
          {/* Custom ContextProvider around the pagecontent, so every component has access to employees state */}
          <EmployeeContextProvider>
            <Component {...pageProps} />
            <CustomToastContainer /> {/* Toast container for notifications */}
        </EmployeeContextProvider>
        </SessionProvider >
      </div>
    </div>
  );
};