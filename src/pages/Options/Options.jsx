import React, { useEffect, useState } from 'react';
import { HiCheck, HiCog } from 'react-icons/hi';
import './Options.css';
import { DEFAULT_DISPLAY_LANGUAGE, DEFAULT_SETTINGS } from '../Popup/constants';
import { languageMap } from '../Mapping/DisplayLanguage';
import { DropdownComponent } from '../Components/Dropdown/DropdownComponent';
const Options = () => {
  const [displayLanguage, setDisplayLanguage] = useState(
    DEFAULT_DISPLAY_LANGUAGE
  );

  const [isJustSaved, setIsJustSaved] = useState(false);

  // States for settings
  const [translateHotkey, setTranslateHotkey] = useState(false);
  const [ispreTranslate, setIspreTranslate] = useState(false);
  const [isPomodoroWindowPopup, setIsPomodoroWindowPopup] = useState(false);
  const [hideTranslateButton, setHideTranslateButton] = useState(false);
  // Fetch displayLang from chrome.storage
  useEffect(() => {
    chrome.storage.sync.get(
      [
        'displayLanguage',
        'translateHotkey',
        'ispreTranslate',
        'hideTranslateButton',
        'isPomodoroWindowPopup',
      ],
      (result) => {
        if (result.displayLanguage) {
          setDisplayLanguage(result.displayLanguage);
        }

        if (result.translateHotkey) {
          setTranslateHotkey(result.translateHotkey);
        }
        if (result.ispreTranslate) {
          setIspreTranslate(result.ispreTranslate);
        }

        if (result.isPomodoroWindowPopup) {
          setIsPomodoroWindowPopup(result.isPomodoroWindowPopup);
        }

        if (result.hideTranslateButton) {
          setHideTranslateButton(result.hideTranslateButton);
        }
      }
    );

    // Listen event from real time chrome.storage update
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      console.log(changes);
      if (changes.displayLanguage.newValue) {
        setDisplayLanguage(changes.displayLanguage.newValue);
      }

      if (changes.translateHotkey.newValue) {
        setTranslateHotkey(changes.translateHotkey.newValue);
      }

      if (changes.ispreTranslate.newValue) {
        setIspreTranslate(changes.ispreTranslate.newValue);
      }

      if (changes.isPomodoroWindowPopup.newValue) {
        setIsPomodoroWindowPopup(changes.isPomodoroWindowPopup.newValue);
      }

      if (changes.hideTranslateButton.newValue) {
        setHideTranslateButton(changes.hideTranslateButton.newValue);
      }
    });
  }, []);

  const [isJustModified, setIsJustModified] = useState(false);
  useEffect(() => {
    let titleElement = document.documentElement.querySelector('title');
    titleElement.textContent = languageMap[displayLanguage].options.title;
  }, [displayLanguage]);

  let timeoutId = null;

  const updateDisplayLanguage = (language) => {
    setDisplayLanguage(language);
    chrome.storage.sync.set({ displayLanguage: language });
  };

  useEffect(() => {
    chrome.storage.sync.get(['displayLanguage'], (result) => {
      if (result.displayLanguage) {
        setDisplayLanguage(result.displayLanguage);
      } else {
        updateDisplayLanguage(DEFAULT_DISPLAY_LANGUAGE);
      }
    });
  }, []);
  return (
    <div className="h-full w-full flex flex-col relative">
      {isJustModified && (
        <div className="absolute bottom-0 right-0 m-4  bg-emerald-500 text-white px-4 py-2 text-2xl flex items-center justify-center rounded-lg animation-wiggle">
          <span>{languageMap[displayLanguage].options.saved}</span>
          <span>
            <HiCheck />
          </span>
        </div>
      )}

      <div className="flex justify-between p-4 border-b-[1px] z-30">
        <button className="p-2 border-[1px] rounded-full flex justify-between items-center hover:bg-amber-500 group transition-bg ease-in-out duration-100 gap-2 px-4 bg-white">
          <span className="group-hover:text-white text-amber-500 font-bold text-xl">
            {languageMap[displayLanguage].options.title}
          </span>
          <HiCog className="group-hover:text-white text-xl text-amber-500" />
        </button>

        <DropdownComponent
          displayLanguage={displayLanguage}
          updateDisplayLanguage={updateDisplayLanguage}
        />
      </div>

      <div className="p-4 m-4 rounded-[32px] h-full bg-white shadow-end-inset  flex flex-col">
        <div className="containner px-10 my-10 mx-auto">
          {/* Submit button */}

          <form
            id="setting-form"
            onSubmit={(e) => {
              // Remove all timeoutId
              clearTimeout(timeoutId);
              e.preventDefault();
              setIsJustModified(true);
              timeoutId = setTimeout(() => {
                setIsJustModified(false);
              }, 1000);

              // Get form data
              const formData = new FormData(e.target);

              // Get form data as object
              const formDataObj = Object.fromEntries(formData.entries());

              // Save to chrome.storage
              console.log(formDataObj);

              chrome.storage.sync.set({
                isPomodoroWindowPopup,
                ispreTranslate,
                translateHotkey,
                hideTranslateButton,
              });
            }}
          >
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors ease-in-out duration-100"
              >
                Save
              </button>
            </div>
            <div className="divide-y">
              {languageMap[displayLanguage].options.settings.map((setting) => (
                <div className="flex items-start space-x-3 py-6">
                  <input
                    type="checkbox"
                    checked={
                      setting.key === 'translateHotkey'
                        ? translateHotkey
                        : setting.key === 'ispreTranslate'
                        ? ispreTranslate
                        : setting.key === 'isPomodoroWindowPopup'
                        ? isPomodoroWindowPopup
                        : hideTranslateButton
                    }
                    onChange={(e) => {
                      if (setting.key === 'translateHotkey') {
                        setTranslateHotkey(e.target.checked);
                      } else if (setting.key === 'ispreTranslate') {
                        setIspreTranslate(e.target.checked);
                      } else if (setting.key === 'isPomodoroWindowPopup') {
                        setIsPomodoroWindowPopup(e.target.checked);
                      } else {
                        setHideTranslateButton(e.target.checked);
                      }
                    }}
                    name={setting.key}
                    className="border-gray-300 rounded h-5 w-5"
                  />

                  <div className="flex flex-col">
                    <h1 className="text-gray-700  text-lg font-medium leading-none">
                      {setting.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 leading-4">
                      {setting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Options;
