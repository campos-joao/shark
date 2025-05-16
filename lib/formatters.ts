export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

export function calculateDiscount(originalPrice: number, salePrice: number | null): string | null {
  if (!salePrice) return null;
  
  const discountPercent = ((originalPrice - salePrice) / originalPrice) * 100;
  return `-${Math.round(discountPercent)}%`;
}