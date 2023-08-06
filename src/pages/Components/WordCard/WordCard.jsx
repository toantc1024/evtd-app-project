import React, { useEffect, useState } from 'react';
import TextContent from './TextContent';
import Dictionary from './Dictionary';
import ExampleWord from './Example';
import { HiOutlineExclamation, HiX } from 'react-icons/hi';
import { languageMap } from '../../Mapping/DisplayLanguage';

const formatNumber = (number) => {
  // Add 0 before number if number is < 10
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const formatDate = (ms) => {
  // Check if ms is not empty object or null
  if (Object.keys(ms).length === 0 && ms.constructor === Object) {
    return 'No date';
  }

  const date = new Date(ms);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${formatNumber(day)}/${formatNumber(month)}/${year} ${formatNumber(
    hour
  )}:${formatNumber(minute)}`;
};

const WordCard = ({
  word,
  date,
  uid,
  from,
  to,
  displayLanguage,
  deleteWord,
}) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <div className="flex flex-col bg-slate-100 rounded-lg text-gray-700 border-[1px] shadow-lg relative">
        {confirm && (
          <div
            className={`flex absolute top-0 bottom-0 right-0 left-0 bg-[rgba(255,0,0,.3)] items-center justify-center rounded-lg px-10 py-16 `}
          >
            <div className="p-8 flex items-center justify-between flex-col bg-white shadow-2xl h-full w-full rounded-lg ">
              {/* Text */}

              <span className="bg-red-400 p-4 rounded-full text-white shadow-lg hover:bg-red-500">
                <HiOutlineExclamation className="text-white text-2xl" />
              </span>

              <p className="text-sm flex justify-center items-center w-full text-center">
                {languageMap[displayLanguage].savedWords.delete.title}
              </p>

              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white rounded-lg shadow-lg"
                  onClick={() => {
                    setConfirm(false);
                    deleteWord(uid);
                  }}
                >
                  {languageMap[displayLanguage].savedWords.delete.yes}
                </button>
                <button
                  className="px-4 py-2 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white rounded-lg shadow-lg"
                  onClick={() => {
                    setConfirm(false);
                  }}
                >
                  {languageMap[displayLanguage].savedWords.delete.no}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete button */}
        <div className="border-b-[1px] text-[12px] font-bold flex justify-end items-center text-white p-[5px]">
          {date && (
            <span className="flex w-full flex-start gap-[5px] text-[12px] pl-4 text-gray-600">
              {formatDate(date)}
            </span>
          )}

          <div className="flex gap-[5px]">
            <button
              className="w-[26px] h-[26px] bg-white text-gray-500 rounded-lg flex items-center justify-center text-[20px] p-[5px] font-bold hover:bg-red-300 group"
              onClick={() => {
                setConfirm(true);
              }}
            >
              <HiX className="group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="shadow-sm h-[400px] md:h-[350px] overflow-auto flex flex-col justify-stretch rounded-lg text-gray-900 bg-gray-100 text-[15px]">
          {word && word.text && (
            <TextContent
              phonetic={word.phonetic}
              text={word.text}
              source={from}
            />
          )}
          {word && word.result && (
            <TextContent
              source={to}
              text={
                word.result.length >= 2 ? word.result.join(' ') : word.result[0]
              }
            />
          )}

          {
            // Check if word has definition
            word && word.dict && (
              <Dictionary displayLanguage={displayLanguage} dict={word.dict} />
            )
          }

          {
            // Check if word has example
            word && word.example && (
              <ExampleWord
                displayLanguage={displayLanguage}
                example={word.example}
              />
            )
          }
        </div>
      </div>
    </>
  );
};

export default WordCard;
