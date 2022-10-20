import { useLoading } from '@/hooks/useLoading';
import api from '@/services';
import { formatCurrency } from '@/utils';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

interface Transactions {
  id: string;
  invest: number;
  withdrawals: number;
  referralBonus: number;
}

export default function Deposit() {
  const toast = useToast();
  const { setLoading, loading } = useLoading();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [bonuses, setBonuses] = useState([]);
  const [invests, setInvests] = useState([]);

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

  const handleOpenModal = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await api
          .get(`/invest/${id}`)
          .then((res) => {
            setBonuses(res.data);
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
        onOpen();
      }
    },
    [onOpen, setLoading, toast],
  );

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
  }, [getInvests, getTransactions]);

  return (
    <Box maxW='7xl' mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Box mt={5} mb={5}>
        <Button onClick={onOpen} isLoading={loading} loadingText='Carregando...'>
          Depositar
        </Button>
      </Box>
      <Box maxW='7xl' mx={'auto'} mt={10}>
        <Box mt={5} mb={5}>
          <Text>Meus Depósitos</Text>
        </Box>
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
                  <Td></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
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
                            onOpen;
                            handleOpenModal(invest.id);
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
