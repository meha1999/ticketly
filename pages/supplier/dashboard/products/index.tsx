import DashboardLayout from "components/layouts/dashboard/supplier";
import { GetServerSideProps } from "next";

const Products = () => {
  return <DashboardLayout>Products</DashboardLayout>;
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/supplier/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};