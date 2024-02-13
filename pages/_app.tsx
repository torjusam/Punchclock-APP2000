//Author: Torjus A.M, Thomas H
//App component to initialize pages. Define shared layout, global.css, inject additional data
//App does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps
//getInitialProps or getServerSideProps for commmon data
import type { AppProps } from 'next/app';
import Clock from '../components/clock';
import './globals.css';

//parameters are passed automatically by Next
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
       <Clock/>
      {/* render main component for the current page with props */}
      <Component {...pageProps} />
    </>
  );
};

export default App;


