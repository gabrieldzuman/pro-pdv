import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CartPage() {
  // Utilizando o hook useState para gerenciar o estado dos itens no carrinho
  const [items, setItems] = useState([]);

  // Função para lidar com o checkout
  const handleCheckout = async () => {
    try {
      // Verifica se há itens no carrinho
      if (items.length === 0) {
        throw new Error('O carrinho está vazio. Não é possível prosseguir com o checkout.');
      }

      // Calcula o total da compra
      const total = calculateTotal(items);

      // Processa o pagamento
      await processPayment(total);

      // Limpa os itens do carrinho após o checkout bem-sucedido
      setItems([]);
      alert('Checkout bem-sucedido!');
    } catch (error) {
      // Trata erros durante o processamento do pagamento
      console.error('Erro durante o processamento do pagamento:', error.message);
      alert('Ocorreu um erro durante o checkout. Por favor, tente novamente mais tarde.');
    }
  };

  // Função para calcular o total da compra com base nos itens no carrinho
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Função para simular o processamento do pagamento (pode ser substituída por uma chamada de API real)
  const processPayment = async (amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simula um pagamento bem-sucedido 90% das vezes
        if (Math.random() < 0.9) {
          resolve();
        } else {
          reject(new Error('Falha no processamento do pagamento. Por favor, tente novamente.'));
        }
      }, 2000); // Simula um atraso de 2 segundos para o processamento do pagamento
    });
  };

  return (
    <div>
      <h2>Carrinho</h2>
      {/* Renderiza uma mensagem se o carrinho estiver vazio */}
      {items.length === 0 ? (
        <p>O seu carrinho está vazio.</p>
      ) : (
        <ul>
          {/* Mapeia os itens do carrinho e os exibe em uma lista */}
          {items.map(({ id, title, price }) => (
            <li key={id}>
              {title} - ${price}
            </li>
          ))}
        </ul>
      )}
      {/* Botão para realizar o checkout */}
      <button onClick={handleCheckout}>Checkout</button>
      <br />
      {/* Link para voltar para a página de produtos */}
      <Link to="/products">Voltar para os Produtos</Link>
    </div>
  );
}

export default CartPage;
