import { ReactNode } from 'react';
import { Header } from '@/components';
import { Box, Container } from '@chakra-ui/react';

interface ILayout {
  children: ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <Box>
      <Header />
      <Container
        h={'100%'}
        mx={'auto'}
        w={'100%'}
        maxW={'1160px'}
        alignItems={'center'}
        justifyContent='center'
      >
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
