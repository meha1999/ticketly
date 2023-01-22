import Image from "next/image";
import logoutIcon from "images/icons/logout.svg";
import { useRouter } from "next/router";
import { AuthService } from "services/auth.service";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { NavLink } from "src/tools/NavLink";
import { BsGridFill } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname, push: RouterPush } = useRouter();
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      Toaster.error(
        <ToastComponent
          title="ناموفق"
          description="خطای سرور"
        />
      );    } finally {
      deleteCookie("role");
      deleteCookie("token");
      dispatch({ type: REDUX_ACTION.EMPTY_TOKEN });
      dispatch({ type: REDUX_ACTION.EMPTY_USER });
      RouterPush("/superuser/auth/login");
    }
  };

  const isActiveRoute = (route: string) => pathname.startsWith(route);

  const SIDE_BAR_LINK_ITEMS: any[] = [
    {
      id: 1,
      title: "پیشخوان",
      path: "/superuser/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/superuser/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    {
      id: 5,
      title: "درخواست ها",
      path: "/superuser/dashboard/tickets",
      icon: BiEdit,
      subLinks: [
        {
          id: 1,
          title: "درخواست‌های در حال تامین",
          path: "/superuser/dashboard/tickets/supplying",
        },
        {
          id: 2,
          title: "درخواست‌های در حال ارسال",
          path: "/superuser/dashboard/tickets/sending",
        },
        {
          id: 3,
          title: "درخواست‌های بسته شده",
          path: "/superuser/dashboard/tickets/closed",
        },
      ],
    },
    {
      id: 3,
      title: "کاربران",
      path: "/superuser/dashboard/users",
      icon: IoIosPeople,
      subLinks: [],
    },
    {
      id: 4,
      title: "تنظیمات",
      path: "/superuser/dashboard/settings",
      icon: AiOutlineSetting,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name superuser">پنل مدیریت</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact }) => (
            <li key={id}>
              <NavLink href={path} className="menu superuser" exact={exact}>
                <Icon className={isActiveRoute(path) ? "active" : ""} />
                <span>{title}</span>
              </NavLink>
              {subLinks.length ? (
                <ul className="sub-menus">
                  {subLinks.map(
                    ({ id, path: subPath, title, icon: Icon }: any) => (
                      <li key={id}>
                        <NavLink href={subPath} className="menu superuser">
                          {Icon && (
                            <Icon
                              className={isActiveRoute(path) ? "active" : ""}
                            />
                          )}
                          <span>{title}</span>
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                ""
              )}
            </li>
          )
        )}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        <Image src={logoutIcon} alt="logout" />
        <span>{"خروج از حساب"}</span>
      </button>
    </div>
  );
};

export default Sidebar;
