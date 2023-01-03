import Image from "next/image";
import Counter from "images/icons/counter";
import RegisteredRequests from "images/icons/registered_requests";
import Settings from "images/icons/settings";
import Users from "images/icons/users";
import logoutIcon from "images/icons/logout.svg";
import UserIcon from "images/icons/user_icon";
import ProductSearch from "images/icons/product_search";
import NewTicketRegistration from "images/icons/new_ticket_registration";
import ChatPage from "images/icons/chat_page";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="panel-name">{"پنل مدیریت"}</div>
      <ul className="menus">
        <li className="menu">
          <Counter color="#BDBDBD" />
          <span>{"پیشخوان"}</span>
        </li>
        <li className="menu">
          <div
            style={{
              width: "24px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              objectFit: "cover",
            }}
          >
            <UserIcon color="#4D4D4D" />
          </div>
          <span>{"پروفایل"}</span>
        </li>
        <li className="menu">
          <ProductSearch color="#4D4D4D" />
          <span>{"جستجو کالا"}</span>
        </li>
        <li className="menu">
          <NewTicketRegistration color="#4D4D4D" />
          <span>{"ثبت تیکت جدید"}</span>
        </li>
        <li className="menu">
          <RegisteredRequests color="#4D4D4D" />
          <span>{"درخواست‌های ثبت شده"}</span>
        </li>
        <ul className="sub-menus">
          <li className="menu">
            <span>{"درخواست‌های فعال"}</span>
          </li>
          <li className="menu">
            <span>{"درخواست‌های بسته شده"}</span>
          </li>
        </ul>
        <li className="menu">
          <ChatPage color="#4D4D4D" />
          <span>{"صفحه چت"}</span>
        </li>
        <li className="menu">
          <Users color="#4D4D4D" />
          <span>{"کاربران"}</span>
        </li>
        <li className="menu">
          <Settings color="#4D4D4D" />
          <span>{"تنظیمات"}</span>
        </li>
      </ul>
      <button className="logout-btn">
        <Image src={logoutIcon} alt="logout" />
        <span>{"خروج از حساب"}</span>
      </button>
    </div>
  );
};

export default Sidebar;
