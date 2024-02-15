//Author: Torjus A.M, Thomas H
//App component to initialize pages. Define shared layout, global.css, inject additional data
//App does not support Next.js Data Fetching methods like getStaticProps or getServerSideProps
//getInitialProps or getServerSideProps for commmon data
import type { AppProps } from 'next/app';
import Clock from '../components/clock';
import './globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
       <Clock/>
      <Component {...pageProps} />
    </>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ marginRight: 'auto', justifyContent: 'center', height: '100%' }}>
          <Clock />
        </div>
        <Component {...pageProps} />
      </div>
  );
};

export default App;

