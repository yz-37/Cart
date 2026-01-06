
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: Date;
  className?: string;
}

const formatTime = (seconds: number) => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (d > 0) {
    return `${d}天 ${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime, className }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    return difference > 0 ? difference / 1000 : 0;
  };

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft <= 0) {
    return <span className={`text-red-500 ${className}`}>已結束</span>;
  }

  return <span className={`font-mono ${className}`}>{formatTime(timeLeft)}</span>;
};

export default CountdownTimer;
