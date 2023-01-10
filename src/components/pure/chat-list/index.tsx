import MessageCard from "../message-card";
import img from "images/auth/admin.svg";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import SuppliersList from "../suppliers-list";

interface ChatListProps {
  data: Array<any>;
  onChatChange: (ticketId: string) => any;
}

const ChatList: React.FC<ChatListProps> = ({ data, onChatChange }) => {
  const portalContainer: any = document.getElementById("portal");

  const divRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useCloseByClickOutSide({
    ref: divRef,
    isOpened: isOpen,
    setIsOpened: setIsOpen,
  });

  const handleAddSupplier = () => {
    setIsOpen(!isOpen);
  };

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
      <button className="add-supplier-btn" onClick={handleAddSupplier}>
        <span className="plus-icon">+</span>
        <span>اضافه کردن تامین کننده</span>
      </button>
      {isOpen &&
        ReactDOM.createPortal(
          <CustomPortal>
            <SuppliersList elementRef={divRef} />
          </CustomPortal>,
          portalContainer
        )}
    </div>
  );
};

export default ChatList;
