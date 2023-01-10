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
      path: "/mechanic/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/mechanic/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    {
      id: 3,
      title: "ثبت تیکت جدید",
      path: "/mechanic/dashboard/tickets/create",
      icon: SiHackthebox,
      subLinks: [],
    },
    {
      id: 4,
      title: "انبار",
      path: "/mechanic/dashboard/store",
      icon: GiCarWheel,
      subLinks: [],
    },
    {
      id: 5,
      title: "درخواست ها",
      path: "/mechanic/dashboard/tickets",
      exact: true,
      icon: BiEdit,
      subLinks: [
        {
          id: 1,
          title: "درخواست‌های در حال تامین",
          path: "/mechanic/dashboard/tickets/supplying",
        },
        {
          id: 2,
          title: "درخواست‌های در حال ارسال",
          path: "/mechanic/dashboard/tickets/sending",
        },
        {
          id: 3,
          title: "درخواست‌های بسته شده",
          path: "/mechanic/dashboard/tickets/closed",
        },
      ],
    },
    {
      id: 6,
      title: "سفارشات",
      path: "/mechanic/dashboard/orders",
      icon: BsClipboardCheck,
      subLinks: [],
    },
    {
      id: 7,
      title: "کیف پول",
      path: "/mechanic/dashboard/wallet",
      icon: TfiWallet,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name mechanic">پنل مکانیک</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact }) => (
            <li key={id}>
              <NavLink href={path} className="menu mechanic" exact={exact}>
                <Icon className={isActiveRoute(path) ? "active" : ""} />
                <span>{title}</span>
              </NavLink>
              {subLinks.length ? (
                <ul className="sub-menus">
                  {subLinks.map(({ id, path, title, icon: Icon }: any) => (
                    <li key={id}>
                      <NavLink href={path} className="menu mechanic">
                        {Icon && (
                          <Icon
                            className={isActiveRoute(path) ? "active" : ""}
                          />
                        )}
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
        <IoLogOutOutline />

        <span>{"خروج از حساب"}</span>
      </button>
    </div>
  );
};

export default Sidebar;
