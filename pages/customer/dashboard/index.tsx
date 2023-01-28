import DashboardCard from "components/common/dashboardCard";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/customer";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import DashboardBold from "public/images/icons/dashboard_bold.svg";
import DashboardCardChat from "public/images/dashboard_card_chat.svg";
import DashboardCardWallet from "public/images/dashboard_card_wallet.svg";
import SeoHead from "components/common/seo-head";
import Divider from "components/common/divider";
import { useEffect, useState } from "react";
import { TicketService } from "services/ticket.service";
import Image from "next/image";
import DefaultTicket from "public/images/default-ticket.svg";
import Delete from "public/images/icons/delete.svg";
import { JalaliDateTime } from "jalali-date-time";
import { DATE_TIME_CONFIG } from "src/static/dateConfig";
import { TICKET_STATUS_PERSIAN } from "src/static/statusConfig";
import { TicketStatusChoicesEnum } from "src/model/status";

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

  const handleOpenChat = (ticketId: string) => {
    routerPush(`/customer/dashboard/chat/${ticketId}/`);
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
              backgroundColor="#00A48A"
              btnBgColor="#F3C701"
              btnColor="#FFFFFF"
              btnText="مشاهده"
              dir="rtl"
              image={DashboardCardChat}
              onClick={() => {
                routerPush("/customer/dashboard/tickets/create");
              }}
              text="ثبت تیکت جدید"
              textColor="#FFFFFF"
            />
            <DashboardCard
              backgroundColor="#9CADE4"
              btnBgColor="#F3C701"
              btnColor="#FFFFFF"
              btnText="مشاهده"
              textColor="#FFFFFF"
              dir="ltr"
              image={DashboardCardWallet}
              onClick={() => {
                routerPush("/customer/dashboard/wallet");
              }}
              text="کیف پول شخصی"
            />
          </div>
          <Title titleText="آخرین درخواست‌ها" />
          <Divider margin />
          <div className="tickets-conatiner">
            {ticketList.map((ticket: any, key: any) => {
              return (
                <div
                  className="ticket-box"
                  key={key}
                  onClick={() => handleOpenChat(ticket.id)}
                >
                  <div className="description">
                    <div className="number">
                      <div className="value">{key + 1}</div>
                    </div>
                    <div className="image">
                      <Image
                        src={DefaultTicket}
                        alt="tikcet"
                        className="ticket-img"
                      />
                    </div>
                    <div className="info">
                      <div className="name">{ticket.name}</div>
                      <div className="further-info">
                        <div className="brand">
                          {ticket.brand ?? "بدون برند"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <div className="amount">شماره سفارش</div>
                    <div className="code">{ticket.id}</div>
                  </div>
                  <div className="date-time">
                    <div className="date">{ticket.date}</div>
                    <div className="time">
                      {JalaliDateTime(DATE_TIME_CONFIG).toFullText(
                        new Date(ticket.updated_at)
                      )}
                    </div>
                  </div>
                  <div className="operation">
                    {/* <div className="delete-icon">
                      <Image src={Delete} alt="delete" />
                    </div> */}
                    <div className="status">
                      {
                        TICKET_STATUS_PERSIAN[
                          ticket.status as TicketStatusChoicesEnum
                        ]
                      }
                    </div>
                  </div>
                </div>
              );
            })}
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
    ctx.res.setHeader("Location", "/customer/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
