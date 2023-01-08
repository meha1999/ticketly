import UserIcon from "images/icons/user_icon";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import Seen from "images/icons/seen";

interface MessagePreviewProps {
  profileImage?: string;
  name: string;
  count?: boolean;
  message?: string;
  date?: string;
  color?: string;
  hasSeen: boolean;
}

const MessagePreview: FC<MessagePreviewProps> = ({
  profileImage,
  name,
  message,
  date,
  count,
  color,
  hasSeen,
}) => {
  const first = useRef<HTMLDivElement>(null);
  useEffect(() => {
    first.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [count]);
  return (
    <div className="message-preview" ref={first}>
      <div className="profile-image">
        {profileImage ? (
          <Image src={profileImage} alt="profile" width={42} height={42} />
        ) : (
          <UserIcon color={color!} />
        )}
      </div>
      <span className="name">{name}</span>
      {message && (
        <div className="message">
          <div className="content">{message!}</div>
          <Seen color={`${hasSeen ? "#499DFF" : "#7D7D7D"}`} />
        </div>
      )}
      {date && (
        <div className="date">
          <span>{date}</span>
        </div>
      )}
    </div>
  );
};

export default MessagePreview;
