import { 
  getCollection, 
  getDocument, 
  setDocument, 
  updateDocument, 
  queryDocuments,
  FirestoreDocument 
} from '../lib/firestore';
import { User } from '../types/models';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  deleteUser
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Nome da coleção no Firestore
const COLLECTION_NAME = 'users';
const ADMIN_COLLECTION = 'admin_users';

export class UserService {
  // Obter usuário pelo ID
  static async getUserById(userId: string): Promise<FirestoreDocument<User> | null> {
    return await getDocument<User>(COLLECTION_NAME, userId);
  }
  
  // Criar ou atualizar usuário
  static async createOrUpdateUser(user: User): Promise<void> {
    await setDocument<User>(COLLECTION_NAME, user.uid, user);
  }
  
  // Atualizar dados do usuário
  static async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    await updateDocument<User>(COLLECTION_NAME, userId, userData);
  }
  
  // Verificar se o usuário é administrador
  static async isAdmin(userId: string): Promise<boolean> {
    try {
      const adminDoc = await getDoc(doc(db, ADMIN_COLLECTION, userId));
      return adminDoc.exists();
    } catch (error) {
      console.error('Erro ao verificar permissões de administrador:', error);
      return false;
    }
  }
  
  // Adicionar um usuário como administrador
  static async addAdmin(userId: string, email: string): Promise<void> {
    await setDoc(doc(db, ADMIN_COLLECTION, userId), { 
      email,
      role: 'admin',
      createdAt: new Date()
    });
  }
  
  // Remover um usuário da lista de administradores
  static async removeAdmin(userId: string): Promise<void> {
    const adminDocRef = doc(db, ADMIN_COLLECTION, userId);
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      await updateDocument(ADMIN_COLLECTION, userId, { 
        role: 'user',
        updatedAt: new Date()
      });
    }
  }
  
  // Criar um novo usuário administrador
  static async createAdminUser(email: string, password: string, displayName: string): Promise<string | null> {
    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Atualizar o perfil com o nome de exibição
      await updateProfile(user, { displayName });
      
      // Criar registro de usuário no Firestore
      const userData: User = {
        uid: user.uid,
        email: user.email || email,
        displayName: displayName,
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await this.createOrUpdateUser(userData);
      
      // Adicionar como administrador
      await this.addAdmin(user.uid, email);
      
      return user.uid;
    } catch (error) {
      console.error('Erro ao criar usuário administrador:', error);
      return null;
    }
  }
  
  // Fazer login como administrador
  static async loginAsAdmin(email: string, password: string): Promise<{ success: boolean, userId?: string, error?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Verificar se o usuário é administrador
      const isAdmin = await this.isAdmin(user.uid);
      
      if (!isAdmin) {
        await signOut(auth);
        return { 
          success: false, 
          error: 'Usuário não tem permissões de administrador' 
        };
      }
      
      // Atualizar data de último login
      await this.updateUser(user.uid, { lastLogin: new Date() });
      
      return { 
        success: true, 
        userId: user.uid 
      };
    } catch (error: any) {
      console.error('Erro ao fazer login como administrador:', error);
      
      let errorMessage = 'Erro ao fazer login';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email ou senha incorretos';
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }
  
  // Listar todos os usuários (apenas administradores podem usar)
  static async getAllUsers(): Promise<FirestoreDocument<User>[]> {
    return await getCollection<User>(COLLECTION_NAME);
  }
  
  // Listar todos os administradores
  static async getAllAdmins(): Promise<any[]> {
    return await getCollection(ADMIN_COLLECTION);
  }
}
