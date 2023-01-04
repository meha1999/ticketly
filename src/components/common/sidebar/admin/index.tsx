import Image from "next/image";
import Counter from "images/icons/counter";
import RegisteredRequests from "images/icons/registered_requests";
import logoutIcon from "images/icons/logout.svg";
import UserIcon from "images/icons/user_icon";
import ProductRegistration from "images/icons/product_registration";
import Store from "images/icons/store";
import SuppliersList from "images/icons/suppliers_list";
import Link from "next/link";
import { useRouter } from "next/router";
import Users from "images/icons/users";
import Settings from "images/icons/settings";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name" style={{ backgroundColor: "#505050" }}>
        {"پنل مدیریت"}
      </div>
      <ul className="menus">
        <li>
          <Link
            href="/admin/dashboard"
            className="menu"
            style={{
              color: `${
                router.pathname === "/admin/dashboard" ? "#BDBDBD" : "#4d4d4d"
              }`,
            }}
          >
            <Counter
              color={
                router.pathname === "/admin/dashboard" ? "#BDBDBD" : "#4d4d4d"
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
              color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
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
                color={router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}
              />
            </div>
            <span>{"پروفایل"}</span>
          </Link>
        </li>
        <li className="menu">
          <RegisteredRequests color="#4d4d4d" />
          <span>{"درخواست‌ها"}</span>
        </li>
        <ul className="sub-menus">
          <li>
            <Link
              href=""
              className="menu"
              style={{
                color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
              }}
            >
              <span
                style={{
                  color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
                }}
              >
                {"درخواست‌های در حال تامین"}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="menu"
              style={{
                color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
              }}
            >
              <span
                style={{
                  color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
                }}
              >
                {"درخواست‌های درحال ارسال"}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="menu"
              style={{
                color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
              }}
            >
              <span
                style={{
                  color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
                }}
              >
                {"درخواست‌های بسته شده"}
              </span>
            </Link>
          </li>
        </ul>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
            }}
          >
            <Users color={router.pathname === "" ? "#BDBDBD" : "#4d4d4d"} />
            <span>{"کاربران"}</span>
          </Link>
        </li>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#BDBDBD" : "#4d4d4d"}`,
            }}
          >
            <Settings color={router.pathname === "" ? "#BDBDBD" : "#4d4d4d"} />
            <span>{"تنظیمات"}</span>
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
