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
import { SiHackthebox } from "react-icons/si";
import { FaClipboardCheck } from "react-icons/fa";

import { IoLogOutOutline } from "react-icons/io5";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import errorHandler from "src/tools/error-handler";

const authService = new AuthService();

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname, push: RouterPush } = useRouter();
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
      RouterPush("/supplier/auth/login");
    }
  };

  const isActiveRoute = (route: string) => pathname.startsWith(route);

  const SIDE_BAR_LINK_ITEMS: any[] = [
    {
      id: 1,
      title: "پیشخوان",
      path: "/supplier/dashboard",
      icon: BsGridFill,
      exact: true,
      subLinks: [],
    },
    {
      id: 2,
      title: "پروفایل",
      path: "/supplier/dashboard/profile",
      icon: TiUser,
      subLinks: [],
    },
    // {
    //   id: 3,
    //   title: "ثبت محصول",
    //   path: "/supplier/dashboard/register",
    //   icon: SiHackthebox,
    //   subLinks: [],
    // },
    // {
    //   id: 4,
    //   title: "محصولات فروش",
    //   path: "/supplier/dashboard/products",
    //   icon: GiCarWheel,
    //   subLinks: [],
    // },
    {
      id: 5,
      title: "درخواست ها",
      path: "/supplier/dashboard/tickets",
      icon: BiEdit,
      subLinks: [],
    },
    {
      id: 6,
      title: "سفارشات",
      path: "/supplier/dashboard/orders",
      icon: FaClipboardCheck,
      subLinks: [],
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <div className="panel-name supplier">پنل تامین کننده</div>
      <ul className="menus">
        {SIDE_BAR_LINK_ITEMS.map(
          ({ id, title, icon: Icon, path, subLinks, exact }) => (
            <li key={id}>
              <NavLink href={path} className="menu supplier" exact={exact}>
                <Icon className={isActiveRoute(path) ? "active" : ""} />
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
                            <NavLink href={path} className="menu supplier">
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
