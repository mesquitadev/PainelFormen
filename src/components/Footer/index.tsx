import { Container } from 'react-bootstrap';
import { Box, BoxProps } from '@chakra-ui/react';

export const Footer = (props: BoxProps) => {
  return (
    <Box as='footer' role='contentinfo' bg='bg-accent' {...props}>
      <Container>footer</Container>
    </Box>
  );
};
