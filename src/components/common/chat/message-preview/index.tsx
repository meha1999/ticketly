import UserIcon from "images/icons/user_icon";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";
import Seen from "images/icons/seen";
import ImageMassageViewer from "../ImageMassageViewer";
import FileMassageDownloader from "../FileMassageDownloader";
import VideoMassageViewer from "../VideoMassageViewer";
import VoiceMassageDownloader from "../VoiceMassageViewer";

interface MessagePreviewProps {
  profileImage: string;
  name: string;
  count?: boolean;
  message?: string;
  date?: string;
  color: string;
  hasSeen: boolean;
  file: any;
}

const MessagePreview: FC<MessagePreviewProps> = ({
  profileImage,
  name,
  message,
  date,
  count,
  color,
  hasSeen,
  file,
}) => {
  const first = useRef<HTMLDivElement>(null);
  useEffect(() => {
    first.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }, [count]);

  const fileViewerHandler = (file: any) => {
    const Components: Record<string, any> = {
      IMAGE: (
        <ImageMassageViewer thumbImg={file.file_pic} bigImage={file.file} />
      ),
      FILE: (
        <FileMassageDownloader
          fileDownloadSrc={file.file}
          fileSize={file.size}
        />
      ),
      VIDEO: <VideoMassageViewer videoSrc={file.file} />,
      VOICE: <VoiceMassageDownloader voiceSrc={file.file} fileSize={file.size} />,
    };
    return Components[file.file_type] || "";
  };

  return (
    <div className="message-preview" ref={first}>
      <div className="profile-image">
        {profileImage ? (
          <Image src={profileImage} alt="profile" width={42} height={42} />
        ) : (
          <UserIcon color={color} />
        )}
      </div>
      <span className="name">{name}</span>
      {!message?.length ? (
        <div className="message">{fileViewerHandler(file)}</div>
      ) : (
        <div className="message">
          <div className="content">{message}</div>
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
