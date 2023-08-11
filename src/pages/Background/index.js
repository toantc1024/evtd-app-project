import google from '../../libs/translate/google';
import { languageMap } from '../Mapping/DisplayLanguage';
import { DEFAULT_DISPLAY_LANGUAGE, DEFAULT_SETTINGS } from '../Popup/constants';

const getAudioFromText = async (text, from) => {
  try {
    const sourceAudio = from === 'auto' ? await google.detect({ text }) : from;
    const audio = await google.audio({ text, from: sourceAudio });
    return audio;
  } catch (error) {
    return { error: 'ERROR AUDIO GENERATE' };
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
  // console.log(`Command "${translate}" triggered`);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'translateHotkey' });
  });
});

// Listen to event chrome.storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.displayLanguage) {
    let newDisplayLang = changes.displayLanguage.newValue;
    // chrome.contextMenus.update('#resume', {
    //   title: languageMap[newDisplayLang].context.resume,
    // });
    // chrome.contextMenus.update('#pause', {
    //   title: languageMap[newDisplayLang].context.pause,
    // });
    chrome.contextMenus.update('#options', {
      title: languageMap[newDisplayLang].options.title,
    });

    chrome.contextMenus.update('#translate-selection', {
      title: languageMap[newDisplayLang].context.selection,
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  var parent = chrome.contextMenus.create({
    id: 'translate',
    title: 'EVTD — browser dictionary',
    contexts: ['page'],
  });

  // var child1 = chrome.contextMenus.create({
  //   id: '#pause',
  //   title: 'Pause on this page',
  //   parentId: parent,
  //   contexts: ['page'],
  // });

  // var child2 = chrome.contextMenus.create({
  //   id: '#resume',
  //   title: 'Resume on this page',
  //   parentId: parent,
  //   contexts: ['page'],
  // });

  var child3 = chrome.contextMenus.create({
    id: '#options',
    title: 'Settings',
    parentId: parent,
    contexts: ['page'],
  });

  // Create selection context
  chrome.contextMenus.create({
    id: '#translate-selection',
    title: 'Translate "%s with EVTD"',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === '#pause') {
      chrome.tabs.sendMessage(tab.id, { type: '#pause' });
    } else if (info.menuItemId === '#resume') {
      chrome.tabs.sendMessage(tab.id, { type: '#resume' });
    } else if (info.menuItemId === '#options') {
      // Open options page
      // Check if options.html is already opened
      let optionTab = chrome.runtime.getURL('options.html');
      // Check if the options page exists, if so focus it, if not open it
      chrome.tabs.query({ url: optionTab }, (tabs) => {
        if (tabs.length) {
          chrome.tabs.update(tabs[0].id, { active: true });
        } else {
          chrome.tabs.create({ url: optionTab });
        }
      });
    } else if (info.menuItemId === '#translate-selection') {
      chrome.tabs.sendMessage(tab.id, {
        type: '#translate-selection',
        data: info.selectionText,
      });
    }
  });

  // Set default value for settings
  chrome.storage.sync.set({
    displayLanguage: DEFAULT_DISPLAY_LANGUAGE,
    translateHotkey: DEFAULT_SETTINGS.translateHotkey,
    ispreTranslate: DEFAULT_SETTINGS.ispreTranslate,
    isPomodoroWindowPopup: DEFAULT_SETTINGS.isPomodoroWindowPopup,
    hideTranslateButton: DEFAULT_SETTINGS.hideTranslateButton,
  });
});

chrome.runtime.onInstalled.addListener(function (object) {
  let externalUrl = 'https://evtd-app.vercel.app/';

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // Check if the options page exists, if so focus it, if not open it
    chrome.tabs.query({ url: externalUrl }, (tabs) => {
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, { active: true });
      } else {
        chrome.tabs.create({ url: externalUrl });
      }
    });
  }
});
