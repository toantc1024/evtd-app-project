import React from 'react';
import { HISTORY_PAGE, SAVED_WORDS_PAGE } from '../../Panel/constants';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { BiHistory } from 'react-icons/bi';
const Navbar = ({ appDropdown, setAppDropdown, appPage, setAppPage }) => {
  return (
    <div className="flex justify-between p-4 border-b-[1px] z-30">
      <button className="p-2 border-[1px] rounded-full flex justify-between items-center hover:bg-amber-500 group transition-bg ease-in-out duration-100 gap-2 px-4 bg-white">
        <span className="group-hover:text-white text-amber-500 font-bold text-xl">
          Saved words
        </span>
        <BsBookmarkStarFill className="group-hover:text-white text-xl text-amber-500" />
      </button>

      <div className="relative z-20">
        <button
          className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100 gap-2 px-4"
          onClick={() => {
            // Tooggle appDropdown
            setAppDropdown(!appDropdown);
          }}
        >
          <span className="text-xl text-gray-800 ">Menu</span>
          <HiDotsVertical className="text-xl text-gray-500" />
        </button>
        <div
          className={`${
            appDropdown ? '' : 'hidden'
          } bg-gray-200 absolute top-[50px] p-2 flex flex-col rounded-xl right-0 w-[200px] shadow-xl`}
        >
          <div className="p-2 bg-gray-100 rounded-lg w-full flex gap-1 flex-col ">
            <button
              className="p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-amber-600 group  transition-bg ease-in-out duration-100 gap-2 px-4 bg-white "
              onClick={() => {
                setAppPage(SAVED_WORDS_PAGE);
                setAppDropdown(false);
              }}
            >
              <span className="group-hover:text-white font-bold text-amber-500">
                Saved words
              </span>
              <BsBookmarkStarFill className="group-hover:text-white text-xl text-amber-500" />
            </button>

            <button
              className="p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-emerald-600 group  transition-bg ease-in-out duration-100 gap-2 px-4 bg-white "
              onClick={() => {
                setAppPage(HISTORY_PAGE);
                setAppDropdown(false);
              }}
            >
              <span className="group-hover:text-white font-bold text-emerald-500">
                Lookup hisory
              </span>
              <BiHistory className="group-hover:text-white text-xl text-emerald-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
