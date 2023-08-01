import React, { useState } from 'react';
import { HiClipboardCopy, HiVolumeUp, HiStop } from 'react-icons/hi';

const TranslateInput = ({
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
          className={`h-[125px] rounded-t-lg  outline-none bg-gray-100  focus:bg-gray-200 hover:bg-gray-150 w-full resize-none p-2 text-sm transition-all ease-in-out duration-100`}
        ></textarea>
        <div className="w-full bg-gray-300 bottom-0 flex gap-2 justify-between py-1 px-2 rounded-b-lg">
          <div>
            <button
              onClick={() => {
                doTranslate();
              }}
              className="w-auto p-2 h-[25px] rounded-lg bg-red-500 flex justify-center items-center text-white hover:bg-red-800"
            >
              Translate
            </button>
          </div>
          <div className="flex gap-2 justify-between">
            <audio src="" id="audio_play" className="hidden" />
            <button className="w-auto p-2 h-[25px] rounded-lg bg-red-500 flex justify-center items-center text-white hover:bg-red-800">
              {text.length}/2000
            </button>
            <button
              className={`w-[25px] h-[25px] rounded-full bg-red-500 flex justify-center items-center
            hover:bg-red-600`}
              onClick={async () => {
                setAudioGenerating(true);
                try {
                  // let audioURL = getAudioURL();
                  if (!text) {
                    setAudioGenerating(true);
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
