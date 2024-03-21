/* 
  Author: Torjus A.M
  In next.js, _app.tsx functions as a wrapper for all pages, and is used to define the layout of the application.
  Only file where global styles can be imported, and context providers can be wrapped around the page-content component.
*/
import type { AppProps } from 'next/app';
import EmployeeContextProvider from '../context/employeeContext';
import LeftContent from '../components/layout';
import './globals.css';
import '../features/keyboard/index.css'
import CustomToastContainer from '../lib/toastContainer';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/layout.module.css';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <div className={styles.veryOuterContainer}>
      <div className={styles.leftContainer}>
        <LeftContent />
      </div>
      <div className={styles.rightContainer}>
        {/* ContextProvider around the page-content component, so every component has access to employees state */}
        <EmployeeContextProvider>
          <Component {...pageProps} />
          <CustomToastContainer /> {/* Toast container for notifications */}
        </EmployeeContextProvider>
      </div>
    </div>
  );
};

export default App;

