//Author Torjus A.M
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import RootLayout from '../components/layout'
import './globals.css';

export type NextPageWithLayout = NextPage<{}, {}> & {
  getLayout: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = (page: ReactElement) => (
    <RootLayout>{page}</RootLayout>
  );

  return getLayout(<Component {...pageProps} />);
}

