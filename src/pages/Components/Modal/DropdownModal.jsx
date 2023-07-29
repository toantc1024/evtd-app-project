import React from 'react';

export default function DropdownModal() {
  const [showModal, setShowModal] = React.useState(true);
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-red-200 z-50">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
