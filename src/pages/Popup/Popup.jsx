import React, { Fragment, useEffect, useState } from 'react';
import TranslateInput from '../Components/TextInput/TranslateInput';
import SelectLanguage from '../Components/SelectLanguage/SelectLanguage';
import MenuModal from '../Components/Menu/Menu';
import { RiCharacterRecognitionLine } from 'react-icons/ri'
import { PiClockCountdownFill } from 'react-icons/pi';
import {
  HiOutlineSwitchHorizontal,
  HiMenu,
  HiTranslate,
  HiOutlineChevronDown,
  HiViewGridAdd,
} from 'react-icons/hi';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { langs } from '../Mapping/LanguageList';
import GoogleTranslate from '../../libs/translate/google';
import Meaning from './Components/Meaning';
import Example from './Components/Example';
import Related from './Components/Related';
import { languageMap } from '../Mapping/DisplayLanguage';
import { langCode } from '../../libs/translate/google/lang-code';
import { DEFAULT_DISPLAY_LANGUAGE } from './constants';
const Popup = () => {
  const [menuModal, setMenuModal] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('vi');
  const [selectMode, setSelectMode] = useState('source');

  // Translate result hook
  const [meaning, setMeaning] = useState('');
  const [dict, setDict] = useState(null);
  const [related, setRelated] = useState(null);
  const [example, setExample] = useState(null);
  const [pronunciation, setPronunciation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [currentChoice, setCurrentChoice] = useState('meaning');

  // App dropdown
  const [appDropdown, setAppDropdown] = useState(false);
  const [displayLanguage, setDisplayLanguage] = useState(
    DEFAULT_DISPLAY_LANGUAGE
  );

  // Windows id
  const [pomodoroWindowID, setPomodoroWindowID] = useState(0);
  const [ORCWindowID, setORCWindowID] = useState(0);
  // Generated Audio

  const memoize = (fn) => {
    let cache = {};
    return (...arg) => {
      let n = arg[0];
      if (n in cache) {
        console.log('Fetching from cache');
        return cache[n];
      } else {
        console.log('Calculating result');
        let result = fn(n);
        cache[n] = result;
        return result;
      }
    };
  };

  const generateAudio = memoize(async (textInput) => {
    try {
      if (!textInput) return;
      const detect =
        (sourceLang !== 'auto' && sourceLang) ||
        (await GoogleTranslate.detect({ text: textInput })) ||
        'en';
      const audioURL = await GoogleTranslate.audio({
        text: textInput,
        from: detect,
      });

      return audioURL;
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.displayLanguage) {
        console.log('Changed');
        setDisplayLanguage(changes.displayLanguage.newValue);
      }
    });

    chrome.storage.sync.get(
      ['sourceLang', 'targetLang', 'displayLanguage', 'pomodoroWindowId', 'ORCWindowId'],
      (result) => {
        if (result.sourceLang) {
          setSourceLang(result.sourceLang);
        } else {
          chrome.storage.sync.set({ sourceLang: 'auto' });
          setSourceLang('auto');
        }
        if (result.targetLang) {
          setTargetLang(result.targetLang);
        } else {
          chrome.storage.sync.set({ targetLang: 'vi' });
          setTargetLang('vi');
        }

        if (result.pomodoroWindowId) {
          setPomodoroWindowID(result.pomodoroWindowId);
        }
        if (result.ORCWindowId) {
          setORCWindowID(result.ORCWindowId);
        }
        if (result.displayLanguage) {
          setDisplayLanguage(result.displayLanguage);
        }
      }
    );
  }, []);

  useEffect(() => {
    console.log('New display', displayLanguage);
  }, [displayLanguage]);

  const swapLanguage = () => {
    if (sourceLang === 'auto') return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);

    chrome.storage.sync.set({ sourceLang: targetLang });
    chrome.storage.sync.set({ targetLang: sourceLang });

    // const tempText = sourceText;
    // setSourceText(targetText);
    // setTargetText(tempText);
  };

  useEffect(() => {
    doTranslate();
  }, [targetLang]);

  const doTranslate = async () => {
    setIsTranslating(true);
    try {
      console.log({ sourceText, sourceLang, targetLang });
      if (!sourceText) {
        // setIsTranslating(false);
        setTargetText('');
        return;
      }
      if (!isTranslated) setIsTranslated(true);
      setTranslatedText(sourceText);
      // const response = await translator.google.requestTranslate(
      //   sourceText,
      //   sourceLang,
      //   targetLang
      // );

      // Check if first letter of text is capital
      let queryText = sourceText;
      let isCapital = false;
      if (queryText.charAt(0) >= 'A' && queryText.charAt(0) <= 'Z') {
        queryText =
          (await queryText.charAt(0).toLowerCase()) + queryText.substring(1);
        isCapital = true;
      }

      const response = await GoogleTranslate.translate({
        text: queryText,
        from: sourceLang,
        to: targetLang,
      });

      console.log(response);
      let translateResult = response.result;
      let text;
      if (translateResult) {
        text = translateResult[0];
      } else {
        text = 'Error';
      }
      if (isCapital) {
        text = text.charAt(0).toUpperCase() + text.substring(1);
      }
      setMeaning(text);
      const { phonetic, example, related, dict } = response;
      setPronunciation(phonetic);
      setExample(example);
      setRelated(related);
      setDict(dict);
      setCurrentChoice('meaning');
      setIsTranslating(false);
    } catch (error) {
      console.log(error);
      setTargetText('Error');
    }
  };

  useEffect(() => {
    chrome.tts.getVoices((voices) => {
      console.log(voices);
    });
  }, []);

  const updateLanguage = (value) => {
    console.log(`request translate for ${selectMode} with value: ${value}`);
    if (selectMode === 'source') {
      setSourceLang(value);
      chrome.storage.sync.set({ sourceLang: value });
    } else {
      setTargetLang(value);
      chrome.storage.sync.set({ targetLang: value });
    }
  };

  return (
    <Fragment>
      {/* Modals */}
      <SelectLanguage
        displayLanguage={displayLanguage}
        selectMode={selectMode}
        updateLanguage={(value) => updateLanguage(value)}
        languageModal={languageModal}
        setLanguageModal={(value) => setLanguageModal(value)}
      />

      <MenuModal
        menuModal={menuModal}
        setMenuModal={(value) => setMenuModal(value)}
      />

      {/* Navbar */}
      <div className="flex justify-between py-2 px-2 border-b-[1px] z-30">
        <button
          className="p-2 active:border-gray-200 focus:bg-gray-200 border-white border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100"
          onClick={() => {
            setMenuModal(true);
          }}
        >
          <HiMenu className="text-xl text-gray-500" />
        </button>

        <div className="relative z-20">
          <button
            className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100 gap-2 px-4"
            onClick={() => {
              setAppDropdown(!appDropdown);
            }}
          >
            <span>{languageMap[displayLanguage].popup.extension}</span>
            <HiViewGridAdd className="text-xl text-gray-500" />
          </button>
          <div
            className={`${appDropdown ? '' : 'hidden'
              } bg-gray-200 absolute top-[40px] p-2 flex flex-col rounded-xl right-0 w-[200px] shadow-lg`}
          >
            <div className="p-2 bg-gray-100 rounded-lg w-full flex gap-1 flex-col ">
              <button
                className="p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-sky-600 group  transition-bg ease-in-out duration-100 gap-2 px-4 bg-white "
                onClick={() => {
                  setAppDropdown(false);
                }}
              >
                <span className="group-hover:text-white font-bold text-sky-500">
                  {languageMap[displayLanguage].popup.translate.buttonTranslate}
                </span>
                <HiTranslate className="group-hover:text-white text-xl text-sky-500" />
              </button>
              <button
                className="p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-red-600 group  transition-bg ease-in-out duration-100 gap-2 px-4 bg-white "
                onClick={() => {
                  setAppDropdown(false);
                  chrome.windows.getAll(
                    { windowTypes: ['popup'] },
                    function (windows) {
                      if (windows.length >= 1 && (windows[0].id === pomodoroWindowID || (windows.length > 1 && windows[1].id === pomodoroWindowID))) {
                        chrome.windows.update(windows[0].id === pomodoroWindowID ? windows[0].id : windows[1].id, {
                          focused: true,
                        });
                      } else {
                        var optionsUrl = chrome.runtime.getURL('pomodoro.html');
                        chrome.windows.create(
                          {
                            url: optionsUrl,
                            type: 'panel',
                            width: 400,
                            height: 600,
                            left: window.screen.width / 2 - 200,
                            top: window.screen.height / 2 - 300,
                          },
                          (window) => {
                            setPomodoroWindowID(window.id);
                            chrome.storage.sync.set({ pomodoroWindowId: window.id })
                          }
                        );
                      }
                    }
                  );
                }}
              >
                <span className="group-hover:text-white font-bold text-red-500">
                  Pomodoro
                </span>
                <PiClockCountdownFill className="group-hover:text-white w-6 h-6 text-red-500" />
              </button>
              <button
                className="p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-amber-500 group transition-bg ease-in-out duration-100 gap-2 px-4 bg-white"
                onClick={() => {
                  setAppDropdown(false);
                  let panelTab = chrome.runtime.getURL('panel.html');
                  // Check if the options page exists, if so focus it, if not open it
                  chrome.tabs.query({ url: panelTab }, (tabs) => {
                    if (tabs.length) {
                      chrome.tabs.update(tabs[0].id, { active: true });
                    } else {
                      chrome.tabs.create({ url: panelTab });
                    }
                  });
                }}
              >
                <span className="group-hover:text-white text-amber-500 font-bold">
                  {languageMap[displayLanguage].savedWords.title}
                </span>
                <BsBookmarkStarFill className="group-hover:text-white text-xl text-amber-500" />
              </button>
              <button
                className='p-2 border-[1px] rounded-lg flex justify-between items-center hover:bg-violet-500 group transition-bg ease-in-out duration-100 gap-2 px-4 bg-white'
                onClick={() => {
                  setAppDropdown(false);
                  chrome.windows.getAll(
                    { windowTypes: ['popup'] },
                    function (windows) {
                      if (windows.length >= 1 && (windows[0].id === ORCWindowID || (windows.length > 1 && windows[1].id === ORCWindowID))) {
                        chrome.windows.update(windows[0].id === ORCWindowID ? windows[0].id : windows[1].id, {
                          focused: true,
                        });
                      } else {
                        var optionsUrl = chrome.runtime.getURL('ocr.html');
                        chrome.windows.create(
                          {
                            url: optionsUrl,
                            type: 'panel',
                            state: 'maximized',
                          },
                          (window) => {
                            setORCWindowID(window.id);
                            chrome.storage.sync.set({ ORCWindowId: window.id })
                          }
                        );
                      }
                    }
                  )
                }}
              >
                <span className="group-hover:text-white text-violet-500 font-bold">
                  OCR
                </span>
                <RiCharacterRecognitionLine className="group-hover:text-white text-2xl text-violet-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language bar */}
      <div className="bg-white px-[10px] py-2 grid grid-cols-3">
        <div className="flex items-center justify-center">
          <button
            className="bg-red-400 text-white hover:bg-red-500 p-2 rounded-full px-4 w-full"
            onClick={() => {
              setSelectMode('source');
              setLanguageModal(true);
            }}
          >
            {displayLanguage === 'vi'
              ? langs[sourceLang]
              : langCode[sourceLang]}
          </button>
        </div>

        {/* Swap target and source language */}
        <div className="flex items-center justify-center">
          <button
            className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700  border-[1px] shadow-lg flex items-center justify-center  rounded-full font-bold p-2 "
            onClick={() => swapLanguage()}
          >
            <HiOutlineSwitchHorizontal className="text-xl font-bold text-white" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-400 text-white hover:bg-blue-500 p-2 rounded-full px-2 w-full "
            onClick={() => {
              setSelectMode('target');
              setLanguageModal(true);
            }}
          >
            {displayLanguage === 'vi'
              ? langs[targetLang]
              : langCode[targetLang]}
          </button>
        </div>
      </div>

      {/* Translate Boxes */}
      <div className="pt-2">
        <div className="">
          <TranslateInput
            displayLanguage={displayLanguage}
            getAudioURL={generateAudio}
            sourceLang={sourceLang}
            text={sourceText}
            setText={(value) => setSourceText(value)}
            doTranslate={() => doTranslate()}
          />
        </div>
        <div className="h-[250px] bg-gray-100">
          {isTranslating ? (
            isTranslated === false ? (
              <div className="w-full h-full flex flex-col gap-2 items-center justify-center text-lg">
                <p className="bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  <HiTranslate className="text-sky-400" />
                </p>
                <h1 className="text-gray-600">
                  {languageMap[displayLanguage].popup.translate.placeHolder}
                </h1>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col gap-2 items-center justify-center text-lg">
                <div className="lds-ellipsis">
                  <div className="bg-sky-500"></div>
                  <div className="bg-red-500"></div>
                  <div className="bg-orange-400"></div>
                  <div className="bg-sky-500"></div>
                </div>
              </div>
            )
          ) : (
            <div className="h-full w-full py-2 pb-0 pt-0 flex  flex-col">
              <div className="bg-gray-100 py-2 flex gap-2 px-2 mb-1">
                <button
                  className={`${currentChoice === 'meaning' ? 'bg-sky-400' : 'border-[1px]'
                    } p-2 rounded-lg`}
                  onClick={() => {
                    setCurrentChoice('meaning');
                  }}
                >
                  Meaning
                </button>
                {example && (
                  <button
                    className={`${currentChoice === 'example'
                      ? 'bg-orange-400'
                      : 'border-[1px]'
                      } p-2 rounded-lg`}
                    onClick={() => {
                      setCurrentChoice('example');
                    }}
                  >
                    Example
                  </button>
                )}
                {related && (
                  <button
                    className={`${currentChoice === 'related'
                      ? 'bg-sky-400'
                      : 'border-[1px]'
                      } p-2 rounded-lg`}
                    onClick={() => {
                      setCurrentChoice('related');
                    }}
                  >
                    Related
                  </button>
                )}
              </div>
              <div className="p-2 pb-0 pt-0 bg-white w-full h-full max-h-[250px] overflow-auto">
                <div className="flex flex-col ">
                  {isTranslated && currentChoice === 'meaning' ? (
                    <Meaning
                      generateAudio={generateAudio}
                      sourceLang={sourceLang}
                      text={translatedText}
                      meaning={meaning}
                      setMeaning={(value) => setMeaning(value)}
                      dict={dict}
                      pronunciation={pronunciation}
                    />
                  ) : currentChoice === 'example' ? (
                    <Example example={example} />
                  ) : currentChoice === 'related' ? (
                    <Related related={related} />
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Popup;
