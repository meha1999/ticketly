import Divider from "components/common/divider";
import SeoHead from "components/common/seo-head";
import Title from "components/common/title";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import DashboardLayout from "components/layouts/dashboard/customer";
import CustomerOrderCard from "components/pure/customer-order-card";
import OrdersIcon from "images/icons/orders_icon";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { OrderService } from "services/order.service";
import errorHandler from "src/tools/error-handler";

const orderService = new OrderService();

const Orders = () => {
  const [orders, setOrders] = useState<Array<any>>([]);

  const getOrders = async () => {
    try {
      const res = await orderService.getOrders();
      setOrders(res.data);
    } catch (error: any) {
      errorHandler(error);
    } finally {
    }
  };

  const clientSideActionsHandler = async (
    order_id: string,
    status: "RECEIVED" | "REJECTED" | "CONFIRMED"
  ) => {
    try {
      const res = await orderService.changeOrderInfo(order_id, {
        status,
      });
      Toaster.success(
        <ToastComponent
          title="موفقیت آمیز"
          description="عملیات مورد نظر با موفقیت انجام شد"
        />
      );
      const updatedList = orders.map((order: any) =>
        order.id === order_id ? res.data : order
      );
      setOrders(updatedList);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

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
                  id={item.id}
                  name={item.name}
                  manufacturer={
                    item?.product_category?.name ?? item.service_category?.name
                  }
                  image={item.image}
                  brand={item.brand}
                  status={item.status}
                  price={item.total_price}
                  dateAndTime={item.created_at}
                  count={item?.count ?? ''}
                  onClientAction={clientSideActionsHandler}
                />
              </li>
            ))
          ) : (
            <p>لیست سفارشات شما خالی است.</p>
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
