//Author: Torjus A.M
//App component to initialize pages. Define shared layout, global.css, inject additional data
//App does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps
//getInitialProps or getServerSideProps for commmon data
import type { AppProps } from 'next/app';
import Clock from '../components/clock';
import './globals.css';
import EmployeeContextProvider from '../components/employeeContext';


const App = ({ Component, pageProps }: AppProps) => {

  return (
    <div style={{ display: 'flex', width: '100vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '5vw', marginRight: '5vw' }}>
        <Clock />
      </div>
      {/* ContextProvider around the page-content component, so every component has access to employees state */}
      <EmployeeContextProvider>
        <Component {...pageProps} />
      </EmployeeContextProvider>
    </div>
  );
};

export default App;

