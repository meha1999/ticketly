import Image from "next/image";
import Counter from "images/icons/counter";
import RegisteredRequests from "images/icons/registered_requests";
import logoutIcon from "images/icons/logout.svg";
import UserIcon from "images/icons/user_icon";
import ProductRegistration from "images/icons/product_registration";
import Store from "images/icons/store";
import Link from "next/link";
import { useRouter } from "next/router";
import Orders from "images/icons/orders";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name" style={{ backgroundColor: "#F2C901" }}>
        {"پنل تامین کننده"}
      </div>
      <ul className="menus">
        <li>
          <Link
            href="/supplier/dashboard"
            className="menu"
            style={{
              color: `${
                router.pathname === "/supplier/dashboard"
                  ? "#F2C901"
                  : "#4d4d4d"
              }`,
            }}
          >
            <Counter
              color={
                router.pathname === "/supplier/dashboard"
                  ? "#F2C901"
                  : "#4d4d4d"
              }
            />
            <span>{"پیشخوان"}</span>
          </Link>
        </li>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#F2C901" : "#4d4d4d"}`,
            }}
          >
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
              <UserIcon
                color={router.pathname === "" ? "#F2C901" : "#4d4d4d"}
              />
            </div>
            <span>{"پروفایل"}</span>
          </Link>
        </li>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#F2C901" : "#4d4d4d"}`,
            }}
          >
            <ProductRegistration
              color={router.pathname === "" ? "#F2C901" : "#4d4d4d"}
            />
            <span>{"ثبت محصول"}</span>
          </Link>
        </li>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#F2C901" : "#4d4d4d"}`,
            }}
          >
            <Store color={router.pathname === "" ? "#F2C901" : "#4d4d4d"} />
            <span>{"محصولات فروش"}</span>
          </Link>
        </li>
        <li className="menu">
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#F2C901" : "#4d4d4d"}`,
            }}
          >
            <RegisteredRequests color="#4d4d4d" />
            <span>{"درخواست‌های ثبت شده"}</span>
          </Link>
        </li>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#F2C901" : "#4d4d4d"}`,
            }}
          >
            <Orders color={router.pathname === "" ? "#F2C901" : "#4d4d4d"} />
            <span>{"سفارشات"}</span>
          </Link>
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
