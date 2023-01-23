import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as RDLink, LinkProps } from 'react-router-dom';

interface ILinkProps extends LinkProps {
  children: ReactNode;
}

const NavLink = ({ children, to, ...rest }: ILinkProps) => (
  <Link
    to={to}
    as={RDLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    {...rest}
  >
    {children}
  </Link>
);

export default function Navbar({ userData }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container h={'100%'} mx={'auto'} w={'100%'} maxW={'1160px'} alignItems={'center'}>
      <Flex h={16} px={10} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          // icon={isOpen ? 'close' : 'open'}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to='/home'>Inicio</NavLink>

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'button'}
                cursor={'pointer'}
                minW={0}
              >
                <Text>Meu Negócio</Text>
              </MenuButton>
              <MenuList>
                <MenuItem to={'/invest'} as={RDLink}>
                  Invista Agora
                </MenuItem>
                <MenuItem to={'/myvolume'} as={RDLink}>
                  Meu Volume
                </MenuItem>
                <MenuItem to={'/mybonus'} as={RDLink}>
                  Meus Ganhos
                </MenuItem>
                <MenuItem to={'/descendant'} as={RDLink}>
                  Linha Descendente
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Text>Financeiro</Text>
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              flexDir='row'
              variant={'link'}
              cursor={'pointer'}
              justifyContent='space-between'
            >
              <Text fontSize='sm'>
                Olá, {userData?.name} | {userData?.profile?.title}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem>Link 3</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink to='/home'>Inicio</NavLink>

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'button'}
                cursor={'pointer'}
                minW={0}
              >
                <Text>Meu Negócio</Text>
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>

            <NavLink to='/invest'>Investir</NavLink>
            <NavLink to='/descendant'>Linha Descendente</NavLink>

            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Text>Financeiro</Text>
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Box>
      ) : null}
      <Divider />
    </Container>
  );
}
