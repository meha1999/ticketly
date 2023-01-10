import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "src/store";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SSEProvider } from "react-hooks-sse";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        {/* <SSEProvider
          endpoint={`${process.env.NEXT_PUBLIC_BASE_RASAD_URL}/events/`}
        > */}
          <Component {...pageProps} />
          <ToastContainer
            draggable
            autoClose={4000}
            position="bottom-left"
            hideProgressBar={true}
            pauseOnHover={false}
          />
        {/* </SSEProvider> */}
      </PersistGate>
    </Provider>
  );
}
