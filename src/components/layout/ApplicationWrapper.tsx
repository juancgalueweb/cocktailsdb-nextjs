import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { Footer } from '../common/Footer'
import { Nav } from '../common/Nav'
interface TProps {
  title: string
  description?: string
}

export const ApplicationWrapper: FC<PropsWithChildren<TProps>> = ({
  title,
  description,
  children
}) => {
  return (
    <>
      <div className='bg-slate-200 min-h-screen flex flex-col'>
        <Head>
          <title>{title}</title>
          {description && <meta name='description' content={description} />}
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        </Head>
        {/* Enable this script in Christmas */}
        {/* <Script src='https://app.embed.im/snow.js' defer /> */}
        <header className='bg-white h-11 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-70'>
          <Nav />
        </header>
        <main className='grow flex flex-col text-white'>{children}</main>
        <Footer />
      </div>
    </>
  )
}
