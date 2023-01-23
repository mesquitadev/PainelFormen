import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  StackDivider,
  Divider,
  Link,
  FormLabel,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card';
import React, { useCallback, useEffect, useState } from 'react';
import logo from '@/assets/images/logo.png';
// import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { useLoading } from '@/hooks/useLoading';
import { useAuth } from '@/hooks/useAuth';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { InitialFormData } from './Forms/InitialFormData';
import Input from '@/components/Input';
import api from '@/services';
import Select from '@/components/Select';
import { Select as CSelect } from 'chakra-react-select';
interface SignInFormData {
  name: string;
  surname: string;
  birthdate: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
}

export default function Login() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [xpOpt, setXpOptions] = useState(false);
  // const signInFormSchema = yup.object().shape({
  //   // email: yup.string().email().required('Este campo é obrigatório').email('E-mail inválido'),
  //   password: yup.string().required('Este campo é obrigatório'),
  // });

  const handleGetAllCountries = useCallback(async () => {
    await api
      .get('/countries')
      .then((response) =>
        setCountries(
          response.data.map((country: any) => ({
            value: country?.value,
            label: country?.value,
          })),
        ),
      )
      .catch((error) => console.log(error));
    await api
      .get('/states')
      .then((response) =>
        setStates(
          response.data.map((state: any) => ({
            value: state?.nome,
            label: state?.nome,
          })),
        ),
      )
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    handleGetAllCountries();
  }, [handleGetAllCountries]);

  const { loading, setLoading } = useLoading();

  const { signIn } = useAuth();

  const { handleSubmit, formState, control } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    // resolver: yupResolver(signInFormSchema),
  });

  const {
    fields: educationDataFields,
    append: educationDataAppend,
    remove: educationDataRemove,
  } = useFieldArray({
    name: 'educationData',
    control,
  });

  const {
    fields: starFields,
    append: starAppend,
    remove: starRemove,
  } = useFieldArray({ control, name: 'star' });

  const {
    fields: workDataFields,
    append: workDataAppend,
    remove: workDataRemove,
  } = useFieldArray({
    name: 'workData',
    control,
  });

  const { errors } = formState;
  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    console.log('val', values);
    await api
      .post('/subscriber', values)
      .then(setLoading(true))
      .catch((response) => console.log(response));
    if (!loading) await signIn(values);
  };
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const steps = [
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
  ];
  const degreeOptions = [
    {
      label: 'Ensino Médio',
      value: 'Ensino Médio',
    },
    {
      label: 'Ensino Técnico',
      value: 'Ensino Técnico',
    },
    {
      label: 'Tecnólogo',
      value: 'Tecnólogo',
    },
    {
      label: 'Bacharelado',
      value: 'Bacharelado',
    },
    {
      label: 'Licenciatura',
      value: 'Licenciatura',
    },
    {
      label: 'Especialização',
      value: 'Especialização',
    },
    {
      label: 'Mestrado',
      value: 'Mestrado',
    },
    {
      label: 'Doutourado',
      value: 'Doutourado',
    },
    {
      label: 'PhD',
      value: 'PhD',
    },

    {
      label: 'MBA',
      value: 'MBA',
    },
  ];
  const xpOptions = [
    {
      label: 'Sim',
      value: true,
    },
    {
      label: 'Não',
      value: false,
    },
  ];
  const handleSelectExp = (value) => {
    setXpOptions(value.value);
    educationDataAppend({
      degree: '',
      institution: '',
      course: '',
      state: '',
      country: '',
      initialDate: '',
      endDate: '',
      grantAndAwards: '',
    });
  };
  const handleSelectWorkExp = (value) => {
    setXpOptions(value.value);
    workDataAppend({
      state: '',
      country: '',
      organization: '',
      initialOffice: '',
      endOffice: '',
      initialDate: '',
      workDescription: '',
      industryType: '',
      activities: '',
      coFounder: '',
      managedByFamiy: '',
      endDate: '',
      grantAndAwards: '',
    });
  };
  const TextAtencao = () => (
    <Stack py={5}>
      <Text>Atenção!</Text>
      <OrderedList spacing={2} pl={5}>
        <ListItem>
          Caso você queira salvar as suas respostas e continuar depois, clique na opção salvar
          minhas respostas e continuar mais tarde. É necessário fazer isso todas as vezes que você
          deixar este formulário no meio! Não se esqueça.
        </ListItem>
        <ListItem>
          Caso você queira salvar as suas respostas e continuar depois, clique na opção salvar
          minhas respostas e continuar mais tarde. É necessário fazer isso todas as vezes que você
          deixar este formulário no meio! Não se esqueça.
        </ListItem>
      </OrderedList>
    </Stack>
  );
  const TextCadastroInicial = () => (
    <>
      <Text fontSize='3xl' align='center'>
        Cadastro Inicial
      </Text>
      <TextAtencao />
      <Stack py={2}>
        <Text>
          Nesta etapa, te solicitaremos informações básicas de contato e de autoidentificação. Fique
          à vontade para responder às perguntas, e se não se sentir confortável em responder a
          alguma delas, pode preencher a opção não me sinto confortável.
        </Text>
      </Stack>
      <Stack py={2}>
        <Text>
          Nós valorizamos muito as contribuições de pessoas de origens diversas, com pontos de vista
          diferentes, que buscam encontrar as melhores soluções a partir da perspectiva do outro,
          que são de diferentes religiões, países, regiões, orientações sexuais, gênero, raça/cor e
          origens sociais. Encorajamos pessoas de todos os backgrounds para se inscreverem nessa
          oportunidade.
        </Text>
      </Stack>
      <Stack py={2}>
        <Text>
          Informações pessoais pertencentes à raça, etnia e / ou orientação sexual de um indivíduo
          são consideradas categorias confidenciais de informações pessoais para o Instituto Four.
          Estes dados serão utilizados apenas de forma agregada - isto é, para entender
          características gerais da base de interessados em participar do ProLíder -, jamais de
          forma individual.
        </Text>
      </Stack>
      <Stack py={2}>
        <Text>
          Quando você disponibiliza estes dados, você consente com a análise agregada das suas
          informações para que o Instituto Four possa mapear tendências demográficas, psicográficas
          e comportamentais da sua base de jovens.
        </Text>
      </Stack>
    </>
  );
  const TextPasso1 = () => (
    <>
      <Text fontSize='3xl' align='center'>
        Histórico Acadêmico
      </Text>
      <TextAtencao />
      <Stack py={2}>
        <Text>
          Nesta etapa, te solicitaremos informações sobre o seu histórico acadêmico. Você pode
          inserir quantas experiências de ensino desejar.
        </Text>
      </Stack>
      <Stack py={2}>
        <Text>
          Caso você nos sinalize que já frequentou alguma instituição de ensino superior, verá que
          uma janela solicitando que você nos documente esta experiência vai aparecer. Se desejar
          adicionar outra, pode clicar na opção adicionar outra resposta e incluir mais informações.
          Você pode fazer isso quantas vezes quiser.
        </Text>
      </Stack>
    </>
  );
  const TextPasso3 = () => (
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
  const TextPasso4 = () => (
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
          outra, pode clicar na opção "adicionar outra resposta" e incluir mais informações. Você
          pode fazer isso quantas vezes quiser.
        </Text>
      </Stack>
    </>
  );
  const TextPasso6 = () => (
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
            <Flex pb={6} width='100%' justify={'flex-end'}>
              <Flex>
                <Button size='sm'>Retomar a um formulário previamente salvo.</Button>
              </Flex>
            </Flex>
            <Box as='form' onSubmit={handleSubmit(handleSignIn)}>
              <Steps activeStep={activeStep}>
                <Step key={0} index={0}>
                  <InitialFormData />
                </Step>
                <Step key={1} index={1}>
                  <TextCadastroInicial />
                  <Input
                    name='name'
                    control={control}
                    placeholder='Nome'
                    autoCapitalize='words'
                    errors={errors.name && errors.name.message}
                    label={'Nome'}
                  />
                  <Input
                    name='surname'
                    control={control}
                    placeholder='Sobrenome'
                    autoCapitalize='words'
                    errors={errors.surname && errors.surname.message}
                    label={'Sobrenome'}
                  />
                  <Input
                    mask='***********-*'
                    name='rg'
                    control={control}
                    placeholder='RG'
                    autoCapitalize='none'
                    errors={errors.email && errors.email.message}
                    label={'RG'}
                  />
                  <Input
                    mask='***.***.***-**'
                    name='cpf'
                    control={control}
                    placeholder='CPF'
                    autoCapitalize='none'
                    errors={errors.email && errors.email.message}
                    label={'CPF'}
                  />

                  <Input
                    name='email'
                    control={control}
                    placeholder='Email'
                    autoCapitalize='none'
                    errors={errors.email && errors.email.message}
                    label={'Email'}
                  />

                  <Input
                    type={'password'}
                    name='password'
                    control={control}
                    autoCapitalize='none'
                    errors={errors.email && errors.email.message}
                    label={'Senha'}
                  />

                  <Input
                    mask='(**) *****-****'
                    name='phone1'
                    control={control}
                    placeholder='Telefone'
                    autoCapitalize='none'
                    errors={errors.email && errors.email.message}
                    label={'Telefone (Whatsapp)'}
                  />
                  <Input
                    mask='(**) *****-****'
                    name='phone2'
                    control={control}
                    placeholder='Telefone'
                    autoCapitalize='none'
                    label={'Outro Telefone'}
                  />

                  <Input
                    name='linkedinUrl'
                    control={control}
                    placeholder='LinkedIn'
                    autoCapitalize='none'
                    errors={errors.email && errors.email.message}
                    label={'Cole aqui o link do seu LinkedIn'}
                  />

                  <Select
                    errors={errors.countryOfBirth && errors.countryOfBirth.message}
                    control={control}
                    options={countries}
                    name='countryOfBirth'
                    label={'Em qual pais você nasceu?'}
                  />

                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={states}
                    name='stateOfBirth'
                    label='Em qual estado você nasceu?'
                  />

                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={[
                      {
                        value: 'Heterossexual',
                        label: 'Heterossexual',
                      },
                      {
                        value: 'Homossexual',
                        label: 'Homossexual',
                      },
                      {
                        value: 'Assexual',
                        label: 'Assexual',
                      },
                      {
                        value: 'Bissexual',
                        label: 'Bissexual',
                      },
                      {
                        value: 'Queer',
                        label: 'Queer',
                      },
                      {
                        value: 'Omnissexual',
                        label: 'Omnissexual',
                      },
                      {
                        value: 'Panssexual',
                        label: 'Panssexual',
                      },
                      {
                        value: 'Prefiro não responder',
                        label: 'Prefiro não responder',
                      },
                    ]}
                    name='gender'
                    label='Como você descreve a sua orientação sexual?'
                  />

                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={[
                      {
                        value: 'Genero Fluido',
                        label: 'Genero Fluido',
                      },
                      {
                        value: 'Homem Cis',
                        label: 'Homem Cis',
                      },
                      {
                        value: 'Homem Trans',
                        label: 'Homem Trans',
                      },
                      {
                        value: 'Mulher Cis',
                        label: 'Mulher Cis',
                      },
                      {
                        value: 'Mulher Trans',
                        label: 'Mulher Trans',
                      },
                      {
                        value: 'Não Binário',
                        label: 'Não Binário',
                      },
                      {
                        value: 'Prefiro não responder',
                        label: 'Prefiro não responder',
                      },
                    ]}
                    name='genderIdentity'
                    label='Qual é a sua identidade de gênero?'
                  />

                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={[
                      {
                        value: 'Amarela',
                        label: 'Amarela',
                      },
                      {
                        value: 'Branca',
                        label: 'Branca',
                      },
                      {
                        value: 'Indigena',
                        label: 'Indigena',
                      },
                      {
                        value: 'Preta',
                        label: 'Preta',
                      },
                      {
                        value: 'Parda',
                        label: 'Parda',
                      },
                      {
                        value: 'Prefiro não responder',
                        label: 'Prefiro não responder',
                      },
                    ]}
                    name='breed'
                    label='Com qual cor/raça você se identifica?'
                  />

                  <Input
                    name='peopleLiveInSameHouse'
                    control={control}
                    type='number'
                    errors={errors.email && errors.email.message}
                    label={
                      'Qual é o tamanho do seu núcleo familiar (Pessoas que moram na mesma casa que você?)'
                    }
                  />
                  <Input
                    name='didYouMeetProLider'
                    control={control}
                    errors={errors.email && errors.email.message}
                    label={'Como você conheceu o ProLíder?'}
                  />
                </Step>
                <Step key={2} index={2}>
                  <TextPasso1 />
                  <FormControl py={6}>
                    <FormLabel _invalid={{ color: 'negative.pure !important' }}>
                      Você já frequentou alguma instituição de ensino superior?
                    </FormLabel>
                    <CSelect
                      placeholder='Você já frequentou alguma instituição de ensino superior?'
                      onChange={(e) => handleSelectExp(e)}
                      options={xpOptions}
                    />
                  </FormControl>
                  {xpOpt && (
                    <>
                      {educationDataFields.map((item, i) => (
                        <Box key={i}>
                          <Stack spacing={4} divider={<StackDivider />}>
                            <Heading size={'md'}>{`Experiência ${i + 1} `}</Heading>
                          </Stack>
                          <Stack spacing='4'>
                            <Select
                              defaultValue={item?.country}
                              errors={errors.countryOfBirth && errors.countryOfBirth.message}
                              control={control}
                              options={countries}
                              name={`educationData[${i}].country`}
                              label={'País'}
                            />

                            <Select
                              defaultValue={item?.state}
                              errors={errors.stateOfBirth && errors.stateOfBirth.message}
                              control={control}
                              options={states}
                              name={`educationData[${i}].state`}
                              label={'Estado'}
                            />

                            <Select
                              defaultValue={item?.degree}
                              errors={errors.stateOfBirth && errors.stateOfBirth.message}
                              control={control}
                              options={degreeOptions}
                              name={`educationData[${i}].degree`}
                              label={'Nível do curso (Técnico, Médio, Superior, Tecnólogo, etc.'}
                            />

                            <Input
                              defaultValue={item?.course}
                              name={`educationData[${i}].course`}
                              control={control}
                              autoCapitalize='words'
                              errors={errors.name && errors.name.message}
                              label={'Curso'}
                            />
                            <Input
                              defaultValue={item?.institution}
                              name={`educationData[${i}].institution`}
                              control={control}
                              autoCapitalize='words'
                              errors={errors.name && errors.name.message}
                              label={'Instituição'}
                            />
                            <Input
                              defaultValue={item?.grantAndAwards}
                              name={`educationData[${i}].grantAndAwards`}
                              control={control}
                              errors={errors.name && errors.name.message}
                              label={'Premiações'}
                            />

                            <Input
                              defaultValue={item?.initialDate}
                              name={`educationData[${i}].initialDate`}
                              control={control}
                              type='date'
                              errors={errors.name && errors.name.message}
                              label={'Início'}
                            />

                            <Input
                              defaultValue={item?.endDate}
                              name={`educationData[${i}].endDate`}
                              control={control}
                              type='date'
                              errors={errors.name && errors.name.message}
                              label={'Término'}
                            />

                            <Divider />
                            <Flex py={6} width='100%' justify={'space-between'}>
                              <Flex>
                                <Button
                                  onClick={() =>
                                    educationDataAppend({
                                      degree: '',
                                      institution: '',
                                      course: '',
                                      state: '',
                                      country: '',
                                      initialDate: '',
                                      endDate: '',
                                      grantAndAwards: '',
                                    })
                                  }
                                  size='sm'
                                >
                                  Adicionar Experiencia
                                </Button>
                              </Flex>
                              <Flex>
                                <Button onClick={() => educationDataRemove(i)} mr={4} size='sm'>
                                  Remover
                                </Button>
                              </Flex>
                            </Flex>
                          </Stack>
                        </Box>
                      ))}
                    </>
                  )}
                </Step>
                <Step key={3} index={3}>
                  <TextPasso4 />
                  <>
                    <FormControl py={6}>
                      <FormLabel _invalid={{ color: 'negative.pure !important' }}>
                        Você já teve alguma experiência profissional?
                      </FormLabel>
                      <CSelect
                        placeholder='Você já frequentou alguma instituição de ensino superior?'
                        onChange={(e) => handleSelectWorkExp(e)}
                        options={xpOptions}
                      />
                    </FormControl>
                    {workDataFields.map((item, i) => (
                      <Box key={i}>
                        <Stack spacing={4} divider={<StackDivider />}>
                          <Heading size={'md'}>{`Experiência ${i + 1} `}</Heading>
                        </Stack>
                        <Stack spacing='4'>
                          <Select
                            defaultValue={item?.country}
                            errors={errors.country && errors.country.message}
                            control={control}
                            options={countries}
                            name={`workData[${i}].country`}
                            label={'País'}
                          />

                          <Select
                            defaultValue={item?.state}
                            errors={errors.state && errors.state.message}
                            control={control}
                            options={states}
                            name={`workData[${i}].state`}
                            label={'Estado'}
                          />

                          <Input
                            defaultValue={item?.city}
                            name={`workData[${i}].city`}
                            control={control}
                            autoCapitalize='words'
                            errors={errors.name && errors.name.message}
                            label={'Cidade'}
                          />
                          <Input
                            defaultValue={item?.initialOffice}
                            name={`workData[${i}].initialOffice`}
                            control={control}
                            autoCapitalize='words'
                            errors={errors.name && errors.name.message}
                            label={'Cargo Inicial'}
                          />

                          <Input
                            defaultValue={item?.endOffice}
                            name={`workData[${i}].endOffice`}
                            control={control}
                            autoCapitalize='words'
                            errors={errors.endOffice && errors.name.message}
                            label={'Cargo Final'}
                          />

                          <Input
                            defaultValue={item?.initialDate}
                            name={`workData[${i}].initialDate`}
                            control={control}
                            type='date'
                            errors={errors.name && errors.name.message}
                            label={'Início'}
                          />

                          <Input
                            defaultValue={item?.endDate}
                            name={`workData[${i}].endDate`}
                            control={control}
                            type='date'
                            errors={errors.name && errors.name.message}
                            label={'Término'}
                          />

                          <Input
                            defaultValue={item?.organization}
                            name={`workData[${i}].organization`}
                            control={control}
                            errors={errors.name && errors.name.message}
                            label={'Organização'}
                          />

                          <Input
                            defaultValue={item?.industryType}
                            name={`workData[${i}].industryType`}
                            control={control}
                            errors={errors.industryType && errors.industryType.message}
                            label={'Tipo de Industria'}
                          />

                          <Input
                            defaultValue={item?.activities}
                            name={`workData[${i}].activities`}
                            control={control}
                            errors={errors.activities && errors.activities.message}
                            label={'Descrição dos trabalhos realizados'}
                          />

                          <Select
                            defaultValue={item?.grantAndAwards}
                            errors={errors.state && errors.grantAndAwards.message}
                            control={control}
                            options={[
                              {
                                value: 'Remunerado',
                                label: 'Remunerado',
                              },
                              {
                                value: 'Voluntário',
                                label: 'Voluntário',
                              },
                            ]}
                            name={`workData[${i}].grantAndAwards`}
                            label={'Este emprego/trabalho era remunerado ou voluntário?'}
                          />

                          <Select
                            defaultValue={item?.coFounder}
                            errors={errors.state && errors.coFounder.message}
                            control={control}
                            options={xpOptions}
                            name={`workData[${i}].coFounder`}
                            label={'Você é co-fundador dessa organizacao?'}
                          />

                          <Select
                            defaultValue={item?.managedByFamily}
                            errors={errors.state && errors.managedByFamily.message}
                            control={control}
                            options={xpOptions}
                            name={`workData[${i}].managedByFamily`}
                            label={'Essa organização é gerida por algum familiar?'}
                          />

                          <Divider />
                          <Flex py={6} width='100%' justify={'space-between'}>
                            <Flex>
                              <Button
                                onClick={() =>
                                  workDataAppend({
                                    state: '',
                                    country: '',
                                    organization: '',
                                    initialOffice: '',
                                    endOffice: '',
                                    initialDate: '',
                                    workDescription: '',
                                    industryType: '',
                                    activities: '',
                                    coFounder: '',
                                    managedByFamiy: '',
                                    endDate: '',
                                    grantAndAwards: '',
                                  })
                                }
                                size='sm'
                              >
                                Adicionar Experiencia
                              </Button>
                            </Flex>
                            <Flex>
                              <Button onClick={() => workDataRemove(i)} mr={4} size='sm'>
                                Remover
                              </Button>
                            </Flex>
                          </Flex>
                        </Stack>
                      </Box>
                    ))}
                  </>
                </Step>
                <Step key={4} index={4}>
                  <>
                    <TextPasso3 />
                    <Flex py={6} width='100%' justify={'space-between'}>
                      <Flex>
                        <Button
                          onClick={() =>
                            starAppend({
                              situation: '',
                              task: '',
                              result: '',
                            })
                          }
                          size='sm'
                        >
                          Adicionar Situação
                        </Button>
                      </Flex>
                    </Flex>
                    {starFields.map((item, i) => (
                      <Card key={i} variant='filled' py={5} mb={10}>
                        <CardHeader>
                          <Heading size={'md'}>{`Experiência ${i + 1} `}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Input
                            textArea
                            defaultValue={item?.situation}
                            name={`star[${i}].situation`}
                            control={control}
                            errors={errors.name && errors.name.message}
                            label={'Situação'}
                          />
                          <Input
                            textArea
                            defaultValue={item?.task}
                            name={`star[${i}].task`}
                            control={control}
                            errors={errors.name && errors.name.message}
                            label={'Tarefa'}
                          />
                          <Input
                            textArea
                            defaultValue={item?.result}
                            name={`star[${i}].result`}
                            control={control}
                            errors={errors.name && errors.name.message}
                            label={'Resultado'}
                          />
                        </CardBody>
                        <Stack spacing='4'>
                          <Flex py={6} width='100%' justify={'space-between'}>
                            <Flex>
                              <Button onClick={() => starRemove(i)} mr={4} size='sm'>
                                Remover
                              </Button>
                            </Flex>
                          </Flex>
                        </Stack>
                      </Card>
                    ))}
                  </>
                </Step>
                <Step key={5} index={5}>
                  <TextPasso6 />
                  <Stack py={6}>
                    <Stack>
                      <Text>
                        O seu vídeo seu de até dois minutos contando a sua história e seus sonhos de
                        maneira resumida. Lembrando que os vídeos só serão avaliados caso tenhamos
                        acesso, ou seja, vídeos que tiverem com a configuração privada, serão
                        automaticamente reprovados no Processo Seletivo.
                      </Text>
                      <Stack py={2}>
                        <Text>
                          O ENVIO DO VÍDEO É OBRIGATÓRIO PARA O PROSSEGUIMENTO NO PROCESSO SELETIVO!
                        </Text>
                      </Stack>
                    </Stack>
                    <Input
                      name='videoUrl'
                      control={control}
                      errors={errors.videoUrl && errors.videoUrl.message}
                      label={'Link do Video do Youtube'}
                    />
                  </Stack>
                </Step>
              </Steps>
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
            </Box>

            {activeStep === steps.length ? (
              <Flex px={4} py={4} width='100%' flexDirection='column'>
                <Heading fontSize='xl' textAlign='center'>
                  Woohoo! All steps completed!
                </Heading>
                <Button mx='auto' mt={6} size='sm' onClick={reset}>
                  Reset
                </Button>
              </Flex>
            ) : (
              <Flex pt={6} width='100%' justify={activeStep > 0 ? 'space-between' : 'flex-end'}>
                {activeStep > 0 && (
                  <Flex>
                    <Button size='sm'>Salvar minhas respostas e continuar mais tarde</Button>
                  </Flex>
                )}
                <Flex>
                  <Button
                    isDisabled={activeStep === 0}
                    mr={4}
                    onClick={prevStep}
                    size='sm'
                    variant='ghost'
                  >
                    Voltar
                  </Button>
                  <Button size='sm' onClick={nextStep}>
                    {activeStep === steps.length - 1 ? 'Finalizar Inscrição' : 'Próximo'}
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
}
