import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { Footer } from '../common/Footer';
import { Nav } from '../common/Nav';

interface TProps {
  title: string;
  description?: string;
}

export const ApplicationWrapper: FC<PropsWithChildren<TProps>> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className='bg-slate-200 min-h-screen flex flex-col'>
      <Head>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        {/* NProbress cdn CSS*/}
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </Head>
      {/* Enable this script in Christmas */}
      {/* <Script src='https://app.embed.im/snow.js' defer /> */}
      <header className='bg-white h-11'>
        <Nav />
      </header>
      <main className='grow flex flex-col text-white'>{children}</main>
      <Footer />
    </div>
  );
};
