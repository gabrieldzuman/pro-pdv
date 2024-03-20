import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Point of Sale (PDV) App</h1>
      <Link to="/products">Browse Products</Link>
    </div>
  );
}

export default Home;
