import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { formatBytes } from "src/tools/bitTobite";
import { RxDownload } from "react-icons/rx";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import useUserTypeFinder from "src/tools/custom-hooks/useUserType";

interface FileMassageDownloaderProps {
  voiceSrc: string;
  fileSize: number;
}

const VoiceMassageDownloader: FC<FileMassageDownloaderProps> = ({
  voiceSrc,
  fileSize = 0,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { userColorConfig } = useUserTypeFinder();
  const [audioContext, setAudioContext] = useState("");
  const audio = new Audio();
  const audioRef = useRef<HTMLAudioElement>(null);

  // const downloadFileData = async () => {
  //   const data = await axios.get(voiceSrc, {
  //     responseType: "blob",
  //     onDownloadProgress: (progressEvent) => {
  //       let percentCompleted = Math.round(
  //         (progressEvent.loaded * 100) / (progressEvent.total || 1)
  //       );
  //       setPercentage(percentCompleted);
  //     },
  //   });
  //   const url = URL.createObjectURL(data.data);
  //   audio.src = url;
  //   setAudioContext(url);
  // };

  const playAndPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const filePathArr = voiceSrc.split("/");
  const fileName = filePathArr[filePathArr.length - 1];

  return (
    <div
      className="file-download-massage-wrapper"
      style={{ background: userColorConfig + "20", color: userColorConfig }}
    >
      <span>{formatBytes(fileSize)}</span>
      <div className="file-detail">
        <p>
          {fileName.length > 23
            ? fileName.substring(0, 23) +
              "..." +
              fileName.split(".")[fileName.split(".").length - 1]
            : fileName}
        </p>
        <button className="download" style={{ background: userColorConfig }}>
          {downloaded ? (
            isPlaying ? (
              <BsFillPauseFill onClick={playAndPause} />
            ) : (
              <BsFillPlayFill onClick={playAndPause} />
            )
          ) : (
            <RxDownload
              onClick={() => {
                setDownloaded(true);
              }}
            />
          )}
        </button>
        <audio
          ref={audioRef}
          src={voiceSrc}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default VoiceMassageDownloader;
