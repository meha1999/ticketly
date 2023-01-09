import Image from "next/image";
import Counter from "images/icons/counter";
import RegisteredRequests from "images/icons/registered_requests";
import logoutIcon from "images/icons/logout.svg";
import UserIcon from "images/icons/user_icon";
import Link from "next/link";
import { useRouter } from "next/router";
import Users from "images/icons/users";
import Settings from "images/icons/settings";
import { AuthService } from "services/auth.service";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { FC } from "react";
import { NavLink } from "src/tools/NavLink";
import { BsGridFill } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
import { GiCarWheel } from "react-icons/gi";
import { SiHackthebox } from "react-icons/si";
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
      id: 3,
      title: "ثبت محصول",
      path: "/admin/dashboard/register",
      icon: SiHackthebox,
      subLinks: [],
    },
    {
      id: 4,
      title: "انبار",
      path: "/admin/dashboard/store",
      icon: GiCarWheel,
      subLinks: [],
    },
    {
      id: 5,
      title: "درخواست ها",
      path: "/admin/dashboard/requests",
      icon: BiEdit,
      subLinks: [
        {
          id: 1,
          title: "درخواست‌های در حال تامین",
          path: "/admin/dashboard/requests/supplying",
        },
        {
          id: 2,
          title: "درخواست‌های در حال ارسال",
          path: "/admin/dashboard/requests/sending",
        },
        {
          id: 3,
          title: "درخواست‌های بسته شده",
          path: "/admin/dashboard/requests/closed",
        },
      ],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name admin">پنل  مدیریت</div>
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
                  {subLinks.map(({ id, path:subPath, title, icon: Icon }: any) => (
                    <li key={id}>
                      <NavLink href={subPath} className="menu admin">
                        {Icon && <Icon className={isActiveRoute(path) ? "active" : ""}/>}
                        <span>{title}</span>
                      </NavLink>
                    </li>
                  ))}
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
