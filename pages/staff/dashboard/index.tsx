import DashboardLayout from "components/layouts/dashboard/staff";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const Dashboard = () => {
  const token: string | null = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["token"]
  >((store: ReduxStoreModel) => store.token);

  return <DashboardLayout>Under Development</DashboardLayout>;
};

export default Dashboard;

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