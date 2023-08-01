import React, { useState } from 'react';
import { HiArrowLeft, HiChevronDown, HiCog, HiGlobeAlt } from 'react-icons/hi';
const MenuModal = ({ menuModal, setMenuModal }) => {
  return (
    <>
      {menuModal ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
            <div className="flex flex-col h-full justify-between">
              {/* Navbar */}
              <div className="flex justify-between py-2 px-2">
                <button
                  onClick={() => {
                    setMenuModal(false);
                  }}
                  className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100"
                >
                  <HiArrowLeft className="text-xl text-gray-500" />
                </button>
              </div>
              <div className="bg-white h-full p-2 overflow-auto">
                {/* Display language section */}
                <section className=" relative h-full w-full flex items-center justify-center flex-col gap-2 px-4 text-lg ">
                  <div className="w-full px-4  ">
                    <div className="p-2 flex gap-2 flex-col">
                      <button className="bg-gray-200 w-full py-2 p-4 rounded-lg flex items-start">
                        <span>Display language</span>
                        <HiGlobeAlt />
                      </button>
                      <button className="bg-gray-200 w-full py-2  flex p-4 rounded-lg ">
                        <span>Donate</span>
                      </button>
                      <button className="bg-gray-200 w-full py-2  flex p-4 rounded-lg flex items-center justify-between">
                        <span>Setting</span>
                        <HiCog className="text-lg" />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            {/* <div
              className={`h-full w-full absolute bg-red-400 flex items-center justify-center overflow-hidden`}
            >
              <div className="max-h-[429px] overflow-auto flex flex-col gap-2 mt-8">
                <div className="bg-sky-400 px-4 py-2 rounded-lg">Tieenf ao</div>
                <div className="bg-sky-400 px-4 py-2 rounded-lg"></div>
                <div className="bg-sky-400 px-4 py-2 rounded-lg">
                  Cryptographiically
                </div>
                <div className="bg-sky-400 px-4 py-2 rounded-lg">
                  Cryptographiically
                </div>
              </div>
            </div> */}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MenuModal;
