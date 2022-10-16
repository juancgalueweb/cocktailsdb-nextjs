import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Nav } from "../common/Nav";
import { Footer } from "../common/Footer";

interface TProps {
  title: string;
  description?: string;
}

export const ApplicationWrapper: FC<PropsWithChildren<TProps>> = ({
  title,
  description,
  children,
}) => {
  const finalTitle = `${title} | RootLab Movies`;
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Head>
        <title>{finalTitle}</title>
        {description && <meta name="description" content={description} />}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className="bg-white h-20">
        <Nav />
      </header>
      <main className="grow flex flex-col text-white">{children}</main>
      <Footer />
    </div>
  );
};
