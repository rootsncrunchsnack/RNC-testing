import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { StarRating, Badge } from "../ui/Primitives";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { formatINR } from "../../lib/format";

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (p: Product) => void }) {
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const pack = product.packs[0];
  const wished = has(product.id);

  return (
    <div className="group relative bg-paper rounded-2xl border border-black/5 shadow-card overflow-hidden flex flex-col">
      <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-cream-2 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {product.badges.includes("bestseller") && (
          <span className="absolute top-2 left-2 bg-maroon text-white text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">Bestseller</span>
        )}
        {product.badges.includes("new") && (
          <span className="absolute top-2 left-2 bg-leaf text-white text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">New</span>
        )}
      </Link>
      <button
        onClick={() => toggle(product.id)}
        aria-label="Toggle wishlist"
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-card"
      >
        <Heart className={`w-4 h-4 ${wished ? "fill-orange text-orange" : "text-ink-soft"}`} />
      </button>
      {onQuickView && (
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4 text-ink-soft" />
        </button>
      )}
      <div className="p-3 flex-1 flex flex-col">
        <span className="text-[10px] font-bold text-orange-2 uppercase tracking-wide mb-0.5">{product.categoryLabel}</span>
        <Link to={`/product/${product.slug}`}>
          <h4 className="text-[13px] font-bold text-maroon leading-snug line-clamp-2 mb-1">{product.name}</h4>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex flex-wrap gap-1 my-2">
          {product.tags.slice(0, 2).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-extrabold text-maroon">{formatINR(pack.price)}</span>
            {pack.mrp > pack.price && <span className="text-[11px] text-ink-soft line-through">{formatINR(pack.mrp)}</span>}
          </div>
          <button
            onClick={() => addItem(product.id, pack.size, 1)}
            aria-label="Add to cart"
            className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
