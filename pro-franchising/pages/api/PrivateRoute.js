import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Componente PrivateRoute é uma rota protegida que requer autenticação para acessá-la
function PrivateRoute({ children, token, tokenExpiration, ...rest }) {
  // Verifica se o token está presente e se não expirou
  const isAuthenticated = token && new Date(tokenExpiration) > new Date();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          // Se o usuário estiver autenticado e o token não tiver expirado, renderiza os componentes filhos
          children
        ) : (
          // Se não estiver autenticado ou o token tiver expirado, redireciona para a página de login
          <Redirect
            to={{
              pathname: '/login', // Redireciona para a página de login
              state: {
                from: location, // Passa o local atual como estado para redirecionamento após o login
                expiredToken: !token // Indica se o token expirou
              }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
