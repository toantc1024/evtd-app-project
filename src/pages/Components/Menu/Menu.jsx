import React, { useEffect, useState } from 'react';
import { HiArrowLeft, HiChevronDown, HiCog, HiGlobeAlt } from 'react-icons/hi';
import { DropdownComponent } from '../Dropdown/DropdownComponent';
import { languageMap } from '../../Mapping/DisplayLanguage';
const MenuModal = ({ menuModal, setMenuModal }) => {
  const [displayLanguage, setDisplayLanguage] = useState('en');

  const updateDisplayLanguage = (language) => {
    setDisplayLanguage(language);
    chrome.storage.sync.set({ displayLanguage: language });
  };

  let defaultLanguage = 'en';
  useEffect(() => {
    chrome.storage.sync.get(['displayLanguage'], (result) => {
      if (result.displayLanguage) {
        setDisplayLanguage(result.displayLanguage);
      } else {
        updateDisplayLanguage(defaultLanguage);
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
                      <button className="bg-gray-200 w-full py-2  flex p-4 rounded-lg ">
                        <span>{languageMap[displayLanguage].menu.donate}</span>
                      </button>
                      <button className="bg-gray-200 w-full py-2  flex p-4 rounded-lg flex items-center justify-between">
                        <span>{languageMap[displayLanguage].menu.setting}</span>
                        <HiCog className="text-lg" />
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
