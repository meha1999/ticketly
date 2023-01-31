import { useRouter } from "next/router";
import { AuthService } from "services/auth.service";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { NavLink } from "src/tools/NavLink";
//icons
import { IoLogOutOutline } from "react-icons/io5";
import { BsClipboardCheck, BsGridFill } from "react-icons/bs";
import { TiUser } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import { GiCarWheel } from "react-icons/gi";
import { SiHackthebox } from "react-icons/si";
import { GrContactInfo } from "react-icons/gr";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const { push: RouterPush } = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error: any) {
      Object.keys(error?.response?.data).length
        ? Object.keys(error?.response?.data).map((item) => {
            Toaster.error(
              <ToastComponent
                title={item}
                description={error?.response?.data[item]}
              />
            );
          })
        : Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
    } finally {
      deleteCookie("role");
      deleteCookie("token");
      dispatch({ type: REDUX_ACTION.EMPTY_TOKEN });
      dispatch({ type: REDUX_ACTION.EMPTY_USER });
      RouterPush("/staff/auth/login");
    }
  };

  const SIDE_BAR_LINK_ITEMS: any[] = [
    {
      id: 1,
      title: "پیشخوان",
      path: "/staff/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/staff/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    // {
    //   id: 3,
    //   title: "ثبت محصول",
    //   path: "/staff/dashboard/register",
    //   icon: SiHackthebox,
    //   subLinks: [],
    // },
    // {
    //   id: 4,
    //   title: "انبار",
    //   path: "/staff/dashboard/store",
    //   icon: GiCarWheel,
    //   subLinks: [],
    // },
    {
      id: 5,
      title: "لیست تامین کنندگان",
      path: "/staff/dashboard/providers",
      icon: GrContactInfo,
      subLinks: [],
    },
    {
      id: 6,
      title: "درخواست ها",
      path: "/staff/dashboard/tickets",
      icon: BiEdit,
      disable: true,
      subLinks: [
        {
          id: 1,
          title: "در انتظار تایید",
          path: "/staff/dashboard/tickets/supplying",
        },
        {
          id: 2,
          title: "در حال بررسی",
          path: "/staff/dashboard/tickets/sending",
        },
        {
          id: 3,
          title: "تکمیل شده",
          path: "/staff/dashboard/tickets/closed",
        },
      ],
    },
    {
      id: 7,
      title: "سفارشات",
      path: "/staff/dashboard/orders",
      icon: BsClipboardCheck,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name staff">پنل ارزیاب</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact, disable }) => (
            <li key={id}>
              <NavLink
                href={path}
                exact={exact}
                className={`menu staff ${disable ? "disable" : ""}`}
              >
                <Icon />
                <span>{title}</span>
              </NavLink>
              {subLinks.length ? (
                <ul className="sub-menus">
                  {subLinks.map(({ id, path, title, icon: Icon }: any) => (
                    <li key={id}>
                      <NavLink href={path} className="menu staff">
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
