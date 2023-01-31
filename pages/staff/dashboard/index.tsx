import { useEffect, useState } from "react";
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
import ProfileBold from "public/images/icons/profile_bold1.svg";
import SeoHead from "components/common/seo-head";
import Divider from "components/common/divider";
import { JalaliDateTime } from "jalali-date-time";
import { TicketService } from "services/ticket.service";
import Image from "next/image";
import { TicketStatusChoicesEnum } from "src/model/status";
import { TICKET_STATUS_PERSIAN } from "src/static/statusConfig";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import { BsCheckLg } from "react-icons/bs";
import { DATE_TIME_CONFIG } from "src/static/dateConfig";

const userType: Record<string, string> = {
  staff: "#5E7BEC",
  customer: "#00A48A",
  supplier: "#F2C901",
  superuser: "#505050",
};

const ticketService = new TicketService();

const Dashboard = () => {
  const { asPath, push: routerPush } = useRouter();
  const [ticketList, setTicketList] = useState<any[]>([]);
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets();
      const data: any[] = ticketRes.data.filter(
        (item: any) => item.status === "UNREAD"
      );
      setTicketList(data.splice(0, 3));
    } catch (error) {}
  };

  const handleOpenChat = (groupId: string, ticketId: string) => {
    routerPush(`/staff/dashboard/chat/${groupId}?ticketId=${ticketId}`);
  };

  const ticketAction = async (ticket: Record<string, string>) => {
    try {
      await ticketService.changeTicketInfo(ticket.id, {
        staff: user?.id,
        status: "ACCEPTED",
      });
      Toaster.success(
        <ToastComponent
          title="موفقیت آمیز"
          description=" قبول درخواست با موفقیت انجام شد."
        />
      );
      routerPush(
        `/staff/dashboard/chat/${ticket.ticket_group}?ticketId=${ticket.id}`
      );
      const newList = ticketList.filter((item: any) => item.id !== ticket.id);
      setTicketList(newList);
    } catch (error: any) {
      Object.keys(error?.response?.data).length
        ? Object.keys(error?.response?.data).map((item) => {
            Toaster.error(
              <ToastComponent
                title={item}
                description={error?.response?.data[item]}
              />
            );
          })
        : Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <Title titleIcon={DashboardBold} titleText="پیشخوان" />
          <div className="welcome-message">
            <span
              className="name"
              style={{ color: `${userType[asPath.split("/")[1]]}` }}
            >
              {user?.full_name ?? user?.username ?? ""}
            </span>
            <span style={{ color: `${userType[asPath.split("/")[1]]}` }}>
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
                routerPush("/staff/dashboard/tickets/sending");
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
                routerPush("/staff/dashboard/store");
              }}
              text="انبار محصولات"
            />
          </div>
          <Title titleText="آخرین درخواست‌ها" />
          <Divider margin />
          <ul className="list-wrapper">
            {ticketList?.map((item: any, index: any) => (
              <li
                className={`list-item ${
                  item.status === "PENDING" || item.status === "ACCEPTED"
                    ? "unread-item"
                    : ""
                } ${item.status !== "UNREAD" ? "hover" : ""}`}
                key={index}
                onClick={() =>
                  item.status !== "UNREAD" &&
                  handleOpenChat(item.ticket_group, item.id)
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
                    {item.customer?.full_name ?? "نام کاربر یافت نشد"}
                  </span>
                </div>
                <div className="date">
                  {JalaliDateTime(DATE_TIME_CONFIG).toFullText(
                    new Date(item.updated_at)
                  )}
                </div>
                <div className="status">
                  <ReqStatusBtn status={item?.status} />
                </div>
                <div className="ticket">
                  <ReqTicketBtn
                    status={item.status}
                    onClick={(e) => {
                      e.stopPropagation();
                      ticketAction(item);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DashboardLayout>
      <SeoHead title="پیشخوان" description="" />
    </>
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
export const ReqTicketBtn = ({
  status,
  onClick,
}: {
  status: string;
  onClick: (e: React.MouseEvent) => void;
}) => {
  const translate: Record<string, string> = {
    UNREAD: "قبول درخواست",
    ACCEPTED: "بستن تیکت",
    PENDING: "بستن تیکت",
    ANSWERED: "بستن تیکت",
    INPROCESS: "در حال تامین",
    CLOSED: "تیکت بسته شده",
  };
  return (
    <div
      className={`ticket-status-wrapper ${
        status === "UNREAD" ? "green" : "close"
      }`}
      onClick={onClick}
    >
      {status === "UNREAD" && <BsCheckLg />}
      {translate[status]}
    </div>
  );
};
