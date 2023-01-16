import DashboardLayout from "components/layouts/dashboard/superuser";
import { GetServerSideProps } from "next";

const Tickets = () => {
  return <DashboardLayout>Under Development</DashboardLayout>;
};

export default Tickets;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/superuser/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
