import React from 'react';
import { HiCheck, HiDuplicate, HiVolumeUp } from 'react-icons/hi';

const TextContent = ({ text, phonetic = '', source = 'en' }) => {
  const [isJustCopied, setIsJustCopied] = React.useState(false);

  return (
    <div className="rounded-sm shadow-sm bg-white m-[5px] p-[5px] flex flex-col">
      <div className="text-[15px]  ">{text}</div>
      <div className="flex gap-[5px] items-center justify-start">
        <button
          onClick={() => {
            navigator.clipboard.writeText(text);
            setIsJustCopied(true);
            setTimeout(() => {
              setIsJustCopied(false);
            }, 1000);
          }}
          className={`border-[1px] border-gray-100 w-[30px] h-[30px] rounded-md text-[25px] flex items-center justify-center cursor-pointer  hover:bg-slate-100 group text-gray-700 ${
            isJustCopied ? 'saved' : ''
          }`}
        >
          {isJustCopied ? (
            <HiCheck className="group-hover:text-gray-800" />
          ) : (
            <HiDuplicate className="group-hover:text-gray-800" />
          )}
        </button>
        <button
          onClick={() => {
            chrome.runtime.sendMessage(
              {
                type: 'audio',
                from: source,
                text: text,
              },
              (response) => {
                if (response.error) {
                  try {
                    // Try synthesis audio
                    // Stop all other speechsynthesis
                    let syth = window.speechSynthesis;
                    syth.cancel();
                    audioElement.pause();

                    let from = detectedFrom;

                    let sourceLang = '';
                    let voices = syth.getVoices();
                    for (let i = 0; i < voices.length; i++) {
                      if (
                        voices[i].lang === from ||
                        voices[i].lang.indexOf(from) >= 0
                      ) {
                        sourceLang = voices[i].lang;
                        break;
                      }
                    }
                    if (from === 'auto') {
                      sourceLang = 'Google US English';
                    }

                    let utter = new SpeechSynthesisUtterance(text);
                    utter.lang = sourceLang;
                    utter.rate = 1;
                    utter.pitch = 1;
                    utter.volume = 1;
                    utter.voiceURI = 'native';
                    utter.onend = function () {
                      isPlayingAudio = false;
                    };
                    utter.onerror = function () {};

                    isPlayingAudio = true;
                    syth.speak(utter);

                    // Choose language
                  } catch (error) {
                    // Syth error
                  }
                } else {
                  let audio = response.audio;
                  // Stop all other audio
                  let audioElement = document.querySelector('audio');

                  if (audioElement) {
                    audioElement.pause();
                  }
                  // Play audio just once

                  let audioTag = new Audio(audio);
                  audioTag.play();
                }
              }
            );
          }}
          className="border-[1px] border-gray-100 w-[30px] h-[30px] rounded-md text-[25px] flex items-center justify-center cursor-pointer  hover:bg-slate-100 group text-gray-700"
        >
          <HiVolumeUp className="group-hover:text-gray-800" />
        </button>
        {phonetic && phonetic.length > 0 && (
          <div className="p-2">
            <span>{phonetic}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextContent;
