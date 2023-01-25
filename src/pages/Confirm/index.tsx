import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import logo from '@/assets/images/logo.png';

export default function Confirm() {
  return (
    <Container py={{ base: '12', md: '12' }} px={{ base: '0', sm: '8' }} centerContent>
      <Stack spacing='8'>
        <Stack spacing='6' justify='center' align='center'>
          <Image src={logo} width={200} />
        </Stack>
        <Box
          w='768px'
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Flex flexDir='column' width='100%'>
            <Heading>Parabéns!</Heading>
            <Stack>
              <Heading size={'md'}>
                Você acaba de confirmar a sua inscrição para o Processo Seletivo do ProLíder 2023.
              </Heading>
            </Stack>
            <Stack py={5}>
              <Text>
                Verifique o seu email, nele contém dados da sua inscrição. Aguarde pelos próximos
                passos!
              </Text>
            </Stack>

            <Link target='_blank' href='https://www.instagram.com/prolideroficial/'>
              Instagram
            </Link>
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
}
