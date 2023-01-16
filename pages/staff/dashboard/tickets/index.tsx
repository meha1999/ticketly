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

const ticketService = new TicketService();

const Requests = () => {
  const { push: routerPush, query } = useRouter();
  const [activeTab, setActiveTab] = useState("supplying");
  const [ticketList, setTicketList] = useState<any>([]);
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );
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

  const getTicketRequest = async (ticket: Record<string, string>) => {
    if (ticket.status === "UNREAD") {
      try {
        const res = await ticketService.takeTicket(ticket.id, {
          staff: user?.id,
          status: "ACCEPTED",
        });
        Toaster.success("قبول درخواست با موفقیت انجام شد.");
        const newList = ticketList.map((item: any) =>
          item.id === ticket.id ? res.data : item
        );
        setTicketList(newList);
      } catch (error) {
        console.log(error);
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

  return (
    <DashboardLayout>
      <div className="ev-request-page-wrapper">
        <Title
          titleIcon={editIcon}
          titleText="درخواست‌ها"
          titleSideComponent={
            <div className="requests-title-component">
              <div className="unseen-massages">
                <span>خوانده نشده</span>
                <span className="count">4</span>
              </div>
              <div className="tabs">
                <NavLink
                  href="/staff/dashboard/tickets/supplying"
                  className={activeTab === "supplying" ? "active" : ""}
                >
                  درحال تامین
                </NavLink>
                <NavLink
                  href="/staff/dashboard/tickets/sending"
                  className={activeTab === "sending" ? "active" : ""}
                >
                  درحال ارسال
                </NavLink>
                <NavLink
                  href="/staff/dashboard/tickets/closed"
                  className={activeTab === "closed" ? "active" : ""}
                >
                  بسته شده
                </NavLink>
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
                className="list-item"
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
                    {item?.customer?.full_name ?? "نام کاربر یافت نشد"}
                  </span>
                </div>
                <div className="date">
                  {JalaliDateTime(dateTimeConfig).toFullText(
                    new Date(item?.updated_at)
                  )}
                </div>
                <div className="status">
                  <ReqStatusBtn
                    status={item?.status}
                    text="در انتظار پاسخ ارزیاب"
                  />
                </div>
                <div className="ticket">
                  <ReqTicketBtn
                    isClosed={item?.closed}
                    status={item?.status}
                    onClick={() => getTicketRequest(item)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Requests;

export const ReqStatusBtn = ({ status }: { status: string; text: string }) => {
  const className: Record<string, string> = {
    UNREAD: "pending",
    INPROGESS: "pending",
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
    PENDING: "در انتظار پیام ارزیاب",
    ACCEPTED: "در انتظار پاسخ مشتری",
    ANSWERED: "در انتظار پاسخ مشتری",
    INPROCESS: "در انتظار تامین کننده",
    CLOSED: "مشتری پاسخ داده",
    PROVIDED: "مشتری پاسخ داده",
    RETURNED: "در انتظار پاسخ مشتری",
    DELIVERED: "مشتری پاسخ داده",
  };

  return (
    <div className={`btn-status-wrapper ${className[status]} `}>
      {translate[status]}
    </div>
  );
};

export const ReqTicketBtn = ({
  status,
  isClosed,
  onClick,
}: {
  status: string;
  isClosed: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`ticket-status-wrapper ${
        status === "UNREAD" ? "green" : "close"
      }`}
      onClick={onClick}
    >
      {status === "UNREAD" && <BsCheckLg />}
      {status === "UNREAD"
        ? "قبول درخواست"
        : isClosed
        ? "تیکت بسته شده"
        : " بستن تیکت"}
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
