import { notFound } from 'next/navigation';
import { getProductBySlug, featuredProducts } from '@/lib/data';
import ProductClient from './ProductClient';

export async function generateStaticParams() {
  // Retorna todos os slugs dos produtos para exportação estática
  return featuredProducts.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  return <ProductClient product={product} />;
}