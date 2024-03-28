import React from 'react';

function PDVPage({ onLogout }) {
  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    // Executa a função de logout passada como prop
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  // Função para imprimir o recibo da compra
  const printReceipt = () => {
    window.print();
  };

  return (
    <div>
      <h1>Ponto de Venda (PDV) App</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={printReceipt}>Imprimir Recibo</button>
      {/* Área do recibo */}
      <div className="receipt" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Recibo da Compra</h2>
        <p>Produtos: ...</p>
        <p>Total: R$ ...</p>
        <p>Data: ...</p>
      </div>
    </div>
  );
}

export default PDVPage;
