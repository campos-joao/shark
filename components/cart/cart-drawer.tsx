"use client";

import React from 'react';
import { ShoppingCart, X, Minus, Plus, ShoppingBag, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/formatters';

export function CartDrawer() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    total, 
    itemCount,
    isOpen,
    setIsOpen
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Carrinho de Compras
            <span className="ml-2 text-sm text-muted-foreground">
              ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
            </span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center p-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Seu carrinho está vazio</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Adicione produtos ao seu carrinho para continuar comprando
              </p>
              <Button onClick={() => setIsOpen(false)}>Continuar Comprando</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-secondary">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium leading-tight line-clamp-2">{item.name}</h4>
                    <div className="mt-1 flex items-center text-sm">
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-accent"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-accent"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-lg font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="lg" className="font-medium">
                Finalizar Compra
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsOpen(false)}
              >
                Continuar Comprando
              </Button>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <AlertCircle className="mr-1 h-3 w-3" />
              <span>Demo apenas, checkout não implementado</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}