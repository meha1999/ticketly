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
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import SeoHead from "components/common/seo-head";
import { Toaster } from "components/common/toast/Toaster";
import ToastComponent from "components/common/toast/ToastComponent";

const ticketService = new TicketService();

const Tickets = () => {
  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

  const [ticketList, setTicketList] = useState<any[]>([]);
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

  const deleteTicketHandler = async (id: number) => {
    try {
      await ticketService.deleteTicket(id);
      setTicketList(ticketList.filter((i) => i.id !== id));
      Toaster.success(
        <ToastComponent
          title="موفقیت آمیز"
          description="تیکت شما با موفقیت حذف شد"
        />
      );
    } catch (error) {
      Toaster.error(
        <ToastComponent
          title="ناموفق"
          description="در حذف تیکت شما مشکلی به وجود آمد"
        />
      );
    }
  };

  useEffect(() => {
    getTickets();
  }, [query.status, notification]);

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
    PENDING: "در انتظار پاسخ ارزیاب",
    INPROCESS: "در انتظار تامین کننده",
  };

  const pageConfig: Record<string, string> = {
    UNREAD: "supplying",
    ACCEPTED: "sending",
    ANSWERED: "sending",
    PENDING: "sending",
    INPROCESS: "closed",
    CLOSED: "closed",
  };

  const handleOpenChat = (ticketId: string) => {
    routerPush(`/customer/dashboard/chat/${ticketId}/`);
  };

  return (
    <>
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
                        <div className="brand">
                          {ticket.branch_category.name ?? "بدون برند"}
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
                  <div
                    className="operation"
                    style={{
                      justifyContent: !!unread?.data[0].unread_message
                        ? "space-between"
                        : "center",
                    }}
                  >
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
                    <div className="status">{translate[ticket.status]}</div>
                    {!!unread?.data[0].unread_message && (
                      <div className="unread-notification">
                        {unread?.data[0].unread_message}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
      <SeoHead title="درخواست ها" description="" />
    </>
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
