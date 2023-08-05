import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';
export const builtPanel = (
  panel,
  hideResult,
  unpinResult,
  pinResult,
  playAudio,
  storeToSaved
) => {
  const root = createRoot(panel); // createRoot(container!) if you use TypeScript
  root.render(
    <Popup
      hideResult={hideResult}
      pinResult={pinResult}
      unpinResult={unpinResult}
      playAudio={playAudio}
      storeToSaved={storeToSaved}
    />
  );
};
