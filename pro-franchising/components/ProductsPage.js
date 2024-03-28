import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

// Componente ProductsPage representa a página de exibição de produtos
function ProductsPage() {
  // Utiliza o hook useQuery para buscar os produtos da API
  const { data: products, isLoading, error } = useQuery('products', () =>
    fetch('https://fakestoreapi.com/products').then((res) => res.json())
  );

  // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (isLoading) return <div>Loading...</div>;

  // Renderiza uma mensagem de erro caso ocorra algum erro durante a busca dos dados
  if (error) return <div>Error: {error.message}</div>;

  // Renderiza a lista de produtos
  return (
    <div>
      <h2>Produtos</h2>
      <div className="product-list">
        {/* Mapeia os produtos e os exibe em cards */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Preço: ${product.price}</p>
            {/* Link para visualizar detalhes do produto */}
            <Link to={`/products/${product.id}`}>Ver Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
