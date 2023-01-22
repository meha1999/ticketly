import Image from "next/image";

interface DashboardCardProps {
  image: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  btnBgColor: string;
  btnColor: string;
  btnText: string;
  dir: "ltr" | "rtl";
  onClick: any;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  image,
  text,
  textColor,
  backgroundColor,
  btnBgColor,
  btnColor,
  btnText,
  dir,
  onClick,
}) => {
  return (
    <div
      className="dashboard-card"
      style={{ backgroundColor: backgroundColor }}
      dir={dir}
    >
      <div className="card-image">
        <Image src={image} alt="card" />
      </div>
      <div className="card-content">
        <div className="card-text" style={{ color: textColor }}>
          {text}
        </div>
        <div
          className="card-btn"
          style={{ backgroundColor: btnBgColor, color: btnColor }}
          onClick={onClick}
        >
          {btnText}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
