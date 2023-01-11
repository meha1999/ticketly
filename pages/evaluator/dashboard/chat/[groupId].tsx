import ChatComponent from "components/common/chat";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/evaluator";
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
import { useSSE } from "react-hooks-sse";

const chatService = new ChatService();
const ticketService = new TicketService();

const Chat = () => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );
  // const state = useSSE("message", {});
  const [ticketId, setTicketId] = useState<string>("");
  const [group, setGroup] = useState();
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [customerTicket, setCustomerTicket] = useState<any>([]);
  const [suppliersTicket, setSuppliersTicket] = useState<any>([]);

  const { sendJsonMessage, lastMessage, readyState }: any = useWebSocket(
    `${process.env.NEXT_PUBLIC_BASE_RASAD_WS_URL}/ws/chat/${ticketId}/`
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState as number];

  const fetchMessageHistory = async () => {
    try {
      const res = await chatService.allChats(ticketId);
      setMessageHistory(res.data);
    } catch (err) {
      // console.log("err", err);
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
      // console.log("err", err);
    } finally {
    }
  };

  const handleClickSendMessage = useCallback(
    (message: any) =>
      sendJsonMessage({
        message: message,
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
    <DashboardLayout>
      <Title titleText="صفحه چت" titleIcon={chatIcon} />
      <Divider />
      <OrderCompletion
        subject={customerTicket.name}
        name={customerTicket.customer?.username}
        walletCash={customerTicket.customer?.wallet_account?.amount}
        openChat={() => setTicketId(customerTicket.id)}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ChatList
          data={suppliersTicket}
          onChatChange={setTicketId}
          ticketId={ticketId}
          group={group}
          onAddSuplier={fetchGroupInfo}
        />
        <div style={{ width: "75%" }}>
          <ChatComponent
            data={messageHistory}
            onSend={handleClickSendMessage}
            ticketId={ticketId}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;

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
