import React, { useEffect, useState } from 'react';
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
      <div className="p-4 h-full w-full bg-red-400">
        <h1 className="text-2xl flex justify-center align-items:center font-bold text-white">
          {languageMap[displayLanguage].options.title}
        </h1>
      </div>

      <div className="p-4 h-full w-full bg-blue-400">
        <div className="flex bg-orange-200">
          <div>Show Pretranslate Content</div>
          <button
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
