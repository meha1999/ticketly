import Image from "next/image";
import Microphone from "images/icons/microphone";
import Attach from "images/icons/attach";
import ImageUpload from "images/icons/image_upload";
import sendMessageIcon from "images/icons/send_message.svg";
import React, { useEffect, useRef } from "react";
import { ChatService } from "services/chat.service";
import useRecorder from "src/tools/custom-hooks/use-recorder";
import { UseRecorder } from "src/model/recorder";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import VideoUpload from "images/icons/video_uplaod";
import { checkFileInputValidation } from "src/tools/checkFileInputValidation";

const chatService = new ChatService();

interface MessageProps {
  onSend: (
    message: string | number,
    type: "image" | "video" | "file" | "voice" | "text"
  ) => any;
  color: string;
}

const Message: React.FC<MessageProps> = ({ onSend, color }) => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const formRef = useRef<any>();

  const stopMicrophone = async () => {
    try {
      const audioBlob = await fetch(recorderState.audio as string).then((r) =>
        r.blob()
      );
      const audiofile = new File([audioBlob], ".wav", {
        type: "audio/wav",
      });
      const data = new FormData();
      data.append("file", audiofile);
      data.append("file_type", "VOICE");
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const response = await chatService.upload(data, config);
      onSend(response.data.id, "voice");
    } catch (error) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      const isValid = checkFileInputValidation(e.target.files[0].name, "file");
      if (isValid) {
        try {
          const data = new FormData();
          data.append("file", e.target.files[0]);
          data.append("file_type", "FILE");

          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          const response = await chatService.upload(data, config);
          onSend(response.data.id, "file");
          e.target.files = null;
          e.target.value = "";
        } catch (error) {
          Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
        } finally {
        }
      } else {
        e.target.files = null;
        e.target.value = "";
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="لطفا فایل تایپ مناسب اپلود نمایید"
          />
        );
      }
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      const isValid = checkFileInputValidation(e.target.files[0].name, "image");
      if (isValid) {
        try {
          const data = new FormData();
          data.append("file", e.target.files[0]);
          data.append("file_type", "IMAGE");
          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          const response = await chatService.upload(data, config);
          onSend(response.data.id, "image");
          e.target.files = null;
          e.target.value = "";
        } catch (error) {
          Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
        } finally {
        }
      } else {
        e.target.files = null;
        e.target.value = "";
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="لطفا فایل تایپ مناسب اپلود نمایید"
          />
        );
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      const isValid = checkFileInputValidation(e.target.files[0].name, "video");
      if (isValid) {
        try {
          const data = new FormData();
          data.append("file", e.target.files[0]);
          data.append("file_type", "VIDEO");
          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          const response = await chatService.upload(data, config);
          onSend(response.data.id, "video");
          e.target.files = null;
          e.target.value = "";
        } catch (error) {
          Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
        } finally {
        }
      } else {
        e.target.files = null;
        e.target.value = "";
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="لطفا فایل تایپ مناسب اپلود نمایید"
          />
        );
      }
    }
  };

  const handleSendTextMessage = (e: any) => {
    e.preventDefault();
    onSend(e.target.children[1].value, "text");
    e.target.children[1].value = "";
  };

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      formRef?.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  useEffect(() => {
    recorderState.audio && stopMicrophone();
  }, [recorderState.audio]);

  return (
    <form
      className="message-wrapper"
      onSubmit={handleSendTextMessage}
      ref={formRef}
    >
      <div className="tools">
        <button
          type="button"
          title="ضبط صوت"
          className="tool_btn"
          onClick={() => {
            !recorderState.initRecording
              ? handlers.startRecording()
              : handlers.saveRecording();
          }}
        >
          <Microphone
            color={recorderState.initRecording ? "#FA1744" : color}
            classStyle={`${recorderState.initRecording ? "fade-in" : ""}`}
          />
        </button>
        <div className="file-upload">
          <label htmlFor="file-input" className="file-input-label">
            <button type="button" className="tool_btn">
              <Attach color={color} />
            </button>
          </label>
          <input
            id="file-input"
            type="file"
            className="file-input"
            title="آپلود فایل"
            accept=".rar, .zip, .txt, .pdf, .docx , .xlsx , .mp4 ,.mov , .mp3,. png, .jpg, .jpeg , .mkv, .gif "
            onChange={handleFileUpload}
          />
        </div>
        <div className="file-upload">
          <label htmlFor="photo" className="file-input-label">
            <button type="button" className="tool_btn">
              <ImageUpload color={color} />
            </button>
          </label>
          <input
            type="file"
            id="photo"
            accept=".png, .jpg, .jpeg "
            className="file-input"
            title="آپلود تصویر"
            onChange={handlePhotoUpload}
          />
        </div>
        <div className="file-upload">
          <label htmlFor="video" className="file-input-label">
            <button type="button" className="tool_btn">
              <VideoUpload color={color} />
            </button>
          </label>
          <input
            type="file"
            id="video"
            accept=".mkv, .mp4 ,.mov"
            className="file-input"
            title="آپلود ویدیو"
            onChange={handleVideoUpload}
          />
        </div>
      </div>
      <textarea
        name="content"
        id="content"
        className="content"
        rows={1}
        placeholder="متن پیام خود را در این قسمت بنویسید."
        onKeyDown={onEnterPress}
      />
      <button
        type="submit"
        className="submit_btn"
        style={{
          backgroundColor: `${color}`,
          boxShadow: `0px 10px 20px ${color}35`,
        }}
      >
        <span className="text">ارسال پیام</span>
        <Image src={sendMessageIcon} alt="send-message" />
      </button>
    </form>
  );
};

export default Message;
