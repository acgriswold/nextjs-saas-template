import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import localFont from 'next/font/local'

import { api } from "~/lib/api";

import "~/styles/globals.css";

const borna = localFont({
  src: [
    {
      path: '../../public/fonts/borna-medium-webfont.woff2',
      weight: "700"
    },
  ],
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global> {`
        :root {
          --borna-font: ${borna.style.fontFamily};
        }
        
        `}</style>

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
