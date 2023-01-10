import DashboardLayout from "components/layouts/dashboard/mechanic";
import { GetServerSideProps } from "next";

const Register = () => {
  return <DashboardLayout>Register</DashboardLayout>;
};

export default Register;

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
