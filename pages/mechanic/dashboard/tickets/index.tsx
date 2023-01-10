import { useState, useEffect } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import Title from "components/common/title";
import Divider from "components/common/divider";
import DashboardLayout from "components/layouts/dashboard/mechanic";
import TicketBold from "public/images/icons/ticket_bold.svg";
import { TicketService } from "services/ticket.service";
import DefaultTicket from "public/images/default-ticket.svg";
import Delete from "public/images/icons/delete.svg";
import { JalaliDateTime } from "jalali-date-time";

const ticketService = new TicketService();

const Tickets = () => {
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const ticketRes = await ticketService.getTickets();
        setTicketList(ticketRes.data);
      } catch (error) {}
    };
    getTickets();
  }, []);

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
    ACCEPTED: "در انتظار پاسخ مکانیک",
    ANSWERED: "در انتظار پاسخ مکانیک",
    INPROCESS: "در انتظار تامین کننده",
    CLOSED: "مکانیک پاسخ داده",
    PROVIDED: "مکانیک پاسخ داده",
    RETURNED: "در انتظار پاسخ مکانیک",
    DELIVERED: "مکانیک پاسخ داده",
  };

  // const data = [
  //   {
  //     name: "لنت ترمز جلو پراید",
  //     brand: "برند : پارس آبی",
  //     supplier: "جت مت",
  //     price: "25.000.000",
  //     id: "TFCds545f58egtr",
  //     date: "7 دی ماه 1401",
  //     time: "13:19",
  //     status: "در حال آماده سازی",
  //   },
  //   {
  //     name: "لنت ترمز جلو پراید",
  //     brand: "برند : پارس آبی",
  //     supplier: "جت مت",
  //     price: "25.000.000",
  //     id: "TFCds545f58egtr",
  //     date: "7 دی ماه 1401",
  //     time: "13:19",
  //     status: "در حال آماده سازی",
  //   },
  //   {
  //     name: "لنت ترمز جلو پراید",
  //     brand: "برند : پارس آبی",
  //     supplier: "جت مت",
  //     price: "25.000.000",
  //     id: "TFCds545f58egtr",
  //     date: "7 دی ماه 1401",
  //     time: "13:19",
  //     status: "در حال آماده سازی",
  //   },
  //   {
  //     name: "لنت ترمز جلو پراید",
  //     brand: "برند : پارس آبی",
  //     supplier: "جت مت",
  //     price: "25.000.000",
  //     id: "TFCds545f58egtr",
  //     date: "7 دی ماه 1401",
  //     time: "13:19",
  //     status: "در حال آماده سازی",
  //   },
  //   {
  //     name: "لنت ترمز جلو پراید",
  //     brand: "برند : پارس آبی",
  //     supplier: "جت مت",
  //     price: "25.000.000",
  //     id: "TFCds545f58egtr",
  //     date: "7 دی ماه 1401",
  //     time: "13:19",
  //     status: "در حال آماده سازی",
  //   },
  // ];
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
          {ticketList.map((ticket: any, key: any) => (
            <div className="ticket-box" key={key}>
              <div className="description">
                <div className="number">
                  <div className="value">{key + 1}</div>
                </div>
                <div>
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
                    <div className="supplier">
                      {ticket.supplier ?? "بدون تامین"}
                    </div>
                  </div>
                </div>
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
                <div className="delete-icon">
                  <Image src={Delete} alt="delete" />
                </div>
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
    ctx.res.setHeader("Location", "/mechanic/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
