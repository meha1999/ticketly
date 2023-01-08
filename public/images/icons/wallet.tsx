import { FC } from "react";

interface WalletProps {
  color: string;
}

const Wallet: FC<WalletProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.4105 7.86058C18.3559 7.8571 18.2964 7.85712 18.2348 7.85715L18.2194 7.85715H15.8015C13.8086 7.85715 12.1033 9.43821 12.1033 11.5C12.1033 13.5618 13.8086 15.1429 15.8015 15.1429H18.2194L18.2348 15.1429C18.2964 15.1429 18.3559 15.1429 18.4105 15.1394C19.22 15.0879 19.9359 14.4495 19.9961 13.5577C20.0001 13.4992 20 13.4362 20 13.3778L20 13.3619V9.6381L20 9.62225C20 9.56383 20.0001 9.50079 19.9961 9.44232C19.9359 8.55055 19.22 7.91209 18.4105 7.86058ZM15.5872 12.4714C16.1002 12.4714 16.5162 12.0365 16.5162 11.5C16.5162 10.9635 16.1002 10.5286 15.5872 10.5286C15.0741 10.5286 14.6581 10.9635 14.6581 11.5C14.6581 12.0365 15.0741 12.4714 15.5872 12.4714Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2341 16.6C18.3778 16.5963 18.4866 16.7304 18.4476 16.8699C18.2541 17.562 17.947 18.1518 17.4542 18.6485C16.7329 19.3755 15.8183 19.6981 14.6882 19.8512C13.5902 20 12.1872 20 10.4158 20H8.37936C6.60803 20 5.20501 20 4.10697 19.8512C2.97692 19.6981 2.06227 19.3755 1.34096 18.6485C0.619644 17.9215 0.299531 16.9997 0.1476 15.8608C-2.70307e-05 14.7541 -1.49126e-05 13.3401 3.1174e-07 11.5548V11.4452C-1.50275e-05 9.65994 -2.72542e-05 8.2459 0.1476 7.13924C0.299531 6.00031 0.619643 5.07848 1.34096 4.35149C2.06227 3.62451 2.97692 3.30188 4.10697 3.14876C5.205 2.99997 6.60802 2.99999 8.37936 3L10.4158 3C12.1872 2.99998 13.5902 2.99997 14.6882 3.14876C15.8183 3.30188 16.7329 3.62451 17.4542 4.35149C17.947 4.84817 18.2541 5.43804 18.4476 6.13012C18.4866 6.26959 18.3778 6.40376 18.2341 6.4L15.8015 6.40001C13.0673 6.40001 10.6575 8.57689 10.6575 11.5C10.6575 14.4231 13.0673 16.6 15.8015 16.6L18.2341 16.6ZM3.61446 6.88572C3.21522 6.88572 2.89157 7.21191 2.89157 7.61429C2.89157 8.01667 3.21522 8.34286 3.61446 8.34286H7.46988C7.86912 8.34286 8.19277 8.01667 8.19277 7.61429C8.19277 7.21191 7.86912 6.88572 7.46988 6.88572H3.61446Z"
        fill={color}
      />
      <path
        d="M5.77668 2.02439L7.73549 0.581259C8.78744 -0.193753 10.2126 -0.193753 11.2645 0.58126L13.2336 2.03197C12.4103 1.99995 11.4909 1.99998 10.4829 2H8.31232C7.39123 1.99998 6.5441 1.99996 5.77668 2.02439Z"
        fill={color}
      />
    </svg>
  );
};

export default Wallet;