import React, { useEffect, useState } from 'react';
import WordCard from '../WordCard/WordCard';
import { languageMap } from '../../Mapping/DisplayLanguage';

const WordSavedPage = ({ displayLanguage }) => {
  const [saved, setSaved] = useState(null);

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
    title.textContent = `${languageMap[displayLanguage].savedWords.saved} - ${saved.length} ${languageMap[displayLanguage].savedWords.words}`;
  }, [saved]);

  const deleteWord = (uid) => {
    chrome.storage.sync.get(['saved'], function (result) {
      let currSaved = [];
      if (!result.saved) {
        currSaved = [];
      } else {
        currSaved = result.saved;
      }

      let newSaved = currSaved.filter((word) => word.uid !== uid);
      chrome.storage.sync.set({ saved: newSaved }, function () {
        console.log('Deleted', uid);
      });
    });
  };

  return (
    <>
      {saved && saved.length ? (
        <div className="px-4 py-4 md:py-8 md:px-12 h-full w-full overflow-auto">
          <div className="flex flex-wrap gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6">
            {saved.map(({ data, date, uid }, index) => (
              <WordCard
                displayLanguage={displayLanguage}
                key={index}
                word={data}
                date={date}
                uid={uid}
                deleteWord={(uid) => {
                  deleteWord(uid);
                }}
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
