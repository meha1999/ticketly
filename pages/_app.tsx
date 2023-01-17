import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "src/store";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SSEProvider } from "react-hooks-sse";
import NextNProgress from "components/common/nprogressNext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter();

  
  const colorType = {
    staff: "#5E7BEC",
    customer: "#00A48A",
    supplier: "#F2C901",
    admin: "#505050",
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        {/* <SSEProvider
          endpoint={`${process.env.NEXT_PUBLIC_BASE_RASAD_URL}/events/`}
        > */}
        <NextNProgress
          color={
            router.asPath.includes("staff")
              ? colorType.staff
              : router.asPath.includes("customer")
              ? colorType.customer
              : router.asPath.includes("supplier")
              ? colorType.supplier
              : colorType.admin
          }
        />
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
