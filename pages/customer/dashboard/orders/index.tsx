import Divider from "components/common/divider";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/customer";
import CustomerOrders from "components/pure/customer-orders";
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
      console.log(res);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <DashboardLayout>
      <Title svgIcon={<OrdersIcon color="#505050" />} titleText="سفارشات" />
      <Divider />
      <CustomerOrders list={orders} />
    </DashboardLayout>
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
