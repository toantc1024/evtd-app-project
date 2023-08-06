import React from 'react';
import { POPUP_HEADER } from '../constants';
import { ImageData } from '../assets/image';
import { HiX, HiStar, HiCheck } from 'react-icons/hi';
import { BsPinAngleFill, BsPinFill } from 'react-icons/bs';

const Toolbar = ({ hideResult, pinResult, unpinResult, storeToSaved }) => {
  var SNAP_MARGINS = 5;
  var SNAP_FS_MARGINS = 100;
  var RESIZE_MARGIN_INNER = 5;
  var RESIZE_MARGIN_OUTER = 5;

  function calc(target, e) {
    let b = target.getBoundingClientRect();
    let x = e.clientX - b.left;
    let y = e.clientY - b.top;

    // define inner and outer margins
    var dMi = RESIZE_MARGIN_INNER;
    var dMo = -RESIZE_MARGIN_OUTER;
    var rMi = b.width - RESIZE_MARGIN_INNER;
    var rMo = b.width + RESIZE_MARGIN_OUTER;
    var bMi = b.height - RESIZE_MARGIN_INNER;
    var bMo = b.height + RESIZE_MARGIN_OUTER;
    let inLR = x > dMo && x < rMo;
    let inTB = y > dMo && y < bMo;

    let onTopEdge = y <= dMi && y > dMo && inLR;
    let onLeftEdge = x <= dMi && x > dMo && inTB;
    let onBottomEdge = y >= bMi && y < bMo && inLR;
    let onRightEdge = x >= rMi && x < rMo && inTB;

    let rightScreenEdge = b.right > window.innerWidth - SNAP_MARGINS;
    let bottomScreenEdge = b.bottom > window.innerHeight - SNAP_MARGINS;
    let topScreenEdge = b.top < SNAP_MARGINS;
    let leftScreenEdge = b.left < SNAP_MARGINS;
    return {
      onTopEdge,
      onLeftEdge,
      onBottomEdge,
      onRightEdge,

      rightScreenEdge,
      bottomScreenEdge,
      topScreenEdge,
      leftScreenEdge,
    };
  }

  var newPosX = 0,
    newPosY = 0,
    lastPosX = 0,
    lastPosY = 0;
  var elmnt = document.getElementById('evtd-result-panel');

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    lastPosX = e.clientX;
    lastPosY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    // calculate the new cursor position:
    newPosX = lastPosX - e.clientX;
    newPosY = lastPosY - e.clientY;
    lastPosX = e.clientX;
    lastPosY = e.clientY;
    // set the element's new position:
    elmnt.style.top = Math.max(elmnt.offsetTop - newPosY, 0) + 'px';
    elmnt.style.left = Math.max(elmnt.offsetLeft - newPosX, 0) + 'px';
    // console.log(elmnt.offsetTop - newPosY, elmnt.offsetLeft - newPosX);
  }

  function closeDragElement(e) {
    // console.log(e);
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const [isJustSaved, setIsJustSaved] = React.useState(false);

  const [resultPin, setResultPin] = React.useState(false);

  return (
    <div className={POPUP_HEADER} id={POPUP_HEADER} onMouseDown={dragMouseDown}>
      <div className={`${POPUP_HEADER}-TOOL`}>
        {/* Dropdown */}

        {/* Save result button */}
        <button
          className={`save ${isJustSaved ? 'saved' : ''}`}
          onClick={() => {
            storeToSaved();

            setIsJustSaved(true);
            setTimeout(() => {
              setIsJustSaved(false);
            }, 1000);
          }}
        >
          {isJustSaved ? <HiCheck /> : <HiStar />}
        </button>
        {/* Expand button */}
        {/* Pin button */}
        <button
          onClick={() => {
            if (resultPin) {
              unpinResult();
            } else {
              pinResult();
            }
            setResultPin(!resultPin);
          }}
          className={`${resultPin ? 'evtd-pinned' : 'evtd-pin'}`}
          id="EVTD-POPUP-PIN-RESULT"
        >
          {resultPin ? <BsPinFill /> : <BsPinAngleFill />}
        </button>
        {/* Exit button */}
        <button
          className={`close`}
          onClick={() => {
            hideResult();
            if (resultPin) {
              unpinResult();
            } else {
              pinResult();
            }
            setResultPin(false);
          }}
        >
          <HiX />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
