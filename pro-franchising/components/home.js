import React from 'react';
import { Link } from 'react-router-dom';

// Componente Home representa a página inicial da aplicação
function Home() {
  return (
    <div>
      <h1>Ponto de Venda (PDV) App</h1>
      {/* Link para navegar até a página de produtos */}
      <Link to="/products">Ver Produtos</Link>
    </div>
  );
}

export default Home;
