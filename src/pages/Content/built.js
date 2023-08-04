import { POPUP_HEADER } from './constants';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
export const builtPanel = (panel, hideResult) => {
  const root = createRoot(panel); // createRoot(container!) if you use TypeScript
  root.render(<Popup hideResult={hideResult} />);
};
