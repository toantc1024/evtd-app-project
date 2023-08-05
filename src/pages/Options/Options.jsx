import React from 'react';
import './Options.css';
const Options = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 h-full w-full bg-red-400">
        <h1 className="text-2xl flex justify-center align-items:center font-bold text-white">
          Options
        </h1>
      </div>

      <div className="p-4 h-full w-full bg-blue-400">
        <div className="flex bg-orange-200">
          <div>Show Pretranslate Content</div>
          <button
            onClick={() => {
              // Set message to background.js
              chrome.runtime.sendMessage(
                { message: 'getCommands' },
                (response) => {
                  console.log(response);
                }
              );
            }}
          >
            Get
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
