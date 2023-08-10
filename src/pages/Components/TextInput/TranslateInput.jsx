import React, { useState } from 'react';
import { HiClipboardCopy, HiVolumeUp, HiStop } from 'react-icons/hi';
import { languageMap } from '../../Mapping/DisplayLanguage';

const TranslateInput = ({
  displayLanguage,
  text,
  setText,
  doTranslate,
  sourceLang,
  getAudioURL,
}) => {
  const [audio, setAudio] = useState(new Audio());
  const [audioGenerating, setAudioGenerating] = useState(false);
  return (
    <div className="w-full px-2 py-2 pt-0">
      <div className="flex flex-col">
        <textarea
          spellCheck="false"
          value={text}
          onChange={(e) => {
            let newText = e.target.value;
            setText(newText);
          }}
          className={`h-[125px] rounded-t-xl  outline-none bg-white  w-full resize-none p-2 text-sm transition-all ease-in-out duration-100`}
        ></textarea>
        <div className="w-full bg-white border-t-[1px]  bottom-0 flex gap-2 justify-between py-1 px-2 rounded-b-xl">
          <button
            onClick={() => {
              doTranslate();
            }}
            className="w-auto p-2 h-[25px] rounded-lg bg-blue-500 flex justify-center items-center text-white hover:bg-blue-600"
          >
            {languageMap[displayLanguage].popup.translate.buttonTranslate}
          </button>
          <div className="flex gap-2 justify-between">
            <audio src="" id="audio_play" className="hidden" />
            <button className="w-auto p-2 h-[25px] rounded-lg flex justify-center items-center text-gray-500 font-bold">
              {text.length}/2000
            </button>
            <button
              className={`w-[25px] h-[25px] rounded-full bg-blue-400 flex justify-center items-center
            hover:bg-blue-500`}
              onClick={async () => {
                setAudioGenerating(true);
                try {
                  if (!text) {
                    setAudioGenerating(false);
                    return;
                  }
                  let audioURL = await getAudioURL(text);
                  // Create audio element and play
                  // Stop all other audio
                  let audio = document.getElementById('audio_play');
                  audio.pause();
                  if (!audioURL) {
                    // Use synthesis to speak
                  } else {
                    audio.src = audioURL;
                    audio.play();
                    audio.onended = () => {
                      setAudioGenerating(false);
                    };
                  }
                } catch (error) {
                  setAudioGenerating(false);

                  // Another way or caught!
                }
              }}
            >
              {!audioGenerating ? (
                <HiVolumeUp className="text-lg text-white" />
              ) : (
                <HiStop className="text-lg text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslateInput;
