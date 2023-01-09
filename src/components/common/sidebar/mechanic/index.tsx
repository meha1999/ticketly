import Image from "next/image";
import Counter from "images/icons/counter";
import RegisteredRequests from "images/icons/registered_requests";
import logoutIcon from "images/icons/logout.svg";
import UserIcon from "images/icons/user_icon";
import Link from "next/link";
import { useRouter } from "next/router";
import Orders from "images/icons/orders";
import Wallet from "images/icons/wallet";
import NewTicketRegistration from "images/icons/new_ticket_registration";
import { useDispatch } from "react-redux";
import { AuthService } from "services/auth.service";
import { deleteCookie } from "cookies-next";
import { REDUX_ACTION } from "src/enum/redux-action.enum";

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      if (res.status === 200) {
        deleteCookie("role");
        deleteCookie("token");
        dispatch({ type: REDUX_ACTION.EMPTY_TOKEN, payload: null });
        dispatch({ type: REDUX_ACTION.EMPTY_USER });
        router.push("/mechanic/auth/login");
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name" style={{ backgroundColor: "#00A48A" }}>
        {"پنل مکانیک"}
      </div>
      <ul className="menus">
        <li>
          <Link
            href="/mechanic/dashboard"
            className="menu"
            style={{
              color: `${
                router.pathname === "/mechanic/dashboard"
                  ? "#00A48A"
                  : "#4d4d4d"
              }`,
            }}
          >
            <Counter
              color={
                router.pathname === "/mechanic/dashboard"
                  ? "#00A48A"
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
              color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
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
                color={router.pathname === "" ? "#00A48A" : "#4d4d4d"}
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
              color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
            }}
          >
            <NewTicketRegistration
              color={router.pathname === "" ? "#00A48A" : "#4d4d4d"}
            />
            <span>{"ثبت تیکت جدید"}</span>
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
                color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
              }}
            >
              <span
                style={{
                  color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
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
                color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
              }}
            >
              <span
                style={{
                  color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
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
                color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
              }}
            >
              <span
                style={{
                  color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
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
              color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
            }}
          >
            <Orders color={router.pathname === "" ? "#00A48A" : "#4d4d4d"} />
            <span>{"سفارشات"}</span>
          </Link>
        </li>
        <li>
          <Link
            href=""
            className="menu"
            style={{
              color: `${router.pathname === "" ? "#00A48A" : "#4d4d4d"}`,
            }}
          >
            <Wallet color={router.pathname === "" ? "#00A48A" : "#4d4d4d"} />
            <span>{"کیف پول"}</span>
          </Link>
        </li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        <Image src={logoutIcon} alt="logout" />
        <span>{"خروج از حساب"}</span>
      </button>
    </div>
  );
};

export default Sidebar;
