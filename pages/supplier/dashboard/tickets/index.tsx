import { GetServerSideProps } from "next";
import DashboardLayout from "components/layouts/dashboard/supplier";
import SeoHead from "components/common/seo-head";

const Tickets = () => {
  return (
    <>
      <DashboardLayout>Tickets</DashboardLayout>{" "}
      <SeoHead title="" description="" />
    </>
  );
};

export default Tickets;

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
