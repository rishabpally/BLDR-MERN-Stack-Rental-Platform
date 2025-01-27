import React, { useState } from 'react';
import { listItem } from '../services/api';

const ListItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await listItem({ name, description, pricePerDay });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to list item.');
    }
  };

  return (
    <div>
      <h1>List an Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price Per Day"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          required
        />
        <button type="submit">List Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ListItem;
