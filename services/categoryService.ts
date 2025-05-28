import { 
  getCollection,
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  FirestoreDocument
} from '../lib/firestore';
import { Category, Subcategory } from '../types/models';

// Nomes das coleções no Firestore
const CATEGORIES_COLLECTION = 'categories';
const SUBCATEGORIES_COLLECTION = 'subcategories';

export class CategoryService {
  // Obter todas as categorias
  static async getAllCategories(): Promise<FirestoreDocument<Category>[]> {
    return await getCollection<Category>(CATEGORIES_COLLECTION);
  }

  // Obter categoria por slug
  static async getCategoryBySlug(slug: string): Promise<FirestoreDocument<Category> | null> {
    const categories = await queryDocuments<Category>(CATEGORIES_COLLECTION, [
      { field: 'slug', operator: '==', value: slug }
    ]);
    
    return categories.length > 0 ? categories[0] : null;
  }

  // Obter categoria por ID
  static async getCategoryById(id: string): Promise<FirestoreDocument<Category> | null> {
    return await getDocument<Category>(CATEGORIES_COLLECTION, id);
  }

  // Adicionar nova categoria
  static async addCategory(category: Category): Promise<string> {
    return await addDocument<Category>(CATEGORIES_COLLECTION, category);
  }

  // Atualizar categoria
  static async updateCategory(id: string, category: Partial<Category>): Promise<void> {
    await updateDocument<Category>(CATEGORIES_COLLECTION, id, category);
  }

  // Excluir categoria
  static async deleteCategory(id: string): Promise<void> {
    await deleteDocument(CATEGORIES_COLLECTION, id);
  }

  // Obter todas as subcategorias de uma categoria
  static async getSubcategoriesByCategoryId(categoryId: string): Promise<FirestoreDocument<Subcategory>[]> {
    // Removemos a ordenação para evitar a necessidade de um índice composto
    // Quando o índice estiver criado no Firebase, podemos restaurar a ordenação
    const subcategories = await queryDocuments<Subcategory>(SUBCATEGORIES_COLLECTION, [
      { field: 'categoryId', operator: '==', value: categoryId }
    ]);
    
    // Ordenamos manualmente pelo campo 'order'
    return subcategories.sort((a, b) => {
      const orderA = a.order || 0;
      const orderB = b.order || 0;
      return orderA - orderB;
    });
  }

  // Obter subcategoria por slug e categoria ID
  static async getSubcategoryBySlug(categoryId: string, slug: string): Promise<FirestoreDocument<Subcategory> | null> {
    const subcategories = await queryDocuments<Subcategory>(SUBCATEGORIES_COLLECTION, [
      { field: 'categoryId', operator: '==', value: categoryId },
      { field: 'slug', operator: '==', value: slug }
    ]);
    
    return subcategories.length > 0 ? subcategories[0] : null;
  }

  // Adicionar nova subcategoria
  static async addSubcategory(subcategory: Subcategory): Promise<string> {
    return await addDocument<Subcategory>(SUBCATEGORIES_COLLECTION, subcategory);
  }

  // Atualizar subcategoria
  static async updateSubcategory(id: string, subcategory: Partial<Subcategory>): Promise<void> {
    await updateDocument<Subcategory>(SUBCATEGORIES_COLLECTION, id, subcategory);
  }

  // Excluir subcategoria
  static async deleteSubcategory(id: string): Promise<void> {
    await deleteDocument(SUBCATEGORIES_COLLECTION, id);
  }
}
