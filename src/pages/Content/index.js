import google from '../../libs/translate/google';
import { builtPanel } from './built';
import { ImageData, POPUP_CONTENT } from './constants';
import BaseTranslator from '../../libs/translator/index';

// Recevie message from background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'response') {
    let content = document.getElementById('evtd-content');
    content.style.display = 'block';
    let loader = document.getElementById('evtd-loader');
    loader.style.display = 'none';
  } else if (request.type === 'translate') {
    translateSubmit();
  }
});
// Inject the conttentstyle
let isButtonShown = false;
let isResultPin = false;
let pinPositionX = 0,
  pinPositionY = 0;

let detectedFrom = 'auto';
let detectTarget = 'vi';
let isPlayingAudio = false;
let currentTranslateResponse = null;
chrome.storage.sync.get(['sourceLang', 'targetLang'], function (e) {
  if (!e.sourceLang) {
    chrome.storage.sync.set({ sourceLang: 'en' });
  }
  if (!e.targetLang) {
    chrome.storage.sync.set({ targetLang: 'vi' });
  } else {
    detectTarget = e.targetLang;
  }
});

const contentStyle = document.createElement('link');
contentStyle.rel = 'stylesheet';
contentStyle.type = 'text/css';
contentStyle.href = chrome.runtime.getURL('content.styles.css');
document.head.appendChild(contentStyle);

// top z index
const topZIndex = 2147483647;
const resultPanel = document.createElement('evtd');
resultPanel.id = 'evtd-result-panel';
resultPanel.style.display = 'none';
resultPanel.style.zIndex = topZIndex;

// Create audio tag
const audioElement = document.createElement('audio');
audioElement.id = 'evtd-audio-player';
audioElement.style.display = 'none';

resultPanel.appendChild(audioElement);

// Create loader
const loader = document.createElement('div');
loader.id = 'evtd-loader';
loader.style.display = 'none';
loader.style.zIndex = topZIndex;
loader.style.position = 'fixed';
loader.style.top = '0';
loader.style.left = '0';

document.documentElement.appendChild(resultPanel);
// Function for resultPanel object

const showResult = () => {
  resultPanel.style.display = 'flex';
  resultPanel.style.position = 'fixed';
};
const hideResult = () => {
  resultPanel.style.display = 'none';

  audioElement.pause();
  isPlayingAudio = false;
};

const storeToSaved = () => {
  if (!currentTranslateResponse) return;
  chrome.storage.sync.get(['saved'], function (e) {
    let saved = e.saved;
    if (!saved) {
      saved = [];
    }
    saved.push({ data: currentTranslateResponse, date: new Date().now });
    chrome.storage.sync.set({ saved: saved });
  });
};

// Process pin result
const pinResult = () => {
  isResultPin = true;
  (pinPositionX = resultPanel.style.left),
    (pinPositionY = resultPanel.style.top);
};

const unpinResult = () => {
  isResultPin = false;
};

const playAudio = (text, type) => {
  if (isPlayingAudio) {
    audioElement.pause();
    isPlayingAudio = false;
  }
  return new Promise((resolve, reject) => {
    let from = detectedFrom;
    if (type === 'target') {
      from = detectTarget || 'auto';
    } else {
      if (!detectedFrom) {
        from = 'auto';
      }
    }

    chrome.runtime.sendMessage(
      {
        type: 'audio',
        from: from,
        text: text,
      },
      (response) => {
        if (response.error) {
          try {
            // Try synthesis audio
            // Stop all other speechsynthesis
            let syth = window.speechSynthesis;
            syth.cancel();
            audioElement.pause();

            let from = detectedFrom;

            let sourceLang = '';
            let voices = syth.getVoices();
            for (let i = 0; i < voices.length; i++) {
              if (
                voices[i].lang === from ||
                voices[i].lang.indexOf(from) >= 0
              ) {
                sourceLang = voices[i].lang;
                break;
              }
            }
            if (from === 'auto') {
              sourceLang = 'Google US English';
            }

            let utter = new SpeechSynthesisUtterance(text);
            utter.lang = sourceLang;
            utter.rate = 1;
            utter.pitch = 1;
            utter.volume = 1;
            utter.voiceURI = 'native';
            utter.onend = function () {
              isPlayingAudio = false;
            };
            utter.onerror = function () {};

            isPlayingAudio = true;
            syth.speak(utter);

            // Choose language
          } catch (error) {
            // Syth error
          }
        } else {
          let audio = response.audio;
          audioElement.pause();
          audioElement.src = audio;
          audioElement.play();
        }
      }
    );
  });
};
builtPanel(
  resultPanel,
  hideResult,
  unpinResult,
  pinResult,
  playAudio,
  storeToSaved
);
document.addEventListener('mousedown', (event) => {
  disappearButton();
  if (!event.target.closest('#evtd-result-panel') && !isResultPin) {
    hideResult();
  }

  // whether user take a select action
  detectSelect(document, (event) => {
    selectTranslate(event);
  });
});

document.addEventListener('dblclick', (event) => {
  selectTranslate(event, true);
});

document.addEventListener('click', (event) => {
  // triple click
  if (event.detail === 3) {
    selectTranslate(event, true);
  }
});

const shouldTranslate = () => {
  // Get current selection
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  if (!selectedText) return false;
  preTranslate.style.display = 'none';
  if (selectedText.length > 0 && selectedText.length < 50) {
    // Call pretranslate show
    chrome.storage.sync.get(['sourceLang', 'targetLang'], function (e) {
      BaseTranslator.google
        .requestTranslate(
          selectedText,
          e.sourceLang ? e.sourceLang : 'auto',
          e.targetLang ? e.targetLang : 'vi'
        )
        .then((res) => {
          console.log(e.targetLang, res);
          if (!res[0] || !res) {
            return;
          }
          if (res[0].length === 2) {
            res = res[0][0];
          } else if (res[0].length > 2) {
            res = res.join(' ');
          } else {
            res = res[0][0];
          }
          preTranslate.style.display = 'flex';
          preTranslate.innerText = res;
        });
    });
  }
  return true;
};

function cancelTextSelection() {
  if (window.getSelection) {
    if (window.getSelection().empty) {
      // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {
    // IE
    document.selection.empty();
  }
}

const displayResult = (contentElement, response) => {
  // ProcessError
  if (response.error) {
    // Remove loader
    let loader = document.getElementById('evtd-loader');
    loader.style.display = 'none';
    let content = document.getElementById('evtd-content');
    content.style.display = 'block';
    preTranslate.style.display = 'none';
    currentTranslateResponse = null;
    return;
  }
  currentTranslateResponse = response.res;
  // storeToHistory(response.res);

  preTranslate.style.display = 'none';
  let data = response.res;

  if (!data.result) {
    return;
  }
  let transltedText;
  if (data.result.length > 1) {
    transltedText = data.result.join('\n');
  } else {
    transltedText = data.result[0];
  }

  let dict = data.dict;
  let phonetic = data.phonetic;
  let example = data.example;
  const phoneticSection = contentElement.querySelector(
    '.evtd-section.phonetic'
  );

  if (phonetic) {
    phoneticSection.style.display = 'flex';
    phoneticSection.querySelector('#evtd-phonetic-source-text').innerText =
      data.text;
    // Create span for phonetic

    phoneticSection.querySelector('#evtd-phonetic-text').innerHTML = '';
    const phoneticText = document.createElement('evtdphonetic');
    phoneticText.innerText = phonetic.replace('[', '/').replace(']', '/');
    phoneticSection
      .querySelector('#evtd-phonetic-text')
      .appendChild(phoneticText);

    detectedFrom = data.from;
    if (data.from) {
      detectedFrom = data.from;
    }

    // phoneticSection.querySelector('#evtd-phonetic-text').innerText = phonetic;
  } else {
    phoneticSection.style.display = 'none';
  }

  const meaningSection = contentElement.querySelector('.evtd-section.meaning');
  if (transltedText) {
    meaningSection.style.display = 'flex';
    meaningSection.querySelector('#evtd-meaning-value').innerText =
      transltedText;
  } else {
    meaningSection.style.display = 'none';
  }

  const dictionarySection = contentElement.querySelector(
    '.evtd-section.dictionary'
  );

  if (dict) {
    dictionarySection.style.display = 'flex';
    let dictList = dictionarySection.querySelector('#evtd-dictionary-list');
    dictList.innerHTML = '';
    dict.forEach((e) => {
      let dictItem = document.createElement('div');
      dictItem.className = 'evtd-dictionary-item';
      let [title, content] = e.split(':');

      dictItem.innerHTML = `
        <div class="evtd-dictionary-item-title">${title}</div>
        <div class="evtd-dictionary-item-content">${content}</div>
      `;
      dictList.appendChild(dictItem);
    });
  } else {
    dictionarySection.style.display = 'none';
  }

  const exampleSection = contentElement.querySelector('.evtd-section.example');
  if (example) {
    exampleSection.style.display = 'flex';
    let exampleList = exampleSection.querySelector('#evtd-example-list');
    exampleList.innerHTML = '';
    example.forEach((item, index) => {
      let exampleItem = document.createElement('div');
      exampleItem.className = 'evtd-example-item';

      exampleItem.innerHTML = `
        <div class="evtd-example-item-title">${index + 1}</div>
        <div class="evtd-example-item-content">
        <span>
        ${item}
        </span>
        </div>
      `;
      exampleList.appendChild(exampleItem);
    });
  } else {
    exampleSection.style.display = 'none';
  }
};

const translateSubmit = () => {
  let selection = querySelect();
  currentTranslateResponse = null;
  if (selection.text && selection.text.length > 0) {
    chrome.storage.sync.get(['sourceLang', 'targetLang'], (e) => {
      let sourceLang = e.sourceLang;
      let targetLang = e.targetLang;
      detectTarget = targetLang;
      let queryText = selection.text;
      // Limit amount of queryText to 100 character
      if (queryText.length > 500) {
        queryText = queryText.substring(0, 500);
      }

      let loader = document.getElementById('evtd-loader');
      loader.style.display = 'flex';
      let content = document.getElementById('evtd-content');
      content.style.display = 'none';

      showResult();
      // Add loader

      // Calculate time execute the func below
      chrome.runtime.sendMessage(
        {
          type: 'translate',
          from: sourceLang,
          to: targetLang,
          text: queryText,
        },
        (response) => {
          let loader = document.getElementById('evtd-loader');
          loader.style.display = 'none';
          let content = document.getElementById('evtd-content');
          content.style.display = 'block';

          displayResult(content, response);
        }
      );

      if (!isResultPin) {
        resultPanel.style.top = `${translationButtonIFrame.offsetTop}px`;
        resultPanel.style.left = `${translationButtonIFrame.offsetLeft}px`;
      }

      cancelTextSelection();
      disappearButton();
    });
  }
};

function querySelect() {
  let selection = window.getSelection();
  let text = '';
  let position;
  if (selection.rangeCount > 0) {
    text = selection.toString().trim();

    // const lastRange = selection.getRangeAt(selection.rangeCount - 1);
    // if (lastRange.endContainer !== document.documentElement) {
    //   let rect = selection
    //     .getRangeAt(selection.rangeCount - 1)
    //     .getBoundingClientRect();
    //   position = [rect.left, rect.top];
    // }
  }
  return { text, position };
}

function selectTranslate(event) {
  preTranslate.style.display = 'none';

  if (event.targetElement === resultPanel) {
    return;
  }
  if (!shouldTranslate()) return;

  showButton(event);
}

const disappearButton = () => {
  preTranslate.style.display = 'none';
  if (isButtonShown) {
    document.documentElement.removeChild(translationButtonIFrame);
    isButtonShown = false;
  }
};

function detectSelect(targetElement, actionAfterSelect, actionAfterNotSelect) {
  // Remember whether mouse moved.
  let moved = false;

  // inner listener for detecting mousemove and mouseup.
  const detectMouseMove = () => {
    moved = true;
  };

  const detectMouseUp = (event) => {
    // select action detected
    if (moved) {
      if (typeof actionAfterSelect === 'function') actionAfterSelect(event);
    } else if (typeof actionAfterNotSelect === 'function') {
      // select action isn't detected
      actionAfterNotSelect(event);
    }
    // remove inner event listeners.
    targetElement.removeEventListener('mousemove', detectMouseMove);
    targetElement.removeEventListener('mouseup', detectMouseUp);
  };

  // add inner event listeners
  targetElement.addEventListener('mousemove', detectMouseMove);
  targetElement.addEventListener('mouseup', detectMouseUp);
}

// Local Varibles for Translate Result

let buttonShow = false;
const translationButtonIFrame = document.createElement('iframe');
translationButtonIFrame.id = 'evtd-translate-button';
translationButtonIFrame.style.background = 'white';

let preTranslate = document.createElement('div');
preTranslate.id = 'evtd-pretranslate';
document.documentElement.appendChild(preTranslate);

/**
 * When the user clicks the translation button, the translationButtonIFrame will be mounted at document.documentElement and the load event will be triggered.
 */
translationButtonIFrame.addEventListener('load', () => {
  const buttonImage = document.createElement('img');
  buttonImage.src = ImageData;
  const BUTTON_SIZE = '32px';
  Object.assign(buttonImage.style, {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    minWidth: 0,
    maxWidth: BUTTON_SIZE,
    minHeight: 0,
    maxHeight: BUTTON_SIZE,
    padding: 0,
    border: 0,
    margin: 0,
    verticalAlign: 0, // fix the style problem in some websites
    filter: 'none', // https://github.com/EdgeTranslate/EdgeTranslate/projects/2#card-58817626
  });
  const translationButton = document.createElement('div');
  Object.assign(translationButton.style, {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    borderRadius: '50%',
    boxSizing: 'content-box',
    overflow: 'hidden',
    border: 'none',
    cursor: 'pointer',
  });

  translationButton.appendChild(buttonImage);
  translationButtonIFrame.contentDocument.body.appendChild(translationButton);
  const CleanStyle = {
    padding: 0,
    margin: 0,
    border: 'none',
    overflow: 'hidden',
  };
  Object.assign(
    translationButtonIFrame.contentDocument.documentElement.style,
    CleanStyle
  );
  Object.assign(translationButtonIFrame.contentDocument.body.style, CleanStyle);
  translationButton.addEventListener('mousedown', buttonClickHandler);
  translationButton.addEventListener('contextmenu', (e) => e.preventDefault());
});

const showButton = (event) => {
  document.documentElement.appendChild(translationButtonIFrame);
  const OffsetXValue = 10,
    OffsetYValue = 10;
  let XBias, YBias;

  // Current button position setting
  // PROCESS.ENV.BROWSER === "EDGE" ? TopRight : BottomRight
  let ButtonPositionSetting = 'TopRight';

  switch (ButtonPositionSetting) {
    default:
    case 'TopRight':
      XBias = OffsetXValue;
      YBias = -OffsetYValue - translationButtonIFrame.clientHeight;
      break;
    case 'TopLeft':
      XBias = -OffsetXValue - translationButtonIFrame.clientWidth;
      YBias = -OffsetYValue - translationButtonIFrame.clientHeight;
      break;
    case 'BottomRight':
      XBias = OffsetXValue;
      YBias = OffsetYValue;
      break;
    case 'BottomLeft':
      XBias = -OffsetXValue - translationButtonIFrame.clientWidth;
      YBias = OffsetYValue;
      break;
  }
  let XPosition = event.x + XBias;
  let YPosition = event.y + YBias;

  // If the icon is beyond the side of the page, we need to reposition the icon inside the page.
  if (
    XPosition <= 0 ||
    XPosition + translationButtonIFrame.clientWidth > window.innerWidth
  )
    XPosition = event.x - XBias - translationButtonIFrame.clientWidth;
  if (
    YPosition <= 0 ||
    YPosition + translationButtonIFrame.clientHeight > window.innerHeight
  )
    YPosition = event.y - YBias - translationButtonIFrame.clientHeight;

  // set the new position of the icon
  translationButtonIFrame.style.top = `${YPosition}px`;
  translationButtonIFrame.style.left = `${XPosition}px`;

  // Create pretranslate follow

  preTranslate.style.top = `${YPosition}px`;
  preTranslate.style.left = `${XPosition + 40}px`;

  isButtonShown = true;
};

const buttonClickHandler = (event) => {
  event.preventDefault();
  event.stopPropagation();
  translateSubmit();
};
