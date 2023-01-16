import DashboardLayout from "components/layouts/dashboard/staff";
import { GetServerSideProps } from "next";

const Store = () => {
  return <DashboardLayout>Store</DashboardLayout>;
};

export default Store;

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
