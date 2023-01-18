import Divider from "components/common/divider";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/customer";
import CustomerOrders from "components/pure/customer-orders";
import OrdersIcon from "images/icons/orders_icon";
import { GetServerSideProps } from "next";

const Orders = () => {
  const fakeList: Array<any> = [
    {
      name: "item1",
    },
  ];

  return (
    <DashboardLayout>
      <Title svgIcon={<OrdersIcon color="#505050" />} titleText="سفارشات" />
      <Divider />
      <CustomerOrders list={fakeList} />
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
