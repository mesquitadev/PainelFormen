import logo from '@/assets/images/positivo-black.png';
import api from '@/services';
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CgChevronDown } from 'react-icons/cg';
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
    }}
    {...rest}
  >
    <Button>{children}</Button>
  </Link>
);

const Header: React.FC = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userdata, setUserData] = useState([]);

  const getAccountData = useCallback(async () => {
    await api
      .get('/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getAccountData();
  }, [getAccountData]);

  return (
    <Box>
      <Flex w={'100%'} as={'header'} h='74px'>
        <Flex
          alignItems='center'
          justifyContent='space-between'
          w='100%'
          maxW='1160px'
          mx='auto'
          px={['10px', '30px']}
        >
          <Flex>
            <Image w={'180px'} justifySelf={'center'} src={logo} />
          </Flex>

          <Flex alignItems={'center'}>
            <IconButton
              size={'md'}
              icon={
                isOpen ? (
                  <Center>
                    <AiOutlineClose />
                  </Center>
                ) : (
                  <Center>
                    <AiOutlineMenu />
                  </Center>
                )
              }
              aria-label={'Abrir Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Flex display={{ base: 'none', md: 'flex' }}>
              <HStack spacing={8} alignItems={'center'} px='10px'>
                <HStack as={'nav'} spacing={4}>
                  <NavLink to='/home'>Inicio</NavLink>

                  <Menu>
                    <MenuButton as={Button} rightIcon={<CgChevronDown />}>
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
                    <MenuButton as={Button} rightIcon={<CgChevronDown />}>
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

              <Flex>
                <Menu>
                  <MenuButton flexDir='row' justifyContent='space-between'>
                    <Avatar name={userdata?.name} />
                  </MenuButton>
                  <MenuList>
                    <VStack mb={5}>
                      <Avatar name={userdata?.name} />
                      <Text>
                        {userdata?.name} | {userdata?.profile?.title}
                      </Text>
                    </VStack>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <Button variant='outline' onClick={onClose}>
                        Sair do Portal
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {isOpen && (
          <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Positivo Investimentos</DrawerHeader>

              <DrawerBody>
                <VStack mb={10}>
                  <Avatar name={userdata?.name} />
                  <Text>
                    {userdata?.name} | {userdata?.profile?.title}
                  </Text>
                </VStack>
                <VStack spacing={8} width='100%' as={'nav'} justifyContent='right'>
                  <NavLink to='/home'>Inicio</NavLink>
                  <Divider />
                  <Menu>
                    <MenuButton as={Button} minW={0} rightIcon={<CgChevronDown />}>
                      <Text>Meu Negócio</Text>
                    </MenuButton>
                    <MenuList alignSelf='left'>
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
                </VStack>
              </DrawerBody>
              <Divider />
              <DrawerFooter>
                <Button variant='outline' onClick={onClose}>
                  Sair do Portal
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </Flex>
      <Divider />
    </Box>
  );
};

export default Header;
