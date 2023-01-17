import Image from "next/image";
import Microphone from "images/icons/microphone";
import Attach from "images/icons/attach";
import ImageUpload from "images/icons/image_upload";
import sendMessageIcon from "images/icons/send_message.svg";
import { useState } from "react";
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
    // let data = new FormData();
    // data.append("file", audio);
    // const res = await chatService.upload(audio);
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let data = new FormData();
    event.target?.files && data.append("file", event.target.files[0]);
    console.log(data);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      // const res = await chatService.upload(data, config);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handlePhotoUpload = () => {
    console.log("photo");
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
            accept="image/*"
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
