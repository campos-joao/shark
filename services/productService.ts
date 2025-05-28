import { 
  getCollection, 
  getDocument, 
  addDocument, 
  updateDocument, 
  deleteDocument,
  queryDocuments,
  FirestoreDocument
} from '../lib/firestore';
import { Product } from '../types/models';

// Nome da coleção no Firestore
const COLLECTION_NAME = 'products';

// Classe para gerenciar operações relacionadas a produtos
export class ProductService {
  // Obter todos os produtos
  static async getAllProducts(): Promise<FirestoreDocument<Product>[]> {
    return await getCollection<Product>(COLLECTION_NAME);
  }

  // Obter produtos por categoria
  static async getProductsByCategory(categoryId: string): Promise<FirestoreDocument<Product>[]> {
    return await queryDocuments<Product>(COLLECTION_NAME, [
      { field: 'categoryId', operator: '==', value: categoryId },
      { field: 'isActive', operator: '==', value: true }
    ]);
  }

  // Obter produtos por subcategoria
  static async getProductsBySubcategory(subcategoryId: string): Promise<FirestoreDocument<Product>[]> {
    return await queryDocuments<Product>(COLLECTION_NAME, [
      { field: 'subcategoryId', operator: '==', value: subcategoryId },
      { field: 'isActive', operator: '==', value: true }
    ]);
  }

  // Obter um produto específico pelo slug
  static async getProductBySlug(slug: string): Promise<FirestoreDocument<Product> | null> {
    const products = await queryDocuments<Product>(COLLECTION_NAME, [
      { field: 'slug', operator: '==', value: slug }
    ]);
    
    return products.length > 0 ? products[0] : null;
  }

  // Obter um produto pelo ID
  static async getProductById(id: string): Promise<FirestoreDocument<Product> | null> {
    return await getDocument<Product>(COLLECTION_NAME, id);
  }

  // Adicionar um novo produto
  static async addProduct(product: Omit<Product, 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const productWithTimestamps: Product = {
      ...product,
      createdAt: now,
      updatedAt: now
    };
    
    return await addDocument<Product>(COLLECTION_NAME, productWithTimestamps);
  }

  // Atualizar um produto existente
  static async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const updates = {
      ...product,
      updatedAt: new Date()
    };
    
    await updateDocument<Product>(COLLECTION_NAME, id, updates);
  }

  // Excluir um produto
  static async deleteProduct(id: string): Promise<void> {
    await deleteDocument(COLLECTION_NAME, id);
  }

  // Buscar produtos com filtros avançados
  static async searchProducts(
    searchParams: {
      query?: string;
      categoryId?: string;
      subcategoryId?: string;
      minPrice?: number;
      maxPrice?: number;
      inStock?: boolean;
    },
    sortField: string = 'name',
    sortDirection: 'asc' | 'desc' = 'asc',
    limit: number = 20
  ): Promise<FirestoreDocument<Product>[]> {
    // Construir os filtros com base nos parâmetros de busca
    const filters: { field: string; operator: string; value: any }[] = [
      { field: 'isActive', operator: '==', value: true }
    ];
    
    if (searchParams.categoryId) {
      filters.push({ field: 'categoryId', operator: '==', value: searchParams.categoryId });
    }
    
    if (searchParams.subcategoryId) {
      filters.push({ field: 'subcategoryId', operator: '==', value: searchParams.subcategoryId });
    }
    
    if (searchParams.minPrice !== undefined) {
      filters.push({ field: 'price', operator: '>=', value: searchParams.minPrice });
    }
    
    if (searchParams.maxPrice !== undefined) {
      filters.push({ field: 'price', operator: '<=', value: searchParams.maxPrice });
    }
    
    if (searchParams.inStock) {
      filters.push({ field: 'stock', operator: '>', value: 0 });
    }
    
    // Executar a consulta
    let products = await queryDocuments<Product>(
      COLLECTION_NAME,
      filters,
      { field: sortField, direction: sortDirection },
      limit
    );
    
    // Filtrar por consulta de texto (se houver)
    // Nota: Firestore não suporta busca por texto completo nativamente, então fazemos isso no lado do cliente
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    return products;
  }
}
