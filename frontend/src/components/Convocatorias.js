import React, { useState, useEffect } from 'react';

const Convocatorias = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock API URL (replace with your actual API endpoint)
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(apiURL);
        let data = await response.json();
        setConvocatorias(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container mt-4">
      <h2>Convocatorias</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {convocatorias.map((item) => (
            <li key={item.id}>{item.title}</li> // Customize as per your data structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default Convocatorias;
