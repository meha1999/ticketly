import DashboardCard from "components/common/dashboardCard";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/supplier";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import DashboardBold from "public/images/icons/dashboard_bold.svg";
import DashboardCardCarParts from "public/images/dashboard_card_car_parts.svg";
import SeoHead from "components/common/seo-head";
import Divider from "components/common/divider";
import { useEffect, useState } from "react";
import { TicketService } from "services/ticket.service";
import Image from "next/image";
import ProfileBold from "public/images/icons/profile_bold1.svg";
import { JalaliDateTime } from "jalali-date-time";
import { DATE_TIME_CONFIG } from "src/static/dateConfig";
import { TicketStatusChoicesEnum } from "src/model/status";
import { TICKET_STATUS_PERSIAN } from "src/static/statusConfig";
import { Toaster } from "components/common/toast/Toaster";
import ToastComponent from "components/common/toast/ToastComponent";
import errorHandler from "src/tools/error-handler";

const ticketService = new TicketService();

const userType: Record<string, string> = {
  staff: "#5E7BEC",
  customer: "#00A48A",
  supplier: "#F2C901",
  superuser: "#505050",
};

const Dashboard = () => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const [ticketList, setTicketList] = useState<any[]>([]);

  const handleOpenChat = (ticketId: string) => {
    router.push(`/supplier/dashboard/chat/${ticketId}/`);
  };
  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets();
      const data: any[] = ticketRes.data.filter(
        (item: any) => item.status === "ANSWERED"
      );
      setTicketList(data.splice(0, 3));
    } catch (error: any) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  console.log(ticketList);

  return (
    <>
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
              backgroundColor="#64CAB1"
              btnBgColor="#F3C701"
              btnColor="#FFFFFF"
              btnText="ثبت محصول"
              dir="ltr"
              image={DashboardCardCarParts}
              onClick={() => {
                router.push("/supplier/dashboard/register");
              }}
              text="محصولات خود را به فروش برسانید!"
              textColor="#FFFFFF"
            />
          </div>
          <div className="last-requests-container">
            <Title titleText="آخرین درخواست‌ها" />
            <Divider />
            <ul className="last-requests-list">
              {ticketList?.map((item: any, index: number) => (
                <li
                  key={item.id}
                  className={`item ${item.status !== "UNREAD" ? "hover" : ""}`}
                  onClick={() =>
                    item.status !== "UNREAD" && handleOpenChat(item.id)
                  }
                >
                  <div className="title">
                    <span className="count">{index + 1}</span>
                    {item.name}
                  </div>
                  <div className="user">
                    <div className="logo">
                      <Image src={ProfileBold} alt="" width={20} height={20} />
                    </div>
                    <span className="name">
                      {item.staff?.full_name ??
                        item.staff?.username ??
                        "نام کاربر یافت نشد"}
                    </span>
                  </div>
                  <div className="ticket-id">{item.id}</div>
                  <div className="date">
                    {JalaliDateTime(DATE_TIME_CONFIG).toFullText(
                      new Date(item.updated_at)
                    )}
                  </div>
                  <div className="status">
                    <ReqStatusBtn status={item?.status} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DashboardLayout>
      <SeoHead title="پیشخوان" description="" />
    </>
  );
};

export default Dashboard;

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

export const ReqStatusBtn = ({
  status,
}: {
  status: TicketStatusChoicesEnum;
}) => {
  const className: Record<string, string> = {
    UNREAD: "pending",
    INPROCESS: "pending",
    ACCEPTED: "pending-2",
    ANSWERED: "pending-2",
    PENDING: "pending-2",
    CLOSED: "fulfilled",
  };
  return (
    <div className={`btn-status-wrapper ${className[status]} `}>
      {TICKET_STATUS_PERSIAN[status]}
    </div>
  );
};
