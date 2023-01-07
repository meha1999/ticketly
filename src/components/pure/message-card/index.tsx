import UserIcon from "images/icons/user_icon";
import { FC } from "react";
import Image from "next/image";

interface MessageCardProps {
  profileImage?: string;
  name: string;
  message: string;
  unreadMessagesCount: number;
  time: string;
}

const MessageCard: FC<MessageCardProps> = ({
  profileImage,
  name,
  message,
  unreadMessagesCount,
  time,
}) => {
  return (
    <div className="message-card">
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
        {unreadMessagesCount !== 0 && (
          <div className="count">{unreadMessagesCount}</div>
        )}
        <span>{time}</span>
      </div>
    </div>
  );
};

export default MessageCard;
