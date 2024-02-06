// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { name, email } = response.data.results[0];
      const fullName = `${name.first} ${name.last}`;
      setUserData({ fullName, email });
      localStorage.setItem('userData', JSON.stringify({ fullName, email }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      fetchData();
    }
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="App">
      {userData && (
        <div className="user-container">
          <h2>User Information</h2>
          <p>
            <strong>Full Name:</strong> {userData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;
