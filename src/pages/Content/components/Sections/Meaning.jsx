import React from 'react';
import { HiCheck, HiDocumentDuplicate, HiVolumeUp } from 'react-icons/hi';

const Meaning = ({ playAudio }) => {
  const [justCopied, setJustCopied] = React.useState(false);
  return (
    <div class="evtd-section meaning">
      <div class="evtd-wrapper">
        <div class="source-text" id="evtd-meaning-value"></div>
        <div class="tools">
          <button
            class={`evtd-copy ${justCopied ? 'copied' : ''}`}
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
            class="audio-button"
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
