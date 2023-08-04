import React from 'react';
import { HiGlobeAlt } from 'react-icons/hi';

export const DropdownComponent = () => {
  return (
    <div className="flex w-full border rounded-md relative">
      <button className="bg-gray-200 w-full   flex p-2 rounded-lg flex items-center justify-between">
        <span>Display Language</span>
        <HiGlobeAlt className="text-lg" />
      </button>
      <div className="hidden absolute right-0 z-10 top-0  w-56 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg flex gap-2 p-4 bg-gray-200 flex-col">
        <button className="bg-gray-200 w-full   flex p-2 rounded-lg flex items-center justify-between">
          <span>Display Language</span>
          <HiGlobeAlt className="text-lg" />
        </button>
        <button className="bg-gray-200 w-full   flex p-2 rounded-lg flex items-center justify-between">
          <span>Display Language</span>
          <HiGlobeAlt className="text-lg" />
        </button>
      </div>
    </div>
  );
};
