"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, ChevronRight, Star, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatPrice, calculateDiscount } from '@/lib/formatters';
import { useCart } from '@/hooks/use-cart';

export default function ProductClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const discount = calculateDiscount(product.price, product.salePrice);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href={`/category/${product.category}`} className="text-muted-foreground hover:text-foreground">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>
      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product image */}
        <div className="bg-background rounded-lg overflow-hidden border p-4 md:p-8">
          <div className="aspect-square relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
            />
            {discount && (
              <Badge className="absolute left-4 top-4 bg-destructive">
                {discount}
              </Badge>
            )}
          </div>
        </div>
        {/* Product info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} avaliações)
            </span>
          </div>
          {/* Price */}
          <div className="mb-6">
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold">{formatPrice(product.salePrice)}</span>
                <span className="ml-2 text-lg line-through text-muted-foreground">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {product.stock > 0 ? 'Em estoque' : 'Fora de estoque'}
            </p>
          </div>
          {/* Quantity selector and add to cart */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="mr-4 font-medium">Quantidade:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 tabular-nums">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="p-2 disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="icon" className="shrink-0" aria-label="Add to wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="shrink-0" aria-label="Share product">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Benefits */}
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Truck className="h-4 w-4 mr-2" />
              <span>Frete grátis para compras acima de R$499</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>Garantia de 12 meses direto com o fabricante</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>Parcele em até 12x sem juros</span>
            </div>
          </div>
        </div>
      </div>
      {/* Product tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="description">Descrição</TabsTrigger>
          <TabsTrigger value="specs">Especificações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-base">{product.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="specs" className="mt-6">
          <div className="border rounded-md divide-y">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 p-3">
                <span className="text-sm font-medium col-span-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span className="text-sm col-span-2">{String(value)}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Este produto ainda não possui avaliações.</p>
            <Button className="mt-4">Escrever avaliação</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
