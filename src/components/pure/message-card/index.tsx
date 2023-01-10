import UserIcon from "images/icons/user_icon";
import { FC } from "react";
import Image from "next/image";
import { JalaliDateTime } from "jalali-date-time";

const dateTimeConfig = {
  timezone: "Asia/Tehran",
  locale: "en",
  fullTextFormat: "H:I",
  titleFormat: "W, D N Y ",
  dateFormat: "Y-M-D",
  timeFormat: "H:I:S",
};

interface MessageCardProps {
  profileImage: string;
  name: string;
  message: string;
  unreadMessagesCount?: number;
  time: string;
  onChatChange: () => {};
}

const MessageCard: FC<MessageCardProps> = ({
  profileImage,
  name,
  message,
  unreadMessagesCount,
  time,
  onChatChange,
}) => {
  return (
    <div className="message-card" onClick={onChatChange}>
      <div className="profile-image">
        {profileImage ? (
          <Image src={profileImage} alt="profile" width={43} height={43} />
        ) : (
          <UserIcon color="#F3C701" />
        )}
      </div>
      <div className="name-and-message">
        <span className="name">{name}</span>
        <div className="message">{message}</div>
      </div>
      <div className="notification-and-time">
        {unreadMessagesCount && (
          <div className="count">{unreadMessagesCount}</div>
        )}
        <span>{JalaliDateTime(dateTimeConfig).toFullText(new Date(time))}</span>
      </div>
    </div>
  );
};

export default MessageCard;
