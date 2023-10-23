import { AlertColor, Avatar, Box, Button, Snackbar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoading } from '@/hooks/useLoading';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import * as React from 'react';
import { useSnackBar } from '@/hooks/useSnackBar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
interface SignInFormData {
  email: string;
  password: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
export default function Login() {
  const formSchema = yup.object().shape({
    email: yup.string().required('Este campo é obrigatório').email('E-mail inválido'),
    password: yup.string().required('Este campo é obrigatório'),
  });

  const { loading } = useLoading();

  const { signIn } = useAuth();
  const { handleSubmit, formState, control } = useForm<SignInFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(formSchema),
  });
  const { errors } = formState;
  const handleSignIn = async (values: SignInFormData) => {
    if (!loading) await signIn(values);
  };

  const isAlertColor = (value: string): value is AlertColor =>
    value === 'error' || value === 'warning' || value === 'info' || value === 'success';

  const { snackBar, type, setError, message } = useSnackBar();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickable') {
      return;
    }

    setError(false);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgColor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
        <Input
          margin='normal'
          required
          fullWidth
          id='email'
          autoComplete='email'
          name='email'
          // @ts-ignore
          control={control}
          placeholder='Email'
          autoCapitalize='none'
          errors={errors.email && errors.email.message}
          label={'Email'}
        />
        <Input
          margin='normal'
          required
          fullWidth
          name='password'
          type='password'
          id='password'
          autoComplete='current-password'
          // @ts-ignore
          control={control}
          placeholder='Senha'
          errors={errors.password && errors.password.message}
          label={'Senha'}
        />
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Entrar
        </Button>
      </Box>
      <Snackbar
        open={snackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {isAlertColor(type) ? (
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            {message}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
