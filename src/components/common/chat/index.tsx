import VerticalPrevious from "images/icons/vertical_previous";
import VerticalNext from "images/icons/vertical_next";
import MessagePreview from "./message-preview";
import Message from "./message";
import { useEffect, useRef, useState } from "react";
import { JalaliDateTime } from "jalali-date-time";
import { useRouter } from "next/router";
import { TicketService } from "services/ticket.service";

const dateTimeConfig = {
  timezone: "Asia/Tehran",
  locale: "en",
  fullTextFormat: "H:I - Y/N/d",
  titleFormat: "W, D N Y ",
  dateFormat: "Y-M-D",
  timeFormat: "H:I:S",
};

const userType: Record<string, string> = {
  staff: "#5E7BEC",
  customer: "#00A48A",
  supplier: "#F2C901",
  superuser: "#505050",
};

interface ChatComponentProps {
  data: Array<any>;
  ticketId: any;
  onSend: (message: any) => any;
}

const ticketService = new TicketService();

const ChatComponent: React.FC<ChatComponentProps> = ({
  data,
  ticketId,
  onSend,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [scrollIndex, setScrollIndex] = useState<number>(data?.length);
  const [ticketInfo, setTicketInfo] = useState<any>();

  const goUpMessage = () => {
    if (scrollIndex - 1 < 0) return;
    setScrollIndex(scrollIndex - 1);
  };

  const goDownMessage = () => {
    if (scrollIndex + 1 > data.length) return;
    setScrollIndex(scrollIndex + 1);
  };

  useEffect(() => {
    setScrollIndex(data?.length);
  }, [data]);

  const handleFetchTicket = async () => {
    try {
      console.log(ticketId)
      const res = await ticketService.getTicketById(ticketId);
      setTicketInfo(res.data);
    } catch (err) {
      // console.log("err", err);
    } finally {
    }
  };

  useEffect(() => {
    ticketId&& handleFetchTicket();
  }, [ticketId]);

  return (
    <div className="chat">
      <div className="heading">
        <h2 className="title">{ticketInfo?.name}</h2>
        <div className="chat-id">
          <span>{"شناسه گفتگو:"}</span>
          <span>{ticketInfo?.id}</span>
        </div>
        <div className="nav-buttons">
          <button
            className="nav-button"
            onClick={goUpMessage}
            style={{ borderColor: `${userType[router.asPath.split("/")[1]]}` }}
          >
            <VerticalPrevious color={userType[router.asPath.split("/")[1]]} />
          </button>
          <button
            onClick={goDownMessage}
            className="nav-button"
            style={{ borderColor: `${userType[router.asPath.split("/")[1]]}` }}
          >
            <VerticalNext color={userType[router.asPath.split("/")[1]]} />
          </button>
        </div>
      </div>
      <div className="messages-list">
        {data?.map((item, index) => (
          <MessagePreview
            key={index}
            hasSeen={item.seen}
            message={item.content}
            name={item.sender.username}
            profileImage={item.sender.photo}
            color={userType[item.sender.role]}
            count={scrollIndex === index + 1}
            date={JalaliDateTime(dateTimeConfig).toFullText(
              new Date(item.created_at)
            )}
          />
        ))}
        <div ref={ref}></div>
      </div>
      <Message color={userType[router.asPath.split("/")[1]]} onSend={onSend} />
    </div>
  );
};

export default ChatComponent;
