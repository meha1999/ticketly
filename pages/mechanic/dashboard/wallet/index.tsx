import DashboardLayout from "components/layouts/dashboard/mechanic";
import { GetServerSideProps } from "next";

const Wallet = () => {
  return <DashboardLayout>Under Development</DashboardLayout>;
};

export default Wallet;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/mechanic/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
