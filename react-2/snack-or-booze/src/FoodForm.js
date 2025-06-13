import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FoodForm({ type, addItem }) {

  // Initializing form state
  const INITIAL_STATE = {
    id: "",
    name: "",
    description: "",
    recipe: "",
    serve: ""
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  // Handle changes to the form inputs
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    addItem(formData);          // Calls parent callback with the new item
    setFormData(INITIAL_STATE); // Reset the form
    history.push(`/${type}`);   // Redirect to the list of items
  }

  return (
    <form onSubmit={handleSubmit} className="FoodForm">
      <h2>Add a new {type.slice(0, -1)}</h2>

      <div>
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="recipe">Recipe:</label>
        <input
          id="recipe"
          name="recipe"
          value={formData.recipe}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="serve">Serve:</label>
        <input
          id="serve"
          name="serve"
          value={formData.serve}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Add {type.slice(0, -1)}</button>
    </form>
  );
}

export default FoodForm;
