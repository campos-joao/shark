// Tipos para os modelos de dados do Firestore

// Modelo para categorias
export interface Category {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  order?: number;
}

// Modelo para subcategorias
export interface Subcategory {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  categoryId: string; // Referência à categoria pai
  order?: number;
}

// Modelo para produtos
export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  imageUrls: string[];
  categoryId: string;
  subcategoryId?: string;
  specifications?: Record<string, string>;
  features?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Modelo para pedidos
export interface Order {
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

// Item de pedido
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Endereço de entrega
export interface ShippingAddress {
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

// Modelo para usuários (estendendo os dados de autenticação)
export interface User {
  uid: string; // ID do Firebase Auth
  email: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
  addresses?: ShippingAddress[];
  defaultAddressId?: string;
  wishlist?: string[]; // IDs dos produtos na lista de desejos
  createdAt: Date;
  lastLogin: Date;
}
