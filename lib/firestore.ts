import { 
  doc, 
  collection, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  WithFieldValue
} from 'firebase/firestore';
import { db } from './firebase';

// Tipo genérico para documentos
export type FirestoreDocument<T = DocumentData> = T & {
  id: string;
};

// Função para obter todos os documentos de uma coleção
export async function getCollection<T>(collectionName: string): Promise<FirestoreDocument<T>[]> {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as FirestoreDocument<T>));
}

// Função para obter um documento específico
export async function getDocument<T>(collectionName: string, documentId: string): Promise<FirestoreDocument<T> | null> {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as FirestoreDocument<T>;
  }
  
  return null;
}

// Função para adicionar um documento com ID automático
export async function addDocument<T extends DocumentData>(collectionName: string, data: WithFieldValue<T>): Promise<string> {
  const collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, data as WithFieldValue<DocumentData>);
  return docRef.id;
}

// Função para definir um documento com ID específico
export async function setDocument<T extends DocumentData>(collectionName: string, documentId: string, data: WithFieldValue<T>): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, data as WithFieldValue<DocumentData>);
}

// Função para atualizar um documento
export async function updateDocument<T extends DocumentData>(collectionName: string, documentId: string, data: Partial<T>): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, data as DocumentData);
}

// Função para excluir um documento
export async function deleteDocument(collectionName: string, documentId: string): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}

// Função para buscar documentos com filtros
export async function queryDocuments<T>(
  collectionName: string, 
  filters: { field: string; operator: string; value: any }[] = [],
  sortBy?: { field: string; direction: 'asc' | 'desc' },
  limitCount?: number
): Promise<FirestoreDocument<T>[]> {
  const collectionRef = collection(db, collectionName);
  
  // Construir a consulta com os filtros
  let queryConstraints: any[] = [];
  
  // Adicionar filtros
  filters.forEach(filter => {
    queryConstraints.push(where(filter.field, filter.operator as any, filter.value));
  });
  
  // Adicionar ordenação
  if (sortBy) {
    queryConstraints.push(orderBy(sortBy.field, sortBy.direction));
  }
  
  // Adicionar limite
  if (limitCount) {
    queryConstraints.push(limit(limitCount));
  }
  
  // Executar a consulta
  const q = query(collectionRef, ...queryConstraints);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as FirestoreDocument<T>));
}
