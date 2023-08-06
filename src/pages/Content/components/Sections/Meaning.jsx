import React from 'react';
import { HiCheck, HiDocumentDuplicate, HiVolumeUp } from 'react-icons/hi';

const Meaning = ({ playAudio }) => {
  const [justCopied, setJustCopied] = React.useState(false);
  return (
    <div className="evtd-section meaning">
      <div className="evtd-wrapper">
        <div className="source-text" id="evtd-meaning-value"></div>
        <div className="tools">
          <button
            className={`evtd-copy ${justCopied ? 'copied' : ''}`}
            onClick={() => {
              const sourceText = document.getElementById('evtd-meaning-value');
              // Copy text from source text to clipboard
              navigator.clipboard.writeText(sourceText.innerText);
              setJustCopied(true);
              setTimeout(() => {
                setJustCopied(false);
              }, 500);
            }}
          >
            {justCopied ? <HiCheck /> : <HiDocumentDuplicate />}
          </button>
          <button
            className="audio-button"
            onClick={() => {
              playAudio(
                document.getElementById('evtd-meaning-value').textContent,
                'target'
              );
            }}
          >
            <HiVolumeUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meaning;
