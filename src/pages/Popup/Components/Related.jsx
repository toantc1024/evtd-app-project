import React from 'react';

const Related = ({ related }) => {
  return related ? (
    <div>
      {related &&
        related.map((item, index) => {
          return <div>{`${index}: (${item})`}</div>;
        })}
    </div>
  ) : (
    <div>Sorry, there is no related for this!</div>
  );
};

export default Related;
