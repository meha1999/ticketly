import Image from "next/image";
import React, { useEffect, useState } from "react";
import Title from "components/common/title";
import Divider from "components/common/divider";
import editIcon from "public/images/icons/request/edit.svg";
import DashboardLayout from "components/layouts/dashboard/supplier";
import ProfileBold from "public/images/icons/profile_bold1.svg";
import { GetServerSideProps } from "next";
import SeoHead from "components/common/seo-head";
import { useRouter } from "next/router";
import { TicketService } from "services/ticket.service";
import { JalaliDateTime } from "jalali-date-time";

const ticketService = new TicketService();

const pageConfig: Record<string, string> = {
  UNREAD: "supplying",
  ACCEPTED: "sending",
  ANSWERED: "sending",
  INPROCESS: "sending",
};
const dateTimeConfig = {
  timezone: "Asia/Tehran",
  locale: "en",
  fullTextFormat: "d N ماه Y  -  H:I ",
  titleFormat: "W, D N Y ",
  dateFormat: "Y-M-D",
  timeFormat: "H:I:S",
};

const Requests = () => {
  const [activeTab, setActiveTab] = useState("supplying");
  const [ticketList, setTicketList] = useState([]);
  const { push: routerPush, query } = useRouter();

  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets();
      const data = ticketRes.data.filter(
        (item: any) => pageConfig[item.status] === activeTab
      );
      setTicketList(data);
    } catch (error) {
      setTicketList([]);
    }
  };

  useEffect(() => {
    getTickets();
  }, [query.status, activeTab]);

  return (
    <>
      <DashboardLayout>
        <div className="su-request-page-wrapper">
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
                    در انتظار ارزیاب
                  </button>
                  <button
                    className={activeTab === "sending" ? "active" : ""}
                    onClick={() => setActiveTab("sending")}
                  >
                    ارزیاب پاسخ داده
                  </button>
                </div>
              </div>
            }
          />
          <Divider />

          <div className="requests-list-wrapper">
            <div className="list-head">
              <span>عنوان</span>
              <span>نام ارزیاب قبول کننده</span>
              <span>شناسه گفتگو</span>
              <span>تاریخ</span>
              <span> وضعیت درخواست</span>
            </div>
            <ul className="list-wrapper">
              {ticketList?.map((ticket: any, index: number) => (
                <li className="list-item" key={ticket.id}>
                  <div className="title">
                    <span className="count">{index + 1}</span>
                    {ticket.name}
                  </div>
                  <div className="user">
                    <div className="logo">
                      <Image src={ProfileBold} alt="" width={20} height={20} />
                    </div>
                    <span className="name">
                      {ticket.customer ?? "بدون برند"}
                    </span>
                  </div>
                  <div className="date">{ticket.id}</div>
                  <div className="date">
                    {JalaliDateTime(dateTimeConfig).toFullText(
                      new Date(ticket.updated_at)
                    )}
                  </div>
                  <div className="status">
                    <ReqStatusBtn status={ticket.status} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DashboardLayout>
      <SeoHead title="درخواست ها" description="" />
    </>
  );
};

export default Requests;

export const ReqStatusBtn = ({ status }: { status: string }) => {
  const className: Record<string, string> = {
    ANSWERED: "answered",
    ACCEPTED: "answered",
    PENDING: "pending",
    INPROCESS: "pending",
    UNREAD: "pending",
  };
  const translate: Record<string, string> = {
    UNREAD: "در انتظار تایید ارزیاب",
    ACCEPTED: "در انتظار پاسخ مشتری",
    ANSWERED: "در انتظار پاسخ مشتری",
    INPROCESS: "در انتظار تامین کننده",
    CLOSED: "مشتری پاسخ داده",
  };
  return (
    <div className={`su-btn-status-wrapper ${className[status]} `}>
      {translate[status]}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/supplier/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
