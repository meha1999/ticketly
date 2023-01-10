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

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname, push: RouterPush } = useRouter();
  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      if (res.status === 200) {
        deleteCookie("role");
        deleteCookie("token");
        dispatch({ type: REDUX_ACTION.EMPTY_TOKEN, payload: null });
        dispatch({ type: REDUX_ACTION.EMPTY_USER });
        RouterPush("/admin/auth/login");
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const isActiveRoute = (route: string) => pathname.startsWith(route);

  const SIDE_BAR_LINK_ITEMS: any[] = [
    {
      id: 1,
      title: "پیشخوان",
      path: "/admin/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/admin/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    {
      id: 5,
      title: "درخواست ها",
      path: "/admin/dashboard/tickets",
      icon: BiEdit,
      subLinks: [
        {
          id: 1,
          title: "درخواست‌های در حال تامین",
          path: "/admin/dashboard/tickets/supplying",
        },
        {
          id: 2,
          title: "درخواست‌های در حال ارسال",
          path: "/admin/dashboard/tickets/sending",
        },
        {
          id: 3,
          title: "درخواست‌های بسته شده",
          path: "/admin/dashboard/tickets/closed",
        },
      ],
    },
    {
      id: 3,
      title: "کاربران",
      path: "/admin/dashboard/users",
      icon: IoIosPeople,
      subLinks: [],
    },
    {
      id: 4,
      title: "تنظیمات",
      path: "/admin/dashboard/settings",
      icon: AiOutlineSetting,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name admin">پنل مدیریت</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact }) => (
            <li key={id}>
              <NavLink href={path} className="menu admin" exact={exact}>
                <Icon className={isActiveRoute(path) ? "active" : ""} />
                <span>{title}</span>
              </NavLink>
              {subLinks.length ? (
                <ul className="sub-menus">
                  {subLinks.map(
                    ({ id, path: subPath, title, icon: Icon }: any) => (
                      <li key={id}>
                        <NavLink href={subPath} className="menu admin">
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
