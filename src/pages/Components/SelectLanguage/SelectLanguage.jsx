import React, { useEffect, useState } from 'react';
import { langs } from '../../Mapping/LanguageList';
import { HiSearch, HiX } from 'react-icons/hi';
const SelectLanguage = ({
  languageModal,
  setLanguageModal,
  selectMode,
  updateLanguage,
}) => {
  const [searchText, setSearchText] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  return (
    <>
      {languageModal ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-white z-50 ">
            <div className="flex justify-between py-2 px-2">
              <div class="relative  flex w-full flex-wrap items-stretch py-2 ">
                {startSearch ? (
                  <input
                    type="search"
                    class="border-[1px] relative m-0 block w-[1px] min-w-0 flex-auto rounded-full mr-2  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => {
                      let newText = e.target.value;
                      setSearchText(newText);
                    }}
                  />
                ) : (
                  <h1
                    onClick={() => {
                      if (!startSearch) setStartSearch(true);
                    }}
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3]"
                  >
                    {selectMode === 'source'
                      ? 'Translate from'
                      : 'Translate to'}
                  </h1>
                )}
                <div className="flex gap-2">
                  <button
                    className="p-2 border-[1px] flex justify-center items-center hover:bg-blue-100 transition-bg ease-in-out duration-100 input-group-text flex items-center whitespace-nowrap  w-10 h-10 rounded-full  group"
                    onClick={() => {
                      if (!startSearch) setStartSearch(true);
                    }}
                  >
                    <HiSearch className="text-xl group-hover:text-blue-400" />
                  </button>
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
            </div>

            <div className={`h-full w-full absolute bg-white overflow-hidden`}>
              <div className="max-h-[429px] overflow-auto gap-2 mt-4">
                {Object.entries(langs)
                  .filter(([key, value]) => {
                    return (
                      value.toLowerCase().indexOf(searchText.toLowerCase()) !==
                      -1
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
        </>
      ) : null}
    </>
  );
};

export default SelectLanguage;
