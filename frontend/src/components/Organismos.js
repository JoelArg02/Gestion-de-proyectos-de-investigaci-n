import React, { useState, useEffect } from 'react';

const Organismos = () => {
  const [organismos, setOrganismos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiURL = 'https://example.com/api/organismos';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setOrganismos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Organismos</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {organismos.map((organismo) => (
            <li key={organismo.id}>
              {/* Replace 'name' with the actual property you want to display */}
              {organismo.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Organismos;
