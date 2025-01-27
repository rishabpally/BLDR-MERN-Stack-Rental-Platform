import React, { useState, useEffect } from 'react';
import { searchItems, returnItem } from '../services/api';

const ReturnItem = () => {
  const [rentedItems, setRentedItems] = useState([]);
  const [message, setMessage] = useState('');

  const fetchRentedItems = async () => {
    try {
      // Fetch all items from the backend
      const response = await searchItems({});
      // Filter items that have active rentals
      const rented = response.data.filter((item) => item.rentals && item.rentals.length > 0);
      setRentedItems(rented);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch rented items.');
      setRentedItems([]);
    }
  };

  useEffect(() => {
    // Fetch rented items on component mount
    fetchRentedItems();
  }, []);

  const handleReturn = async (itemId) => {
    try {
      await returnItem(itemId);
      setMessage('Item returned successfully!');
      fetchRentedItems(); // Refresh rented items list
    } catch (error) {
      setMessage('Failed to return item.');
    }
  };

  return (
    <div>
      <h1>Return an Item</h1>
      <p>{message}</p>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price Per Day</th>
            <th>Rentals</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rentedItems.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.pricePerDay}</td>
              <td>
                {item.rentals.map((rental, index) => (
                  <div key={index}>
                    Start: {new Date(rental.startDate).toLocaleDateString()} - End: {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleReturn(item._id)}>Return Item</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rentedItems.length === 0 && <p>No items currently rented.</p>}
    </div>
  );
};

export default ReturnItem;
