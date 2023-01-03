import Link from "next/link";
import Image from "next/image";
import logo from "images/logo.svg";
import UserIcon from "images/icons/user_icon";
import bellIcon from "images/icons/bell.svg";

const Header = () => {
  return (
    <div className="header-wrapper">
      <Link href="/dashboard" className="logo">
        <Image src={logo} alt="logo" />
      </Link>
      <div className="header-content">
        <div className="user-profile">
          <div className="image-container">
            <UserIcon color="#505050" />
          </div>
          <div className="info">
            <span className="name">متین نوروزپور</span>
            <span className="email">Matinnorouzpour@gmail.com</span>
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
