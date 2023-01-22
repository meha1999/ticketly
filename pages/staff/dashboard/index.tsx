import DashboardCard from "components/common/dashboardCard";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/staff";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import DashboardBold from "public/images/icons/dashboard_bold.svg";
import DashboardCardChat from "public/images/dashboard_card_chat.svg";
import DashboardCardWarehouse from "public/images/dashboard_card_warehouse.svg";

const Dashboard = () => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const userType: Record<string, string> = {
    staff: "#5E7BEC",
    customer: "#00A48A",
    supplier: "#F2C901",
    superuser: "#505050",
  };

  return (
    <DashboardLayout>
      <div className="dashboard">
        <Title
          titleIcon={DashboardBold}
          titleText="پیشخوان"
          titleSideComponent={<></>}
        />
        <div className="welcome-message">
          <span
            className="name"
            style={{ color: `${userType[router.asPath.split("/")[1]]}` }}
          >
            {user?.full_name ?? user?.username ?? ""}
          </span>
          <span style={{ color: `${userType[router.asPath.split("/")[1]]}` }}>
            {" به کلپ خوش آمدید "}
          </span>
        </div>
        <div className="dashboard-cards">
          <DashboardCard
            backgroundColor="#5E7BEC"
            btnBgColor="#F3C701"
            btnColor="#FFFFFF"
            btnText="مشاهده"
            dir="rtl"
            image={DashboardCardChat}
            onClick={() => {
              router.push("/staff/dashboard/tickets/sending");
            }}
            text="درخواست‌های مکـــــــــــــــــانیک"
            textColor="#FFFFFF"
          />
          <DashboardCard
            backgroundColor="#FFEB5C"
            btnBgColor="#505050"
            btnColor="#FFFFFF"
            btnText="مشاهده"
            textColor="#505050"
            dir="ltr"
            image={DashboardCardWarehouse}
            onClick={() => {
              router.push("/staff/dashboard/store");
            }}
            text="انبار محصولات"
          />
        </div>
      </div>
    </DashboardLayout>
  );
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
