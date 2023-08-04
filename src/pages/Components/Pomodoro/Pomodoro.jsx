import React, { useState, useEffect } from 'react';
import { HiOutlinePlay, HiPause, HiRefresh } from 'react-icons/hi';
import Audio from '../../../assets/audio/alarm';

const formatTime = (time) => {
  let minute = Math.floor(time / 60);
  let second = time % 60;

  if (second < 10) second = '0' + second;
  if (minute < 10) minute = '0' + minute;

  return minute + ':' + second;
};

const Pomodoro = ({ stopPomodoro }) => {
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(1500);
  const [timerId, setTimerId] = useState(0);
  const [type, setType] = useState(0);

  useEffect(() => {
    type ? (type === 1 ? setTimer(300) : setTimer(900)) : setTimer(1500);
    document.getElementById('Alarm').pause();
    setStart(false);
  }, [type]);

  useEffect(() => {
    let intervalId = null;
    if (start) {
      intervalId = setInterval(() => {
        setTimer((prev) => (prev -= 1));
      }, 1000);

      setTimerId(intervalId);
    } else {
      clearInterval(timerId);
    }
  }, [start]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerId);
      document.getElementById('Alarm').play();
    }
  }, [timer]);

  return (
    <>
      <div
        className={`${
          type ? (type === 1 ? 'bg-sky-600' : 'bg-green-600') : 'bg-red-600'
        } p-t-[50px] left-0 
             w-full h-[474px] z-10 transition-colors duration-300 rounded-t-3xl flex flex-col justify-between items-center`}
      >
        {/* navbar */}
        <div className="mt-4 flex justify-evenly items-center m-2">
          {/* Pomodoro */}
          <button
            className={`${
              type === 0 ? 'bg-[rgba(0,0,0,0.3)] font-bold' : ''
            } w-[90px] py-1 font-medium text-white rounded-md rounded-tl-3xl`}
            onClick={() => {
              setType(0);
            }}
          >
            Pomodoro
          </button>
          {/* Short break */}
          <button
            className={`${
              type === 1 ? 'bg-[rgba(0,0,0,0.5)] font-bold' : ''
            } w-[90px] py-1 font-medium text-white rounded-md`}
            onClick={() => {
              setType(1);
            }}
          >
            Nghỉ ngắn
          </button>
          {/* Long break */}
          <button
            className={`${
              type === 2 ? 'bg-[rgba(0,0,0,0.5)] font-bold' : ''
            } w-[90px] py-1 font-medium text-white rounded-md rounded-tr-3xl`}
            onClick={() => {
              setType(2);
            }}
          >
            Nghỉ dài
          </button>
        </div>

        {/* Timer */}
        <div className="h-[400px] flex flex-col justify-evenly items-center ">
          <div className="text-6xl text-white font-Fredoka font-semibold">
            {formatTime(timer)}
          </div>
          {/*Pause Button*/}
          <div className="flex justify-evenly gap-4 items-center w-full">
            <button
              className=" rounded-full bg-white p-2 duration-150 hover:scale-110 hover:bg-red-300 active:bg-red-400"
              onClick={() => setStart(false)}
            >
              <HiPause className="text-5xl text-red-500" />
            </button>
            {/*Play Button*/}
            <button
              className="p-2 rounded-full bg-white duration-150 hover:scale-110 hover:bg-green-300 active:bg-green-400"
              onClick={() => setStart(true)}
            >
              <HiOutlinePlay className="text-5xl text-green-600" />
            </button>
            {/*Refresh Button*/}
            <button
              className="p-2 rounded-full bg-white duration-150 hover:scale-110 hover:bg-yellow-300 active:bg-yellow-400"
              onClick={() => {
                type
                  ? type === 1
                    ? setTimer(300)
                    : setTimer(900)
                  : setTimer(1500);
                document.getElementById('Alarm').pause();
                setStart(false);
              }}
            >
              <HiRefresh className="text-5xl text-yellow-500" />
            </button>
            <Audio />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pomodoro;
