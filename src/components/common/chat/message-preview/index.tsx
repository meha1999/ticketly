import UserIcon from "images/icons/user_icon";
import Image from "next/image";
import seenIcon from "images/icons/seen.svg";
import { FC } from "react";

interface MessagePreviewProps {
  profileImage?: string;
  name: string;
  message?: string;
  date: string;
  color?: string;
}

const MessagePreview: FC<MessagePreviewProps> = ({
  profileImage,
  name,
  message,
  date,
  color,
}) => {
  return (
    <div className="message-preview">
      <div className="profile-image">
        {profileImage ? (
          <Image src={profileImage} alt="profile" width={42} height={42} />
        ) : (
          <UserIcon color={color!} />
        )}
      </div>
      <span className="name">{name}</span>
      <div className="message">
        <div className="content">{message!}</div>
        {message && <Image src={seenIcon} alt="seen" />}
      </div>
      <div className="date">
        <span>{date}</span>
      </div>
    </div>
  );
};

export default MessagePreview;
