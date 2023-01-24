import ChatComponent from "components/common/chat";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/staff";
import ChatList from "components/pure/chat-list";
import OrderCompletion from "components/pure/order-completion";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ChatService } from "services/chat.service";
import chatIcon from "images/icons/chat_page.svg";
import Divider from "components/common/divider";
import { TicketService } from "services/ticket.service";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import SeoHead from "components/common/seo-head";

const chatService = new ChatService();
const ticketService = new TicketService();

const Chat = () => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const token: any = useSelector<ReduxStoreModel, ReduxStoreModel["token"]>(
    (store: ReduxStoreModel) => store.token
  );

  const [ticketId, setTicketId] = useState<string>("");
  const [group, setGroup] = useState();
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [customerTicket, setCustomerTicket] = useState<any>([]);
  const [suppliersTicket, setSuppliersTicket] = useState<any>([]);

  const { sendJsonMessage, lastMessage, readyState }: any = useWebSocket(
    `${process.env.NEXT_PUBLIC_BASE_RASAD_WS_URL}/ws/chat/${ticketId}/`,
    { queryParams: { token: token } }
  );

  const fetchMessageHistory = async () => {
    try {
      const res = await chatService.allChats(ticketId);
      setMessageHistory(res.data);
    } catch (err) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    } finally {
    }
  };

  const fetchGroupInfo = async () => {
    try {
      const res = await ticketService.getGroups(router.query.groupId as string);
      setGroup(res.data);
      const mechanics = res?.data?.ticket_group?.filter(
        (item: any) => item.negotiant === "customer"
      );
      !router.query.ticketId && setTicketId(mechanics[0].id);
      const suppliers = res?.data?.ticket_group?.filter(
        (item: any) => item.negotiant !== "customer"
      );

      setCustomerTicket(mechanics.length ? mechanics[0] : {});
      setSuppliersTicket(suppliers);
    } catch (err) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    } finally {
    }
  };

  const handleClickSendMessage = useCallback(
    (
      message: string | number,
      type?: "image" | "video" | "file" | "voice" | "text"
    ) =>
      sendJsonMessage({
        text: type === "text" ? message : null,
        file: type !== "text" ? message : null,
        sender: {
          pk: user?.id,
        },
        receiver: null,
      }),
    []
  );

  useEffect(() => {
    ticketId && fetchMessageHistory();
  }, [ticketId]);

  useEffect(() => {
    router.query.groupId && fetchGroupInfo();
  }, [router.query.groupId]);

  useEffect(() => {
    router.query.ticketId && setTicketId(router.query.ticketId as string);
  }, [router.query.ticketId]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessageHistory((prev: any) => [...prev, data]);
    }
  }, [lastMessage, setMessageHistory]);

  return (
    <>
      <DashboardLayout>
        <Title titleText="صفحه چت" titleIcon={chatIcon} />
        <Divider />
        <OrderCompletion
          ticketSubject={customerTicket.name}
          customerName={customerTicket.customer?.full_name}
          customerWalletCash={customerTicket.customer?.wallet_account?.amount}
          customerPhoto={customerTicket.customer?.photo}
          customerId={customerTicket.customer?.id}
          ticketStatus={customerTicket.status}
          openChat={() => setTicketId(customerTicket.id)}
          selectedTikcet={ticketId}
          ticketId={customerTicket.id}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ChatList
            data={suppliersTicket}
            onChatChange={setTicketId}
            ticketId={ticketId}
            group={group}
            onAddSuplier={fetchGroupInfo}
          />
          <div style={{ width: "75%", maxHeight: 500 }}>
            <ChatComponent
              data={messageHistory}
              onSend={handleClickSendMessage}
              ticketId={ticketId}
            />
          </div>
        </div>
      </DashboardLayout>
      <SeoHead title="چت" description="" />
    </>
  );
};

export default Chat;

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
