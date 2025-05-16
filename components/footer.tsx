import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-primary mr-1">Sharks</span> Informática
            </h3>
            <p className="mb-4 text-sm">
              Sua loja completa de produtos de informática e tecnologia. 
              Encontre os melhores preços em computadores, notebooks, 
              componentes, periféricos e muito mais.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Atendimento ao Cliente</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Política de Envio
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Garantia
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Ordering */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Minha Conta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/account/wishlist" className="hover:text-white transition-colors">
                  Lista de Desejos
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white transition-colors">
                  Assinar Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Entre em Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" />
                <span>Av. Tecnologia, 1000<br />São Paulo, SP 01234-000</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" />
                <span>(11) 5555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" />
                <span>contato@sharksinformatica.com.br</span>
              </li>
              <li className="pt-2">
                <span className="block mb-2">Horário de Atendimento:</span>
                <span className="text-gray-400">Segunda a Sexta: 9h às 18h<br />Sábado: 9h às 13h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <h4 className="text-sm font-medium text-white mb-4">Formas de Pagamento</h4>
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">VISA</span>
            </div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">MC</span>
            </div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">PIX</span>
            </div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">BOLETO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/50 py-4">
        <div className="container mx-auto px-4 text-sm text-center text-gray-500">
          <p>© 2025 Sharks Informática. Todos os direitos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Termos de Uso
            </Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}