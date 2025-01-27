import React, { useState, useEffect } from 'react';
import { searchItems } from '../services/api';

const SearchItems = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAllItems = async () => {
    try {
      // Fetch all items with no filters
      const response = await searchItems({});
      setItems(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch items.');
      setItems([]);
    }
  };

  useEffect(() => {
    // Fetch all items on component mount
    fetchAllItems();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchItems({ name: query });
      setItems(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to search items.');
      setItems([]);
    }
  };

  return (
    <div>
      <h1>Search Items</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price Per Day</th>
            <th>Available</th>
            <th>Rentals</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.pricePerDay}</td>
              <td>{item.available ? 'Yes' : 'No'}</td>
              <td>
                {item.rentals.length > 0 ? (
                  <ul>
                    {item.rentals.map((rental, index) => (
                      <li key={index}>
                        From {new Date(rental.startDate).toLocaleDateString()} to {new Date(rental.endDate).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No Rentals'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchItems;
