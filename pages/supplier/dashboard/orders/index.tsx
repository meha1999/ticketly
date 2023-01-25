import Divider from "components/common/divider";
import SeoHead from "components/common/seo-head";
import Title from "components/common/title";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import DashboardLayout from "components/layouts/dashboard/supplier";
import CustomerOrderCard from "components/pure/customer-order-card";
import OrdersIcon from "images/icons/orders_icon";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { OrderService } from "services/order.service";

const orderService = new OrderService();

const Orders = () => {
  const [orders, setOrders] = useState<Array<any>>([]);

  const getOrders = async () => {
    try {
      const res = await orderService.getOrders();
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const sendPackageHandler = async (order_id: string) => {
    try {
      const res = await orderService.changeOrderInfo(order_id, {
        status: "SENT",
      });
      Toaster.success(
        <ToastComponent title="موفقیت آمیز" description="بسته شما ارسال شد" />
      );
      const updatedList = orders.map((order: any) =>
        order.id === order_id ? res.data : order
      );
      setOrders(updatedList);
    } catch (error) {
      Toaster.error(
        <ToastComponent
          title=" ناموفق"
          description="در ارسال بسته شما مشکلی به وجود امد"
        />
      );
    }
  };

  return (
    <>
      <DashboardLayout>
        <Title svgIcon={<OrdersIcon color="#505050" />} titleText="سفارشات" />
        <Divider />
        <ul className="customer-orders">
          {orders.length ? (
            orders?.map((item: any) => (
              <li key={item.id}>
                <CustomerOrderCard
                  isSupplier
                  id={item.id}
                  name={item.name}
                  manufacturer={""}
                  image={item.image}
                  brand={item.brand}
                  status={item.status}
                  price={item.total_price}
                  dateAndTime={item.created_at}
                  onSupplierAction={sendPackageHandler}
                />
              </li>
            ))
          ) : (
            <p>لیست سفارشات خالی است.</p>
          )}
        </ul>
      </DashboardLayout>
      <SeoHead title="سفارشات" description="" />
    </>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/customer/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
