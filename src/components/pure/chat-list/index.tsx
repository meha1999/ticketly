import MessageCard from "../message-card";
import img from "images/auth/admin.svg";

interface ChatListProps {
  data: Array<any>;
  onChatChange: (ticketId: string) => any;
}

const ChatList: React.FC<ChatListProps> = ({ data, onChatChange }) => {
  return (
    <div className="chat-list">
      <div className="unread-messages">
        <span>خوانده نشده ها</span>
        <div className="count">۳</div>
      </div>
      <div className="suppliers">
        <h3>تامین کنندگان:</h3>
        <div className="suppliers-list">
          {data?.map((item: any, index: number) => (
            <MessageCard
              key={index}
              onChatChange={() => onChatChange(item.id)}
              profileImage={item?.profileImage}
              name={item.supplier?.username}
              message={item.name}
              time={item.updated_at}
            />
          ))}
        </div>
      </div>
      <button className="add-supplier-btn">
        <span className="plus-icon">+</span>
        <span>اضافه کردن تامین کننده</span>
      </button>
    </div>
  );
};

export default ChatList;
