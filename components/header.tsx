"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  Heart,
  HelpCircle,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { popularSearches, categories } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Estados para controle de autenticação e modais
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  
  // Estados para formulários
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Track scroll position for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Verificar se há um usuário logado usando Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe(); // Limpar o listener do Firebase Auth
    };
  }, []);
  
  // Função para lidar com o login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      // Usar Firebase Auth para login
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      
      // Fechar modal e limpar campos
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
    } catch (error: any) {
      // Tratar erros de autenticação
      console.error('Erro de login:', error);
      
      // Exibir mensagem de erro amigável
      if (error.code === 'auth/invalid-credential') {
        setAuthError('Email ou senha incorretos.');
      } else if (error.code === 'auth/user-not-found') {
        setAuthError('Usuário não encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        setAuthError('Senha incorreta.');
      } else {
        setAuthError('Ocorreu um erro ao fazer login. Tente novamente.');
      }
    }
  };
  
  // Função para lidar com o cadastro
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    
    // Validação básica
    if (registerPassword !== registerConfirmPassword) {
      setAuthError('As senhas não coincidem!');
      return;
    }
    
    try {
      // Criar usuário com Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword
      );
      
      // Aqui você pode adicionar mais informações do usuário no Firestore
      // Por exemplo, salvar o nome completo, que não é armazenado por padrão no Auth
      // Exemplo: await setDoc(doc(db, "users", userCredential.user.uid), { name: registerName });
      
      // Fechar modal e limpar campos
      setShowRegisterModal(false);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
    } catch (error: any) {
      console.error('Erro de cadastro:', error);
      
      // Exibir mensagem de erro amigável
      if (error.code === 'auth/email-already-in-use') {
        setAuthError('Este email já está sendo usado por outra conta.');
      } else if (error.code === 'auth/invalid-email') {
        setAuthError('Email inválido.');
      } else if (error.code === 'auth/weak-password') {
        setAuthError('A senha é muito fraca. Use pelo menos 6 caracteres.');
      } else {
        setAuthError('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
    }
  };
  
  // Função para fazer logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // O estado isLoggedIn será atualizado pelo listener onAuthStateChanged
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md dark:bg-gray-900' : 'bg-white dark:bg-gray-900'
      }`}>
        {/* Top bar with logo and search */}
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-8">
            <span className="text-2xl font-bold text-primary">Sharks</span>
            <span className="text-2xl font-medium">Informática</span>
          </Link>

          {/* Search */}
          <div className="relative w-full mt-3 md:mt-0 max-w-2xl">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay to allow clicking on suggestions
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button 
                className="absolute right-0 top-0 rounded-l-none h-full" 
                size="sm"
              >
                Buscar
              </Button>
            </div>

            {/* Search suggestions */}
            {showSuggestions && (
              <div className="absolute z-50 w-full bg-white dark:bg-gray-900 mt-1 rounded-md shadow-lg border border-border overflow-hidden">
                {searchQuery.length > 0 ? (
                  <div className="p-2 hover:bg-accent">
                    <p className="text-sm font-medium">Buscar por: <span className="font-bold">{searchQuery}</span></p>
                  </div>
                ) : (
                  <div className="p-3">
                    <h3 className="text-sm font-medium mb-2">Buscas populares:</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          className="text-xs bg-accent hover:bg-accent/80 px-2 py-1 rounded-md"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Account and Cart controls - desktop */}
          <div className="hidden md:flex items-center ml-auto space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">Conta</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem onSelect={() => setShowOrdersModal(true)}>
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Meus Pedidos
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowWishlistModal(true)}>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Lista de Desejos
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                      <div className="flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sair
                      </div>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onSelect={() => setShowLoginModal(true)}>
                      <div className="flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowRegisterModal(true)}>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Criar Conta
                      </div>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" className="flex items-center">
              <Heart className="h-5 w-5 mr-1" />
              <span className="sr-only sm:not-sr-only sm:inline">Favoritos</span>
            </Button>

            <CartDrawer />
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-border">
          <div className="container mx-auto px-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex">
              <div className="flex">
                <Button variant="ghost" size="sm" className="h-12 px-3 rounded-none hover:bg-primary/10">
                  <Link href="/" className="flex items-center">
                    Início
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="h-12 px-3 rounded-none hover:bg-primary/10">
                  <Link href="/products" className="flex items-center">
                    Todos os Produtos
                  </Link>
                </Button>
                {categories.map((category) => (
                  <DropdownMenu key={category.id}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-12 px-3 rounded-none hover:bg-primary/10 flex items-center ${
                          pathname.includes(`/category/${category.slug}`) ? 'bg-primary/10 font-medium' : ''
                        }`}
                      >
                        {category.name}
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {category.subcategories.map((subcategory) => (
                        <DropdownMenuItem key={subcategory} asChild>
                          <Link href={`/category/${category.slug}/${subcategory.toLowerCase().replace(' ', '-')}`}>
                            {subcategory}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
                <Button variant="ghost" size="sm" className="h-12 px-3 rounded-none hover:bg-primary/10">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Ajuda
                </Button>
              </div>

              {/* Mobile Nav */}
              <div className="md:hidden flex justify-between items-center h-12">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="Menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85%] sm:w-[350px]">
                    <div className="flex flex-col h-full">
                      <div className="px-4 py-5 border-b">
                        <Link href="/" className="flex items-center">
                          <span className="text-xl font-bold text-primary">Sharks</span>
                          <span className="text-xl font-medium">Informática</span>
                        </Link>
                      </div>
                      
                      <div className="flex-1 overflow-auto py-2">
                        <div className="px-3 py-3 space-y-1">
                          <div 
                            className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                            onClick={() => {
                              if (isLoggedIn) {
                                // Mostrar perfil do usuário
                              } else {
                                setShowLoginModal(true);
                              }
                            }}
                          >
                            <User className="h-4 w-4 mr-3" />
                            {isLoggedIn ? 'Minha Conta' : 'Entrar / Cadastrar'}
                          </div>
                          <div 
                            className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                            onClick={() => {
                              if (isLoggedIn) {
                                setShowWishlistModal(true);
                              } else {
                                setShowLoginModal(true);
                              }
                            }}
                          >
                            <Heart className="h-4 w-4 mr-3" />
                            Lista de Desejos
                          </div>
                          <div 
                            className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                          >
                            <HelpCircle className="h-4 w-4 mr-3" />
                            Ajuda e Suporte
                          </div>
                        </div>
                        
                        <div className="mt-4 border-t pt-4">
                          <div className="px-3">
                            <h3 className="font-medium mb-2 px-3">Categorias</h3>
                            {categories.map((category) => (
                              <div key={category.id} className="mb-1">
                                <Link
                                  href={`/category/${category.slug}`}
                                  className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                                >
                                  {category.name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-1"
                    onClick={() => {
                      if (isLoggedIn) {
                        // Mostrar perfil do usuário
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <CartDrawer />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal de Login */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Entre com sua conta para acessar suas informações
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={loginEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password"
                value={loginPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            {authError && (
              <div className="text-red-500 text-sm mt-2">{authError}</div>
            )}
            <DialogFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Entrar</Button>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => {
                    setAuthError('');
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                  }}
                >
                  Cadastre-se
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Cadastro */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Conta</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para criar sua conta
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Seu nome" 
                value={registerName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input 
                id="register-email" 
                type="email" 
                placeholder="seu@email.com" 
                value={registerEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Senha</Label>
              <Input 
                id="register-password" 
                type="password"
                value={registerPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={registerConfirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterConfirmPassword(e.target.value)}
                required
              />
            </div>
            {authError && (
              <div className="text-red-500 text-sm mt-2">{authError}</div>
            )}
            <DialogFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Cadastrar</Button>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => {
                    setAuthError('');
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                  }}
                >
                  Faça login
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
