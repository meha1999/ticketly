import Image from "next/image";
import Microphone from "images/icons/microphone";
import Attach from "images/icons/attach";
import ImageUpload from "images/icons/image_upload";
import sendMessageIcon from "images/icons/send_message.svg";

interface MessageProps {
  onSend: any;
  color: string;
}

const Message: React.FC<MessageProps> = ({ onSend, color }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSend(e.target.firstChild.value);
    e.target.firstChild.value = "";
  };

  return (
    <form className="message-wrapper" onSubmit={handleSubmit}>
      <div className="tools">
        <button type="button" className="tool_btn">
          <Microphone color={color} />
        </button>
        <button type="button" className="tool_btn">
          <Attach color={color} />
        </button>
        <button type="button" className="tool_btn">
          <ImageUpload color={color} />
        </button>
      </div>
      <textarea
        name="content"
        id="content"
        rows={2}
        className="content"
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
