//Author: Torjus A.M
//App component to initialize pages. Define shared layout, global.css, inject additional data
//App does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps
//getInitialProps or getServerSideProps for commmon data
import type { AppProps } from 'next/app';
import Clock from '../components/clock';
import './globals.css';
import AnimatedBackground from '../components/animatedBackground';
import '../components/employeeListData.module.css';
import EmployeeShiftTable from '../components/employeesWithSetShiftsTable';

//parameters are passed automatically by Next
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <nav>
        <ul>
            <Clock />
        </ul>
      </nav>
      <EmployeeShiftTable />
      <AnimatedBackground />

      {/* render main component for the current page with props */}
      <Component {...pageProps} />
    </div>
  );
};

export default App;


