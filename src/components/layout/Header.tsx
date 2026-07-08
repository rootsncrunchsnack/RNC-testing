import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useRecentSearches } from "../../hooks/useRecentlyViewed";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { terms, record } = useRecentSearches();
  const navigate = useNavigate();

  const submitSearch = (q: string) => {
    if (!q.trim()) return;
    record(q);
    setSearchOpen(false);
    setQuery("");
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-3 sm:px-6 py-2.5">
          <button className="w-9 h-9 flex items-center justify-center text-maroon lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex-none">
            <img src="/logo.png" alt="Roots N Crunch" className="h-6 sm:h-7" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-6 text-sm font-bold text-maroon">
            <Link to="/shop" className="hover:text-orange-2">Shop</Link>
            <Link to="/shop?cat=thekua" className="hover:text-orange-2">Thekua</Link>
            <Link to="/shop?cat=makhana" className="hover:text-orange-2">Makhana</Link>
            <Link to="/recipes" className="hover:text-orange-2">Recipes</Link>
            <Link to="/contact" className="hover:text-orange-2">Contact</Link>
          </nav>

          {searchOpen ? (
            <div className="flex-1 flex items-center gap-2 bg-paper border border-black/10 rounded-full px-3 py-1.5">
              <Search className="w-4 h-4 text-ink-soft flex-none" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch(query)}
                placeholder="Search for healthy snacks..."
                className="flex-1 bg-transparent outline-none text-[13px] min-w-0"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="w-4 h-4 text-ink-soft" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex-1 flex items-center gap-2 bg-paper border border-black/10 rounded-full px-3 py-1.5 text-ink-soft text-[13px] min-w-0"
            >
              <Search className="w-4 h-4 flex-none" />
              <span className="truncate">Search for healthy snacks...</span>
            </button>
          )}

          <Link to="/wishlist" className="relative w-9 h-9 flex-none items-center justify-center text-maroon hidden sm:flex" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
            {ids.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-orange text-white text-[9px] font-bold flex items-center justify-center">{ids.length}</span>}
          </Link>
          <Link to="/cart" className="relative w-9 h-9 flex-none hidden sm:flex items-center justify-center text-maroon" aria-label="Cart">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-orange text-white text-[9px] font-bold flex items-center justify-center">{count}</span>}
          </Link>
        </div>

        {searchOpen && (query === "" && terms.length > 0) && (
          <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-3 flex flex-wrap gap-2">
            <span className="text-[11px] text-ink-soft font-semibold">Recent:</span>
            {terms.map((t) => (
              <button key={t} onClick={() => submitSearch(t)} className="text-[11px] bg-cream-2 text-maroon px-2.5 py-1 rounded-full font-semibold">
                {t}
              </button>
            ))}
          </div>
        )}
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
