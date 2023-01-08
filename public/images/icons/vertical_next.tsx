import { FC } from "react";

interface VerticalNextProps {
  color: string;
}

const VerticalNext: FC<VerticalNextProps> = ({ color }) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.430571 0.51192C0.700138 0.197426 1.17361 0.161005 1.48811 0.430571L8.00001 6.01221L14.5119 0.430571C14.8264 0.161005 15.2999 0.197426 15.5695 0.51192C15.839 0.826414 15.8026 1.29989 15.4881 1.56946L8.48811 7.56946C8.20724 7.8102 7.79279 7.8102 7.51192 7.56946L0.51192 1.56946C0.197426 1.29989 0.161005 0.826414 0.430571 0.51192ZM0.430571 4.51192C0.700138 4.19743 1.17361 4.161 1.48811 4.43057L8.00001 10.0122L14.5119 4.43057C14.8264 4.161 15.2999 4.19743 15.5695 4.51192C15.839 4.82641 15.8026 5.29989 15.4881 5.56946L8.48811 11.5695C8.20724 11.8102 7.79279 11.8102 7.51192 11.5695L0.51192 5.56946C0.197426 5.29989 0.161005 4.82641 0.430571 4.51192Z"
        fill={color}
      />
    </svg>
  );
};

export default VerticalNext;