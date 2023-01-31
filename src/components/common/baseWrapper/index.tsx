import ReactDOM from "react-dom";
import NextNProgress from "components/common/nprogressNext";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect } from "react";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { NotificationService } from "services/notification.service";
import { useDispatch } from "react-redux";
import { Toaster } from "../toast/Toaster";
import ToastComponent from "../toast/ToastComponent";
import errorHandler from "src/tools/error-handler";

const notificationService = new NotificationService();

const BaseWrapper = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const colorType = {
    staff: "#5E7BEC",
    customer: "#00A48A",
    supplier: "#F2C901",
    admin: "#505050",
  };

  const handleGetNotification = useCallback(async () => {
    try {
      const res = await notificationService.getNotifications();
      dispatch({
        type: REDUX_ACTION.SET_NOTIFICATION,
        payload: res.data,
      });
    } catch (error: any) {
      errorHandler(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath.includes("dashboard")]);

  useEffect(() => {
    router.asPath.includes("dashboard") && handleGetNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath.includes("dashboard")]);

  return (
    <>
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
      {ReactDOM.createPortal(
        <ToastContainer
          draggable
          autoClose={4000}
          position="bottom-left"
          hideProgressBar={true}
          pauseOnHover={false}
        />,
        document.getElementById("portal") || document.body
      )}
    </>
  );
};

export default BaseWrapper;
