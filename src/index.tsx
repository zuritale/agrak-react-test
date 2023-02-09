import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import App from './app/App';
import store from './redux/store';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({
  config
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1 * 60 * 60 * 1000,
      staleTime: 1 * 60 * 60 * 1000,
      retry: false,
      retryOnMount: false
    }
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
