import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Heart, ShoppingCart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { CardSkeleton } from "../ui/Primitives";
import { StarRating } from "../ui/Primitives";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatINR } from "../../lib/format";
import { Button } from "../ui/Button";

export function ProductGrid({ products, loading }: { products: Product[]; loading?: boolean }) {
  const [quickView, setQuickView] = useState<Product | null>(null);
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
        ))}
      </div>
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </>
  );
}

export function ProductRail({ products, title, viewAllHref }: { products: Product[]; title?: string; viewAllHref?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const scroll = (dir: number) => railRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-maroon">{title}</h2>
          {viewAllHref && (
            <Link to={viewAllHref} className="text-xs font-extrabold text-orange-2 flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="hidden sm:flex absolute -left-3 top-1/3 z-10 w-8 h-8 rounded-full bg-paper border border-black/10 shadow-card items-center justify-center text-maroon"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="hidden sm:flex absolute -right-3 top-1/3 z-10 w-8 h-8 rounded-full bg-paper border border-black/10 shadow-card items-center justify-center text-maroon"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div ref={railRef} className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x">
          {products.map((p) => (
            <div key={p.id} className="flex-none w-[150px] snap-start">
              <ProductCard product={p} onQuickView={setQuickView} />
            </div>
          ))}
        </div>
      </div>
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}

function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [packIdx, setPackIdx] = useState(0);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const pack = product.packs[packIdx];

  const share = async () => {
    const url = `${window.location.origin}/product/${product.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        /* user cancelled share */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-paper rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[88vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] bg-cream-2">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <span className="text-[10px] font-bold text-orange-2 uppercase tracking-wide">{product.categoryLabel}</span>
          <h3 className="text-xl font-bold text-maroon mt-1">{product.name}</h3>
          <div className="mt-1"><StarRating rating={product.rating} count={product.reviewCount} /></div>
          <p className="text-[13px] text-ink-soft mt-3 line-clamp-2">{product.tagline}</p>

          <div className="flex gap-2 mt-4">
            {product.packs.map((p, i) => (
              <button
                key={p.size}
                onClick={() => setPackIdx(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${i === packIdx ? "bg-maroon text-white border-maroon" : "border-black/15 text-maroon"}`}
              >
                {p.size}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-extrabold text-maroon">{formatINR(pack.price)}</span>
            <div className="flex gap-2">
              <button onClick={() => toggle(product.id)} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                <Heart className={`w-4 h-4 ${has(product.id) ? "fill-orange text-orange" : "text-ink-soft"}`} />
              </button>
              <button onClick={share} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-ink-soft" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="primary" full icon={<ShoppingCart className="w-4 h-4" />} onClick={() => { addItem(product.id, pack.size, 1); onClose(); }}>
              Add to Cart
            </Button>
          </div>
          <Link to={`/product/${product.slug}`} className="block text-center text-xs font-bold text-orange-2 mt-3">
            View full details
          </Link>
        </div>
      </div>
    </div>
  );
}
