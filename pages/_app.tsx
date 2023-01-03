import { Provider } from "react-redux";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "src/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        {" "}
        <Component {...pageProps} />{" "}
      </PersistGate>
    </Provider>
  );
}
