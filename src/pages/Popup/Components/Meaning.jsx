import React from 'react';
import { HiCheck, HiDocumentDuplicate, HiVolumeUp } from 'react-icons/hi';
import GoogleTranslate from '../../../libs/translate/google';

const Meaning = ({
  generateAudio,
  meaning,
  setMeaning,
  dict,
  pronunciation,
  text,
}) => {
  const [justCopied, setJustCopied] = React.useState(false);
  return (
    <span>
      <div className="flex flex-col">
        {text && pronunciation && text.length < 50 && (
          <div className="p-2 my-2 rounded-lg bg-gray-100 flex gap-2 items-center">
            <div
              onClick={async () => {
                try {
                  const audioURL = await generateAudio(text);
                  let audio = document.getElementById('meaning_audio_play');
                  audio.pause();
                  audio.src = audioURL;
                  audio.play();
                } catch (error) {
                  alert('ERR');
                }
              }}
              className="w-[35px] h-[35px] rounded-full cursor-pointer  hover:bg-gray-100 bg-white flex items-center justify-center"
            >
              <HiVolumeUp className="text-sky-500 text-xl " />
            </div>
            <div className="flex gap-2 items-center">
              <h1 className="text-xl">{text}</h1>
              <h1 className="text-sm font-light">{pronunciation}</h1>
            </div>
          </div>
        )}
        <textarea
          spellCheck="false"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className={`h-auto max-h-[60px] overflow-auto rounded-t-lg  outline-none bg-gray-100  focus:bg-gray-200 hover:bg-gray-150 w-full resize-none p-2 text-sm transition-all ease-in-out duration-100`}
        ></textarea>
        <div className="w-full bg-gray-300 bottom-0 flex gap-2 justify-between py-1 px-2 rounded-b-lg">
          <div></div>
          <div className="flex gap-2 justify-between">
            <button
              className={`w-[25px] h-[25px] rounded-full bg-sky-500 flex justify-center items-center
            hover:bg-sky-600`}
              onClick={async () => {
                const audioURL = await generateAudio(meaning);
                let audio = document.getElementById('word_audio_play');
                audio.pause();
                if (!audioURL) {
                  // Use synthesis to speak
                } else {
                  audio.src = audioURL;
                  audio.play();
                }
              }}
            >
              <audio id="word_audio_play" className="hidden" />
              <audio id="meaning_audio_play" className="hidden" />
              <HiVolumeUp className="text-lg text-white" />
            </button>
            <div className="group relative flex justify-center">
              <button class="absolute top-[-50px] right-0  opacity-0 transition-all rounded bg-[rgba(50,50,50,0.5)] p-2 text-xs text-white group-hover:opacity-100 ">
                {justCopied ? 'Copied' : 'Copy'}
              </button>
              <button
                className={`w-[25px] h-[25px] rounded-full ${
                  justCopied ? 'bg-emerald-400' : 'bg-sky-500'
                } flex justify-center items-center`}
                onClick={() => {
                  navigator.clipboard.writeText(meaning);
                  setJustCopied(true);
                  setTimeout(() => {
                    setJustCopied(false);
                  }, 800);
                }}
              >
                {justCopied ? (
                  <HiCheck className="text-lg text-white" />
                ) : (
                  <HiDocumentDuplicate className="text-lg text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {dict && (
        <div className="bg-gray-200 p-2 my-1 rounded-lg flex flex-col gap-2">
          {dict.map((item, index) => {
            return (
              <div className="bg-gray-100 p-1 rounded-lg">{` (${item})`}</div>
            );
          })}
        </div>
      )}
    </span>
  );
};

export default Meaning;
