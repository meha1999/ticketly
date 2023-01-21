import Image from "next/image";
import Microphone from "images/icons/microphone";
import Attach from "images/icons/attach";
import ImageUpload from "images/icons/image_upload";
import sendMessageIcon from "images/icons/send_message.svg";
import React from "react";
import { ChatService } from "services/chat.service";
import useRecorder from "src/tools/custom-hooks/use-recorder";
import { UseRecorder } from "src/model/recorder";

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

  const stopMicrophone = async () => {
    handlers.saveRecording();
    try {
      const audioBlob = await fetch(recorderState.audio as string).then((r) =>
        r.blob()
      );
      const audiofile = new File([audioBlob], ".wav", {
        type: "audio/wav",
      });
      console.log(audiofile);
      const data = new FormData();
      data.append("file", audiofile);
      data.append("file_type", "FILE");
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const response = await chatService.upload(data, config);
      onSend(response.data.id, "voice");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("file_type", "FILE");

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await chatService.upload(data, config);
        onSend(response.data.id, "file");
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("file_type", "IMAGE");
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await chatService.upload(data, config);
        onSend(response.data.id, "image");
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const handleSendTextMessage = (e: any) => {
    e.preventDefault();
    onSend(e.target.children[1].value, "text");
    e.target.children[1].value = "";
  };

  return (
    <form className="message-wrapper" onSubmit={handleSendTextMessage}>
      <div className="tools">
        <button
          type="button"
          className="tool_btn"
          onClick={() => {
            !recorderState.initRecording
              ? handlers.startRecording()
              : stopMicrophone();
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
            title=""
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
            accept=".png, .jpg, .jpeg"
            className="file-input"
            title=""
            onChange={handlePhotoUpload}
          />
        </div>
      </div>
      <textarea
        name="content"
        id="content"
        className="content"
        rows={1}
        placeholder="متن پیام خود را در این قسمت بنویسید."
      ></textarea>
      <button
        type="submit"
        className="submit_btn"
        style={{
          backgroundColor: `${color}`,
          boxShadow: `0px 10px 20px ${color}`,
        }}
      >
        <span>ارسال پیام</span>
        <Image src={sendMessageIcon} alt="send-message" />
      </button>
    </form>
  );
};

export default Message;
