import React, { useEffect, useState } from 'react';
import { HiCog } from 'react-icons/hi';
import './Options.css';
import { DEFAULT_DISPLAY_LANGUAGE } from '../Popup/constants';
import { languageMap } from '../Mapping/DisplayLanguage';
const Options = () => {
  const [displayLanguage, setDisplayLanguage] = useState(
    DEFAULT_DISPLAY_LANGUAGE
  );

  // Fetch displayLang from chrome.storage
  useEffect(() => {
    chrome.storage.sync.get(['displayLanguage'], (result) => {
      if (result.displayLanguage) {
        setDisplayLanguage(result.displayLanguage);
      }
    });

    // Listen event from real time chrome.storage update
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if (changes.displayLanguage.newValue) {
        setDisplayLanguage(changes.displayLanguage.newValue);
      }
    });
  }, []);

  useEffect(() => {
    let titleElement = document.documentElement.querySelector('title');
    titleElement.textContent = languageMap[displayLanguage].options.title;
  }, [displayLanguage]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 h-[64px] w-full bg-white shadow-md">
        <h1 className="text-2xl flex justify-center align-items:center font-bold text-black">
          {languageMap[displayLanguage].options.title}
          <HiCog className='ml-2 mt-[2px] text-3xl' />
        </h1>
      </div>

      <div className="p-4 m-4 rounded-[32px] h-full bg-white shadow-end-inset min-h-[200px]">
        <div className="flex justify-between mx-4 p-2 rounded-full hover:shadow-md hover:scale-[1.005] duration-200 text-2xl bg-white">
          <div className='ml-4'>Show Pretranslate Content</div>
          <button
            className='mr-4 py-1 px-2 rounded-full duration-100 hover:shadow-inner active:bg-green-300'
            onClick={() => {
              // Set message to background.js
              chrome.runtime.sendMessage(
                { message: 'getCommands' },
                (response) => {
                  console.log(response);
                }
              );
            }}
          >
            Get
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
