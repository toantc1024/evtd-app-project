import React, { useState } from 'react';
import { HiGlobeAlt } from 'react-icons/hi';
import { languageMap, supportLanguages } from '../../Mapping/DisplayLanguage';

export const DropdownComponent = ({
  displayLanguage,
  updateDisplayLanguage,
}) => {
  const [appDropdown, setAppDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100 gap-2 px-4"
        onClick={() => {
          setAppDropdown(!appDropdown);
        }}
      >
        <span>{languageMap[displayLanguage].language}</span>
        <HiGlobeAlt className="text-xl text-gray-500" />
      </button>
      <div
        className={`${
          appDropdown ? '' : 'hidden'
        } bg-gray-200 absolute top-[40px] p-2 flex flex-col rounded-xl right-0 w-[200px] z-20`}
      >
        <div className="p-2 bg-gray-100 rounded-lg w-full flex gap-1 flex-col ">
          {supportLanguages.map((language) => (
            <button
              className={`p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-slate-200 group  transition-bg ease-in-out duration-100 gap-2 px-4 ${
                displayLanguage === language.code ? 'bg-sky-200' : 'bg-white'
              }`}
              onClick={() => {
                setAppDropdown(false);
                updateDisplayLanguage(language.code);
              }}
            >
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
