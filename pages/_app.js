import "@/styles/globals.css";
import { QuioscoProvider } from "../context/QuioscoProvider";
import useQuiosco from "@/hooks/useQuiosco";
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <QuioscoProvider>
        <Component {...pageProps} />
      </QuioscoProvider>
    </SessionProvider>
  );
}

export default MyApp;
