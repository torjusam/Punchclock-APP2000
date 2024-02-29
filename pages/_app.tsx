//Author: Torjus A.M
import type { AppProps } from 'next/app';
import Clock from '../components/clock';
import EmployeeContextProvider from '../components/employeeContext';
import './globals.css';
import styles from '../lib/styles/layout.module.css';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <div className={styles.veryOuterContainer}>
      <div className={styles.leftContainer}>
        <Clock />
      </div>
      {/* ContextProvider around the page-content component, so every component has access to employees state */}
      <EmployeeContextProvider>
        <div className={styles.rightContainer}>
          <Component {...pageProps} />
        </div>
      </EmployeeContextProvider>
    </div>
  );
};

export default App;

