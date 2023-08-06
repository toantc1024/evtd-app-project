import React, { useEffect, useState } from 'react';

import Navbar from '../Components/Navbar/Navbar';
import WordSavedPage from '../Components/WordSavedPage/WordSavedPage';
import { DEFAULT_DISPLAY_LANGUAGE } from '../Popup/constants';
const Panel = () => {
  const [appDropdown, setAppDropdown] = useState(false);
  const [displayLanguage, setDisplayLanguage] = useState(
    DEFAULT_DISPLAY_LANGUAGE
  );

  // Fetch displayLang from chrome.storage
  useEffect(() => {
    chrome.storage.sync.get(['displayLanguage'], (result) => {
      if (result.displayLanguage) {
        setDisplayLanguage(result.displayLanguage);
      }
    });

    // Listen event from real time chrome.storage update
    chrome.storage.onChanged.addListener(function (changes, namespace) {
      if (changes.displayLanguage.newValue) {
        setDisplayLanguage(changes.displayLanguage.newValue);
      }
    });
  }, []);

  useEffect(() => {
    console.log({ displayLanguage });
  }, [displayLanguage]);
  // const [appPage, setAppPage] = React.useState(SAVED_WORDS_PAGE); // ['saved-words', 'history'
  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar */}
      <Navbar
        displayLanguage={displayLanguage}
        appDropdown={appDropdown}
        setAppDropdown={(value) => setAppDropdown(value)}
      />

      {/* Content */}
      <WordSavedPage displayLanguage={displayLanguage} />
    </div>
  );
};

export default Panel;
