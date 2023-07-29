import React, { Fragment } from 'react';
const Popup = () => {
  return (
    <Fragment>
      {/* Navbar */}
      <div className="bg-red-400 flex justify-between py-4">
        <button>Hamburger</button>
      </div>

      {/* Language bar */}
      <div className="bg-orange-400 flex px-[40px] py-4 justify-between">
        <div>English</div>
        <div>to</div>
        <div>Janpanese</div>
      </div>
    </Fragment>
  );
};

export default Popup;
