'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { makeStore, AppStore } from '@/lib/store';

const clientId: any = process.env.NEXT_PUBLIC_CLIENT_ID;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 30,
      retry: 3,
      refetchOnWindowFocus: true,
    },
  },
});

export default function StoreProvider({
                                        children
                                      }: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <QueryClientProvider client={queryClient}><GoogleOAuthProvider clientId={clientId}><Provider
    store={storeRef.current}>{children}</Provider></GoogleOAuthProvider></QueryClientProvider>;
}