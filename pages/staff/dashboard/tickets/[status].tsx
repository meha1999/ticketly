import Image from "next/image";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Title from "components/common/title";
import Divider from "components/common/divider";
import DashboardLayout from "components/layouts/dashboard/staff";
import ProfileBold from "public/images/icons/profile_bold1.svg";
//icons
import { BsCheckLg } from "react-icons/bs";
import editIcon from "public/images/icons/request/edit.svg";
import { TicketService } from "services/ticket.service";
import { JalaliDateTime } from "jalali-date-time";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { useRouter } from "next/router";
import { Toaster } from "components/common/toast/Toaster";
import { NavLink } from "src/tools/NavLink";
import ToastComponent from "components/common/toast/ToastComponent";
import SeoHead from "components/common/seo-head";

const ticketService = new TicketService();

const Requests = () => {
  const { push: routerPush, query } = useRouter();
  const [activeTab, setActiveTab] = useState("supplying");
  const [ticketList, setTicketList] = useState<any>([]);
  const [newTickets, setNewTickets] = useState<number>(0);

  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets();
      const data = ticketRes.data.filter(
        (item: any) => SHOW_LIST_BASE_ROUTE_CONFIG[item.status] === query.status
      );
      const unreadTickets = ticketRes.data.filter(
        (item: any) => SHOW_LIST_BASE_ROUTE_CONFIG[item.status] === "supplying"
      );
      setNewTickets(unreadTickets.length);
      setTicketList(data);
    } catch (error) {}
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

  const ticketAction = async (ticket: Record<string, string>) => {
    if (ticket.status === "UNREAD") {
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
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
      }
    }
    if (ticket.status !== "CLOSED " && ticket.status !== "UNREAD") {
      try {
        await ticketService.changeTicketInfo(ticket.id, {
          status: "CLOSED",
        });
        Toaster.success(
          <ToastComponent
            title="موفقیت آمیز"
            description="بستن تیکت با موفقیت انجام شد."
          />
        );
        const newList = ticketList.filter((item: any) => item.id !== ticket.id);
        setTicketList(newList);
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطایی در سرور بروز داد" />
        );
      }
    }
  };

  const handleOpenChat = (groupId: string, ticketId: string) => {
    routerPush(`/staff/dashboard/chat/${groupId}?ticketId=${ticketId}`);
  };

  useEffect(() => {
    if (activeTab !== query.status) {
      setActiveTab(query.status as string);
    }
  }, [query.status, activeTab]);

  const SHOW_LIST_BASE_ROUTE_CONFIG: Record<string, string> = {
    UNREAD: "supplying",
    ACCEPTED: "sending",
    PENDING: "sending",
    ANSWERED: "sending",
    INPROCESS: "closed",
    CLOSED: "closed",
  };

  return (
    <>
      <DashboardLayout>
        <div className="ev-request-page-wrapper">
          <Title
            titleIcon={editIcon}
            titleText="درخواست‌ها"
            titleSideComponent={
              <div className="requests-title-component">
                <div className="unseen-massages">
                  <span>خوانده نشده</span>
                  <span className="count">{newTickets}</span>
                </div>
                <div className="tabs">
                  <NavLink href="supplying">درحال تامین</NavLink>
                  <NavLink href="sending">درحال ارسال</NavLink>
                  <NavLink href="closed">بسته شده</NavLink>
                </div>
              </div>
            }
          />
          <Divider />

          <div className="requests-list-wrapper">
            <div className="list-head">
              <span>عنوان</span>
              <span>نام مشتری</span>
              <span>تاریخ</span>
              <span>وضعیت درخواست</span>
              <span> وضعیت تیکت</span>
            </div>
            <ul className="list-wrapper">
              {ticketList?.map((item: any, index: any) => (
                <li
                  className={`list-item ${
                    item.status === "PENDING" || item.status === "ACCEPTED"
                      ? "unread-item"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleOpenChat(item.ticket_group, item.id)}
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
                    {JalaliDateTime(dateTimeConfig).toFullText(
                      new Date(item.updated_at)
                    )}
                  </div>
                  <div className="status">
                    <ReqStatusBtn status={item.status} />
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
        </div>
      </DashboardLayout>
      <SeoHead title=" درخواست ها" description="" />
    </>
  );
};

export default Requests;

export const ReqStatusBtn = ({ status }: { status: string }) => {
  const className: Record<string, string> = {
    UNREAD: "pending",
    INPROCESS: "pending",
    CLOSED: "fulfilled",
    ACCEPTED: "pending-2",
    ANSWERED: "pending-2",
    PENDING: "pending-2",
    PROVIDED: "fulfilled",
    RETURNED: "pending-2",
    DELIVERED: "fulfilled",
  };

  const translate: Record<string, string> = {
    UNREAD: "در انتظار تایید ارزیاب",
    ACCEPTED: "در انتظار پیام ارزیاب",
    ANSWERED: "در انتظار پاسخ مشتری",
    PENDING: "در انتظار پاسخ ارزیاب",
    INPROCESS: "در انتظار تامین کننده",
    CLOSED: "بسته شد",
<<<<<<< HEAD
=======
    // PROVIDED: "مشتری پاسخ داده",
    // RETURNED: "در انتظار پاسخ مشتری",
    // DELIVERED: "مشتری پاسخ داده",
>>>>>>> 5b8a04d046544b3be7bc7eb96e7b68e49dcf4914
  };

  return (
    <div className={`btn-status-wrapper ${className[status]} `}>
      {translate[status]}
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
