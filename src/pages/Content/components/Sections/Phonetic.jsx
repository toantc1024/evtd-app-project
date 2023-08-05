import React from 'react';
import { HiCheck, HiDocumentDuplicate, HiVolumeUp } from 'react-icons/hi';

const Phonetic = ({ playAudio }) => {
  const [justCopied, setJustCopied] = React.useState(false);
  return (
    <div class="evtd-section phonetic">
      <div class="evtd-wrapper">
        <div class="source-text" id="evtd-phonetic-source-text"></div>
        <div class="tools">
          <button
            class={`evtd-copy ${justCopied ? 'copied' : ''}`}
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
            class={`audio-button`}
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
