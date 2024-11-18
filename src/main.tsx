import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const clientId: any = process.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App/>
  </GoogleOAuthProvider>
);
