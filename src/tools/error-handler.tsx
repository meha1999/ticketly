import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";

const errorHandler = (error: any) => {
  try {
    return error?.response?.data && Object.keys(error?.response?.data).length
      ? Object.keys(error?.response?.data).map((item) => {
          if (typeof error?.response?.data[item] === "string") {
            Toaster.error(
              <ToastComponent
                title={item}
                description={error?.response?.data[item]}
              />
            );
          } else {
            Toaster.error(
              <ToastComponent
                title="ناموفق"
                description="خطای غیر منتظره رخ داده است"
              />
            );
          }
        })
      : Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
  } catch (error) {
    Toaster.error(
      <ToastComponent
        title="ناموفق"
        description="خطای غیر منتظره رخ داده است"
      />
    );
  }
};

export default errorHandler;
