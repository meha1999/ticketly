import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { NavLink } from "src/tools/NavLink";
import { AuthService } from "services/auth.service";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
//icons
import { TiUser } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import { GiCarWheel } from "react-icons/gi";
import { BsGridFill } from "react-icons/bs";
import { TfiWallet } from "react-icons/tfi";
import { SiHackthebox } from "react-icons/si";
import { BsClipboardCheck } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import errorHandler from "src/tools/error-handler";

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const { push: RouterPush } = useRouter();
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error: any) {
      errorHandler(error);
    } finally {
      deleteCookie("role");
      deleteCookie("token");
      dispatch({ type: REDUX_ACTION.EMPTY_TOKEN });
      dispatch({ type: REDUX_ACTION.EMPTY_USER });
      RouterPush("/customer/auth/login");
    }
  };

  const SIDE_BAR_LINK_ITEMS: any[] = [
    {
      id: 1,
      title: "پیشخوان",
      path: "/customer/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/customer/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    {
      id: 3,
      title: "ثبت تیکت جدید",
      path: "/customer/dashboard/tickets/create",
      icon: SiHackthebox,
      subLinks: [],
    },
    // {
    //   id: 4,
    //   title: "انبار",
    //   path: "/customer/dashboard/store",
    //   icon: GiCarWheel,
    //   subLinks: [],
    // },
    {
      id: 5,
      title: "درخواست ها",
      path: "/customer/dashboard/tickets",
      icon: BiEdit,
      disable: true,
      exact: true,
      subLinks: [
        {
          id: 1,
          title: "در انتظار تایید",
          path: "/customer/dashboard/tickets/supplying",
        },
        {
          id: 2,
          title: "در حال بررسی",
          path: "/customer/dashboard/tickets/sending",
        },

        {
          id: 3,
          title: "تکمیل شده",
          path: "/customer/dashboard/tickets/closed",
        },
      ],
    },
    {
      id: 6,
      title: "سفارشات",
      path: "/customer/dashboard/orders",
      icon: BsClipboardCheck,
      subLinks: [],
    },
    {
      id: 7,
      title: "کیف پول",
      path: "/customer/dashboard/wallet",
      icon: TfiWallet,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name customer">پنل مشتری</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact, disable }) => (
            <li key={id}>
              <NavLink
                href={path}
                exact={exact}
                className={`menu customer ${disable ? "disable " : ""}`}
              >
                <Icon />
                <span>{title}</span>
              </NavLink>
              {subLinks.length ? (
                <div style={{ display: "flex", marginRight: 7 }}>
                  <div className="border-custom"></div>
                  <ul className="sub-menus">
                    {subLinks.map(
                      ({ id, path, title, icon: Icon }: any, index: number) => (
                        <div className="sub-menu-conatiner" key={index}>
                          <div className="dashed"></div>
                          <li key={id}>
                            <NavLink href={path} className="menu customer">
                              {Icon && <Icon />}
                              <span>{title}</span>
                            </NavLink>
                          </li>
                        </div>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </li>
          )
        )}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        <IoLogOutOutline />

        <span>{"خروج از حساب"}</span>
      </button>
    </div>
  );
};

export default Sidebar;
