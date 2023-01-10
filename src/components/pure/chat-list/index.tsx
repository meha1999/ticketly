import MessageCard from "../message-card";
import img from "images/auth/admin.svg";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import SuppliersList from "../suppliers-list";
import { TicketService } from "services/ticket.service";

const ticketService = new TicketService();

interface ChatListProps {
  data: Array<any>;
  onChatChange: (ticketId: string) => any;
  ticketId: string;
}

const ChatList: React.FC<ChatListProps> = ({
  data,
  onChatChange,
  ticketId,
}) => {
  const portalContainer: any = document.getElementById("portal");

  const divRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [suppliersList, setSuppliersList] = useState<Array<any>>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<Array<number>>([]);

  useCloseByClickOutSide({
    ref: divRef,
    isOpened: isOpen,
    setIsOpened: setIsOpen,
  });

  const handleAddSupplier = () => {
    setIsOpen(!isOpen);
  };
  const getSuppliersList = async () => {
    try {
      const res = await ticketService.getSuppliersList("supplier");
      setSuppliersList(res.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    console.log(selectedSuppliers);
  };
  const handleSelect = (id: number) => {
    const items = selectedSuppliers.some((item: number) => item === id);
    if (items) {
      const data = selectedSuppliers.filter((item: number) => item !== id);
      setSelectedSuppliers(data);
    } else {
      setSelectedSuppliers([...selectedSuppliers, id]);
    }
  };

  useEffect(() => {
    getSuppliersList();
  }, []);

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
              selected={ticketId === item.id}
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
            <SuppliersList
              suppliersList={suppliersList}
              cancel={handleCancel}
              confirm={handleConfirm}
              elementRef={divRef}
              handleSelect={handleSelect}
              selectedSuppliers={selectedSuppliers}
            />
          </CustomPortal>,
          portalContainer
        )}
    </div>
  );
};

export default ChatList;
