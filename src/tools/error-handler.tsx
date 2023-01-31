import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";

const errorHandler = (error: any) => {
  return error?.response?.data && Object.keys(error?.response?.data).length
    ? Object.keys(error?.response?.data).map((item) => {
        Toaster.error(
          <ToastComponent
            title={item}
            description={error?.response?.data[item]}
          />
        );
      })
    : Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
};

export default errorHandler