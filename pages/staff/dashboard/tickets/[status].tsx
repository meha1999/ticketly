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
import { TICKET_STATUS_PERSIAN } from "src/static/statusConfig";
import { TicketStatusChoicesEnum } from "src/model/status";
import { useEventSource } from "react-use-websocket";
import errorHandler from "src/tools/error-handler";

const ticketService = new TicketService();

const Requests = () => {
  const { push: routerPush, query } = useRouter();
  const [activeTab, setActiveTab] = useState("supplying");
  const [ticketList, setTicketList] = useState<any>([]);
  const [newTickets, setNewTickets] = useState<number>(0);

  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const { lastEvent } = useEventSource(
    `${process.env.NEXT_PUBLIC_BASE_RASAD_URL}/events/all/`
  );

  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

  const getTickets = async () => {
    try {
      const ticketRes = await ticketService.getTickets(true);
      const data = ticketRes.data.filter(
        (item: any) => SHOW_LIST_BASE_ROUTE_CONFIG[item.status] === query.status
      );
      const unreadTickets = ticketRes.data.filter(
        (item: any) => SHOW_LIST_BASE_ROUTE_CONFIG[item.status] === "supplying"
      );
      setNewTickets(unreadTickets.length);
      setTicketList(data);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, [query.status, notification, lastEvent]);

  const dateTimeConfig = {
    timezone: "Asia/Tehran",
    locale: "en",
    fullTextFormat: "d N ?????? Y  -  H:I ",
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
            title="???????????? ????????"
            description=" ???????? ?????????????? ???? ???????????? ?????????? ????."
          />
        );
        routerPush(
          `/staff/dashboard/chat/${ticket.ticket_group}?ticketId=${ticket.id}`
        );
        const newList = ticketList.filter((item: any) => item.id !== ticket.id);
        setTicketList(newList);
      } catch (error: any) {
        errorHandler(error);
      }
    }
    if (ticket.status !== "CLOSED " && ticket.status !== "UNREAD") {
      try {
        await ticketService.changeTicketInfo(ticket.id, {
          status: "CLOSED",
        });
        Toaster.success(
          <ToastComponent
            title="???????????? ????????"
            description="???????? ???????? ???? ???????????? ?????????? ????."
          />
        );
        const newList = ticketList.filter((item: any) => item.id !== ticket.id);
        setTicketList(newList);
      } catch (error: any) {
        errorHandler(error);
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
            titleText="?????????????????????"
            titleSideComponent={
              <div className="requests-title-component">
                <div className="unseen-massages">
                  <span>?????????????? ?????? ????????</span>
                  <span className="count">{newTickets}</span>
                </div>
                <div className="tabs">
                  <NavLink href="supplying">???? ????????????</NavLink>
                  <NavLink href="sending">???? ?????? ??????????</NavLink>
                  <NavLink href="closed">??????????</NavLink>
                </div>
              </div>
            }
          />
          <Divider />

          <div className="requests-list-wrapper">
            <div className="list-head">
              <span>??????????</span>
              <span>?????? ??????????</span>
              <span>??????????</span>
              <span>?????????? ??????????????</span>
              <span> ?????????? ????????</span>
            </div>
            <ul className="list-wrapper">
              {ticketList?.map((item: any, index: any) => {
                const unread = notification?.detail.find(
                  (event) => event.ticket_group == item.ticket_group
                );
                return (
                  <li
                    className={`list-item ${
                      item.status === "PENDING" ||
                      item.status === "ACCEPTED" ||
                      !!unread?.unread_message
                        ? "unread-item"
                        : ""
                    } ${item.status !== "UNREAD" ? "hover" : ""}`}
                    key={index}
                    style={{
                      cursor: !(item.status === "UNREAD")
                        ? "pointer"
                        : "default",
                    }}
                    onClick={() =>
                      !(item.status === "UNREAD") &&
                      handleOpenChat(item.ticket_group, item.id)
                    }
                  >
                    <div className="title">
                      <span className="count">{index + 1}</span>
                      {item.name}
                    </div>
                    <div className="user">
                      <div className="logo">
                        <Image
                          src={ProfileBold}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="name">
                        {item.customer?.full_name ?? "?????? ?????????? ???????? ??????"}
                      </span>
                    </div>
                    <div
                      className="date"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div>
                        {JalaliDateTime(dateTimeConfig).toFullText(
                          new Date(item.updated_at)
                        )}
                      </div>
                      <div style={{ direction: "ltr" }}>{item.due_time}</div>
                    </div>
                    <div className="status">
                      <ReqStatusBtn status={item?.status} />
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
                );
              })}
            </ul>
          </div>
        </div>
      </DashboardLayout>
      <SeoHead title=" ?????????????? ????" description="" />
    </>
  );
};

export default Requests;

export const ReqStatusBtn = ({
  status,
}: {
  status: TicketStatusChoicesEnum;
}) => {
  const className: Record<string, string> = {
    UNREAD: "pending",
    INPROCESS: "pending",
    ACCEPTED: "pending-2",
    ANSWERED: "pending-2",
    PENDING: "pending-2",
    CLOSED: "fulfilled",
  };
  return (
    <div className={`btn-status-wrapper ${className[status]} `}>
      {TICKET_STATUS_PERSIAN[status]}
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
    UNREAD: "???????? ??????????????",
    ACCEPTED: "???????? ????????",
    PENDING: "???????? ????????",
    ANSWERED: "???????? ????????",
    INPROCESS: "???? ?????? ??????????",
    CLOSED: "???????? ???????? ??????",
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
