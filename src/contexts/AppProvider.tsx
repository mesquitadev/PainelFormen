import React, { PropsWithChildren } from 'react';

import { LoadingProvider } from '@/contexts/LoadingContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SnackBarProvider } from '@/contexts/SnackBarContext';

type AppProviderProps = PropsWithChildren<Record<string, unknown>>;

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <SnackBarProvider>
    <LoadingProvider>
      <AuthProvider>{children}</AuthProvider>
    </LoadingProvider>
  </SnackBarProvider>
);

export default AppProvider;
