"use client";

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/hooks/use-cart';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Sharks Informática - Sua loja de equipamentos de informática',
  description: 'Encontre os melhores produtos de informática com os melhores preços. Computadores, notebooks, componentes, periféricos e muito mais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}