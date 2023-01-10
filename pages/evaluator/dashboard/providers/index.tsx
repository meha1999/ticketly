import DashboardLayout from "components/layouts/dashboard/evaluator";
import { GetServerSideProps } from "next";

const Providers = () => {
  return <DashboardLayout>Under Development</DashboardLayout>;
};

export default Providers;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/evaluator/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};