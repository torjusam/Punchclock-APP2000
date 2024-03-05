//Author: Torjus A.M
import type { AppProps } from 'next/app';
import EmployeeContextProvider from '../hooks/employeeContext';
import LeftContent from '../components/leftSideContent/leftContent';
import './globals.css';
import styles from '../styles/layout.module.css';

const App = ({ Component, pageProps }: AppProps) => {

  // The shared layout of the app
  return (
    <div className={styles.veryOuterContainer}>
      <div className={styles.leftContainer}>
        <LeftContent />
      </div>
      <div className={styles.rightContainer}>
        {/* ContextProvider around the page-content component, so every component has access to employees state */}
        <EmployeeContextProvider>
          <Component {...pageProps} />
        </EmployeeContextProvider>
      </div>
    </div>
  );
};

export default App;

