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
    <div className='bg-black min-h-screen flex flex-col'>
      <Head>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <script defer src='https://app.embed.im/snow.js'></script>
      </Head>
      <header className='bg-white h-10'>
        <Nav />
      </header>
      <main className='grow flex flex-col text-white'>{children}</main>
      <Footer />
    </div>
  );
};
