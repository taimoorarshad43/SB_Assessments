import React, { useState } from 'react';
import MadlibForm from './MadlibForm';
import MadlibStory from './MadlibStory';

const Madlib = () => {
  const [formData, setFormData] = useState(null);

  /**
   * Handles the form submission data from MadlibForm
   */
  const handleSubmit = (data) => {
    setFormData(data);
  };

  /**
   * Allows resetting the story and going back to the form
   */
  const resetStory = () => {
    setFormData(null);
  };

  return (
    <main>
      <h1>MadLibs Generator</h1>
      {formData ? (
        <MadlibStory data={formData} onReset={resetStory} />
      ) : (
        <MadlibForm onSubmit={handleSubmit} />
      )}
    </main>
  );
}

export default Madlib;
