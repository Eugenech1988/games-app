'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { makeStore, AppStore } from '@/lib/store'

const clientId: any = process.env.NEXT_PUBLIC_CLIENT_ID;

export default function StoreProvider({
                                        children,
                                      }: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <GoogleOAuthProvider clientId={clientId}><Provider store={storeRef.current}>{children}</Provider></GoogleOAuthProvider>
}