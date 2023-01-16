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

  return (
    <div className="header-wrapper">
      <Link href="/dashboard" className="logo">
        <Image src={logo} alt="logo" />
      </Link>
      <div className="header-content">
        <div className="user-profile">
          <div className="image-container">
            <UserIcon color={userType[router.asPath.split("/")[1]]} />
          </div>
          <div className="info">
            <span
              className="name"
              style={{ color: `${userType[router.asPath.split("/")[1]]}` }}
            >
              {user?.full_name ?? "نام کاربری در دسترس نیست"}
            </span>
            <span className="email">
              {user?.email ?? "ایمیل در دسترس نیست"}
            </span>
          </div>
        </div>
        <div className="notification-container">
          <div className="notification">
            <Image src={bellIcon} alt="bell" />
            <span className="count">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
