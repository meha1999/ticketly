import { FC } from "react";
import useUserTypeFinder from "src/tools/custom-hooks/useUserType";

interface VideoMassageViewerProps {
  videoSrc: string;
}

const VideoMassageViewer: FC<VideoMassageViewerProps> = ({ videoSrc }) => {
  const { userColorConfig } = useUserTypeFinder();

  return (
    <div
      className="video-massage-viewer-wrapper"
      style={{ outlineColor: userColorConfig }}
    >
      <video controls>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoMassageViewer;
