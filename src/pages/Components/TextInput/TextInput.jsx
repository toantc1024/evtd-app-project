import React, { useState } from 'react';
import { HiDuplicate, HiCheck } from 'react-icons/hi';
const TextInput = ({ text, setText, type }) => {
  const [justCopied, setJustCopied] = useState(false);

  return (
    <div className="w-full px-2 py-2 pt-0">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => {
            let newText = e.target.value;
            setText(newText);
          }}
          className={`h-[150px] rounded-lg outline-none bg-gray-200  ${
            type === 'source' ? 'focus:bg-sky-200' : 'focus:bg-red-200'
          } w-full resize-none p-2 text-sm transition-all ease-in-out duration-100`}
        ></textarea>
        <div className="absolute bottom-[10px] right-[10px] flex items-center justify-between gap-1">
          <div className="group relative flex justify-center">
            <span class="absolute top-[-35px] right-0  opacity-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:opacity-100">
              {justCopied ? 'Copiedddd' : 'Copy'}
            </span>
            <button
              onClick={() => {
                setJustCopied(true);
                setTimeout(() => {
                  setJustCopied(false);
                }, 900);
              }}
              className={`w-[30px] h-[30px] rounded-full  ${
                justCopied
                  ? 'text-green-900 bg-green-200 disabled'
                  : 'text-sky-900 bg-white hover:bg-gray-100'
              } flex items-center justify-center  text-lg`}
            >
              {justCopied ? <HiCheck /> : <HiDuplicate />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
