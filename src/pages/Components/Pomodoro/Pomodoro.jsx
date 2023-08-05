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
    let circleBar = document.getElementById('circle-bar');
    circleBar.style.strokeDashoffset = 0;
    setStart(false);
  }, [type]);

  useEffect(() => {
    let intervalId = null;
    let circleBar = document.getElementById('circle-bar');
    if (start) {
      intervalId = setInterval(() => {
        circleBar.style.strokeDashoffset =
          Number(circleBar.style.strokeDashoffset) +
          880 / (type === POMODORO ? 1500 : type === SHORT_BREAK ? 300 : 900);
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
             w-full h-full  z-10 transition-colors duration-500 rounded-t-3xl flex flex-col justify-between tall:justify-around tall:rounded-none items-center`}
      >
        <div
          className="h-[400px] flex flex-col justify-between items-center
         tall:h-[700px] tall:w-[700px] tall:tall:bg-[rgba(0,0,0,0.1)] tall:rounded-3xl tall:shadow-2xl"
        >
          {/* navbar */}
          <div className="relative mt-4 flex justify-evenly items-center m-2 tall:w-[450px] tall:p-3 tall:rounded-3xl tall:bg-[rgba(0,0,0,0.2)]">
            {/* Pomodoro */}
            <button
              className={`${
                type === POMODORO
                  ? 'bg-[rgba(0,0,0,0.3)] font-bold tall:bg-transparent tall:text-sm duration-100'
                  : ''
              } w-[90px] py-1 font-medium text-white rounded-md rounded-tl-3xl tall:rounded-2xl tall:py-3`}
              onClick={() => {
                setType(POMODORO);
              }}
            >
              Pomodoro
            </button>
            {/* Short break */}
            <button
              className={`${
                type === SHORT_BREAK
                  ? 'bg-[rgba(0,0,0,0.5)] font-bold tall:bg-transparent tall:text-sm duration-100'
                  : ''
              } w-[90px] py-1 font-medium text-white rounded-md tall:rounded-2xl tall:py-3`}
              onClick={() => {
                setType(SHORT_BREAK);
              }}
            >
              Nghỉ ngắn
            </button>
            {/* Long break */}
            <button
              className={`${
                type === LONG_BREAK
                  ? 'bg-[rgba(0,0,0,0.5)] font-bold tall:bg-transparent tall:text-sm duration-100'
                  : ''
              } w-[90px] py-1 font-medium text-white rounded-md rounded-tr-3xl tall:rounded-2xl tall:py-3`}
              onClick={() => {
                setType(LONG_BREAK);
              }}
            >
              Nghỉ dài
            </button>
            <div
              className={`${
                type === POMODORO
                  ? ''
                  : type === SHORT_BREAK
                  ? 'translate-x-[129px]'
                  : 'translate-x-[258px]'
              }
            hidden tall:inline tall:absolute top-[12px] left-[52px] bg-[rgba(0,0,0,0.5)] w-[90px] h-[44px] rounded-full ease-in-out duration-500 z-[-1]`}
            ></div>
          </div>

          {/* Timer */}
          <div className="flex justify-center items-center w-[300px] h-[300px]">
            <div className="text-6xl text-white font-fredoka font-semibold">
              {formatTime(timer)}
            </div>
            <svg
              width={300}
              height={300}
              className="hidden tall:inline absolute"
            >
              <circle
                id="circle-bar"
                className="duration-1000"
                cx={150}
                cy={150}
                r={140}
                stroke={
                  type === POMODORO
                    ? 'rgb(220,38,38)'
                    : type === SHORT_BREAK
                    ? 'rgb(2,132,199)'
                    : 'rgb(22,163,74)'
                }
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={880}
                style={{ strokeDashoffset: 0 }}
                strokeMiterlimit={0}
                transform="rotate(-90 ) translate(-300 0)"
              />
            </svg>
          </div>

          {/*Pause Button*/}
          <div className="flex justify-evenly gap-4 tall:gap-10 items-center w-full tall:mb-10">
            <button
              className=" rounded-full bg-white
               duration-150 hover:scale-110 hover:bg-red-300 tall:bg-[rgba(0,0,0,0.1)] tall:border-4 tall:border-[rgba(255,255,255,0.2)]
              group
              p-2
              active:bg-red-400"
              onClick={() => setStart(false)}
            >
              <AiOutlinePause className="text-5xl font-bold text-red-500 group-hover:text-red-700" />
            </button>
            {/*Play Button*/}
            <button
              className="p-2 rounded-full bg-white duration-150 tall:bg-[rgba(0,0,0,0.1)] tall:border-4 tall:border-[rgba(255,255,255,0.2)]
              group hover:scale-110 hover:bg-green-400 active:bg-green-500"
              onClick={() => setStart(true)}
            >
              <HiOutlinePlay className="text-5xl text-green-600 group-hover:text-green-600" />
            </button>
            {/*Refresh Button*/}
            <button
              className="p-2 rounded-full bg-white duration-150 hover:scale-110 hover:bg-yellow-300 active:bg-yellow-400
               tall:bg-[rgba(0,0,0,0.1)] tall:border-4 tall:border-[rgba(255,255,255,0.2)]"
              onClick={() => {
                type
                  ? type === 1
                    ? setTimer(300)
                    : setTimer(900)
                  : setTimer(1500);
                document.getElementById('Alarm').pause();
                let circleBar = document.getElementById('circle-bar');
                circleBar.style.strokeDashoffset = 0;
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
