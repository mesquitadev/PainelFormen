import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { useCallback, useEffect, useState } from 'react';
import logo from '@/assets/images/logo.png';
// import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { useLoading } from '@/hooks/useLoading';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import {
  InitialFormData,
  TextCadastroInicial,
  TextPasso1,
  TextPasso4,
  TextPasso3,
  TextPasso6,
} from './Forms/InitialFormData';
import Input from '@/components/Input';
import api from '@/services';
import Select from '@/components/Select';
import { Select as CSelect } from 'chakra-react-select';
import {
  xpOptions,
  steps,
  degreeOptions,
  genderIdentityOptions,
  breedOptions,
  genderOptions,
  didYouMeetProLider,
} from './options';

interface SignInFormData {
  name: string;
  surname: string;
  birthdate: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  genderIdentity: string;
  linkedinUrl: string;
  breed: string;
  stateOfBirth: string;
  gender: string;
  countryOfBirth: string;
  phone1: string;
  phone2: string;
  state: string;
  city: string;
  educationLevel: string;
  peopleLiveInSameHouse: string;
  didYouMeetProLider: string;
  videoUrl: string;
  educationData: [];
  workData: [];
  star: [];
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
      .then(() => setLoading(true))
      .catch((response) => console.log(response))
      .finally(() => setLoading(false));
  };
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleSelectExp = (value: string) => {
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
  const handleSelectWorkExp = (value: string) => {
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
            <Box
              as='form'
              onSubmit={
                // @ts-ignore
                handleSubmit(handleSignIn)
              }
            >
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
                    errors={errors.phone2 && errors.phone2.message}
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
                    options={genderOptions}
                    name='gender'
                    label='Como você descreve a sua orientação sexual?'
                  />

                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={genderIdentityOptions}
                    name='genderIdentity'
                    label='Qual é a sua identidade de gênero?'
                  />

                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={breedOptions}
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
                    name='occupation'
                    control={control}
                    autoCapitalize='none'
                    errors={errors.password && errors.password.message}
                    label={'Qual é a sua ocupação hoje?'}
                  />
                  <Select
                    errors={errors.stateOfBirth && errors.stateOfBirth.message}
                    control={control}
                    options={didYouMeetProLider}
                    name='didYouMeetProLider'
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
                      {educationDataFields.map((_item: any, i) => (
                        <Box key={i}>
                          <>
                            <Stack spacing={4} divider={<StackDivider />}>
                              <Heading size={'md'}>{`Experiência ${i + 1} `}</Heading>
                            </Stack>
                            <Stack spacing='4'>
                              <Select
                                errors={errors.countryOfBirth && errors.countryOfBirth.message}
                                control={control}
                                options={countries}
                                name={`educationData[${i}].country`}
                                label={'País'}
                              />

                              <Select
                                errors={errors.stateOfBirth && errors.stateOfBirth.message}
                                control={control}
                                options={states}
                                name={`educationData[${i}].state`}
                                label={'Estado'}
                              />

                              <Select
                                errors={errors.stateOfBirth && errors.stateOfBirth.message}
                                control={control}
                                options={degreeOptions}
                                name={`educationData[${i}].degree`}
                                label={'Nível do curso (Técnico, Médio, Superior, Tecnólogo, etc.'}
                              />

                              <Input
                                name={`educationData[${i}].course`}
                                control={control}
                                autoCapitalize='words'
                                errors={errors.name && errors.name.message}
                                label={'Curso'}
                              />
                              <Input
                                name={`educationData[${i}].institution`}
                                control={control}
                                autoCapitalize='words'
                                errors={errors.name && errors.name.message}
                                label={'Instituição'}
                              />
                              <Input
                                name={`educationData[${i}].grantAndAwards`}
                                control={control}
                                errors={errors.name && errors.name.message}
                                label={'Premiações'}
                              />

                              <Input
                                name={`educationData[${i}].initialDate`}
                                control={control}
                                type='date'
                                errors={errors.name && errors.name.message}
                                label={'Início'}
                              />

                              <Input
                                name={`educationData[${i}].endDate`}
                                control={control}
                                type='date'
                                errors={errors.name && errors.name.message}
                                label={'Término'}
                              />

                              <Select
                                errors={errors.studyingHere && errors.studyingHere.message}
                                control={control}
                                options={xpOptions}
                                name={`educationData[${i}].studyingHere`}
                                label={'Ainda estuda aqui?'}
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
                                        studyingHere: '',
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
                          </>
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
                    {workDataFields.map((_item, i) => (
                      <Box key={i}>
                        <Stack spacing={4} divider={<StackDivider />}>
                          <>
                            <Heading size={'md'}>{`Experiência ${i + 1} `}</Heading>
                          </>
                        </Stack>
                        <Stack spacing='4'>
                          <Select
                            errors={errors.country && errors.country.message}
                            control={control}
                            options={countries}
                            name={`workData[${i}].country`}
                            label={'País'}
                          />

                          <Select
                            errors={errors.state && errors.state.message}
                            control={control}
                            options={states}
                            name={`workData[${i}].state`}
                            label={'Estado'}
                          />

                          <Input
                            name={`workData[${i}].city`}
                            control={control}
                            autoCapitalize='words'
                            errors={errors.name && errors.name.message}
                            label={'Cidade'}
                          />
                          <Input
                            name={`workData[${i}].initialOffice`}
                            control={control}
                            autoCapitalize='words'
                            errors={errors.name && errors.name.message}
                            label={'Cargo Inicial'}
                          />

                          <Input
                            name={`workData[${i}].endOffice`}
                            control={control}
                            autoCapitalize='words'
                            errors={errors.endOffice && errors.endOffice.message}
                            label={'Cargo Final'}
                          />

                          <Input
                            name={`workData[${i}].initialDate`}
                            control={control}
                            type='date'
                            errors={errors.initialDate && errors.initialDate.message}
                            label={'Início'}
                          />

                          <Input
                            name={`workData[${i}].endDate`}
                            control={control}
                            type='date'
                            errors={errors.endDate && errors.endDate.message}
                            label={'Término'}
                          />

                          <Select
                            errors={errors.workingHere && errors.workingHere.message}
                            control={control}
                            options={xpOptions}
                            name={`workData[${i}].workingHere`}
                            label={'Ainda trabalha aqui?'}
                          />

                          <Input
                            name={`workData[${i}].organization`}
                            control={control}
                            errors={errors.organization && errors.organization.message}
                            label={'Organização'}
                          />

                          <Input
                            name={`workData[${i}].industryType`}
                            control={control}
                            errors={errors.industryType && errors.industryType.message}
                            label={'Tipo de Industria'}
                          />

                          <Input
                            name={`workData[${i}].activities`}
                            control={control}
                            errors={errors.activities && errors.activities.message}
                            label={'Descrição dos trabalhos realizados'}
                          />

                          <Select
                            errors={errors.grantAndAwards && errors.grantAndAwards.message}
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
                            errors={errors.coFounder && errors.coFounder.message}
                            control={control}
                            options={xpOptions}
                            name={`workData[${i}].coFounder`}
                            label={'Você é co-fundador dessa organizacao?'}
                          />

                          <Select
                            errors={errors.managedByFamily && errors.managedByFamily.message}
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
                                    workingHere: '',
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
                              action: '',
                              result: '',
                            })
                          }
                          size='sm'
                        >
                          Adicionar Situação
                        </Button>
                      </Flex>
                    </Flex>
                    {starFields.map((_item: any, i) => (
                      <Card key={i} variant='filled' py={5} mb={10}>
                        <CardHeader>
                          <>
                            <Heading size={'md'}>{`Experiência ${i + 1} `}</Heading>
                          </>
                        </CardHeader>
                        <CardBody>
                          <Input
                            textArea
                            name={`star[${i}].situation`}
                            control={control}
                            errors={errors.situation && errors.situation.message}
                            label={'Situação'}
                          />
                          <Input
                            textArea
                            name={`star[${i}].action`}
                            control={control}
                            errors={errors.action && errors.action.message}
                            label={'Ação'}
                          />
                          <Input
                            textArea
                            name={`star[${i}].task`}
                            control={control}
                            errors={errors.task && errors.task.message}
                            label={'Tarefa'}
                          />
                          <Input
                            textArea
                            name={`star[${i}].result`}
                            control={control}
                            errors={errors.result && errors.result.message}
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
                      Confirmar Inscrição
                    </Button>
                  </Center>
                </Step>
              </Steps>
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
