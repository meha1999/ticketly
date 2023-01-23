import Link from "next/link";
import Image from "next/image";
import logo from "images/logo.svg";
import UserIcon from "images/icons/user_icon";
import bellIcon from "images/icons/bell.svg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const userType: Record<string, string> = {
  staff: "#5E7BEC",
  customer: "#00A48A",
  supplier: "#F2C901",
  superuser: "#505050",
};

const Header = () => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

  return (
    <div className="header-wrapper">
      <Link
        href={`/${router.pathname.split("/")[1]}/dashboard`}
        className="logo"
      >
        <Image src={logo} alt="logo" />
      </Link>
      <div className="header-content">
        <Link
          href={`/${router.pathname.split("/")[1]}/dashboard/profile`}
          className="user-profile"
        >
          <div className="image-container">
            {user?.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user?.photo as string} alt="logo" />
            ) : (
              <UserIcon color={userType[router.asPath.split("/")[1]]} />
            )}
          </div>
          <div className="info">
            <span
              className="name"
              style={{ color: `${userType[router.asPath.split("/")[1]]}` }}
            >
              {user?.full_name ?? user?.username ?? "نام کاربری در دسترس نیست"}
            </span>
            <span className="email">
              {user?.email ?? "ایمیل در دسترس نیست"}
            </span>
          </div>
        </Link>
        <div className="notification-container">
          <div className="notification">
            <Image src={bellIcon} alt="bell" />
            {!!notification?.unread_message && (
              <span className="count">{notification?.unread_message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
