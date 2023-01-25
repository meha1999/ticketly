import Divider from "components/common/divider";
import SeoHead from "components/common/seo-head";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/staff";
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
                  image={item.image}
                  id={item.id}
                  manufacturer={""}
                  name={item.name}
                  brand={item.brand}
                  price={item.total_price}
                  dateAndTime={item.created_at}
                  status={item.status}
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
    ctx.res.setHeader("Location", "/staff/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
