import { useRouter } from "next/router";
import { AuthService } from "services/auth.service";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { NavLink } from "src/tools/NavLink";
//icons
import { IoLogOutOutline } from "react-icons/io5";
import { BsGridFill } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import { GiCarWheel } from "react-icons/gi";
import { SiHackthebox } from "react-icons/si";
import { GrContactInfo } from "react-icons/gr";

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const { push: RouterPush } = useRouter();

  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      if (res.status === 200) {
        deleteCookie("role");
        deleteCookie("token");
        dispatch({ type: REDUX_ACTION.EMPTY_TOKEN, payload: null });
        dispatch({ type: REDUX_ACTION.EMPTY_USER });
        RouterPush("/evaluator/auth/login");
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const SIDE_BAR_LINK_ITEMS: any[] = [
    {
      id: 1,
      title: "پیشخوان",
      path: "/evaluator/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/evaluator/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    {
      id: 3,
      title: "ثبت محصول",
      path: "/evaluator/dashboard/register",
      icon: SiHackthebox,
      subLinks: [],
    },
    {
      id: 4,
      title: "انبار",
      path: "/evaluator/dashboard/store",
      icon: GiCarWheel,
      subLinks: [],
    },
    {
      id: 5,
      title: "درخواست ها",
      path: "/evaluator/dashboard/tickets",
      icon: BiEdit,
      disable: true,
      subLinks: [
        {
          id: 1,
          title: "درخواست‌های در حال تامین",
          path: "/evaluator/dashboard/tickets/supplying",
        },
        {
          id: 2,
          title: "درخواست‌های در حال ارسال",
          path: "/evaluator/dashboard/tickets/sending",
        },
        {
          id: 3,
          title: "درخواست‌های بسته شده",
          path: "/evaluator/dashboard/tickets/closed",
        },
      ],
    },
    {
      id: 6,
      title: "لیست تامین کنندگان",
      path: "/evaluator/dashboard/providers",
      icon: GrContactInfo,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name evaluator">پنل ارزیاب</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact, disable }) => (
            <li key={id}>
              <NavLink
                href={path}
                className={`menu evaluator ${disable ? "disable" : ""}`}
                exact={exact}
              >
                <Icon />
                <span>{title}</span>
              </NavLink>
              {subLinks.length ? (
                <ul className="sub-menus">
                  {subLinks.map(({ id, path, title, icon: Icon }: any) => (
                    <li key={id}>
                      <NavLink href={path} className="menu evaluator">
                        {Icon && <Icon />}
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
