import Image from "next/image";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Title from "components/common/title";
import Divider from "components/common/divider";
import DashboardLayout from "components/layouts/dashboard/supplier";
import ProfileBold from "public/images/icons/profile_bold1.svg";
//icons
import { BsCheckLg } from "react-icons/bs";
import { FaClipboardCheck } from "react-icons/fa";
import { TicketService } from "services/ticket.service";
import { JalaliDateTime } from "jalali-date-time";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { useRouter } from "next/router";
import { Toaster } from "components/common/toast/Toaster";
import { NavLink } from "src/tools/NavLink";
import ToastComponent from "components/common/toast/ToastComponent";

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
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="خطای سرور"
          />
        );      }
    }
  };

  const handleOpenChat = (ticketId: string) => {
    routerPush(`/supplier/dashboard/chat/${ticketId}/`);
  };

  useEffect(() => {
    if (activeTab !== query.status) {
      setActiveTab(query.status as string);
    }
  }, [query.status, activeTab]);

  return (
    <DashboardLayout>
      <div className="ev-request-page-wrapper">
        <Title svgIcon={<FaClipboardCheck />} titleText="سفارشات" />
        <Divider />
        <div className="requests-list-wrapper">
          <div className="list-head">
            <span>عنوان</span>
            <span>نام ارزیاب قبول کننده</span>
            <span>شناسه گفتگو</span>
            <span>تاریخ </span>
            <span> وضعیت درخواست</span>
          </div>
          <ul className="list-wrapper">
            {ticketList?.map((item: any, index: any) => (
              <li
                className="list-item"
                key={index}
                onClick={() => handleOpenChat(item.id)}
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
                <div className="date">{item.id}</div>
                <div className="date">
                  {JalaliDateTime(dateTimeConfig).toFullText(
                    new Date(item?.updated_at)
                  )}
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

export const ReqTicketBtn = ({
  onClick,
}: {
  status: string;
  isClosed: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="ticket-status-wrapper close" onClick={onClick}>
      تایید و بسته شده
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
