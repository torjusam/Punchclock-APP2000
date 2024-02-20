//Author: Torjus A.M
import type { AppProps } from 'next/app';
import Clock from '../components/clock';
import EmployeeContextProvider from '../components/employeeContext';
import './globals.css';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <Clock />
      {/* ContextProvider around the page-content component, so every component has access to employees state */}
      <EmployeeContextProvider>
        <Component {...pageProps} />
      </EmployeeContextProvider>
    </div>
  );
};

export default App;

