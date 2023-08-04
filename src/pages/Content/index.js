import google from '../../libs/translate/google';
import { builtPanel } from './built';
import { ImageData, POPUP_CONTENT } from './constants';
// Recevie message from background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension',
    'with request',
    request
  );

  if (request.type === 'response') {
    let content = document.getElementById('evtd-content');
    content.style.display = 'none';
    let loader = document.getElementById('evtd-loader');
    loader.style.display = 'none';

    let text = request.res.result[0];
    let audio = request.audio;
    content.innerHTML = `${text}`;
    content.style.display = 'block';
  }
});

// Inject the conttentstyle
let isButtonShown = false;

chrome.storage.sync.get(['sourceLang', 'targetLang'], function (e) {
  if (!e.sourceLang) {
    chrome.storage.sync.set({ sourceLang: 'en' });
  }
  if (!e.targetLang) {
    chrome.storage.sync.set({ targetLang: 'vi' });
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
document.documentElement.appendChild(resultPanel);
// Function for resultPanel object

const showResult = () => {
  resultPanel.style.display = 'flex';
  resultPanel.style.position = 'fixed';
};
const hideResult = () => {
  resultPanel.style.display = 'none';
};
builtPanel(resultPanel, hideResult);
document.addEventListener('mousedown', () => {
  disappearButton();
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
  console.log({ selectedText });
  if (!selectedText) return false;
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

const translateSubmit = () => {
  let selection = querySelect();
  if (selection.text && selection.text.length > 0) {
    chrome.storage.sync.get(['sourceLang', 'targetLang'], (e) => {
      let sourceLang = e.sourceLang;
      let targetLang = e.targetLang;
      let queryText = selection.text;
      // Limit amount of queryText to 100 character
      if (queryText.length > 500) {
        queryText = queryText.substring(0, 500);
      }

      let loader = document.getElementById('evtd-loader');
      loader.style.display = 'block';
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
          if (response.res.result[0] === undefined) {
            content.innerHTML = 'No result';
            return;
          } else if (response.res.result[0].length > 1) {
            let text = response.res.result.join(' ');
            content.innerHTML = text;
            return;
          } else {
            content.innerHTML = response.res.result[0];
          }
          console.log('Received', response);
        }
      );

      resultPanel.style.top = `${translationButtonIFrame.offsetTop}px`;
      resultPanel.style.left = `${translationButtonIFrame.offsetLeft}px`;

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
  if (event.targetElement === resultPanel) {
    console.log('Ooops');
    return;
  }
  if (!shouldTranslate()) return;
  showButton(event);
}

const disappearButton = () => {
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
  alert('init');
  translationButton.addEventListener('contextmenu', (e) => e.preventDefault());
});

const showButton = (event) => {
  document.documentElement.appendChild(translationButtonIFrame);
  const OffsetXValue = 10,
    OffsetYValue = 10;
  let XBias, YBias;

  // Current button position setting
  let ButtonPositionSetting = 'BottomRight';

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

  // record original position of the selection icon and the start mouse scrolling position
  // originScrollX = scrollingElement[scrollPropertyX];
  // originScrollY = scrollingElement[scrollPropertyY];
  // originPositionX = XPosition;
  // originPositionY = YPosition;
  isButtonShown = true;
};

const buttonClickHandler = (event) => {
  event.preventDefault();
  event.stopPropagation();
  translateSubmit();
};
