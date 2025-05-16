import { Card, CardContent } from '@/components/ui/card';

// Simulated brand logos with text
const brands = [
  { name: 'NVIDIA', id: 'nvidia' },
  { name: 'AMD', id: 'amd' },
  { name: 'Intel', id: 'intel' },
  { name: 'ASUS', id: 'asus' },
  { name: 'MSI', id: 'msi' },
  { name: 'Corsair', id: 'corsair' },
  { name: 'Logitech', id: 'logitech' },
  { name: 'Samsung', id: 'samsung' },
];

export function BrandsSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Nossas Marcas</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Card key={brand.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-center h-24 p-4">
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">{brand.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}