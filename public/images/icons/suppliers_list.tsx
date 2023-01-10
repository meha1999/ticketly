import { FC } from "react";

interface SuppliersListIconProps {
  color: string;
}

const SuppliersListIcon: FC<SuppliersListIconProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0H12C15.7712 0 17.6569 0 18.8284 1.17157C20 2.34315 20 4.22876 20 8C20 11.7712 20 13.6569 18.8284 14.8284C17.6569 16 15.7712 16 12 16H8C4.22876 16 2.34315 16 1.17157 14.8284C0 13.6569 0 11.7712 0 8C0 4.22876 0 2.34315 1.17157 1.17157C2.34315 0 4.22876 0 8 0ZM11.25 5C11.25 4.58579 11.5858 4.25 12 4.25H17C17.4142 4.25 17.75 4.58579 17.75 5C17.75 5.41421 17.4142 5.75 17 5.75H12C11.5858 5.75 11.25 5.41421 11.25 5ZM12.25 8C12.25 7.58579 12.5858 7.25 13 7.25H17C17.4142 7.25 17.75 7.58579 17.75 8C17.75 8.41421 17.4142 8.75 17 8.75H13C12.5858 8.75 12.25 8.41421 12.25 8ZM13.25 11C13.25 10.5858 13.5858 10.25 14 10.25H17C17.4142 10.25 17.75 10.5858 17.75 11C17.75 11.4142 17.4142 11.75 17 11.75H14C13.5858 11.75 13.25 11.4142 13.25 11ZM9 5C9 6.10457 8.10457 7 7 7C5.89543 7 5 6.10457 5 5C5 3.89543 5.89543 3 7 3C8.10457 3 9 3.89543 9 5ZM7 13C11 13 11 12.1046 11 11C11 9.89543 9.20914 9 7 9C4.79086 9 3 9.89543 3 11C3 12.1046 3 13 7 13Z"
        fill={color}
      />
    </svg>
  );
};

export default SuppliersListIcon;
