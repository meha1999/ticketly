import Link from "next/link";
import Image from "next/image";
import returnIcon from "images/icons/return_to_requests.svg";
import VerticalPrevious from "images/icons/vertical_previous";
import VerticalNext from "images/icons/vertical_next";

const Chat = () => {
  return (
    <div className="chat">
      <Link href="/" className="return-to-requests">
        <Image src={returnIcon} alt="return" />
        <span>{"بازگشت به درخواست‌ها"}</span>
      </Link>
      <div className="heading">
        <h2 className="title">{"لنت ترمز جلو پراید"}</h2>
        <div>
          <span>شناسه گفتگو:</span>
          <span>TY4235689321</span>
        </div>
        <div>
          <button>
            <VerticalPrevious color="#00A48A" />
          </button>
          <button>
            <VerticalNext color="#00A48A" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
