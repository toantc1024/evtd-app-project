import React, { Fragment } from 'react';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
const Popup = () => {
  return (
    <Fragment>
      {/* Navbar */}
      <div className="bg-red-400 flex justify-between py-4">
        <button>Hamburger</button>
      </div>

      {/* Language bar */}
      <div className="bg-orange-400 flex px-[40px] py-4 justify-between items-center">
        <button className="bg-red-200 p-2 rounded-2xl px-4">Automatic</button>
        <button className="flex items-center justify-center bg-red-400 rounded-full p-2">
          <HiOutlineSwitchHorizontal />
        </button>
        <button className="bg-red-200 p-2 rounded-2xl px-4">Vietnamese</button>
      </div>

      {/* Translate Boxes */}
      <div>
        <textarea name="" className="bg-red-200" id="" cols="100" rows="10">
          Hello
        </textarea>
        <textarea
          name=""
          className="bg-red-200"
          id=""
          cols="100"
          rows="10"
        ></textarea>
      </div>
    </Fragment>
  );
};

export default Popup;
