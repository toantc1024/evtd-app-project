import React, { useEffect } from 'react';
import WordCard from '../WordCard/WordCard';
import { HiX } from 'react-icons/hi';

const WordSavedPage = () => {
  const [saved, setSaved] = React.useState(null);

  useEffect(() => {
    chrome.storage.sync.get(['saved'], function (result) {
      let currSaved = [];
      if (!result.saved) {
        currSaved = [];
      } else {
        currSaved = result.saved;
      }
      setSaved(currSaved);
    });

    chrome.storage.onChanged.addListener(function (changes, namespace) {
      // Only if history changed
      if (changes.saved) {
        var storageChange = changes.saved;
        setSaved(storageChange.newValue);
      }
    });
  }, []);

  useEffect(() => {
    // Get title of the page
    if (!saved || saved.length === 0) return;
    let title = document.querySelector('title');
    title.textContent = `Saved words - ${saved.length} words`;
  }, [saved]);

  return (
    <>
      {saved && saved.length ? (
        <div className="px-4 py-4 md:py-8 md:px-12 h-full w-full overflow-auto">
          <div className="flex flex-wrap gap-4 grid grid-col sm:grid-cols-2  lg:grid-cols-4 2xl:grid-cols-6">
            {saved.map(({ data, date }, index) => (
              <WordCard
                key={index}
                word={data}
                date={date}
                from={data.from || 'auto'}
                to={data.to || 'vi'}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WordSavedPage;
