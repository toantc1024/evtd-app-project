chrome.storage.sync.get(['sourceLang', 'targetLang'], function (result) {
  console.log('Current langues', result);
});

console.log(true);
