import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { PRODUCTS } from "../data/products";
import { ProductGrid } from "../components/product/ProductRail";
import { EmptyState } from "../components/ui/Primitives";
import { LinkButton } from "../components/ui/Button";

export default function Wishlist() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <h1 className="text-xl font-bold text-maroon mb-5">My Wishlist ({products.length})</h1>
      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          subtitle="Tap the heart on any product to save it here for later."
          action={<LinkButton to="/shop">Browse Products</LinkButton>}
        />
      ) : (
        <ProductGrid products={products} />
      )}
      {products.length > 0 && (
        <p className="text-center text-xs text-ink-soft mt-6">
          Looking for something else? <Link to="/shop" className="text-orange-2 font-bold">Browse all products</Link>
        </p>
      )}
    </div>
  );
}
