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
import { Toaster } from "components/common/toast/Toaster";
import ToastComponent from "components/common/toast/ToastComponent";
import errorHandler from "src/tools/error-handler";

const userType: Record<string, string> = {
  staff: "#5E7BEC",
  customer: "#00A48A",
  supplier: "#F2C901",
  superuser: "#505050",
};
const ticketService = new TicketService();

const Dashboard = () => {
  const { asPath, push: routerPush, query } = useRouter();
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
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const handleOpenChat = (ticketId: string) => {
    routerPush(`/customer/dashboard/chat/${ticketId}/`);
  };

  const deleteTicketHandler = async (id: number) => {
    try {
      await ticketService.deleteTicket(id);
      setTicketList(ticketList.filter((i) => i.id !== id));
      Toaster.success(
        <ToastComponent
          title="???????????? ????????"
          description="???????? ?????? ???? ???????????? ?????? ????"
        />
      );
    } catch (error: any) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashboard">
          <Title titleIcon={DashboardBold} titleText="??????????????" />
          <div className="welcome-message">
            <span
              className="name"
              style={{ color: `${userType[asPath.split("/")[1]]}` }}
            >
              {user?.full_name ?? user?.username ?? ""}
            </span>
            <span style={{ color: `${userType[asPath.split("/")[1]]}` }}>
              {" ???? ?????? ?????? ?????????? "}
            </span>
          </div>
          <div className="dashboard-cards">
            <DashboardCard
              backgroundColor="#00A48A"
              btnBgColor="#F3C701"
              btnColor="#FFFFFF"
              btnText="????????????"
              dir="rtl"
              image={DashboardCardChat}
              onClick={() => {
                routerPush("/customer/dashboard/tickets/create");
              }}
              text="?????? ?????????????? ????????"
              textColor="#FFFFFF"
            />
            <DashboardCard
              backgroundColor="#9CADE4"
              btnBgColor="#F3C701"
              btnColor="#FFFFFF"
              btnText="????????????"
              textColor="#FFFFFF"
              dir="ltr"
              image={DashboardCardWallet}
              onClick={() => {
                routerPush("/customer/dashboard/wallet");
              }}
              text="?????? ?????? ????????"
            />
          </div>
          <Title titleText="?????????? ?????????????????????" />
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
                          {ticket?.product_category?.name ??
                            ticket?.service_category?.name ??
                            "???????? ????????"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <div className="amount">?????????? ??????????</div>
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
                    {query?.status === "supplying" && (
                      <div
                        className="delete-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTicketHandler(ticket.id);
                        }}
                      >
                        <Image src={Delete} alt="delete" />
                      </div>
                    )}
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
      <SeoHead title="??????????????" description="" />
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
