
interface MicrophoneProps {
  color: string;
  classStyle?: string;
}

const Microphone: React.FC<MicrophoneProps> = ({ color, classStyle }) => {
  return (
    <svg
      width="26"
      height="31"
      viewBox="0 0 26 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classStyle ? classStyle : ""}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.85352 9.33333C4.85352 4.83451 8.50053 1.1875 12.9993 1.1875C17.4982 1.1875 21.1452 4.83451 21.1452 9.33333V13.5833C21.1452 18.0822 17.4982 21.7292 12.9993 21.7292C8.50053 21.7292 4.85352 18.0822 4.85352 13.5833V9.33333ZM12.9993 3.3125C9.67413 3.3125 6.97852 6.00812 6.97852 9.33333V13.5833C6.97852 16.9085 9.67413 19.6042 12.9993 19.6042C15.962 19.6042 18.4249 17.4643 18.9267 14.6458L14.416 14.6458C13.8292 14.6458 13.3535 14.1701 13.3535 13.5833C13.3535 12.9965 13.8292 12.5208 14.416 12.5208L19.0202 12.5208V10.3958H14.416C13.8292 10.3958 13.3535 9.92014 13.3535 9.33333C13.3535 8.74653 13.8292 8.27083 14.416 8.27083H18.9267C18.4249 5.45236 15.962 3.3125 12.9993 3.3125ZM1.66602 11.1042C2.25282 11.1042 2.72852 11.5799 2.72852 12.1667V13.5833C2.72852 19.2558 7.32692 23.8542 12.9993 23.8542C18.6718 23.8542 23.2702 19.2558 23.2702 13.5833V12.1667C23.2702 11.5799 23.7459 11.1042 24.3327 11.1042C24.9195 11.1042 25.3952 11.5799 25.3952 12.1667V13.5833C25.3952 20.0714 20.4105 25.3953 14.0618 25.9343V29.1667C14.0618 29.7535 13.5862 30.2292 12.9993 30.2292C12.4125 30.2292 11.9368 29.7535 11.9368 29.1667V25.9343C5.5882 25.3953 0.603516 20.0714 0.603516 13.5833V12.1667C0.603516 11.5799 1.07921 11.1042 1.66602 11.1042Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Microphone;
