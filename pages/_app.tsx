import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "src/store";
import "../styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Component {...pageProps} />
        <ToastContainer
          draggable
          autoClose={4000}
          position="bottom-left"
          hideProgressBar={true}
          pauseOnHover={false}
        />
      </PersistGate>
    </Provider>
  );
}
