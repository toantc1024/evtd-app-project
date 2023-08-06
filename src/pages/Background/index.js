import google from '../../libs/translate/google';
import { DEFAULT_DISPLAY_LANGUAGE, DEFAULT_SETTINGS } from '../Popup/constants';

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
  } else if (request.type === 'getCommands') {
    chrome.commands.getAll((commands) => {
      let missingShortcuts = [];

      for (let { name, shortcut } of commands) {
        if (shortcut === '') {
          missingShortcuts.push(name);
        }
      }

      if (missingShortcuts.length > 0) {
        sendResponse({ missingShortcuts });
      }
    });
  }
  return true;
});

chrome.commands.onCommand.addListener((translate) => {
  console.log(`Command "${translate}" triggered`);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'translateHotkey' });
  });
});

chrome.runtime.onInstalled.addListener(() => {
  // Set default value for settings
  chrome.storage.sync.set({
    displayLanguage: DEFAULT_DISPLAY_LANGUAGE,
    translateHotkey: DEFAULT_SETTINGS.translateHotkey,
    ispreTranslate: DEFAULT_SETTINGS.ispreTranslate,
    isPomodoroWindowPopup: DEFAULT_SETTINGS.isPomodoroWindowPopup,
  });
});
