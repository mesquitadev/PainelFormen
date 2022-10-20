import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/handlers/ErrorBoundary';
import Routes from './routes';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/theme';
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
