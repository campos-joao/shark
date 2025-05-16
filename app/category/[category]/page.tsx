import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    category: string
  }
}

const validCategories: {
  [category: string]: { name: string; description: string }
} = {
  laptops: {
    name: "Laptops",
    description: "Browse our selection of laptops"
  }
};

async function getCategoryData(category: string) {
  // This is a placeholder function - you would typically fetch this data from your API or database
  const validCategories: {
  [category: string]: { name: string; description: string }
} = {
    laptops: {
      name: "Laptops",
      description: "Browse our selection of laptops"
    }
  }

  return validCategories[category]
}

export async function generateStaticParams() {
  // Gera todos os slugs de categorias válidas
  return Object.keys(validCategories).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params
  const categoryData = await getCategoryData(category)

  if (!categoryData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{categoryData.name}</h1>
      <p className="text-gray-600 mb-8">{categoryData.description}</p>
      
      {/* Add your category content here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subcategory listings would go here */}
      </div>
    </div>
  )
}