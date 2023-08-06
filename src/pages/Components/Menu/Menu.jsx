import React, { useEffect, useState } from 'react';
import { HiArrowLeft, HiCog } from 'react-icons/hi';
import { DropdownComponent } from '../Dropdown/DropdownComponent';
import { languageMap } from '../../Mapping/DisplayLanguage';
import { DEFAULT_DISPLAY_LANGUAGE } from '../../Popup/constants';
const MenuModal = ({ menuModal, setMenuModal }) => {
  const [displayLanguage, setDisplayLanguage] = useState(
    DEFAULT_DISPLAY_LANGUAGE
  );

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
    <>
      {menuModal ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
            <div className="flex flex-col h-full justify-start">
              {/* Navbar */}
              <div className="flex justify-between py-2 px-2 border-b-[1px]">
                <button
                  onClick={() => {
                    setMenuModal(false);
                  }}
                  className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100"
                >
                  <HiArrowLeft className="text-xl text-gray-500" />
                </button>
                <DropdownComponent
                  displayLanguage={displayLanguage}
                  updateDisplayLanguage={updateDisplayLanguage}
                />
              </div>
              <div className="bg-white h-full p-2 overflow-auto">
                {/* Display language section */}
                <section className=" relative h-full w-full flex items-center justify-center flex-col gap-2 px-4 text-lg ">
                  <div className="w-full px-4  ">
                    <div className="p-2 flex gap-2 flex-col">
                      <button className="bg-white shadow-lg border-[1px] group hover:bg-slate-100 w-full py-2  flex p-4 rounded-lg flex items-center justify-between">
                        <span className="group-hover:text-slate-900">
                          {languageMap[displayLanguage].menu.introduce}
                        </span>
                        <span className="group-hover:text-slate-900 text-2xl">
                          👋
                        </span>
                      </button>
                      <button
                        className="bg-white shadow-lg border-[1px] group hover:bg-slate-100 w-full py-2  flex p-4 rounded-lg flex items-center justify-between"
                        onClick={() => {
                          let optionURL = chrome.runtime.getURL('options.html');
                          // Check if options.html tab is already exists
                          chrome.tabs.query({ url: optionURL }, (tabs) => {
                            if (tabs.length) {
                              chrome.tabs.update(tabs[0].id, { active: true });
                            } else {
                              chrome.tabs.create({ url: optionURL });
                            }
                          });
                        }}
                      >
                        <span className="group-hover:text-slate-900">
                          {languageMap[displayLanguage].menu.setting}
                        </span>
                        <HiCog className="group-hover:text-slate-900 text-2xl" />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MenuModal;
