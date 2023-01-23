import { createContext, ReactNode, useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import api from '@/services';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@chakra-ui/react';

interface User {
  email?: string;
  password?: string;
}

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  token: string;

  signIn(credentials: SignInCredentials): Promise<void>;

  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setLoading } = useLoading();
  const toast = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('positivo.token');

    if (token) {
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: User) => {
      setLoading(true);
      try {
        const response = await api.post('auth/login', {
          email,
          password,
        });

        const { token } = response.data;
        Cookies.set('positivo.token', response.data.token, { expires: 7 });
        setData({ token });
      } catch (err) {
        toast({
          title: 'Erro na Autenticação.',
          description: 'Ocorreu um erro ao fazer login, verifique as credenciais inseridas,',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, toast],
  );

  const signOut = useCallback(() => {
    Cookies.remove('positivo.token');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
