import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import '../styles/global.css';
config.autoAddCss = false;

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
