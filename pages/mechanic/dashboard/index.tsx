import Chat from "components/common/chat";
import DashboardLayout from "components/layouts/dashboard/mechanic";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const Dashboard = () => {
  const token: string | null = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["token"]
  >((store: ReduxStoreModel) => store.token);
  console.log(token);

  return (
    <DashboardLayout>
      <Chat />
    </DashboardLayout>
  );
};

export default Dashboard;
