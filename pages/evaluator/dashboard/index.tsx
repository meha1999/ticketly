import Chat from "components/common/chat";
import DashboardLayout from "components/layouts/dashboard/evaluator";
import ChatList from "components/pure/chat-list";
import OrderCompletion from "components/pure/order-completion";
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
      <OrderCompletion
        subject="لنت ترمز جلو پراید"
        name="متین نوروزپور"
        address="تهران، خیابان انقلاب، خیابان جمالزاده، نبش کوچه شهرزاد"
        walletCash={13500000}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ChatList />
        <div style={{ width: "73%" }}>
          <Chat />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
