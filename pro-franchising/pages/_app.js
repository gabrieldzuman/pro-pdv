import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // Tratamento de erros global
  window.addEventListener('unhandledrejection', event => {
    console.error('Erro não tratado:', event.reason);
  });

  // Estado de carregamento inicial
  const [loading, setLoading] = React.useState(true);

  // Definindo um tempo de carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Carregamento inicial de 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Renderização condicional para mostrar um spinner de carregamento inicial */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Carregando...</h1>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default MyApp;
