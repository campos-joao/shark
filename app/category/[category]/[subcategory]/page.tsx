import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    category: string
    subcategory: string
  }
}

// This would typically come from your database or API
const validCategories: {
  [category: string]: {
    [subcategory: string]: { name: string; description: string }
  }
} = {
  laptops: {
    "gaming-laptops": {
      name: "Gaming Laptops",
      description: "High-performance gaming laptops"
    }
  }
};

async function getCategoryData(category: string, subcategory: string) {
  return validCategories[category]?.[subcategory]
}

export async function generateStaticParams() {
  // Generate all valid category/subcategory combinations
  const params = []
  
  for (const category in validCategories) {
    for (const subcategory in validCategories[category]) {
      params.push({
        category,
        subcategory
      })
    }
  }
  
  return params
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, subcategory } = params
  const categoryData = await getCategoryData(category, subcategory)

  if (!categoryData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{categoryData.name}</h1>
      <p className="text-gray-600 mb-8">{categoryData.description}</p>
      
      {/* Add your category content here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product listings would go here */}
      </div>
    </div>
  )
}