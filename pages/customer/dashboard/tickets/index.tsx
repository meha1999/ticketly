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
  const { push: routerPush } = useRouter();
  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

  const [ticketList, setTicketList] = useState([]);

  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets();
      setTicketList(ticketRes.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTickets();
  }, [notification]);

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
    ACCEPTED: "در انتظار پیام ارزیاب",
    ANSWERED: "در انتظار پاسخ مشتری",
    INPROCESS: "در حال تامین",
    CLOSED: "بسته شده",
    // PROVIDED: "مشتری پاسخ داده",
    // RETURNED: "در انتظار پاسخ مشتری",
    // DELIVERED: "مشتری پاسخ داده",
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
          titleSideComponent={
            <>
              <div className="tabs">
                <NavLink href="supplying"> در انتظار</NavLink>
                <NavLink href="sending">در حال بررسی</NavLink>
                <NavLink href="closed">تکمیل</NavLink>
              </div>
            </>
          }
        />
        <Divider />
        <div className="tickets-conatiner">
          {ticketList.map((ticket: any, key: any) => (
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
                    <div className="brand">{ticket.branch_category.name ?? "بدون برند"}</div>
                    <div className="supplier">
                      {ticket.supplier ?? "بدون تامین"}
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
                  {JalaliDateTime(dateTimeConfig).toFullText(
                    new Date(ticket.updated_at)
                  )}
                </div>
              </div>
              <div className="operation">
                {/* <div className="delete-icon">
                  <Image src={Delete} alt="delete" />
                </div> */}
                <div className="status">{translate[ticket.status]}</div>
              </div>
            </div>
          ))}
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
