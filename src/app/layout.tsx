import type { Metadata } from 'next';
import localFont from 'next/font/local';
import StoreProvider from '@/app/StoreProvider';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Games app',
  description: 'Games next app'
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <div id='modal-root'/>
    <StoreProvider>
      {children}
    </StoreProvider>
    </body>
    </html>
  );
};
