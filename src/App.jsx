import React, { useState } from 'react';
import { FaGlobe, FaUser, FaKey, FaSearch, FaTrash } from 'react-icons/fa';

const App = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordList, setPasswordList] = useState([]);
  const [showPasswords, setShowPasswords] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPassword = (e) => {
    e.preventDefault();
    if (website && username && password) {
      const newPassword = {
        id: Date.now(),
        website,
        username,
        password,
      };
      setPasswordList([...passwordList, newPassword]);
      setWebsite('');
      setUsername('');
      setPassword('');
    }
  };

  const handleDeletePassword = (id) => {
    const updatedList = passwordList.filter((item) => item.id !== id);
    setPasswordList(updatedList);
  };

  const filteredPasswords = passwordList.filter((item) =>
    item.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="header">
        <h1>Password Manager</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleAddPassword}>
          <div className="input-group">
            <FaGlobe className="input-icon" />
            <input
              type="text"
              placeholder="Enter Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaKey className="input-icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="passwords-section">
        <div className="passwords-header">
          <h4>Your Passwords <span>{filteredPasswords.length}</span></h4>
          <div className="controls">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="toggle-container">
              <input
                type="checkbox"
                id="show-passwords"
                checked={showPasswords}
                onChange={() => setShowPasswords(!showPasswords)}
              />
              <label htmlFor="show-passwords">Show Passwords</label>
            </div>
          </div>
        </div>

        <div className="password-list">
          {filteredPasswords.length === 0 ? (
            <div className="no-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="No Passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul>
              {filteredPasswords.map((item) => (
                <li key={item.id} className="password-item">
                  <div className="initial">{item.website[0].toUpperCase()}</div>
                  <div className="password-details">
                    <p>{item.website}</p>
                    <p>{item.username}</p>
                    <p>
                      {showPasswords ? (
                        item.password
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars"
                        />
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeletePassword(item.id)}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;