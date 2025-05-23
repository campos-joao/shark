"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  
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
    
    // Verificar se há um usuário logado no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Função para lidar com o login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica real de autenticação
    // Por enquanto, vamos apenas simular um login bem-sucedido
    
    const user = {
      email: loginEmail,
      name: loginEmail.split('@')[0] // Usando parte do email como nome para demonstração
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setShowLoginModal(false);
    
    // Resetar campos do formulário
    setLoginEmail('');
    setLoginPassword('');
  };
  
  // Função para lidar com o cadastro
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (registerPassword !== registerConfirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    // Aqui você implementaria a lógica real de cadastro
    // Por enquanto, vamos apenas simular um cadastro bem-sucedido
    
    const user = {
      name: registerName,
      email: registerEmail
    };
    
    // Transferir carrinho do localStorage para a conta, se existir
    const cart = localStorage.getItem('cart');
    
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setShowRegisterModal(false);
    
    // Resetar campos do formulário
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
  };
  
  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <DialogFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Entrar</Button>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => {
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
                onChange={(e) => setRegisterName(e.target.value)}
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
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Senha</Label>
              <Input 
                id="register-password" 
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                required
              />
            </div>
            <DialogFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Cadastrar</Button>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0" 
                  onClick={() => {
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
