import Chat from "components/common/chat";
import DashboardLayout from "components/layouts/dashboard/evaluator";
import ChatList from "components/pure/chat-list";
import OrderCompletion from "components/pure/order-completion";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

const Dashboard = () => {
  const token: string | null = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["token"]
  >((store: ReduxStoreModel) => store.token);
  console.log(token);

  return <DashboardLayout>dddddddddddddddddd</DashboardLayout>;
};

export default Dashboard;

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
