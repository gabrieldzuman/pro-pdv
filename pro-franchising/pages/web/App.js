import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PDVPage from './PDVPage';
import PrivateRoute from './PrivateRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token); 
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage onLogin={handleLogin} />
        </Route>
        <PrivateRoute path="/pdv" token={token}>
          <PDVPage onLogout={handleLogout} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
