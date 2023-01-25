import Header from "components/common/header";
import Sidebar from "components/common/sidebar/customer";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEventSource } from "react-use-websocket";
import { NotificationService } from "services/notification.service";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const notificationService = new NotificationService();

interface DashboardLayoutProps {
  children?: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const { lastEvent } = useEventSource(
    `${process.env.NEXT_PUBLIC_BASE_RASAD_URL}/events/${user?.id}/`
  );

  useEffect(() => {
    lastEvent?.data &&
      dispatch({
        type: REDUX_ACTION.SET_NOTIFICATION,
        payload: JSON.parse(lastEvent?.data),
      });
  }, [lastEvent?.data]);

  const handleGetNotification = async () => {
    try {
      const res = await notificationService.getNotifications();
      console.log(res);
    } catch (error) {
    } finally {
    }
    // dispatch({
    //   type: REDUX_ACTION.SET_NOTIFICATION,
    //   payload: JSON.parse(lastEvent?.data),
    // });
  };
  useEffect(() => {
    handleGetNotification();
  }, []);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-container">
        <div className="header">
          <Header />
        </div>
        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <Sidebar />
          </div>
          <div className="dashboard-main">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
