import { useEffect, useState } from "react";
import Marquee from "../components/layout/Marquee";
import HeroSlider from "../components/home/HeroSlider";
import TrustBadges from "../components/home/TrustBadges";
import BenefitsRow from "../components/home/BenefitsRow";
import CategoryStrip from "../components/home/CategoryStrip";
import MoodRecommender from "../components/home/MoodRecommender";
import TraditionalRecipesPreview from "../components/home/TraditionalRecipesPreview";
import { ComboBanner, BottomBenefitCards } from "../components/home/PromoSections";
import SocialProof from "../components/home/SocialProof";
import { ProductRail } from "../components/product/ProductRail";
import { PRODUCTS } from "../data/products";
import { fetchProducts } from "../lib/mockApi";
import type { Product } from "../types";

export default function Home() {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setBestsellers(data);
      setLoading(false);
    });
  }, []);

  const trending = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
  const newArrivals = PRODUCTS.filter((p) => p.badges.includes("new"));

  return (
    <div className="pb-6">
      <Marquee />
      <HeroSlider />

      <div className="my-6"><TrustBadges /></div>
      <BenefitsRow />
      <div className="my-7"><CategoryStrip /></div>
      <div className="mb-8"><MoodRecommender /></div>
      <div className="mb-8"><TraditionalRecipesPreview /></div>
      <div className="mb-8"><ComboBanner /></div>

      <div className="max-w-6xl mx-auto px-5 mb-8">
        <ProductRail
          title="Our Bestsellers"
          viewAllHref="/shop"
          products={loading ? [] : bestsellers}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 mb-8">
        <ProductRail title="Trending Now" viewAllHref="/shop" products={trending} />
      </div>

      {newArrivals.length > 0 && (
        <div className="max-w-6xl mx-auto px-5 mb-8">
          <ProductRail title="New Arrivals" viewAllHref="/shop" products={newArrivals} />
        </div>
      )}

      <div className="mb-8"><BottomBenefitCards /></div>
      <SocialProof />
    </div>
  );
}
