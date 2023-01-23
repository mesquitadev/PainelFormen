import { Link, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/all';
import React from 'react';

export const InitialFormData = () => {
  return (
    <>
      <Stack py={5}>
        <Text fontSize='3xl' align='center'>
          Boas-vindas ao Processo de Inscrições do Programa ProLíder 2023!
        </Text>
      </Stack>
      <Stack py={5}>
        <Text>
          A sua inscrição para nós é muito importante. Agradecemos o seu interesse em fazer parte da
          rede do programa, somar forças e criar coisas grandes, que contribuirão para um Brasil
          melhor.
        </Text>
      </Stack>
      <Stack py={5}>
        <Text>
          Esta é a primeira etapa do Processo Seletivo. Aqui, você irá nos passar informações
          básicas de cadastro, histórico acadêmico e profissional, e irá nos mostrar um pouco mais
          sobre a sua motivação para participação no ProLíder. Estes dados serão utilizados
          posteriormente, em caso de sua aprovação no programa.
        </Text>
      </Stack>
      <Stack py={5}>
        <Text>Confira o nosso vídeo de boas-vindas ao Processo Seletivo:</Text>
      </Stack>
      <Stack py={5}>
        <Text>
          Ao longo do processo, será solicitado que você faça o pagamento da sua taxa de inscrição.
          Este pagamento é importante para a sustentabilidade do Instituto Four e para a sua
          continuação no Processo Seletivo. Caso você não tenha condições de realizar o pagamento,
          poderá solicitar uma taxa de isenção.
        </Text>
      </Stack>
      <Stack py={5}>
        <Text fontWeight='fontWeights.bold'>
          Caso tenha qualquer dúvida, estamos totalmente à disposição! Você pode entrar em contato
          conosco em qualquer um dos canais abaixo:
        </Text>
      </Stack>
      <Stack py={5}>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
            Telefone: (33) 98854 - 6292
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
            E-mail: prolider2021@institutofour.org
          </ListItem>
        </List>
      </Stack>
      <Stack py={5}>
        <Text>
          Ao longo das etapas, você também encontrará diversas dicas e informações importantes. Leia
          todas com atenção!
        </Text>
      </Stack>
      <Stack py={5}>
        <Text>
          Caso você queira salvar as suas respostas e continuar depois, clique na opção "salvar
          minhas respostas e continuar mais tarde". É necessário fazer isso todas as vezes que você
          deixar este formulário no meio! Não se esqueça.
        </Text>
      </Stack>
      <Stack py={5}>
        <Text>
          Acompanhe nossas novidades pelo nosso Instagram! Abraços e boa sorte, Equipe ProLíder :)
        </Text>
      </Stack>
      <Link target='_blank' href='https://www.instagram.com/prolideroficial/'>
        Instagram
      </Link>
    </>
  );
};
