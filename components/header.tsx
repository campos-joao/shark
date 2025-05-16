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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { popularSearches, categories } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Track scroll position for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
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
              <DropdownMenuItem asChild>
                <Link href="/auth/login" className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/auth/register" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Criar Conta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/orders" className="flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Meus Pedidos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/wishlist" className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Lista de Desejos
                </Link>
              </DropdownMenuItem>
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
      <nav className="border-t border-b border-border bg-secondary">
        <div className="container mx-auto px-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex h-12 items-center space-x-4">
            {categories.map((category) => (
              <DropdownMenu key={category.id}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`h-full flex items-center px-3 rounded-none hover:bg-primary/10 ${
                      pathname.includes(`/category/${category.slug}`) ? 'text-primary border-b-2 border-primary' : ''
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
            <Button variant="ghost" size="sm" className="h-full flex items-center px-3 rounded-none hover:bg-primary/10">
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
                      <Link 
                        href="/account" 
                        className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Minha Conta
                      </Link>
                      <Link 
                        href="/account/wishlist" 
                        className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Lista de Desejos
                      </Link>
                      <Link 
                        href="/help" 
                        className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent"
                      >
                        <HelpCircle className="h-4 w-4 mr-3" />
                        Ajuda e Suporte
                      </Link>
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
              <Button variant="ghost" size="sm" className="mr-1">
                <User className="h-5 w-5" />
              </Button>
              <CartDrawer />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}