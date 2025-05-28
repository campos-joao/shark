"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../../lib/firebase';
import { UserService } from '../../services/userService';
import { onAuthStateChanged } from 'firebase/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  
  // Páginas que não precisam de autenticação
  const publicPages = ['/admin/login', '/admin/setup'];
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Verificar se o usuário é um administrador
        const adminStatus = await UserService.isAdmin(user.uid);
        setIsAdmin(adminStatus);
        setUserName(user.displayName);
        
        // Se não for admin e não estiver em uma página pública, redirecionar
        if (!adminStatus && !publicPages.includes(pathname || '')) {
          router.push('/admin/login');
        }
      } else {
        setIsAdmin(false);
        
        // Se não estiver logado e não estiver em uma página pública, redirecionar
        if (!publicPages.includes(pathname || '')) {
          router.push('/admin/login');
        }
      }
      
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [pathname, router]);
  
  // Se estiver em uma página pública, não precisamos do layout administrativo
  if (publicPages.includes(pathname || '')) {
    return <>{children}</>;
  }
  
  // Se ainda estiver carregando, mostrar um indicador de carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Se não for admin e não estiver em uma página pública, não renderizar nada (redirecionar ocorrerá no useEffect)
  if (!isAdmin && !publicPages.includes(pathname || '')) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/admin/dashboard" className="font-bold text-xl">
                  Shark Admin
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/admin/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === '/admin/dashboard'
                        ? 'bg-blue-700 text-white'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/products"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname?.startsWith('/admin/products')
                        ? 'bg-blue-700 text-white'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Produtos
                  </Link>
                  <Link
                    href="/admin/categories"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname?.startsWith('/admin/categories')
                        ? 'bg-blue-700 text-white'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Categorias
                  </Link>
                  <Link
                    href="/admin/users"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname?.startsWith('/admin/users')
                        ? 'bg-blue-700 text-white'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Usuários
                  </Link>
                  <Link
                    href="/admin/orders"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname?.startsWith('/admin/orders')
                        ? 'bg-blue-700 text-white'
                        : 'text-white hover:bg-blue-500'
                    }`}
                  >
                    Pedidos
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <span className="mr-2">{userName}</span>
                    <button
                      onClick={() => {
                        auth.signOut();
                        router.push('/admin/login');
                      }}
                      className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Shark Informática - Painel Administrativo
          </p>
        </div>
      </footer>
    </div>
  );
}
