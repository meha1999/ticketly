import Image from "next/image";
import Microphone from "images/icons/microphone";
import Attach from "images/icons/attach";
import ImageUpload from "images/icons/image_upload";
import sendMessageIcon from "images/icons/send_message.svg";
import React, { FormEvent, useState } from "react";
import { ChatService } from "services/chat.service";

const chatService = new ChatService();

interface MessageProps {
  onSend: any;
  color: string;
}

const Message: React.FC<MessageProps> = ({ onSend, color }) => {
  const [audio, setAudio] = useState<any>(null);

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audio);
  };

  const stopMicrophone = async () => {
    if (!audio) {
      return;
    } else {
      try {
        const voice = new Blob([audio], { type: "audio/wav" });
        const data = new FormData();
        data.append("file", audio);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        // const response = await chatService.upload(data, config);
        // onSend(response.data.file);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    audio.getTracks().forEach((track: any) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await chatService.upload(data, config);
        onSend(response.data.file);
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
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const response = await chatService.upload(data, config);
        onSend(response.data.file_pic);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSend(e.target.children[1].value);
    e.target.children[1].value = "";
  };

  return (
    <form className="message-wrapper" onSubmit={handleSubmit}>
      <div className="tools">
        <button type="button" className="tool_btn" onClick={toggleMicrophone}>
          <Microphone
            color={audio ? "#FA1744" : color}
            classStyle={`${audio ? "fade-in" : ""}`}
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
