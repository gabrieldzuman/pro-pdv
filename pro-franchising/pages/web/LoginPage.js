import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  // Estado para armazenar o nome de usuário e senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar campos de entrada
      if (!username.trim() || !password.trim()) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      
      // Requisição para autenticação
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      // Verificar a resposta da API
      const data = await response.json();
      if (response.ok) {
        // Se login bem-sucedido, chamar a função onLogin com o token
        onLogin(data.token);
      } else {
        // Se houver erro, exibir mensagem de erro
        setError(data.message || 'Erro ao efetuar login. Tente novamente mais tarde.');
      }
    } catch (error) {
      // Lidar com erros de rede ou outros erros
      console.error('Erro ao efetuar login:', error);
      setError('Erro ao efetuar login. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
