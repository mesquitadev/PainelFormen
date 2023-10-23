import { createContext, ReactNode, useMemo, useState } from 'react';

export type LoadingContextData = {
  snackBar: boolean;
  setError: (value: boolean) => void;
  message: string;
  setMessage: (value: string) => void;
  type: string;
  setType: (value: string) => void;
};

export const SnackBarContext = createContext({} as LoadingContextData);

type AuthContextProps = {
  children: ReactNode;
};

export function SnackBarProvider({ children }: AuthContextProps) {
  const [snackBar, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');

  const updatedValue = useMemo(
    () => ({
      snackBar,
      setError,
      message,
      setMessage,
      type,
      setType,
    }),
    [message, snackBar, type],
  );
  return <SnackBarContext.Provider value={updatedValue}>{children}</SnackBarContext.Provider>;
}
