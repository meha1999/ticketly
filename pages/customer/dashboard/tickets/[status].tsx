import { useState, useEffect } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import Title from "components/common/title";
import Divider from "components/common/divider";
import DashboardLayout from "components/layouts/dashboard/customer";
import TicketBold from "public/images/icons/ticket_bold.svg";
import { TicketService } from "services/ticket.service";
import DefaultTicket from "public/images/default-ticket.svg";
import Delete from "public/images/icons/delete.svg";
import { JalaliDateTime } from "jalali-date-time";
import { useRouter } from "next/router";
import { NavLink } from "src/tools/NavLink";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const ticketService = new TicketService();

const Tickets = () => {
  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

  const [ticketList, setTicketList] = useState([]);
  const { push: routerPush, query } = useRouter();

  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets();
      const data = ticketRes.data.filter(
        (item: any) => pageConfig[item.status] === query.status
      );
      setTicketList(data);
    } catch (error) {
      setTicketList([]);
    }
  };

  useEffect(() => {
    getTickets();
  }, [query.status]);

  const dateTimeConfig = {
    timezone: "Asia/Tehran",
    locale: "en",
    fullTextFormat: "d N ماه Y  -  H:I ",
    titleFormat: "W, D N Y ",
    dateFormat: "Y-M-D",
    timeFormat: "H:I:S",
  };

  const translate: Record<string, string> = {
    UNREAD: "در انتظار تایید ارزیاب",
    ACCEPTED: "در انتظار پاسخ مشتری",
    ANSWERED: "در انتظار پاسخ مشتری",
    INPROCESS: "در انتظار تامین کننده",
    CLOSED: "مشتری پاسخ داده",
    // PROVIDED: "مشتری پاسخ داده",
    // RETURNED: "در انتظار پاسخ مشتری",
    // DELIVERED: "مشتری پاسخ داده",
  };

  const pageConfig: Record<string, string> = {
    UNREAD: "supplying",
    ACCEPTED: "sending",
    ANSWERED: "sending",
    INPROCESS: "closed",
    CLOSED: "closed",
  };

  const handleOpenChat = (ticketId: string) => {
    routerPush(`/customer/dashboard/chat/${ticketId}/`);
  };

  return (
    <DashboardLayout>
      <div className="tickets">
        <Title
          titleIcon={TicketBold}
          titleText="درخواست ها"
          titleSideComponent={<></>}
        />
        <Divider />
        <div className="tickets-conatiner">
          {ticketList.map((ticket: any, key: any) => {
            const unread = notification?.detail.filter(
              (item) => item.data[0].ticket === ticket.id
            )[0];
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
                      <div className="brand">{ticket.brand ?? "بدون برند"}</div>
                    </div>
                  </div>
                  {unread?.data[0].unread_message && (
                    <div className="unread-notification">
                      {unread?.data[0].unread_message}
                    </div>
                  )}
                </div>
                <div className="price">
                  <div className="amount">{ticket.price ?? "******"} تومان</div>
                  <div className="code">{ticket.id}</div>
                </div>
                <div className="date-time">
                  <div className="date">{ticket.date}</div>
                  <div className="time">
                    {JalaliDateTime(dateTimeConfig).toFullText(
                      new Date(ticket.updated_at)
                    )}
                  </div>
                </div>
                <div className="operation">
                  {query?.status === "supplying" && (
                    <div className="delete-icon">
                      <Image src={Delete} alt="delete" />
                    </div>
                  )}
                  <div className="status">{translate[ticket.status]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tickets;

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
