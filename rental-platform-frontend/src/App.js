import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ListItem from './pages/ListItem';
import RentItem from './pages/RentItem';
import ReturnItem from './pages/ReturnItem';
import Home from './pages/Home';
import SearchItems from './pages/SearchItems';

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <ul style={styles.navList}>
            <li><NavLink to="/" style={styles.link} activeStyle={styles.activeLink}>Home</NavLink></li>
            <li><NavLink to="/list-item" style={styles.link} activeStyle={styles.activeLink}>List a New Item</NavLink></li>
            <li><NavLink to="/search-items" style={styles.link} activeStyle={styles.activeLink}>Search for Items</NavLink></li>
            <li><NavLink to="/rent-item" style={styles.link} activeStyle={styles.activeLink}>Rent an Item</NavLink></li>
            <li><NavLink to="/return-item" style={styles.link} activeStyle={styles.activeLink}>Return an Item</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-item" element={<ListItem />} />
          <Route path="/search-items" element={<SearchItems />} />
          <Route path="/rent-item" element={<RentItem />} />
          <Route path="/return-item" element={<ReturnItem />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#282c34',
    padding: '1rem',
    textAlign: 'center',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#61dafb',
    fontSize: '1.2rem',
  },
  activeLink: {
    fontWeight: 'bold',
    color: '#21a0f6',
    textDecoration: 'underline',
  },
};

export default App;
