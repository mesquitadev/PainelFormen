import { ReactNode } from 'react';
import { Header } from '@/components';
import { Container, Flex, Portal, Spinner, Box } from '@chakra-ui/react';
import { useLoading } from '@/hooks/useLoading';

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
