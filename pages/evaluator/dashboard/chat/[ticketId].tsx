import ChatComponent from "components/common/chat";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/evaluator";
import ChatList from "components/pure/chat-list";
import OrderCompletion from "components/pure/order-completion";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ChatService } from "services/chat.service";
import chatIcon from "images/icons/chat_page.svg";
import Divider from "components/common/divider";

const chatService = new ChatService();

const Chat = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [socketUrl, setSocketUrl] = useState(
    `${process.env.NEXT_PUBLIC_BASE_RASAD_WS_URL}/ws/chat/${router.query.ticketId}/`
  );

  useEffect(() => {
    router.query.ticketId &&
      setSocketUrl(
        `${process.env.NEXT_PUBLIC_BASE_RASAD_WS_URL}/ws/chat/${router.query.ticketId}/`
      );
    router.query.ticketId && fetchMessageHistory();
  }, [router.query.ticketId]);

  const [messageHistory, setMessageHistory] = useState<any>([]);

  const { sendJsonMessage, lastMessage, readyState }: any =
    useWebSocket(socketUrl);

  const fetchMessageHistory = async () => {
    try {
      const res = await chatService.allChats(router.query.ticketId);
      setMessageHistory(res.data);
    } catch (err) {
      // console.log("err", err);
    } finally {
    }
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setMessageHistory((prev: any) => [...prev, data]);
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    (message: any) =>
      sendJsonMessage({
        message: message,
        sender: {
          pk: 5,
        },
        receiver: null,
      }),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState as number];

  useEffect(() => {});
  return (
    <DashboardLayout>
      <Title titleText="صفحه چت" titleIcon={chatIcon} />
      <Divider />
      <OrderCompletion
        subject="لنت ترمز جلو پراید "
        name="متین نوروزپور"
        address="تهران، خیابان انقلاب، خیابان جمالزاده، نبش کوچه شهرزاد"
        walletCash={13500000}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ChatList />
        <div style={{ width: "75%" }}>
          <ChatComponent
            data={messageHistory}
            onSend={handleClickSendMessage}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/evaluator/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};