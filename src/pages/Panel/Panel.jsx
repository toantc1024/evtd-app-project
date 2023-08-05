import React from 'react';

import Navbar from '../Components/Navbar/Navbar';
import { HISTORY_PAGE, SAVED_WORDS_PAGE } from './constants';
const Panel = () => {
  const [appDropdown, setAppDropdown] = React.useState(false);
  const [appPage, setAppPage] = React.useState(SAVED_WORDS_PAGE); // ['saved-words', 'history'
  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar */}
      <Navbar
        appDropdown={appDropdown}
        setAppDropdown={(value) => setAppDropdown(value)}
        appPage={appPage}
        setAppPage={(value) => setAppPage(value)}
      />

      {/* Content */}
      <div className="flex flex-row h-full w-full relative">
        {/* Data show */}
        {appPage === HISTORY_PAGE ? (
          <div className="w-full h-full bg-gray-200">History</div>
        ) : (
          <div className="w-full h-full bg-gray-200">Saved Words</div>
        )}
      </div>
    </div>
  );
};

export default Panel;
