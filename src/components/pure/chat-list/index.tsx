import MessageCard from "../message-card";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import SuppliersList from "../suppliers-list";
import { TicketService } from "services/ticket.service";

const ticketService = new TicketService();

interface ChatListProps {
  data: Array<any>;
  ticketId: string;
  group: any;
  onChatChange: (ticketId: string) => any;
  onAddSuplier: () => Promise<void>;
}

const ChatList: React.FC<ChatListProps> = ({
  data,
  ticketId,
  group,
  onChatChange,
  onAddSuplier,
}) => {
  const portalContainer: any = document.getElementById("portal");

  const addSupplierPortalRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [suppliersList, setSuppliersList] = useState<Array<any>>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<Array<number>>([]);

  useCloseByClickOutSide({
    ref: addSupplierPortalRef,
    isOpened: isOpen,
    setIsOpened: setIsOpen,
  });

  const getSuppliersList = async () => {
    try {
      const res = await ticketService.getSuppliersList("supplier");
      const finalData = res?.data?.filter(
        (item: any) =>
          !group?.ticket_group?.some(
            (ticket: any) => ticket?.supplier?.id === item.id
          )
      );
      console.log(finalData, res.data, group.ticket_group);
      setSuppliersList(finalData);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleAddSupplier = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirm = async () => {
    const supplierData = selectedSuppliers.map((item) => {
      return {
        name: group.ticket_group[0].name,
        department: group.ticket_group[0].department,
        customer: null,
        supplier: { id: item },
        staff: group.ticket_group[0].staff,
        priority: group.ticket_group[0].priority,
        description: group.ticket_group[0].description,
        ticket_group: group.ticket_group[0].ticket_group,
        status: "PENDING",
        branch_category: group.ticket_group[0].branch_category,
        order_ticket: [],
      };
    });
    const finalData = {
      ticket_group: [...group.ticket_group, ...supplierData],
    };
    try {
      await ticketService.addSuppliersToGroup(group.id, finalData);
      onAddSuplier();
      handleCancel();
    } catch (err) {
      // console.log("err", err);
    } finally {
    }
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
    isOpen && getSuppliersList();
  }, [isOpen]);

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
              profileImage={item.supplier?.photo}
              name={item.supplier?.full_name}
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
              elementRef={addSupplierPortalRef}
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
