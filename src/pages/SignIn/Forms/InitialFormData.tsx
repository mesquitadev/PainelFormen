import {
  Center,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react';
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

export const TextAtencao = () => (
  <Stack py={5}>
    <Text>Atenção!</Text>
    <OrderedList spacing={2} pl={5}>
      <ListItem>
        Caso você queira salvar as suas respostas e continuar depois, clique na opção salvar minhas
        respostas e continuar mais tarde. É necessário fazer isso todas as vezes que você deixar
        este formulário no meio! Não se esqueça.
      </ListItem>
      <ListItem>
        Caso queira continuar de onde parou, clique na opção retornar a um formulário previamente
        salvo.
      </ListItem>
    </OrderedList>
  </Stack>
);

export const TextCadastroInicial = () => (
  <>
    <Text fontSize='3xl' align='center'>
      Cadastro Inicial
    </Text>
    <TextAtencao />
    <Stack py={2}>
      <Text>
        Nesta etapa, te solicitaremos informações básicas de contato e de autoidentificação. Fique à
        vontade para responder às perguntas, e se não se sentir confortável em responder a alguma
        delas, pode preencher a opção não me sinto confortável.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Nós valorizamos muito as contribuições de pessoas de origens diversas, com pontos de vista
        diferentes, que buscam encontrar as melhores soluções a partir da perspectiva do outro, que
        são de diferentes religiões, países, regiões, orientações sexuais, gênero, raça/cor e
        origens sociais. Encorajamos pessoas de todos os backgrounds para se inscreverem nessa
        oportunidade.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Informações pessoais pertencentes à raça, etnia e / ou orientação sexual de um indivíduo são
        consideradas categorias confidenciais de informações pessoais para o Instituto Four. Estes
        dados serão utilizados apenas de forma agregada - isto é, para entender características
        gerais da base de interessados em participar do ProLíder -, jamais de forma individual.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Quando você disponibiliza estes dados, você consente com a análise agregada das suas
        informações para que o Instituto Four possa mapear tendências demográficas, psicográficas e
        comportamentais da sua base de jovens.
      </Text>
    </Stack>
  </>
);
export const TextPasso1 = () => (
  <>
    <Text fontSize='3xl' align='center'>
      Histórico Acadêmico
    </Text>
    <TextAtencao />
    <Stack py={2}>
      <Text>
        Nesta etapa, te solicitaremos informações sobre o seu histórico acadêmico. Você pode inserir
        quantas experiências de ensino desejar.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Caso você nos sinalize que já frequentou alguma instituição de ensino superior, verá que uma
        janela solicitando que você nos documente esta experiência vai aparecer. Se desejar
        adicionar outra, pode clicar na opção adicionar outra resposta e incluir mais informações.
        Você pode fazer isso quantas vezes quiser.
      </Text>
    </Stack>
  </>
);
export const TextPasso3 = () => (
  <>
    <Stack py={6}>
      <Center>
        <Heading size={'md'}>FORMULÁRIO STAR (SITUAÇÃO - TAREFA - AÇÃO - RESULTADO)</Heading>
      </Center>
      <TextAtencao />
      <Text>
        Quais foram as situações, na sua vida, em que você acredita que conseguiu solucionar
        problemas de uma maneira que te deu orgulho? Esta etapa serve para que você nos fale sobre
        isso e nos ajude a entender como você enfrenta problemas no dia-a-dia.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        A metodologia STAR é uma forma de contar uma história. Primeiramente, você deve descrever
        uma Situação pela qual estava passando, onde tenha resolvido algum tipo de problema. Você
        vai apresentar qual era a sua Tarefa, ou seja, qual era a sua função dentro daquela
        situação. Na Ação, você deve descrever como você desempenhou seu papel. E por fim,
        descreverá quais foram os Resultados alcançados.
      </Text>
    </Stack>
  </>
);
export const TextPasso4 = () => (
  <>
    <Stack py={6}>
      <Center>
        <Heading size={'md'}>HISTÓRICO PROFISSIONAL</Heading>
      </Center>
      <TextAtencao />
      <Text>
        Da mesma forma como na etapa passada, te solicitamos informações sobre o seu histórico -
        desta vez, o profissional. Você pode inserir quantas experiências de ensino desejar.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Caso você nos sinalize que já teve alguma experiência de trabalho, verá que uma janela
        solicitando que você nos documente esta experiência vai aparecer. Se desejar adicionar
        outra, pode clicar na opção adicionar outra resposta e incluir mais informações. Você pode
        fazer isso quantas vezes quiser.
      </Text>
    </Stack>
  </>
);
export const TextPasso6 = () => (
  <>
    <Center>
      <Heading size={'md'}>VIDEO DE APRESENTAÇÃO</Heading>
    </Center>
    <TextAtencao />
    <Stack py={2}>
      <Text>
        Qual é a sua história? Quais são as suas ambições para o futuro? Como você acredita que o
        ProLíder se conecta com ele, isto é, como acredita que a sua participação no programa será
        diferencial para que você chegue mais longe?
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Neste vídeo, você terá a oportunidade de contar, para nós, a sua história e os seus sonhos
        de maneira resumida. Queremos te conhecer e entender mais sobre a sua essência e quem é
        você.
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>
        Sabemos que é um processo desafiador, mas, para nós, é de extrema importância. Não se
        preocupe em fazer um vídeo editado ou com uma câmera de qualidade. Pode fazer com os
        recursos que tiver à disposição!
      </Text>
    </Stack>
    <Stack py={2}>
      <Text>O ENVIO DO VÍDEO É OBRIGATÓRIO PARA O PROSSEGUIMENTO NO PROCESSO SELETIVO!</Text>
    </Stack>

    <Stack py={5}>
      <Text>
        Acompanhe nossas novidades pelo nosso Instagram! Abraços e boa sorte, Equipe ProLíder :)
      </Text>
    </Stack>
    <Stack py={4}>
      <Link target='_blank' href='https://www.instagram.com/prolideroficial/'>
        Instagram
      </Link>
    </Stack>
  </>
);
