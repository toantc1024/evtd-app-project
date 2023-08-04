import React from 'react';
import { HiCheck, HiDocumentDuplicate, HiVolumeUp } from 'react-icons/hi';

const Phonetic = ({ playAudio }) => {
  const [justCopied, setJustCopied] = React.useState(false);
  return (
    <div className="evtd-section phonetic">
      <div className="evtd-wrapper">
        <div className="source-text" id="evtd-phonetic-source-text"></div>
        <div className="tools">
          <button
            className={`evtd-copy ${justCopied ? 'copied' : ''}`}
            onClick={() => {
              const sourceText = document.getElementById(
                'evtd-phonetic-source-text'
              );
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
          <audio id="evtd-phonetic-audio" />
          <button
            className={`audio-button`}
            onClick={() => {
              playAudio(
                document.getElementById('evtd-phonetic-source-text')
                  .textContent,
                'source'
              );
            }}
            id="evtd-phonetic-button"
          >
            <HiVolumeUp />
          </button>
          <div id="evtd-phonetic-text"></div>
        </div>
      </div>
    </div>
  );
};

export default Phonetic;
