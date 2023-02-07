import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";

const errorHandler = (error: any) => {
  try {
    error?.response?.data?.errors.length
      ? error?.response?.data?.errors.map((item: any) =>
          typeof item.value.length
            ? item.value.map((val: any) =>
                Toaster.error(
                  <ToastComponent title={item.key} description={val} />
                )
              )
            : Toaster.error(
                <ToastComponent
                  title="ناموفق"
                  description="خطای غیر منتظره رخ داده است"
                />
              )
        )
      : Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
    return;
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
