import google from '../../libs/translate/google';

const getAudioFromText = async (text, from) => {
  try {
    const sourceAudio = from === 'auto' ? await google.detect({ text }) : from;
    const audio = await google.audio({ text, from: sourceAudio });
    return audio;
  } catch (error) {
    throw error;
  }
};

const getTranslateResult = async (tabId, { text, from, to }, sendResponse) => {
  try {
    const sourceLang = (await google.detect({ text })) || 'en';
    const res = await google.translate({
      text,
      from: sourceLang,
      to,
    });

    sendResponse({ res });
  } catch (error) {
    sendResponse({ error });
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'translate') {
    getTranslateResult(sender.tab.id, request, sendResponse);
  } else if (request.type === 'audio') {
    getAudioFromText(request.text, request.from)
      .then((audio) => {
        sendResponse({ audio });
      })
      .catch((error) => {
        sendResponse({ error });
      });
  }
  return true;
});

function foo() {
  console.log("I'm defined in background.js");
}
