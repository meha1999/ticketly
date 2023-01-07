import DashboardLayout from "components/layouts/dashboard/mechanic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ChatService } from "services/chat.service";

const chatService = new ChatService();

const Chat = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [socketUrl, setSocketUrl] = useState(
    `ws://172.16.151.226:9000/ws/chat/${router.query.ticketId}/`
  );

  useEffect(() => {
    router.query.ticketId &&
      setSocketUrl(
        `ws://172.16.151.226:9000/ws/chat/${router.query.ticketId}/`
      );
    router.query.ticketId && fetchMessageHistory();
  }, [router.query.ticketId]);

  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, sendJsonMessage, lastMessage, readyState }: any =
    useWebSocket(socketUrl);

  const fetchMessageHistory = async () => {
    try {
      const res = await chatService.allChats(router.query.ticketId);
      console.log(res, "ssssss");
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage.data));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        message: "sdsd",
        sender: {
          pk: 5,
        },
        receiver: null,
      }),
    []
  );

  // console.log(messageHistory);

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
      <button
        style={{ padding: "50px", margin: "50px" }}
        onClick={handleClickSendMessage}
      >
        ddddd
      </button>
    </DashboardLayout>
  );
};

export default Chat;
