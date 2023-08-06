import React from 'react';
import Example from '../../Popup/Components/Example';
import { HiAnnotation } from 'react-icons/hi';
import { languageMap } from '../../Mapping/DisplayLanguage';

const ExampleWord = ({ example, displayLanguage }) => {
  return (
    <div className="rounded-sm shadow-sm bg-white m-[5px] p-[5px] flex flex-col">
      <div className="p-[5px] flex gap-[5px] items-center justify-start">
        <span className="font-bold flex items-center justify-center">
          <HiAnnotation className="text-cyan-600" />
        </span>
        <span className="font-bold">
          {languageMap[displayLanguage].savedWords.example}
        </span>
      </div>
      <div className="flex flex-col gap-[5px]">
        {example &&
          example.map((item, index) => {
            return (
              <div className="flex">
                <div className="flex rounded-l-[5px] text-white bg-cyan-600 min-w-[25px] min-h-[35px] items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex items-center border-[1px] p-[5px] rounded-r-[5px] w-full">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace(/\n/g, '<br />'),
                    }}
                  ></span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExampleWord;
