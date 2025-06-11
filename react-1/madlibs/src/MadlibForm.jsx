import React, { useState } from 'react';

const MadlibForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    noun1: '',
    noun2: '',
    adjective: '',
    color: '',
  });

  /**
   * Updates form state as the user types
   */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  /**
   * Submits the form and passes data to parent
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} >
      <div>
        <label>Noun 1:</label>
        <input
          name="noun1"
          value={formData.noun1}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Noun 2:</label>
        <input
          name="noun2"
          value={formData.noun2}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label >Adjective:</label>
        <input
          name="adjective"
          value={formData.adjective}
          onChange={handleChange}
          required

        />
      </div>
      <div>
        <label>Color:</label>
        <input
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
      >
        Create Story
      </button>
    </form>
  );
}

export default MadlibForm;

