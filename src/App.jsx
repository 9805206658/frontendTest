import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://backendtest-1-kora.onrender.com/getAllMember')
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setData(response.data); // Set the data from the response
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error); // Set the error if the request fails
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Displaying the data */}
    </div>
  );
}

export default App;
