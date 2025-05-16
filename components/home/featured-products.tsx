import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredProducts } from '@/lib/data';
import Link from 'next/link';

export function FeaturedProducts() {
  // Group products by category for tabs
  const groupedProducts = featuredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof featuredProducts>);

  // Get unique categories
  const categories = Object.keys(groupedProducts);

  return (
    <section className="py-12 bg-accent/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
          <Button asChild variant="link" className="mt-2 sm:mt-0">
            <Link href="/products">Ver Todos os Produtos</Link>
          </Button>
        </div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <div className="mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-background h-auto p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category === 'components' && 'Componentes'}
                  {category === 'laptops' && 'Notebooks'}
                  {category === 'peripherals' && 'Periféricos'}
                  {category === 'networking' && 'Redes'}
                  {category === 'gaming' && 'Gaming'}
                  {category === 'software' && 'Software'}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedProducts[category].map((product) => (
                  <ProductCard key={product.id} product={product} featured={product.salePrice !== null} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}