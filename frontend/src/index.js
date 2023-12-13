import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // or any global styles you have
import App from './App'; // Importing the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
