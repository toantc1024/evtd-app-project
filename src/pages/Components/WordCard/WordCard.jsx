import { data } from 'autoprefixer';
import React, { useEffect } from 'react';
import TextContent from './TextContent';
import { HiBookmark } from 'react-icons/hi';
import Dictionary from './Dictionary';
import Example from './Example';
import ExampleWord from './Example';

const formatDate = (ms) => {
  // Check if ms is not empty object or null
  if (Object.keys(ms).length === 0 && ms.constructor === Object) {
    return 'No date';
  }

  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const WordCard = ({ word, date, from, to }) => {
  useEffect(() => {
    console.log('Received', { word, date });
  }, []);

  return (
    <div className="shadow-sm h-[400px] md:h-[350px] overflow-auto flex flex-col justify-stretch rounded-lg  border-[1px] text-gray-900 bg-gray-100 text-[15px]">
      {word && word.text && (
        <TextContent phonetic={word.phonetic} text={word.text} source={from} />
      )}
      {word && word.result && (
        <TextContent
          source={to}
          text={
            word.result.length >= 2 ? word.result.join(' ') : word.result[0]
          }
        />
      )}

      {
        // Check if word has definition
        word && word.dict && <Dictionary dict={word.dict} />
      }

      {
        // Check if word has example
        word && word.example && <ExampleWord example={word.example} />
      }
    </div>
  );
};

export default WordCard;
