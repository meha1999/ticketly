import DashboardLayout from "components/layouts/dashboard/customer";
import { GetServerSideProps } from "next";

const Orders = () => {
  return <DashboardLayout> Under Development</DashboardLayout>;
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