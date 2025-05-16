import { HeroSlider } from '@/components/home/hero-slider';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { PromoBanners } from '@/components/home/promo-banners';
import { BrandsSection } from '@/components/brands-section';

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanners />
      <BrandsSection />
    </div>
  );
}