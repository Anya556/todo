import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Hi!</h1>
      <Link to="/todo">
        <button className="open-link">Click me</button>
      </Link>
    </div>
  );
};

export default Home;
