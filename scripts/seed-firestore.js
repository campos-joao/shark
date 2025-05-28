// Script para popular o Firestore com dados iniciais
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp 
} = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxlQmLv0FcoCYrbdmAV3U1zhMib7vFMUQ",
  authDomain: "sharkinformatica-c0c00.firebaseapp.com",
  projectId: "sharkinformatica-c0c00",
  storageBucket: "sharkinformatica-c0c00.firebasestorage.app",
  messagingSenderId: "999696462961",
  appId: "1:999696462961:web:b4f7c28dc691533da057d0",
  measurementId: "G-2263TLMCVW"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Dados de exemplo
const categories = [
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Notebooks e laptops de diversas marcas',
    order: 1
  },
  {
    id: 'desktop',
    name: 'Desktops',
    slug: 'desktop',
    description: 'Computadores de mesa completos e personalizados',
    order: 2
  },
  {
    id: 'perifericos',
    name: 'Periféricos',
    slug: 'perifericos',
    description: 'Teclados, mouses, headsets e outros periféricos',
    order: 3
  }
];

const subcategories = [
  {
    id: 'notebooks-gamer',
    name: 'Notebooks Gamer',
    slug: 'notebooks-gamer',
    description: 'Notebooks com alto desempenho para jogos',
    categoryId: 'laptops',
    order: 1
  },
  {
    id: 'notebooks-empresariais',
    name: 'Notebooks Empresariais',
    slug: 'notebooks-empresariais',
    description: 'Notebooks para uso profissional e corporativo',
    categoryId: 'laptops',
    order: 2
  },
  {
    id: 'desktops-gamer',
    name: 'Desktops Gamer',
    slug: 'desktops-gamer',
    description: 'Computadores de mesa para jogos',
    categoryId: 'desktop',
    order: 1
  },
  {
    id: 'teclados',
    name: 'Teclados',
    slug: 'teclados',
    description: 'Teclados mecânicos, membrana e sem fio',
    categoryId: 'perifericos',
    order: 1
  },
  {
    id: 'mouses',
    name: 'Mouses',
    slug: 'mouses',
    description: 'Mouses para jogos e uso diário',
    categoryId: 'perifericos',
    order: 2
  }
];

const products = [
  {
    id: 'notebook-gamer-x1',
    name: 'Notebook Gamer X1',
    slug: 'notebook-gamer-x1',
    description: 'Notebook gamer com processador Intel Core i7, 16GB RAM, SSD 512GB e placa de vídeo NVIDIA RTX 3060.',
    price: 7999.99,
    stock: 10,
    imageUrls: ['https://placehold.co/600x400?text=Notebook+Gamer+X1'],
    categoryId: 'laptops',
    subcategoryId: 'notebooks-gamer',
    specifications: {
      'Processador': 'Intel Core i7 11th Gen',
      'Memória RAM': '16GB DDR4',
      'Armazenamento': 'SSD 512GB NVMe',
      'Placa de Vídeo': 'NVIDIA RTX 3060 6GB',
      'Tela': '15.6" Full HD 144Hz',
      'Sistema Operacional': 'Windows 11'
    },
    features: [
      'Teclado RGB retroiluminado',
      'Wi-Fi 6',
      'Bluetooth 5.1',
      'Webcam HD'
    ],
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'notebook-empresarial-pro',
    name: 'Notebook Empresarial Pro',
    slug: 'notebook-empresarial-pro',
    description: 'Notebook para uso profissional com processador Intel Core i5, 8GB RAM, SSD 256GB.',
    price: 4499.99,
    stock: 15,
    imageUrls: ['https://placehold.co/600x400?text=Notebook+Empresarial+Pro'],
    categoryId: 'laptops',
    subcategoryId: 'notebooks-empresariais',
    specifications: {
      'Processador': 'Intel Core i5 11th Gen',
      'Memória RAM': '8GB DDR4',
      'Armazenamento': 'SSD 256GB NVMe',
      'Placa de Vídeo': 'Intel Iris Xe Graphics',
      'Tela': '14" Full HD',
      'Sistema Operacional': 'Windows 11 Pro'
    },
    features: [
      'Leitor de impressão digital',
      'Bateria de longa duração',
      'Conectividade Thunderbolt 4',
      'Certificação MIL-STD-810H'
    ],
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'desktop-gamer-ultra',
    name: 'Desktop Gamer Ultra',
    slug: 'desktop-gamer-ultra',
    description: 'Desktop para jogos de alta performance com processador AMD Ryzen 7, 32GB RAM, SSD 1TB e placa de vídeo RTX 3080.',
    price: 12999.99,
    discountPrice: 11499.99,
    stock: 5,
    imageUrls: ['https://placehold.co/600x400?text=Desktop+Gamer+Ultra'],
    categoryId: 'desktop',
    subcategoryId: 'desktops-gamer',
    specifications: {
      'Processador': 'AMD Ryzen 7 5800X',
      'Memória RAM': '32GB DDR4 3600MHz',
      'Armazenamento': 'SSD 1TB NVMe + HD 2TB',
      'Placa de Vídeo': 'NVIDIA RTX 3080 10GB',
      'Fonte': '850W 80 Plus Gold',
      'Sistema Operacional': 'Windows 11'
    },
    features: [
      'Gabinete com iluminação RGB',
      'Refrigeração líquida',
      'Wi-Fi 6',
      'Bluetooth 5.2'
    ],
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'teclado-mecanico-rgb',
    name: 'Teclado Mecânico RGB',
    slug: 'teclado-mecanico-rgb',
    description: 'Teclado mecânico com switches blue, iluminação RGB e layout ABNT2.',
    price: 349.99,
    stock: 30,
    imageUrls: ['https://placehold.co/600x400?text=Teclado+Mecanico+RGB'],
    categoryId: 'perifericos',
    subcategoryId: 'teclados',
    specifications: {
      'Tipo': 'Mecânico',
      'Switches': 'Blue',
      'Layout': 'ABNT2',
      'Iluminação': 'RGB',
      'Conexão': 'USB'
    },
    features: [
      'Anti-ghosting',
      'Macro programável',
      'Software de personalização',
      'Apoio de pulso removível'
    ],
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: 'mouse-gamer-pro',
    name: 'Mouse Gamer Pro',
    slug: 'mouse-gamer-pro',
    description: 'Mouse gamer com sensor óptico de alta precisão, 8 botões programáveis e iluminação RGB.',
    price: 199.99,
    discountPrice: 169.99,
    stock: 25,
    imageUrls: ['https://placehold.co/600x400?text=Mouse+Gamer+Pro'],
    categoryId: 'perifericos',
    subcategoryId: 'mouses',
    specifications: {
      'Sensor': 'Óptico 16000 DPI',
      'Botões': '8 programáveis',
      'Iluminação': 'RGB',
      'Conexão': 'USB',
      'Peso': '95g ajustável'
    },
    features: [
      'Software de personalização',
      'Memória interna para perfis',
      'Cabo trançado',
      'Pés de teflon'
    ],
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

// Função para adicionar documentos ao Firestore
async function addDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
    console.log(`Documento adicionado com sucesso: ${collectionName}/${docId}`);
  } catch (error) {
    console.error(`Erro ao adicionar documento ${collectionName}/${docId}:`, error);
  }
}

// Função principal para popular o Firestore
async function seedFirestore() {
  console.log('Iniciando população do Firestore...');
  
  // Adicionar categorias
  for (const category of categories) {
    const { id, ...categoryData } = category;
    await addDocument('categories', id, categoryData);
  }
  
  // Adicionar subcategorias
  for (const subcategory of subcategories) {
    const { id, ...subcategoryData } = subcategory;
    await addDocument('subcategories', id, subcategoryData);
  }
  
  // Adicionar produtos
  for (const product of products) {
    const { id, ...productData } = product;
    await addDocument('products', id, productData);
  }
  
  console.log('População do Firestore concluída com sucesso!');
}

// Executar a função principal
seedFirestore()
  .then(() => console.log('Script finalizado.'))
  .catch(error => console.error('Erro ao executar o script:', error));
