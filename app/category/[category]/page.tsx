import { notFound } from "next/navigation"
import { CategoryService } from "../../../services/categoryService"
import { ProductService } from "../../../services/productService"
import { FirestoreDocument } from "../../../lib/firestore"
import { Category, Product, Subcategory } from "../../../types/models"
import Link from "next/link"
import Image from "next/image"

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Esta função será usada apenas para gerar rotas estáticas
const getCategoryRoutes = async () => {
  try {
    const categories = await CategoryService.getAllCategories();
    return categories.map(category => category.slug);
  } catch (error) {
    console.error("Erro ao obter categorias:", error);
    return ["laptops"]; // Fallback para pelo menos uma rota
  }
};

async function getCategoryData(categorySlug: string) {
  try {
    // Buscar a categoria pelo slug
    const category = await CategoryService.getCategoryBySlug(categorySlug);
    
    if (!category) {
      return null;
    }
    
    // Buscar subcategorias relacionadas
    const subcategories = await CategoryService.getSubcategoriesByCategoryId(category.id);
    
    // Buscar produtos relacionados à categoria
    const products = await ProductService.getProductsByCategory(category.id);
    
    return {
      category,
      subcategories,
      products
    };
  } catch (error) {
    console.error(`Erro ao buscar dados da categoria ${categorySlug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  // Gera todos os slugs de categorias válidas
  try {
    const categoryRoutes = await getCategoryRoutes();
    return categoryRoutes.map(category => ({ category }));
  } catch (error) {
    console.error("Erro ao gerar parâmetros estáticos:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params
  const data = await getCategoryData(categorySlug)

  if (!data) {
    notFound()
  }

  const { category, subcategories, products } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description || "Explore nossa seleção de produtos"}</p>
      
      {/* Subcategorias */}
      {subcategories && subcategories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Subcategorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories.map((subcategory) => (
              <Link 
                key={subcategory.id} 
                href={`/category/${categorySlug}/${subcategory.slug}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
              >
                {subcategory.imageUrl && (
                  <div className="mb-3 relative h-40 w-full">
                    <Image 
                      src={subcategory.imageUrl} 
                      alt={subcategory.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                {subcategory.description && (
                  <p className="text-gray-600 mt-1 text-sm">{subcategory.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Produtos em destaque */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.slice(0, 8).map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.slug}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {product.imageUrls && product.imageUrls.length > 0 && (
                  <div className="relative h-48 w-full">
                    <Image 
                      src={product.imageUrls[0]} 
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      {product.discountPrice ? (
                        <>
                          <span className="text-gray-400 line-through text-sm">R$ {product.price.toFixed(2)}</span>
                          <span className="text-lg font-bold text-blue-600 ml-2">R$ {product.discountPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <span className={`text-sm ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.stock > 0 ? 'Em estoque' : 'Esgotado'}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          )}
        </div>
      </div>
    </div>
  )
}