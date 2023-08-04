import React, { Fragment } from 'react';
import Toolbar from './components/Toolbar';
import { POPUP_CONTENT } from './constants';

const Popup = ({ hideResult }) => {
  return (
    <Fragment>
      <Toolbar hideResult={() => hideResult()} />
      {/* Expand */}

      {/* Pin */}

      {/* Result content */}
      <div className={POPUP_CONTENT}>
        <div id="evtd-loader">Loading</div>
        <div id="evtd-content">Data</div>
      </div>
    </Fragment>
  );
};

export default Popup;
