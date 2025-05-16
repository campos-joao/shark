// Mock data for demo purposes
export const categories = [
  {
    id: 'components',
    name: 'Computer Components',
    slug: 'components',
    description: 'Build your perfect system with our range of components',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subcategories: ['CPUs', 'Motherboards', 'Memory', 'Video Cards', 'Storage'],
  },
  {
    id: 'laptops',
    name: 'Laptops & Notebooks',
    slug: 'laptops',
    description: 'Find the perfect portable computer for your needs',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subcategories: ['Gaming Laptops', 'Business Laptops', '2-in-1 Laptops', 'Chromebooks'],
  },
  {
    id: 'peripherals',
    name: 'Peripherals',
    slug: 'peripherals',
    description: 'Enhance your setup with our range of accessories',
    image: 'https://images.pexels.com/photos/1694683/pexels-photo-1694683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subcategories: ['Monitors', 'Keyboards', 'Mice', 'Headsets', 'Webcams'],
  },
  {
    id: 'networking',
    name: 'Networking',
    slug: 'networking',
    description: 'Stay connected with our networking solutions',
    image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subcategories: ['Routers', 'Switches', 'Modems', 'Network Cards', 'Access Points'],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Level up your gaming experience',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subcategories: ['Gaming PCs', 'Gaming Monitors', 'Controllers', 'Gaming Chairs', 'Consoles'],
  },
  {
    id: 'software',
    name: 'Software & Services',
    slug: 'software',
    description: 'Essential software for your digital life',
    image: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subcategories: ['Operating Systems', 'Office Software', 'Antivirus', 'Design Software', 'Game Keys'],
  },
];

export const featuredProducts = [
  {
    id: 'p1',
    name: 'Shark Force X Gaming PC',
    slug: 'shark-force-x-gaming-pc',
    category: 'gaming',
    price: 1299.99,
    salePrice: 1199.99,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      processor: 'Intel Core i7-13700K',
      memory: '32GB DDR5',
      storage: '1TB NVMe SSD',
      graphics: 'NVIDIA RTX 4070 8GB',
    },
    description: 'Dominate your games with this high-performance gaming PC. Features the latest Intel Core i7 processor and NVIDIA RTX graphics for smooth gameplay and incredible visuals.',
  },
  {
    id: 'p2',
    name: 'AquaShark Ultra Thin Laptop',
    slug: 'aquashark-ultra-thin-laptop',
    category: 'laptops',
    price: 899.99,
    salePrice: null,
    rating: 4.5,
    reviews: 87,
    stock: 23,
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      processor: 'AMD Ryzen 7 7800X',
      memory: '16GB LPDDR5',
      storage: '512GB NVMe SSD',
      display: '14" 2.8K OLED',
    },
    description: 'Sleek, powerful, and portable. This premium laptop delivers exceptional performance in a lightweight design, perfect for professionals on the go.',
  },
  {
    id: 'p3',
    name: 'SharkVision 27" Gaming Monitor',
    slug: 'sharkvision-27-gaming-monitor',
    category: 'peripherals',
    price: 349.99,
    salePrice: 299.99,
    rating: 4.7,
    reviews: 156,
    stock: 42,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      panel: 'IPS',
      resolution: '2560x1440 (QHD)',
      refreshRate: '165Hz',
      responseTime: '1ms',
    },
    description: 'Immerse yourself in your games with this high-performance monitor featuring a 165Hz refresh rate and 1ms response time for ultra-smooth gameplay.',
  },
  {
    id: 'p4',
    name: 'DeepSea Mechanical Keyboard',
    slug: 'deepsea-mechanical-keyboard',
    category: 'peripherals',
    price: 129.99,
    salePrice: 99.99,
    rating: 4.6,
    reviews: 78,
    stock: 35,
    image: 'https://images.pexels.com/photos/3695456/pexels-photo-3695456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      switches: 'Cherry MX Blue',
      backlighting: 'RGB',
      layout: 'Full-size with numpad',
      connectivity: 'USB-C, Bluetooth',
    },
    description: 'Enhance your typing and gaming experience with this premium mechanical keyboard. Features customizable RGB lighting and durable Cherry MX switches.',
  },
  {
    id: 'p5',
    name: 'SharkByte SSD 2TB',
    slug: 'sharkbyte-ssd-2tb',
    category: 'components',
    price: 189.99,
    salePrice: 159.99,
    rating: 4.9,
    reviews: 203,
    stock: 68,
    image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      capacity: '2TB',
      interface: 'NVMe PCIe Gen4',
      readSpeed: '7000 MB/s',
      writeSpeed: '5300 MB/s',
    },
    description: 'Upgrade your system with lightning-fast storage. This NVMe SSD delivers exceptional speed and reliability for both gaming and productivity.',
  },
  {
    id: 'p6',
    name: 'SharkTooth Wireless Gaming Headset',
    slug: 'sharktooth-wireless-gaming-headset',
    category: 'peripherals',
    price: 149.99,
    salePrice: 129.99,
    rating: 4.5,
    reviews: 92,
    stock: 27,
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      connectivity: 'Wireless (2.4GHz), Bluetooth',
      batteryLife: 'Up to 30 hours',
      microphone: 'Noise-cancelling detachable',
      audioFeatures: '7.1 virtual surround sound',
    },
    description: 'Immerse yourself in crystal-clear audio with this premium wireless gaming headset. Features comfortable ear cups and a detachable microphone for clear communication.',
  },
  {
    id: 'p7',
    name: 'Shark Router Pro',
    slug: 'shark-router-pro',
    category: 'networking',
    price: 179.99,
    salePrice: null,
    rating: 4.7,
    reviews: 65,
    stock: 19,
    image: 'https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      wifiStandard: 'Wi-Fi 6E',
      bands: 'Tri-band',
      ports: '4x Gigabit LAN, 1x 2.5G WAN',
      coverage: 'Up to 2,500 sq ft',
    },
    description: 'Experience blazing-fast internet throughout your home with this advanced Wi-Fi 6E router. Perfect for gaming, streaming, and supporting multiple devices.',
  },
  {
    id: 'p8',
    name: 'Predator Graphics Card RTX 4080',
    slug: 'predator-graphics-card-rtx-4080',
    category: 'components',
    price: 899.99,
    salePrice: 849.99,
    rating: 4.9,
    reviews: 47,
    stock: 8,
    image: 'https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specs: {
      model: 'NVIDIA RTX 4080',
      memory: '16GB GDDR6X',
      cooling: 'Triple fan design',
      ports: '3x DisplayPort 1.4a, 1x HDMI 2.1',
    },
    description: 'Take your gaming to the next level with this powerful graphics card. The RTX 4080 delivers exceptional performance for gaming and content creation.',
  },
];

export const deals = [
  {
    id: 'd1',
    title: 'Summer Sale',
    description: 'Save up to 30% on selected gaming PCs and laptops',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/deals/summer-sale',
  },
  {
    id: 'd2',
    title: 'Peripherals Bundle',
    description: 'Get 20% off when you buy a keyboard, mouse and headset',
    image: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/deals/peripherals-bundle',
  },
  {
    id: 'd3',
    title: 'Storage Upgrade Event',
    description: 'All SSDs and HDDs on special discount this week',
    image: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/deals/storage-event',
  },
];

export const popularSearches = [
  'RTX 4080',
  'Gaming Laptop',
  'Mechanical Keyboard',
  'Samsung SSD',
  'Wireless Mouse',
  'Gaming Monitor',
  'Ryzen CPU',
  'Memory RAM',
];

export const getAllProducts = () => {
  return featuredProducts;
};

export const getProductBySlug = (slug: string) => {
  return featuredProducts.find((product) => product.slug === slug);
};

export const getProductsByCategory = (categoryId: string) => {
  return featuredProducts.filter((product) => product.category === categoryId);
};

export const getCategories = () => {
  return categories;
};

export const getCategoryBySlug = (slug: string) => {
  return categories.find((category) => category.slug === slug);
};