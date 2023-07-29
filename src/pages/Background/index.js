console.log('This is the background page.');
console.log('Put the background scripts here.');

// import translator from '../../libs/translator';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  let text = 'Gracias!';
  //   console.log(translator.google.requestTranslate, 'BGG');
  //   console.log('BG: ', translator.google.requestTranslate(text, 'auto', 'vi'));

  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  );

  console.log('Received', request);
  if (request.greeting === 'hello') sendResponse({ farewell: text });
});
