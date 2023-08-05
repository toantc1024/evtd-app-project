import React from 'react';

import Navbar from '../Components/Navbar/Navbar';
import { SAVED_WORDS_PAGE } from './constants';
import WordSavedPage from '../Components/WordSavedPage/WordSavedPage';
const Panel = () => {
  const [appDropdown, setAppDropdown] = React.useState(false);
  // const [appPage, setAppPage] = React.useState(SAVED_WORDS_PAGE); // ['saved-words', 'history'
  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar */}
      <Navbar
        appDropdown={appDropdown}
        setAppDropdown={(value) => setAppDropdown(value)}
      />

      {/* Content */}
      <WordSavedPage />
    </div>
  );
};

export default Panel;
