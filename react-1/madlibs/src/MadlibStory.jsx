import React from 'react';

const MadlibStory = ({ data, onReset }) => {
  const { noun1, noun2, adjective, color } = data;

  return (
    <div >
      <p >
        The <span>{color}</span>{' '}
        <span>{noun1}</span> couldn't stand the{' '}
        <span>{adjective}</span>{' '}
        <span>{noun2}</span>.
      </p>
      <button
        onClick={onReset}
      >
        Create Another
      </button>
    </div>
  );
}

export default MadlibStory;
