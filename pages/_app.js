import "@/styles/globals.css";
import { QuioscoProvider } from "../context/QuioscoProvider";
import useQuiosco from "@/hooks/useQuiosco";

export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  );
}
