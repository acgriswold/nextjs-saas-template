import { SessionProvider } from "next-auth/react";
import type { AppTypeWithAuth } from "next/app";
import localFont from 'next/font/local'
import { ProtectedElement } from "~/components/auth/protected-element";

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

const MyApp: AppTypeWithAuth = ({
  Component,
  router,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <>
      <style jsx global> {`
        :root {
          --borna-font: ${borna.style.fontFamily};
        }
        
        `}</style>

      <SessionProvider session={session}>
        <ProtectedElement auth={Component.auth} router={router}>
          <Component {...pageProps} />
        </ProtectedElement>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
