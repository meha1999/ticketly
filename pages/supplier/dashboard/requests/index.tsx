import Image from "next/image";
import React, { useState } from "react";
import Title from "components/common/title";
import Divider from "components/common/divider";
import editIcon from "public/images/icons/request/edit.svg";
import DashboardLayout from "components/layouts/dashboard/supplier";
import ProfileBold from "public/images/icons/profile_bold1.svg";
import { GetServerSideProps } from "next";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("supplying");
  return (
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
            {[1, 2, 3, 4, 5, 6, 1, 1, 1, 1].map((i, d) => (
              <li className="list-item" key={d}>
                <div className="title">
                  <span className="count">{d + 1}</span>
                  لنت ترمز جلو پراید
                </div>
                <div className="user">
                  <div className="logo">
                    <Image src={ProfileBold} alt="" width={20} height={20} />
                  </div>
                  <span className="name">متین نوروزپور ارزیاب</span>
                </div>
                <div className="date">TY4235689321</div>
                <div className="date">7 دی ماه 1401 14:31 </div>
                <div className="status">
                  <ReqStatusBtn status="answered" />
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

export const ReqStatusBtn = ({ status }: { status: string }) => {
  const className: Record<string, string> = {
    answered: "answered",
    pending: "pending",
  };
  const textTranslator: Record<string, string> = {
    answered: "ارزیاب پاسخ داده",
    pending: "در انتظار پاسخ ارزیاب",
  };
  return (
    <div className={`su-btn-status-wrapper ${className[status]} `}>
      {textTranslator[status]}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/supplier/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};