import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { Link as RDLink } from 'react-router-dom';
import logo from '@/assets/images/positivo-black.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useLoading } from '@/hooks/useLoading';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';

interface SignInFormData {
  email: string;
  password: string;
}

export default function Login() {
  const signInFormSchema = yup.object().shape({
    email: yup.string().required('Este campo é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Este campo é obrigatório'),
  });

  const { loading } = useLoading();

  const { signIn } = useAuth();
  const { handleSubmit, formState, control } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;
  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    if (!loading) await signIn(values);
  };
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing='8'>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing='6' justify='center' align='center'>
            <Image src={logo} width={200} />
            <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
              <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                Portal de Investimentos
              </Heading>
            </Stack>
          </Stack>
          <Stack spacing='6'>
            <Flex as='form' onSubmit={handleSubmit(handleSignIn)} flexDir='column'>
              <Input
                name='email'
                control={control}
                placeholder='Email'
                autoCapitalize='none'
                errors={errors.email && errors.email.message}
                label={'Email'}
              />
              <Input
                name='password'
                type='password'
                control={control}
                placeholder='Senha'
                errors={errors.password && errors.password.message}
                label={'Senha'}
              />

              <Center>
                <Button
                  type='submit'
                  size='lg'
                  w='8rem'
                  mt='10'
                  bg='primary.darkest'
                  fontWeight='500'
                  _hover={{ bg: 'primary.dark' }}
                  isLoading={loading}
                >
                  Entrar
                </Button>
              </Center>
            </Flex>
            <HStack justify='space-between'>
              <Button variant='link' color='primary.darkest' size='sm'>
                Esqueceu a senha?
              </Button>
            </HStack>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Não tem uma conta?</Text>
              <Button to='/auth/register' variant='link' as={RDLink} color='primary.darkest'>
                Cadastre-se
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
