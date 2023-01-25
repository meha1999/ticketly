import React, { useEffect, useState, FC } from "react";
import { useCountdown } from "src/tools/useCountdown";

interface CountDownProps {
  initialTime?: number;
  className?: string;
  isFinished?: boolean;
  resetCounter: boolean;
  onFinish: () => void;
  setResetCounter: any;
}

const CountDown: FC<CountDownProps> = ({
  initialTime = 60000,
  className = "",
  onFinish,
  isFinished,
  resetCounter,
  setResetCounter
}) => {
  const [, , minutes, seconds] = useCountdown(
    initialTime,
    isFinished as boolean,
    resetCounter,
    setResetCounter
  );

  useEffect(() => {
    if (+minutes === 0 && +seconds === 0 && !isFinished) onFinish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds]);

  return <p className={className}>{minutes + ":" + seconds}</p>;
};

export default CountDown;
