import { useEffect, useState } from "react";

const useCountdown = (
  numberOfSeconds: number,
  reset: boolean,
  onResetRest: boolean,
  setResetCounter: any
) => {
  const [countDown, setCountDown] = useState(numberOfSeconds);

  useEffect(() => {
    onResetRest && setCountDown(numberOfSeconds);
    onResetRest &&setResetCounter(false);
  }, [onResetRest]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) setCountDown(countDown - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
