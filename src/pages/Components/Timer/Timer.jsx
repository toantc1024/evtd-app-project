import React from 'react';

const Timer = ({ timer }) => {
  const formatTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = time % 60;

    if (second < 10) second = '0' + second;
    if (minute < 10) minute = '0' + minute;

    return minute + ':' + second;
  };
  return (
    <div className="text-6xl text-white font-Fredoka font-semibold">
      {formatTime(timer)}
    </div>
  );
};

export default Timer;
