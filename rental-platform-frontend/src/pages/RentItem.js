import React, { useState, useEffect } from 'react';
import { searchItems, rentItem } from '../services/api';

const RentItem = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchAvailableItems = async () => {
    try {
      // Fetch all available items
      const response = await searchItems({}); // Fetch all items
      setItems(response.data.filter((item) => item.available)); // Only show available items
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch items.');
      setItems([]);
    }
  };

  useEffect(() => {
    // Fetch items on component mount
    fetchAvailableItems();
  }, []);

  const handleRent = async (itemId) => {
    try {
      await rentItem(itemId, { startDate, endDate });
      setMessage('Item rented successfully!');
      fetchAvailableItems(); // Refresh available items
    } catch (error) {
      setMessage('Failed to rent item.');
    }
  };

  return (
    <div>
      <h1>Rent an Item</h1>
      <p>{message}</p>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price Per Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.pricePerDay}</td>
              <td>
                <button onClick={() => setSelectedItemId(item._id)}>
                  Select to Rent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItemId && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Item ID: {selectedItemId}</h3>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label style={{ marginLeft: '10px' }}>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <button
            onClick={() => handleRent(selectedItemId)}
            style={{ marginLeft: '10px' }}
          >
            Rent Item
          </button>
        </div>
      )}
    </div>
  );
};

export default RentItem;
