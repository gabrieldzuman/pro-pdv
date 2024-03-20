import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function ProductsPage() {
  const { data: products, isLoading, error } = useQuery('products', () =>
    fetch('https://fakestoreapi.com/products').then((res) => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
