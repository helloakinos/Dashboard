import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../src/store";

import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
