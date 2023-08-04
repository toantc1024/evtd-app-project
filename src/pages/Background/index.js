import google from '../../libs/translate/google';

const getTranslateResult = async (tabId, { text, from, to }, sendResponse) => {
  try {
    console.log('Making request with', { text, from, to });
    const res = await google.translate({
      text,
      from,
      to,
    });
    const audio = await google.audio({ text, from });
    sendResponse({ res, audio });
  } catch (error) {
    console.log({ error });
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'translate') {
    getTranslateResult(sender.tab.id, request, sendResponse);
  }
  return true;
});
