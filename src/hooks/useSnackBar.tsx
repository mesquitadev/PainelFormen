import { useContext } from 'react';
import { SnackBarContext } from '@/contexts/SnackBarContext';

export function useSnackBar() {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
