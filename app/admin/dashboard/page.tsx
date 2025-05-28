"use client";

import { useEffect, useState } from 'react';
import { ProductService } from '../../../services/productService';
import { CategoryService } from '../../../services/categoryService';
import { UserService } from '../../../services/userService';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    lowStockProducts: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Obter produtos
        const products = await ProductService.getAllProducts();
        
        // Obter categorias
        const categories = await CategoryService.getAllCategories();
        
        // Obter usuários
        const users = await UserService.getAllUsers();
        
        // Calcular produtos com estoque baixo (menos de 5 unidades)
        const lowStock = products.filter(product => product.stock < 5).length;
        
        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalUsers: users.length,
          lowStockProducts: lowStock,
        });
        
        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar dados do dashboard:', err);
        setError('Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Painel de Controle</h1>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm font-medium">Total de Produtos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/products" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
              Ver todos os produtos &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm font-medium">Total de Categorias</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/categories" className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">
              Ver todas as categorias &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm font-medium">Total de Usuários</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/users" className="text-green-500 hover:text-green-700 text-sm font-medium">
              Ver todos os usuários &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-gray-500 text-sm font-medium">Produtos com Estoque Baixo</p>
              <p className="text-2xl font-bold text-gray-900">{stats.lowStockProducts}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/products?filter=low-stock" className="text-red-500 hover:text-red-700 text-sm font-medium">
              Ver produtos com estoque baixo &rarr;
            </Link>
          </div>
        </div>
      </div>
      
      {/* Ações rápidas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/products/new" className="bg-white hover:bg-gray-50 shadow rounded-lg p-6 flex items-center">
            <div className="bg-blue-100 rounded-md p-3 mr-4">
              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="font-medium">Adicionar Novo Produto</span>
          </Link>
          
          <Link href="/admin/categories/new" className="bg-white hover:bg-gray-50 shadow rounded-lg p-6 flex items-center">
            <div className="bg-indigo-100 rounded-md p-3 mr-4">
              <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="font-medium">Adicionar Nova Categoria</span>
          </Link>
          
          <Link href="/admin/orders?filter=pending" className="bg-white hover:bg-gray-50 shadow rounded-lg p-6 flex items-center">
            <div className="bg-yellow-100 rounded-md p-3 mr-4">
              <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <span className="font-medium">Ver Pedidos Pendentes</span>
          </Link>
        </div>
      </div>
      
      {/* Dicas e informações */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Dicas para Administradores</h3>
        <ul className="list-disc pl-5 text-blue-700 space-y-1">
          <li>Mantenha os estoques atualizados para evitar problemas com pedidos.</li>
          <li>Adicione imagens de qualidade aos produtos para melhorar a experiência do cliente.</li>
          <li>Organize as categorias de forma lógica para facilitar a navegação.</li>
          <li>Responda aos pedidos dos clientes o mais rápido possível.</li>
        </ul>
      </div>
    </div>
  );
}
