import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSession } from '@/store/slices/authSlice';
import { RootState, AppDispatch } from '@/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem('token');
  const { status, user } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (token && !user && status === 'idle') {
      dispatch(restoreSession());
    }
  }, [dispatch, token, user, status]);

  return <>{children}</>;
};

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <BrowserRouter>
            <AuthInitializer>
              {children}
            </AuthInitializer>
            <Toaster position="top-right" richColors />
          </BrowserRouter>
        </LanguageProvider>
      </QueryClientProvider>
    </Provider>
  );
};
