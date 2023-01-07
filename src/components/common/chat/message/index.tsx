import Image from "next/image";
import Microphone from "images/icons/microphone";
import Attach from "images/icons/attach";
import ImageUpload from "images/icons/image_upload";
import sendMessageIcon from "images/icons/send_message.svg";
import React from "react";

interface MessageProps {
  onSend: any;
}

const Message: React.FC<MessageProps> = ({ onSend }) => {
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSend(e.target.firstChild.value);
    e.target.firstChild.value = "";
  };

  return (
    <form className="message-wrapper" onSubmit={handleSubmit}>
      <textarea
        name="content"
        id="content"
        rows={3}
        className="content"
        placeholder="متن پیام خود را در این قسمت بنویسید."
      ></textarea>
      <div className="action-buttons">
        <div className="tools">
          <button type="button" className="tool_btn">
            <Microphone color="#00A48A" />
          </button>
          <button type="button" className="tool_btn">
            <Attach color="#00A48A" />
          </button>
          <button type="button" className="tool_btn">
            <ImageUpload color="#00A48A" />
          </button>
        </div>
        <button type="submit" className="submit_btn">
          <span>ارسال پیام</span>
          <Image src={sendMessageIcon} alt="send-message" />
        </button>
      </div>
    </form>
  );
};

export default Message;
