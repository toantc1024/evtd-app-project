import React from 'react';

const Example = ({ example }) => {
  return (
    <div className="p-2 flex gap-2 items-center justify-center flex-col">
      {example &&
        example.map((item, index) => {
          return (
            <div className="flex w-full">
              <div className="rounded-l-lg w-[30px] block h-auto bg-blue-400 px-3 flex items-center justify-center text-xl">
                {index + 1}
              </div>
              <div
                className="w-full rounded-r-lg bg-gray-100 p-2 example_dictionary_HTML"
                dangerouslySetInnerHTML={{
                  __html: item.replace(/\n/g, '<br />'),
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Example;
