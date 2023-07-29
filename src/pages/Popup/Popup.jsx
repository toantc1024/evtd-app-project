import React, { Fragment, useEffect, useState } from 'react';
import { HiOutlineSwitchHorizontal, HiMenu } from 'react-icons/hi';
import TextInput from '../Components/TextInput/TextInput';
import SelectLanguage from '../Components/SelectLanguage/SelectLanguage';
import MenuModal from '../Components/Menu/Menu';
const Popup = () => {
  const [menuModal, setMenuModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('vi');
  const [selectMode, setSelectMode] = useState('source');
  useEffect(() => {
    chrome.tts.getVoices((voices) => {
      console.log(voices);
    });
  }, []);

  const updateLanguage = (value) => {
    if (selectMode === 'source') {
      setSourceLang(value);
    } else {
      setTargetLang(value);
    }
  };

  return (
    <Fragment>
      {/* Modals */}
      <SelectLanguage
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
      <div className="flex justify-between py-2 px-2">
        <button
          className="p-2 border-[1px] rounded-full flex justify-center items-center hover:bg-gray-100 transition-bg ease-in-out duration-100"
          onClick={() => {
            setMenuModal(true);
          }}
        >
          <HiMenu className="text-xl text-gray-500" />
        </button>
      </div>

      {/* Language bar */}
      <div className="bg-white flex px-[40px] py-2 justify-between items-center">
        <button
          className="bg-sky-200 p-2 rounded-2xl px-4"
          onClick={() => {
            setSelectMode('source');
            setLanguageModal(true);
          }}
        >
          Automatic
        </button>
        <button className="flex items-center justify-center bg-orange-400 rounded-full p-2">
          <HiOutlineSwitchHorizontal className="text-lg" />
        </button>
        <button
          className="bg-red-200 p-2 rounded-2xl px-4"
          onClick={() => {
            setSelectMode('target');

            setLanguageModal(true);
          }}
        >
          Vietnamese
        </button>
      </div>

      {/* Translate Boxes */}
      <div className="pt-2">
        <TextInput
          text={sourceText}
          setText={(value) => setSourceText(value)}
          type="source"
        />
        <TextInput
          text={targetText}
          setText={(value) => setTargetText(value)}
          type="target"
        />
      </div>
    </Fragment>
  );
};

export default Popup;
