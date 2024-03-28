import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import PDVPage from './PDVPage';
import PrivateRoute from './PrivateRoute';

function App() {
  // Gerenciamento do estado de autenticação do usuário
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Efeito para verificar se o token está expirado
  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (token && tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      if (expirationDate < new Date()) {
        handleLogout();
      }
    }
  }, [token]);

  // Função para efetuar login do usuário
  const handleLogin = (token, tokenExpiration) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', tokenExpiration);
    setToken(token);
  };

  // Função para efetuar logout do usuário
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setToken(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {/* Renderiza a página de login */}
          {token ? <Redirect to="/pdv" /> : <LoginPage onLogin={handleLogin} />}
        </Route>
        <PrivateRoute path="/pdv" token={token}>
          {/* Renderiza a página do PDV (ponto de venda) */}
          <PDVPage onLogout={handleLogout} />
        </PrivateRoute>
        <Route path="/">
          {/* Redireciona para a página de login se o caminho não corresponder a nenhum rota definida */}
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
