import { createContext, ReactNode, useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import api from '@/services';
import { useLoading } from '@/hooks/useLoading';
import { useSnackBar } from '@/hooks/useSnackBar';

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
  const { setError, setMessage, setType } = useSnackBar();

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('formen.token');
    if (token) {
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: User) => {
      setLoading(true);
      try {
        const response = await api.post('admin/login', {
          email,
          password,
        });

        Cookies.set('formen.token', response.data.data.token, { expires: 7 });
        setData({ token: response.data.data.token });
      } catch (e) {
        console.log(e);
        setError(true);
        setType('error');
        setMessage('Email ou senha incorretos');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  const signOut = useCallback(() => {
    Cookies.remove('formen.token');
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
