import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@/styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
import AppProvider from '@/contexts/AppProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
        <CssBaseline />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
