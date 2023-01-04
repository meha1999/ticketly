import { FC } from "react";

interface VerticalPreviousProps {
  color: string;
}

const VerticalPrevious: FC<VerticalPreviousProps> = ({ color }) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.51192 0.430558C7.79279 0.189814 8.20724 0.189814 8.48811 0.430558L15.4881 6.43056C15.8026 6.70012 15.839 7.1736 15.5695 7.48809C15.2999 7.80259 14.8264 7.83901 14.5119 7.56944L8.00001 1.98781L1.48811 7.56944C1.17361 7.83901 0.700138 7.80259 0.430571 7.48809C0.161005 7.1736 0.197426 6.70012 0.51192 6.43056L7.51192 0.430558ZM0.51192 10.4306L7.51192 4.43056C7.79279 4.18981 8.20724 4.18981 8.48811 4.43056L15.4881 10.4306C15.8026 10.7001 15.839 11.1736 15.5695 11.4881C15.2999 11.8026 14.8264 11.839 14.5119 11.5694L8.00001 5.98781L1.48811 11.5694C1.17361 11.839 0.700138 11.8026 0.430571 11.4881C0.161005 11.1736 0.197426 10.7001 0.51192 10.4306Z"
        fill={color}
      />
    </svg>
  );
};

export default VerticalPrevious;
