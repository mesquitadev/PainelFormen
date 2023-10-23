import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import emptyImage from '@/assets/images/empty.svg';
export default function NotFound() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h3' sx={{ mb: 3 }}>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component='img'
            src={emptyImage}
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button size='large' variant='contained' onClick={() => handleGoBack()}>
            Voltar
          </Button>
        </Box>
      </Container>
    </>
  );
}
