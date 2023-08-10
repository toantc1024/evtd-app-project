import React, { useEffect, useState } from 'react';
import { langs } from '../../Mapping/LanguageList';
import { HiArrowLeft, HiSearch, HiX } from 'react-icons/hi';
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
          <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
            <div className="flex flex-col h-full justify-start">
              {/* Navbar */}
              <div className="flex justify-between py-2 px-2 border-b-[1px]">
                <button
                  onClick={() => {
                    setLanguageModal(false);
                  }}
                  className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100"
                >
                  <HiArrowLeft className="text-xl text-gray-500" />
                </button>

                <span className="text-lg text-gray-600 flex justify-center items-center">
                  {
                    languageMap[displayLanguage].popup.selectlang.placeholder[
                      selectMode
                    ]
                  }
                </span>
                <button className="p-2 rounded-full flex justify-center items-center transition-bg ease-in-out duration-100"></button>
              </div>
              {/* Display language section */}
              <section className="  h-full w-full flex items-center justify-center flex-col text-lg ">
                <div className="h-auto w-full flex items-center justify-center px-2 py-2 ">
                  <div className="flex w-full rounded-xl border-[1px] ">
                    <div className="flex items-center justify-center w-10 h-10 rounded-l-xl bg-white ">
                      <HiSearch className="text-lg text-gray-400" />
                    </div>
                    <input
                      type="search"
                      className="w-full text-gray-500 rounded-r-xl h-10 pr-2 bg-white outline-none text-sm "
                      placeholder={
                        languageMap[displayLanguage].popup.selectlang
                          .placeholder.search
                      }
                      value={searchText}
                      onChange={(e) => {
                        let newText = e.target.value;
                        setSearchText(newText);
                      }}
                    />
                  </div>
                </div>
                <div className="h-full w-full">
                  <div className="flex flex-col h-[425px] overflow-auto">
                    <div className="flex flex-col ">
                      {Object.entries(
                        displayLanguage === 'vi' ? langs : langCode
                      )
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
                              className="px-4 py-4 border-[1px] text-gray-600 hover:bg-bgTranslate hover:text-white transition-bg transition-text ease-in-out duration-100 cursor-pointer mx-2 my-1 rounded-2xl font-light shadow-sm text-sm"
                            >
                              {value}
                            </option>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
      ) : null}
    </>
  );

  // return (
  //   <>
  //     {languageModal ? (
  //       <>
  //         <div className="flex justify-between py-2 px-2 border-b-[1px]">
  //           <button className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100">
  //             <HiArrowLeft className="text-xl text-gray-500" />
  //           </button>
  //         </div>

  //         <div className="flex flex-col justify-between fixed top-0 left-0 w-full h-full bg-white z-50 ">
  //           <div className="h-full p-2">
  //             <div className="flex flex-col justify-between py-2 px-2 rounded-lg h-full">
  //               <div className="flex justify-between py-2">
  //                 <div className="relative  flex w-full flex-wrap items-stretch py-2 ">

  //                   <button
  //                     onClick={() => {
  //                       setLanguageModal(false);
  //                     }}
  //                     className="p-2 border-[1px] flex justify-center items-center hover:bg-red-100 transition-bg ease-in-out duration-100 input-group-text flex items-center whitespace-nowrap  w-10 h-10 rounded-full group"
  //                   >
  //                     <HiX className="text-xl text-gray-500 group-hover:text-red-400" />
  //                   </button>
  //                 </div>
  //               </div>

  //               <div className={`h-full w-full  bg-white`}>
  //                 <div className="h-[400px] overflow-auto gap-2 mt-4">
  //                   {Object.entries(displayLanguage === 'vi' ? langs : langCode)
  //                     .filter(([key, value]) => {
  //                       return (
  //                         !(selectMode === 'target' && key === 'auto') &&
  //                         value
  //                           .toLowerCase()
  //                           .indexOf(searchText.toLowerCase()) !== -1
  //                       );
  //                     })
  //                     .map(([key, value]) => {
  //                       return (
  //                         <option
  //                           onClick={() => {
  //                             updateLanguage(key);
  //                             setLanguageModal(false);
  //                           }}
  //                           value={key}
  //                           className="border-[1px] hover:bg-blue-100 cursor-pointer hover:text-blue-700 py-4 flex items-center justify-center mx-4 mb-2 rounded-xl"
  //                         >
  //                           {value}
  //                         </option>
  //                       );
  //                     })}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     ) : null}
  //   </>
  // );
};

export default SelectLanguage;
