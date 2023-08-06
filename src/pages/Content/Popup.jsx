import React, { Fragment, useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import { POPUP_CONTENT } from './constants';
import Meaning from './components/Sections/Meaning';
import Phonetic from './components/Sections/Phonetic';
import { HiAnnotation, HiBookmark } from 'react-icons/hi';
import { DEFAULT_DISPLAY_LANGUAGE } from '../Popup/constants';
import { languageMap } from '../Mapping/DisplayLanguage';

const Popup = ({
  hideResult,
  pinResult,
  unpinResult,
  playAudio,
  storeToSaved,
}) => {
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

  return (
    <Fragment>
      <Toolbar
        storeToSaved={storeToSaved}
        hideResult={() => hideResult()}
        pinResult={pinResult}
        unpinResult={unpinResult}
      />
      {/* Expand */}

      {/* Pin */}

      {/* Result content */}
      <div class={POPUP_CONTENT}>
        <div id="evtd-loader">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div id="evtd-content">
          {/* Meaning section */}
          <Phonetic playAudio={playAudio} />
          <Meaning playAudio={playAudio} />
          <div class="evtd-section dictionary">
            <div class="evtd-wrapper">
              <div class="evtd-title">
                <span class="evtd-icon evtd-bookmark">
                  <HiBookmark />
                </span>
                <span>
                  {languageMap[displayLanguage].savedWords.dictionary}
                </span>
              </div>
              <div id="evtd-dictionary-list"></div>
            </div>
          </div>

          {/* Example section */}
          <div class="evtd-section example">
            <div class="evtd-wrapper">
              <div class="evtd-title">
                <span class="evtd-icon evtd-annotation">
                  <HiAnnotation />
                </span>
                <span>{languageMap[displayLanguage].savedWords.example}</span>
              </div>
              <div id="evtd-example-list"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Popup;
