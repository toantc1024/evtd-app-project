import React, { useEffect, useState } from 'react';
import { langs } from '../../Mapping/LanguageList';
import { HiSearch, HiX } from 'react-icons/hi';
import { langCode } from '../../../libs/translate/google/lang-code';
import { languageMap } from '../../Mapping/DisplayLanguage';
const SelectLanguage = ({
  displayLanguage,
  languageModal,
  setLanguageModal,
  selectMode,
  updateLanguage,
}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      {languageModal ? (
        <>
          <div className="flex flex-col justify-between fixed top-0 left-0 w-full h-full bg-white z-50 ">
            <div className="h-full p-2">
              <div className="flex flex-col justify-between py-2 px-2 rounded-lg h-full">
                <div className="flex justify-between py-2">
                  <div className="relative  flex w-full flex-wrap items-stretch py-2 ">
                    <input
                      type="search"
                      className="border-[1px] relative m-0 block w-[1px] min-w-0 flex-auto rounded-full mr-2  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]"
                      placeholder={
                        languageMap[displayLanguage].popup.selectlang
                          .placeholder[selectMode]
                      }
                      value={searchText}
                      onChange={(e) => {
                        let newText = e.target.value;
                        setSearchText(newText);
                      }}
                    />
                    <button
                      onClick={() => {
                        setLanguageModal(false);
                      }}
                      className="p-2 border-[1px] flex justify-center items-center hover:bg-red-100 transition-bg ease-in-out duration-100 input-group-text flex items-center whitespace-nowrap  w-10 h-10 rounded-full group"
                    >
                      <HiX className="text-xl text-gray-500 group-hover:text-red-400" />
                    </button>
                  </div>
                </div>

                <div className={`h-full w-full  bg-white`}>
                  <div className="h-[400px] overflow-auto gap-2 mt-4">
                    {Object.entries(displayLanguage === 'vi' ? langs : langCode)
                      .filter(([key, value]) => {
                        return (
                          !(selectMode === 'target' && key === 'auto') &&
                          value
                            .toLowerCase()
                            .indexOf(searchText.toLowerCase()) !== -1
                        );
                      })
                      .map(([key, value]) => {
                        return (
                          <option
                            onClick={() => {
                              updateLanguage(key);
                              setLanguageModal(false);
                            }}
                            value={key}
                            className="border-[1px] hover:bg-blue-100 cursor-pointer hover:text-blue-700 py-4 flex items-center justify-center mx-4 mb-2 rounded-xl"
                          >
                            {value}
                          </option>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SelectLanguage;
