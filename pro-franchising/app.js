import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';

// Configuração do cliente de consulta
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    {/* Provedor de consulta */}
    <QueryClientProvider client={queryClient}>
      {/* Provedor de tema */}
      <ThemeProvider theme={theme}>
        {/* Estilos globais */}
        <GlobalStyles />
        {/* Componente de limite de erro global */}
        <ErrorBoundary>
          {/* Router */}
          <Router>
            {/* Layout comum para todas as páginas */}
            <Layout>
              {/* Switch para roteamento */}
              <Switch>
                {/* Rota para página inicial */}
                <Route exact path="/">
                  <Home />
                </Route>
                {/* Rota para página de produtos */}
                <Route path="/products">
                  <ProductsPage />
                </Route>
                {/* Rota para página do carrinho */}
                <Route path="/cart">
                  <CartPage />
                </Route>
                {/* Rota para páginas não encontradas */}
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
