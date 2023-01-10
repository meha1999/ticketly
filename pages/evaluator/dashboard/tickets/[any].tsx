import Image from "next/image";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Title from "components/common/title";
import Divider from "components/common/divider";
import DashboardLayout from "components/layouts/dashboard/evaluator";
import ProfileBold from "public/images/icons/profile_bold1.svg";
//icons
import { BsCheckLg } from "react-icons/bs";
import editIcon from "public/images/icons/request/edit.svg";
import { TicketService } from "services/ticket.service";
import { JalaliDateTime } from "jalali-date-time";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { Toaster } from "components/common/toast/Toaster";
import { useRouter } from "next/router";

const ticketService = new TicketService();

const Requests = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("supplying");
  const [ticketList, setTicketList] = useState([]);
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

  const getTicketRequest = async (id: string) => {
    try {
      const res = await ticketService.takeTicket(id, { staff: user?.id });
      console.log(res.data);
    } catch (error) {}
  };

  const handleOpenChat = (groupId: string, ticketId: string) => {
    router.push(`/evaluator/dashboard/chat/${groupId}?ticketId=${ticketId}`);
  };

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
                <button
                  className={activeTab === "supplying" ? "active" : ""}
                  onClick={() => setActiveTab("supplying")}
                >
                  درحال تامین
                </button>
                <button
                  className={activeTab === "sending" ? "active" : ""}
                  onClick={() => setActiveTab("sending")}
                >
                  درحال ارسال
                </button>
                <button
                  className={activeTab === "closing" ? "active" : ""}
                  onClick={() => setActiveTab("closing")}
                >
                  بسته شده
                </button>
              </div>
            </div>
          }
        />
        <Divider />

        <div className="requests-list-wrapper">
          <div className="list-head">
            <span>عنوان</span>
            <span>نام مکانیک</span>
            <span>تاریخ</span>
            <span>وضعیت درخواست</span>
            <span> وضعیت تیکت</span>
          </div>
          <ul className="list-wrapper">
            {ticketList?.map((item: any, index) => (
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
                  <span className="name">{item.description}</span>
                </div>
                <div className="date">
                  {JalaliDateTime(dateTimeConfig).toFullText(
                    new Date(item.updated_at)
                  )}
                </div>
                <div className="status">
                  <ReqStatusBtn status="pending" text="در انتظار پاسخ ارزیاب" />
                </div>
                <div className="ticket">
                  <ReqTicketBtn
                    status={item.status}
                    onClick={() => getTicketRequest(item.id)}
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

export const ReqStatusBtn = ({
  status,
  text,
}: {
  status: string;
  text: string;
}) => {
  const className: Record<string, string> = {
    pending: "pending",
    fulfilled: "fulfilled",
    pending2: "pending-2",
  };
  return (
    <div className={`btn-status-wrapper ${className[status]} `}>{text}</div>
  );
};

export const ReqTicketBtn = ({
  status,
  onClick,
}: {
  status: string;
  onClick: () => void;
}) => {
  const className: Record<string, string> = {
    UNREAD: "unread",
    close: "close",
    finished: "close",
  };

  const textTranslator: Record<string, string> = {
    UNREAD: " قبول درخواست",
    close: "بستن تیکت",
    finished: "تیکت بسته شده",
  };
  return (
    <div
      className={`ticket-status-wrapper ${className[status]} `}
      onClick={onClick}
    >
      {status && <BsCheckLg />}
      {textTranslator[status]}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/evaluator/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
