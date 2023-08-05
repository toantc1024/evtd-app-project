import React from 'react';
import { HiBookmark } from 'react-icons/hi';

const Dictionary = ({ dict = [] }) => {
  return (
    <div className="rounded-sm shadow-sm bg-white m-[5px] p-[5px] flex flex-col">
      <div className="flex gap-[5px] items-center justify-start">
        <HiBookmark className="text-pink-600 font-bold" />
        <span>Dictionary</span>
      </div>
      <div className="px-2">
        {dict &&
          dict.map((item, index) => {
            // Check if item has ':"
            let type, content;
            if (item.indexOf(':') !== -1) {
              [type, content] = item.split(':');
            } else {
              type = '';
              content = item;
            }
            return (
              <div className="flex flex-col" key={index}>
                <span className=" p-[2px] rounded-lg bg-cyan-200 italic">
                  {type}
                </span>
                <span>{content}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dictionary;
