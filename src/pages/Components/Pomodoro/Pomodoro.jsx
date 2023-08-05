import React, { useState, useEffect } from 'react';
import { HiOutlinePlay, HiPause, HiRefresh } from 'react-icons/hi';
import { AiOutlinePause } from 'react-icons/ai';
import Audio from '../../../assets/audio/alarm';
import { DEFAULT_TITLE, LONG_BREAK, POMODORO, SHORT_BREAK } from './constants';

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
      setPageTitle(DEFAULT_TITLE);
      clearInterval(timerId);
    }
  }, [start]);

  const setPageTitle = (type, value = DEFAULT_TITLE) => {
    let titleBlock = document.querySelector('title');
    console.log(titleBlock);

    if (type === DEFAULT_TITLE) {
      titleBlock.textContent = DEFAULT_TITLE;
    } else {
      titleBlock.textContent = `${value}`;
    }
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerId);
      document.getElementById('Alarm').play();
      setPageTitle(DEFAULT_TITLE);
    } else {
      setPageTitle(POMODORO, formatTime(timer));
    }
  }, [timer]);

  return (
    <>
      <div
        className={`${
          type
            ? type === SHORT_BREAK
              ? 'bg-sky-600'
              : 'bg-green-600'
            : 'bg-red-600'
        } p-t-[50px] left-0 
             w-full h-full  z-10 transition-colors duration-300 rounded-t-3xl flex flex-col justify-between items-center`}
      >
        {/* navbar */}
        <div className="mt-4 flex justify-evenly items-center m-2">
          {/* Pomodoro */}
          <button
            className={`${
              type === POMODORO ? 'bg-[rgba(0,0,0,0.3)] font-bold' : ''
            } w-[90px] py-1 font-medium text-white rounded-md rounded-tl-3xl`}
            onClick={() => {
              setType(POMODORO);
            }}
          >
            Pomodoro
          </button>
          {/* Short break */}
          <button
            className={`${
              type === SHORT_BREAK ? 'bg-[rgba(0,0,0,0.5)] font-bold' : ''
            } w-[90px] py-1 font-medium text-white rounded-md`}
            onClick={() => {
              setType(SHORT_BREAK);
            }}
          >
            Nghỉ ngắn
          </button>
          {/* Long break */}
          <button
            className={`${
              type === LONG_BREAK ? 'bg-[rgba(0,0,0,0.5)] font-bold' : ''
            } w-[90px] py-1 font-medium text-white rounded-md rounded-tr-3xl`}
            onClick={() => {
              setType(LONG_BREAK);
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
              className=" rounded-full bg-red-500 
               duration-150 hover:scale-110 hover:bg-red-300 
              group
              p-2
              active:bg-red-400"
              onClick={() => setStart(false)}
            >
              <AiOutlinePause className="text-5xl font-bold text-red-900 group-hover:text-white" />
            </button>
            {/*Play Button*/}
            <button
              className="p-2 rounded-full bg-green-500 duration-150
              group hover:scale-110 hover:bg-green-300 active:bg-green-400"
              onClick={() => setStart(true)}
            >
              <HiOutlinePlay className="text-5xl text-green-600 group-hover:text-white" />
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
