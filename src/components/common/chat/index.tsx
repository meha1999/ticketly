import VerticalPrevious from "images/icons/vertical_previous";
import VerticalNext from "images/icons/vertical_next";
import MessagePreview from "./message-preview";
import Message from "./message";
import { useEffect, useRef, useState } from "react";
import { JalaliDateTime } from "jalali-date-time";
import { useRouter } from "next/router";
import { TicketService } from "services/ticket.service";
import ToastComponent from "../toast/ToastComponent";
import { Toaster } from "../toast/Toaster";
import errorHandler from "src/tools/error-handler";

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
  onSend: (
    message: string | number,
    type: "image" | "video" | "file" | "voice" | "text"
  ) => any;
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
      const res = await ticketService.getTicketById(ticketId);
      setTicketInfo(res.data);
    } catch (error: any) {
      errorHandler(error);
    } finally {
    }
  };

  useEffect(() => {
    ticketId && handleFetchTicket();
  }, [ticketId]);

  return (
    <div className="chat">
      <div className="heading">
        <div className="info">
          <h2 className="title">
            {ticketInfo?.name} {ticketInfo?.count ?? "1"} ??????
          </h2>
          <div className="bread-crumb">
            {ticketInfo?.product_category ? (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="fullCircle"></div>
                  {
                    ticketInfo?.product_category?.trunk_category?.root_category
                      ?.name
                  }
                  <div style={{ marginRight: 10 }}>/</div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="fullCircle"></div>
                  {ticketInfo?.product_category?.trunk_category?.name}
                  <div style={{ marginRight: 10 }}>/</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="fullCircle"></div>
                  {ticketInfo?.product_category?.name}
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="fullCircle"></div>
                  {ticketInfo?.service_category?.name}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="chat-id">
          <span>{"?????????? ??????????:"}</span>
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
            message={item.text}
            file={item.file}
            name={item.sender.full_name}
            profileImage={item.sender.photo}
            color={userType[item.sender.role]}
            count={scrollIndex}
            index={index}
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
