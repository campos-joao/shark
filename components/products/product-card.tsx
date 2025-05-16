"use client";

import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, calculateDiscount } from '@/lib/formatters';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    rating: number;
    reviews: number;
    stock: number;
    image: string;
  };
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = calculateDiscount(product.price, product.salePrice);
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
    });
  };
  
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col ${
      featured ? 'border-accent' : ''
    }`}>
      {/* Product Image */}
      <div className="relative pt-4 px-4">
        {discount && (
          <Badge className="absolute left-6 top-6 bg-destructive z-10">
            {discount}
          </Badge>
        )}
        
        {featured && (
          <Badge className="absolute right-6 top-6 bg-primary z-10">
            Destaque
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-6 top-6 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </Button>
        
        <Link href={`/product/${product.slug}`} className="block">
          <div className="aspect-square overflow-hidden rounded-md bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
      </div>
      
      {/* Product Info */}
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <Link 
          href={`/product/${product.slug}`} 
          className="hover:underline underline-offset-2"
        >
          <h3 className="font-medium line-clamp-2 mb-3 min-h-[48px]">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center">
          {product.salePrice ? (
            <>
              <span className="font-bold text-lg">{formatPrice(product.salePrice)}</span>
              <span className="ml-2 text-sm line-through text-muted-foreground">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          )}
        </div>
        
        <div className="mt-2 text-xs">
          {product.stock > 0 ? (
            <span className="text-green-600 dark:text-green-500">
              Em estoque
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-500">
              Fora de estoque
            </span>
          )}
        </div>
      </CardContent>
      
      {/* Button */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}