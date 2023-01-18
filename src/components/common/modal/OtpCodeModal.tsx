import Modal from "./Modal";
import Divider from "../divider";
import { useState, FC, useRef, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { IoRefreshOutline } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import CountDown from "../countDown";
import { Toaster } from "../toast/Toaster";
import ToastComponent from "../toast/ToastComponent";
import { FaRegCheckCircle } from "react-icons/fa";

interface OptCodeModalProps {
  isOpen: boolean;
  value: string;
  title: string;
  onClose: () => void;
  onChangeValue: (value: string) => void;
  onSubmission: (otp: string) => void;
}

const OtpCodeModal: FC<OptCodeModalProps> = ({
  title,
  value,
  isOpen,
  onClose,
  onSubmission,
  onChangeValue,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);

  const [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    forth: "",
  });
  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);
  const thirdInput = useRef<HTMLInputElement>(null);
  const forthInput = useRef<HTMLInputElement>(null);

  const editDetailHandler = () => {
    if (value !== inputValue) onChangeValue(inputValue);
    setIsEditMode(false);
  };

  const submitOtpCodeHandler = () => {
    if (otp.first && otp.second && otp.third && otp.forth) {
      onSubmission(otp.first + otp.second + otp.third + otp.forth);
    } else {
      Toaster.error(
        <ToastComponent
          title="ناموفق"
          description="لطفا کد دریافتی را به صورت کامل وارد نمایید."
        />
      );
    }
  };

  const otpInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 1)
      setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (otp.first) {
      secondInput.current?.focus();
    }
    if (otp.second) {
      thirdInput.current?.focus();
    }
    if (otp.third) {
      forthInput.current?.focus();
    }
  }, [otp]);

  useEffect(() => {
    setOtp({
      first: "",
      second: "",
      third: "",
      forth: "",
    });
    setIsCountDownFinished(false);
    setInputValue(value);
  }, [isOpen, value]);

  const [resetCounter, setResetCounter] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="otp-code-modal-wrapper">
        <div className="title-bar">
          <h5 className="title">تایید {title}</h5>
          <div className="detail">
            {isEditMode ? (
              <>
                <BsCheckLg onClick={editDetailHandler} color="#88D453" />
                <input
                  type="text"
                  autoFocus
                  className="input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </>
            ) : (
              <>
                <BiEdit onClick={() => setIsEditMode(true)} color="#ff2950" />
                <span>{inputValue}</span>
              </>
            )}
          </div>
        </div>
        <Divider />
        <div className="otp-code-inputs">
          <div className="inputs">
            <input
              name="first"
              maxLength={1}
              ref={firstInput}
              value={otp.first}
              onChange={otpInputHandler}
            />
            <input
              name="second"
              maxLength={1}
              ref={secondInput}
              value={otp.second}
              onChange={otpInputHandler}
            />
            <input
              name="third"
              maxLength={1}
              ref={thirdInput}
              value={otp.third}
              onChange={otpInputHandler}
            />
            <input
              name="forth"
              maxLength={1}
              ref={forthInput}
              value={otp.forth}
              onChange={otpInputHandler}
            />
          </div>
          <p className="otp-msg">کد دریافتی در کادر بالا وارد نمایید .</p>
          <div className="re-send">
            <CountDown
              onFinish={() => setIsCountDownFinished(true)}
              isFinished={isCountDownFinished}
              resetCounter={resetCounter}
              setResetCounter={setResetCounter}
            />
            <button
              className="btn"
              disabled={!isCountDownFinished}
              onClick={() => {
                setResetCounter(true);
                setIsCountDownFinished(false);
              }}
            >
              <IoRefreshOutline />
              ارسال مجدد کد
            </button>
          </div>
        </div>
        <div className="submit">
          <button onClick={submitOtpCodeHandler}>تایید کد</button>
        </div>
{/* 
        <div className={`divider-with-name success`}>
          <span />
          <FaRegCheckCircle />
          <p>ثبت نام شما با موفقیت انجام شد!</p>
          <span />
        </div> */}
      </div>
    </Modal>
  );
};

export default OtpCodeModal;
