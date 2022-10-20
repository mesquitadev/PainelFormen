import { useLoading } from '@/hooks/useLoading';
import api from '@/services';
import { formatCurrency } from '@/utils';
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { AiOutlineBarChart } from 'react-icons/ai';
import { GrCurrency } from 'react-icons/gr';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { Link as RDLink } from 'react-router-dom';
interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

interface Transactions {
  id: string;
  invest: number;
  withdrawals: number;
  referralBonus: number;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'}>{title}</StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} color={useColorModeValue('gray.800', 'gray.200')} alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Invests() {
  const toast = useToast();
  const { setLoading, loading } = useLoading();
  const modalListInvests = useDisclosure();
  const modalInvest = useDisclosure();
  const dialogInvest = useDisclosure();
  const cancelRef = useRef();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [bonuses, setBonuses] = useState([]);
  const [invests, setInvests] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [investId, setInvestId] = useState<number>();
  const [investAmount, setInvestAmount] = useState<number>();

  const getInvests = useCallback(async () => {
    try {
      setLoading(true);
      await api
        .get('/invest')
        .then((res) => {
          setInvests(res.data);
        })
        .catch((err) => console.log(err.data));
    } catch (err) {
      toast({
        title: 'Erro!.',
        description: 'Ocorreu um erro ao buscar as informações solicitadas',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [setLoading, toast]);

  const getUserData = useCallback(async () => {
    await api
      .get('/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      await api
        .get('/transactions')
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => console.log(err.data));
    } catch (err) {
      toast({
        title: 'Erro!.',
        description: 'Ocorreu um erro ao buscar as informações solicitadas',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [setLoading, toast]);

  useEffect(() => {
    getTransactions();
    getInvests();
    getUserData();
  }, [getInvests, getTransactions, getUserData]);

  const handleSendRequestWithdraw = async (invest: any) => {
    console.log(invest);
    try {
      await api
        .post(`/withdraw`, {
          amount: invest?.amount,
          investId: investId,
          detail: 'comprovante',
          type: 'bonus_invest',
        })
        .then(() => {
          toast({
            title: 'Sucesso!',
            description:
              'A solicitacão de saque foi realizada com sucesso, verificar status na página de saques.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => console.log(err.data));
    } catch (err) {
      toast({
        title: 'Erro!.',
        description: 'Ocorreu um erro ao buscar as informações solicitadas',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } finally {
      setLoading(false);
      modalListInvests.onOpen();
    }
  };

  const handleOpenModal = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await api
          .get(`/invest/${id}`)
          .then((res) => {
            setBonuses(res.data);
            setInvestId(id);
          })
          .catch((err) => console.log(err.data));
      } catch (err) {
        toast({
          title: 'Erro!.',
          description: 'Ocorreu um erro ao buscar as informações solicitadas',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      } finally {
        setLoading(false);
        modalListInvests.onOpen();
      }
    },
    [modalListInvests, setLoading, toast],
  );

  return (
    <Box maxW='7xl' mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Flex flexDir='row' w='100%'>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RDLink} to='/home'>
              Início
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RDLink} to='#'>
              Meu Negócio
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Meus Investimentos</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Flex align='center' my='30px' mr={5} justifyContent='space-between'>
        <Heading as='h1' size='lg' letterSpacing={'tighter'}>
          Meus Investimentos
        </Heading>
        <Button onClick={modalInvest.onOpen}>Investir Agora</Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Capital Investido'}
          stat={transactions.invest ? formatCurrency(transactions?.invest) : formatCurrency(0)}
          icon={<HiOutlineCurrencyDollar size={'3em'} />}
        />

        <StatsCard
          title={'Bonus Pessoais'}
          stat={
            transactions.withdrawalBonus
              ? formatCurrency(transactions?.withdrawalBonus)
              : formatCurrency(0)
          }
          icon={<AiOutlineBarChart size={'3em'} />}
        />

        <StatsCard
          title={'Saldo'}
          stat={userdata.balance ? formatCurrency(userdata?.balance) : formatCurrency(0)}
          icon={<GrCurrency size={'3em'} />}
        />
      </SimpleGrid>

      <Box maxW='7xl' mx={'auto'} mt={10}>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Investimento</Th>
                <Th>Data Encerramento Investimento</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invests.map((invest) => (
                <Tr key={invest?.id}>
                  <Td>{formatCurrency(invest?.invest)}</Td>
                  <Td>{moment(invest?.due_date).format('DD/MM/yyyy')}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        modalListInvests.onOpen;
                        handleOpenModal(invest.id);
                      }}
                      isLoading={loading}
                      loadingText='Carregando...'
                    >
                      Ver Bonus
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={modalListInvests.isOpen} onClose={modalListInvests.onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes de Bônus</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Valor</Th>

                    <Th>Data de Pagamento</Th>
                    <Th>Ação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bonuses.map((invest) => (
                    <Tr key={invest.id}>
                      <Td>{formatCurrency(invest.amount)}</Td>
                      <Td>{moment(invest.payment_date).format('DD/MM/yyyy')}</Td>
                      <Td>
                        <Button
                          isDisabled={invest.paid_out}
                          onClick={() => {
                            handleSendRequestWithdraw(invest);
                          }}
                        >
                          {invest.paid_out ? 'Já Pago' : 'Solicitar Saque'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={modalListInvests.onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={modalInvest.isOpen} onClose={modalInvest.onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Investir Agora</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StatsCard
              title={'Saldo'}
              stat={userdata?.balance ? formatCurrency(userdata?.balance) : formatCurrency(0)}
              icon={<GrCurrency size={'3em'} />}
            />
            {userdata?.balance <= 0 && (
              <Flex my={5} flexDirection='column'>
                <Alert status='warning' flexDirection='column'>
                  <AlertIcon />
                  <AlertTitle mr={2}>Opa!</AlertTitle>
                  <AlertDescription>
                    Parece que você não tem saldo suficiente, deseja depositar?
                  </AlertDescription>
                </Alert>
                <Flex my={5} direction='column'>
                  <Button as={RDLink} to='/deposit'>
                    Adicionar saldo
                  </Button>
                </Flex>
              </Flex>
            )}

            <Flex my={5}>
              <CurrencyInput
                style={{
                  width: '100%',
                  height: '50px',
                  borderWidth: '1px',
                  borderRadius: '5px',
                  padding: 10,
                }}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                name='amount'
                placeholder='Digite o valor do investimento'
                defaultValue={0}
                decimalsLimit={2}
                decimalSeparator=','
                groupSeparator='.'
                maxLength={userdata?.balance}
                onValueChange={(value) => setInvestAmount(value)}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={!investAmount}
              colorScheme='teal'
              mr={3}
              onClick={dialogInvest.onOpen}
            >
              Investir
            </Button>
            <Button colorScheme='blue' mr={3} onClick={modalInvest.onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={dialogInvest.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={dialogInvest.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirmar Investimento
            </AlertDialogHeader>

            <AlertDialogBody>Você deseja confirmar o investimento?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={dialogInvest.onClose}>
                Não
              </Button>
              <Button colorScheme='blue' onClick={dialogInvest.onClose} ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
