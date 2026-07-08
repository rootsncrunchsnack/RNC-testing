import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { fetchProductBySlug } from "../lib/mockApi";
import { getRelated, PRODUCTS } from "../data/products";
import type { Product } from "../types";
import { formatINR } from "../lib/format";
import { QuantityStepper, StarRating } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { ProductRail } from "../components/product/ProductRail";

type Tab = "details" | "nutrition" | "reviews";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [packIdx, setPackIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [imgSide, setImgSide] = useState<"front" | "back">("front");
  const [tab, setTab] = useState<Tab>("details");
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { show } = useToast();
  const { ids: recentIds, record } = useRecentlyViewed();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProductBySlug(slug).then((p) => {
      setProduct(p ?? null);
      setLoading(false);
      setPackIdx(0);
      setQty(1);
      setTab("details");
      if (p) record(p.id);
      window.scrollTo(0, 0);
    });
  }, [slug]);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-5 py-10 text-center text-ink-soft">Loading product...</div>;
  }
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-16 text-center">
        <h2 className="text-xl font-bold text-maroon mb-2">Product not found</h2>
        <p className="text-sm text-ink-soft mb-5">This product may have been removed or the link is incorrect.</p>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const pack = product.packs[packIdx];
  const related = getRelated(product);
  const recentlyViewed = PRODUCTS.filter((p) => recentIds.includes(p.id) && p.id !== product.id);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      show("Link copied to clipboard", "info");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-5">
      <nav className="text-[12px] text-ink-soft mb-4 flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-orange-2">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-orange-2">{product.categoryLabel}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-maroon font-semibold">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square rounded-3xl overflow-hidden bg-cream-2 relative">
            <img src={imgSide === "front" ? product.image : product.imageBack} alt={product.name} className="w-full h-full object-cover" />
            {product.badges.includes("bestseller") && <span className="absolute top-3 left-3 bg-maroon text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">Bestseller</span>}
          </div>
          <div className="flex gap-2 mt-3">
            {(["front", "back"] as const).map((side) => (
              <button key={side} onClick={() => setImgSide(side)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${imgSide === side ? "border-orange" : "border-transparent"}`}>
                <img src={side === "front" ? product.image : product.imageBack} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold text-orange-2 uppercase tracking-wide">{product.categoryLabel}</span>
          <h1 className="text-2xl font-bold text-maroon mt-1">{product.name}</h1>
          <p className="text-[13.5px] text-ink-soft mt-1">{product.tagline}</p>
          <div className="mt-2"><StarRating rating={product.rating} count={product.reviewCount} size={14} /></div>

          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-2xl font-extrabold text-maroon">{formatINR(pack.price)}</span>
            {pack.mrp > pack.price && (
              <>
                <span className="text-sm text-ink-soft line-through">{formatINR(pack.mrp)}</span>
                <span className="text-xs font-bold text-leaf-2 bg-leaf-tint px-2 py-0.5 rounded-full">{Math.round((1 - pack.price / pack.mrp) * 100)}% OFF</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-ink-soft mt-1">Inclusive of all taxes</p>

          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2">Pack Size</h4>
            <div className="flex gap-2">
              {product.packs.map((p, i) => (
                <button
                  key={p.size}
                  onClick={() => setPackIdx(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border ${i === packIdx ? "bg-maroon text-white border-maroon" : "border-black/10 text-maroon"}`}
                >
                  {p.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft">Quantity</h4>
            <QuantityStepper qty={qty} onChange={setQty} />
          </div>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" full icon={<ShoppingCart className="w-4 h-4" />} onClick={() => addItem(product.id, pack.size, qty)}>
              Add to Cart
            </Button>
            <Button variant="primary" full onClick={() => { addItem(product.id, pack.size, qty); navigate("/checkout"); }}>
              Buy Now
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => toggle(product.id)} className="flex-1 flex items-center justify-center gap-2 border border-black/10 rounded-full py-2 text-sm font-bold text-maroon">
              <Heart className={`w-4 h-4 ${has(product.id) ? "fill-orange text-orange" : ""}`} /> {has(product.id) ? "Wishlisted" : "Wishlist"}
            </button>
            <button onClick={share} className="flex-1 flex items-center justify-center gap-2 border border-black/10 rounded-full py-2 text-sm font-bold text-maroon">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {product.tags.map((t) => (
              <span key={t} className="text-[10.5px] font-bold text-leaf-2 bg-leaf-tint px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-2 border-b border-black/10 mb-4">
          {(["details", "nutrition", "reviews"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-bold capitalize border-b-2 -mb-px ${tab === t ? "border-orange text-maroon" : "border-transparent text-ink-soft"}`}
            >
              {t === "reviews" ? `Reviews (${product.reviewCount})` : t}
            </button>
          ))}
        </div>

        {tab === "details" && <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">{product.description}</p>}

        {tab === "nutrition" && (
          <div className="max-w-md divide-y divide-black/5 border border-black/5 rounded-xl overflow-hidden">
            {product.nutrition.map((n) => (
              <div key={n.label} className="flex justify-between px-4 py-2.5 text-sm bg-paper">
                <span className="text-ink-soft">{n.label}</span>
                <span className="font-bold text-maroon">{n.value}</span>
              </div>
            ))}
            <p className="px-4 py-2 text-[11px] text-ink-soft bg-cream">Per 100g serving, approximate values</p>
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-4 max-w-xl">
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b border-black/5 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-maroon">{r.author}</span>
                  <span className="text-[11px] text-ink-soft">{r.date}</span>
                </div>
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "text-orange fill-orange" : "text-black/10"}`} />
                  ))}
                </div>
                <p className="text-[13px] text-ink-soft">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10"><ProductRail title="You May Also Like" products={related} /></div>
      {recentlyViewed.length > 0 && (
        <div className="mt-10"><ProductRail title="Recently Viewed" products={recentlyViewed} /></div>
      )}
    </div>
  );
}
