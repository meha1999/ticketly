import Image from "next/image";
import React, { useEffect, useState } from "react";
import Title from "components/common/title";
import Divider from "components/common/divider";
import editIcon from "public/images/icons/request/edit.svg";
import DashboardLayout from "components/layouts/dashboard/evaluator";
import ProfileBold from "public/images/icons/profile_bold1.svg";
import { GetServerSideProps } from "next";
import { BsCheckLg } from "react-icons/bs";
import { TicketService } from "services/ticket.service";

const ticketService = new TicketService();

const Requests = () => {
  const [activeTab, setActiveTab] = useState("supplying");
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const ticketRes = await ticketService.getTickets();
        // setTicketList(ticketRes.data)
        console.log(ticketRes.data);
        
      } catch (error) {}
    };
    getTickets()
  }, []);

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
            {ticketList?.map((i, d) => (
              <li className="list-item" key={d}>
                <div className="title">
                  <span className="count">{d + 1}</span>
                  لنت ترمز عقب پراید
                </div>
                <div className="user">
                  <div className="logo">
                    <Image src={ProfileBold} alt="" width={20} height={20} />
                  </div>
                  <span className="name">متین نوروزپور مکانیک</span>
                </div>
                <div className="date">7 دی ماه 1401 14:31 </div>
                <div className="status">
                  <ReqStatusBtn
                    status="pending"
                    text="در انتظار پاسخ تامین کننده"
                  />
                </div>
                <div className="ticket">
                  <ReqTicketBtn status="take" />
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

export const ReqTicketBtn = ({ status }: { status: string }) => {
  const className: Record<string, string> = {
    take: "take",
    close: "close",
    finished: "close",
  };

  const textTranslator: Record<string, string> = {
    take: " قبول درخواست",
    close: "بستن تیکت",
    finished: "تیکت بسته شده",
  };
  return (
    <div className={`ticket-status-wrapper ${className[status]} `}>
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
