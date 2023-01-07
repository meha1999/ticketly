import MessageCard from "../message-card";
import img from "images/auth/admin.svg";

const ChatList = () => {
  const list: Array<any> = [
    {
      profileImage: img,
      name: "قاسم افشار",
      message: "سلام خسته نباشید میخواستم سلام خسته نباشید میخواستم",
      unreadMessagesCount: 1,
      time: "۱۱:۲۹",
    },
    {
      profileImage: img,
      name: "کیان میرکیان",
      message: "سلام خسته نباشید میخواستم سلام خسته نباشید میخواستم",
      unreadMessagesCount: 1,
      time: "۱۱:۲۹",
    },
    {
      profileImage: img,
      name: "کمیل قاسمی",
      message: "سلام خسته نباشید میخواستم سلام خسته نباشید میخواستم",
      unreadMessagesCount: 1,
      time: "۱۱:۲۹",
    },
    {
      profileImage: img,
      name: "محمد حسنی",
      message: "سلام خسته نباشید میخواستم سلام خسته نباشید میخواستم",
      unreadMessagesCount: 0,
      time: "۱۱:۲۹",
    },
    {
      profileImage: img,
      name: "قاسم افشار",
      message: "سلام خسته نباشید میخواستم سلام خسته نباشید میخواستم",
      unreadMessagesCount: 0,
      time: "۱۱:۲۹",
    },
  ];

  return (
    <div className="chat-list">
      <div className="unread-messages">
        <span>خوانده نشده ها</span>
        <div className="count">۳</div>
      </div>
      <div className="suppliers">
        <h3>تامین کنندگان:</h3>
        <div className="suppliers-list">
          {list.map((item: any, index: number) => (
            <MessageCard
              key={index}
              profileImage={item.img}
              name={item.name}
              message={item.message}
              unreadMessagesCount={item.unreadMessagesCount}
              time={item.time}
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
