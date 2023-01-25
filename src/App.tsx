import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/handlers/ErrorBoundary';
import Routes from './routes';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme as defaultTheme } from '@/styles/theme';

const theme = extendTheme(defaultTheme);
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ErrorBoundary>
          <LoadingProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </LoadingProvider>
        </ErrorBoundary>
      </Router>
    </ChakraProvider>
  );
}

export default App;
