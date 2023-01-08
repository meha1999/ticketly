import VerticalPrevious from "images/icons/vertical_previous";
import VerticalNext from "images/icons/vertical_next";
import MessagePreview from "./message-preview";
import img from "images/auth/admin.svg";
import Message from "./message";
import { useEffect, useRef } from "react";
import { JalaliDateTime } from "jalali-date-time";
import { useRouter } from "next/router";

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
  evaluator: "#5E7BEC",
  customer: "#00A48A",
  mechanic: "#00A48A",
  supplier: "#F2C901",
};

interface ChatComponentProps {
  data: Array<any>;
  onSend: any;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ data, onSend }) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    console.log(ref.current);
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <div className="chat">
      <div className="heading">
        <h2 className="title">{"لنت ترمز جلو پراید"}</h2>
        <div className="chat-id">
          <span>{"شناسه گفتگو:"}</span>
          <span>{"TY4235689321"}</span>
        </div>
        <div className="nav-buttons">
          <button
            className="nav-button"
            style={{ borderColor: `${userType[router.asPath.split("/")[1]]}` }}
          >
            <VerticalPrevious color={userType[router.asPath.split("/")[1]]} />
          </button>
          <button
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
            profileImage={item.sender.photo}
            color={userType[item.sender.role]}
            name={item.sender.username}
            message={item.content}
            date={JalaliDateTime(dateTimeConfig).toFullText(
              new Date(item.created_at)
            )}
          />
        ))}
        <div ref={ref}></div>
      </div>
      <MessagePreview
        profileImage={img}
        // color={userType["mechanic"]}
        name="متین نوروزپور"
        // message=""
        date="7 دی ماه 1401 13:19"
      />
      <Message color={userType[router.asPath.split("/")[1]]} onSend={onSend} />
    </div>
  );
};

export default ChatComponent;
