import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "src/store";
import BaseWrapper from "components/common/baseWrapper";


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BaseWrapper Component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
