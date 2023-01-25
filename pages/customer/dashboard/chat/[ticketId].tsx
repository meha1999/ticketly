import ChatComponent from "components/common/chat";
import SeoHead from "components/common/seo-head";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import DashboardLayout from "components/layouts/dashboard/customer";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { ChatService } from "services/chat.service";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const chatService = new ChatService();

const Chat = () => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const token: any = useSelector<ReduxStoreModel, ReduxStoreModel["token"]>(
    (store: ReduxStoreModel) => store.token
  );

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

  const { sendJsonMessage, lastMessage, readyState }: any = useWebSocket(
    socketUrl,
    { queryParams: { token: token } }
  );

  const fetchMessageHistory = async () => {
    try {
      const res = await chatService.allChats(router.query.ticketId);
      setMessageHistory(res.data);
    } catch (err) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    } finally {
    }
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      !messageHistory[messageHistory.length - 1]?.seen &&
        data.sender.id !== user?.id &&
        messageHistory.map((item: any) => (item.seen = true));
      setMessageHistory((prev: any) => [...prev, data]);
    }
  }, [lastMessage, setMessageHistory]);

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

  return (
    <>
      <DashboardLayout>
        <ChatComponent
          data={messageHistory}
          onSend={handleClickSendMessage}
          ticketId={router.query.ticketId}
        />
      </DashboardLayout>
      <SeoHead title="چت" description="" />
    </>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/customer/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
