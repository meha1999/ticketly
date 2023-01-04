import DashboardLayout from "components/layouts/dashboard/supplier";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const Dashboard = () => {
  const token: string | null = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["token"]
  >((store: ReduxStoreModel) => store.token);
  console.log(token);

  return <DashboardLayout>Supplier Dashboard</DashboardLayout>;
};

export default Dashboard;
