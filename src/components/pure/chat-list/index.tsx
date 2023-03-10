import MessageCard from "../message-card";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import SuppliersList from "../suppliers-list";
import { TicketService } from "services/ticket.service";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import errorHandler from "src/tools/error-handler";

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
  const [sentText, setSentText] = useState<string>("");

  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

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
      setSuppliersList(finalData);
    } catch (error: any) {
      errorHandler(error);
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
    if (selectedSuppliers.length) {
      if (sentText.length) {
        const supplierData = selectedSuppliers.map((item) => {
          return {
            name: group?.ticket_group[0]?.name,
            department: group.ticket_group[0]?.department,
            customer: null,
            supplier: { id: item },
            staff: group.ticket_group[0]?.staff,
            priority: group.ticket_group[0]?.priority,
            description: sentText,
            ticket_group: group.ticket_group[0]?.ticket_group,
            status: "PENDING",
            product_category: group.ticket_group[0]?.product_category,
            service_category: group.ticket_group[0]?.service_category,
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
          errorHandler(err);
        } finally {
          setSelectedSuppliers([]);
        }
      } else {
        Toaster.error(
          <ToastComponent
            title="????????????"
            description="???????? ???????? ???????????? ?????? ???? ???????? ????????????"
          />
        );
      }
    } else {
      Toaster.error(
        <ToastComponent
          title=""
          description="???????????? ?????????? ???? ?????????? ?????????? ???????????? ??????."
        />
      );
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

  const translate = {
    VOICE: "??????",
    IMAGE: "??????",
    VIDEO: "??????????",
    FILE: "????????",
  };

  return (
    <div className="chat-list">
      <div className="unread-messages">
        <span>???????????? ???????? ????</span>
        <div className="count">
          {notification?.detail?.filter(
            (message) => message?.ticket_group == group?.id
          )[0]?.unread_message || 0}
        </div>
      </div>
      <div className="suppliers">
        <div style={{ fontSize: 14 }}>?????????? ??????????????:</div>
        <div className="suppliers-list">
          {data?.map((item: any, index: number) => {
            const sse = notification?.detail
              ?.filter((message) => message?.ticket_group == group?.id)[0]
              ?.data?.filter((event) => event?.ticket == item.id)[0];
            return (
              <MessageCard
                key={index}
                onChatChange={() => onChatChange(item.id)}
                profileImage={item.supplier?.photo}
                name={item.supplier?.full_name}
                message={
                  sse?.text
                    ? sse?.text
                    : sse?.file_type
                    ? translate[sse?.file_type]
                    : ""
                }
                time={item.updated_at}
                selected={ticketId === item.id}
                unreadMessagesCount={sse?.unread_message}
              />
            );
          })}
        </div>
      </div>
      <button className="add-supplier-btn" onClick={handleAddSupplier}>
        <span className="plus-icon">+</span>
        <span>?????????? ???????? ?????????? ??????????</span>
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
              setSentText={setSentText}
            />
          </CustomPortal>,
          portalContainer
        )}
    </div>
  );
};

export default ChatList;
