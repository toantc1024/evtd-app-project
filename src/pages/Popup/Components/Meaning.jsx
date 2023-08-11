import React, { Fragment } from 'react';
import { HiCheck, HiDocumentDuplicate, HiVolumeUp } from 'react-icons/hi';

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
    <Fragment>
      {text && pronunciation && text.length < 50 && (
        <div className="p-2 rounded-xl text-white bg-bgTranslate flex gap-2 items-center">
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
            className="w-[30px] h-[30px] rounded-full cursor-pointer  hover:bg-gray-100 bg-white flex items-center justify-center"
          >
            <HiVolumeUp className="text-bgTranslate text-lg " />
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="text-lg">{text}</h1>
            <h1 className="text-sm font-light">{pronunciation}</h1>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <textarea
          spellCheck="false"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className={`h-auto max-h-[60px] overflow-auto rounded-t-xl  outline-none bg-white w-full resize-none p-2 text-sm transition-all ease-in-out duration-100 border-[1px] border-b-[0px]`}
        ></textarea>
        <div className="w-full bg-white border-[1px] border-t-[1px] bottom-0 flex gap-2 justify-between py-1 px-2 rounded-b-xl">
          <div></div>
          <div className="flex gap-2 justify-between">
            <button
              className={`w-[25px] h-[25px] rounded-full bg-blue-500 flex justify-center items-center
            hover:bg-blue-600`}
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
              <button className="absolute top-[-50px] right-0  opacity-0 transition-all rounded-xl bg-blue-100 p-2 text-xs text-gray-700 group-hover:opacity-100 ">
                {justCopied ? 'Copied' : 'Copy'}
              </button>
              <button
                className={`w-[25px] h-[25px] rounded-full ${
                  justCopied ? 'bg-blue-300' : 'bg-blue-500'
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
        <div className="bg-bgTranslate p-2 rounded-lg flex flex-col  gap-2">
          {dict.map((item, index) => {
            let [key, value] = item.split(':');
            console.log(value);
            return (
              <div className="flex gap-1 items-center flex flex-col bg-bgTranslate">
                <div className="flex w-full justify-start ">
                  <span className="text-white text-lg italic">{key}</span>
                </div>
                <div className="flex flex-wrap gap-1 w-full justify-start ">
                  {value.includes(',') ? (
                    value.split(',').map((item) => {
                      return (
                        <span className="bg-white p-2 text-gray-600 p-1 rounded-lg text-sm">
                          {item}
                        </span>
                      );
                    })
                  ) : (
                    <span className="bg-white text-gray-700 p-1 rounded-xl">
                      {value}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Meaning;
