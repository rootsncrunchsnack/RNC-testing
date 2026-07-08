import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data/content";
import { ProductGrid } from "../components/product/ProductRail";
import { fetchProducts } from "../lib/mockApi";
import type { Product } from "../types";

const PAGE_SIZE = 8;
type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("cat") || "all";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(500);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ category: activeCat }).then((data) => {
      setProducts(data);
      setLoading(false);
      setPage(1);
    });
  }, [activeCat]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.packs[0].price <= maxPrice);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.packs[0].price - b.packs[0].price); break;
      case "price-desc": list = [...list].sort((a, b) => b.packs[0].price - a.packs[0].price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [products, sort, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setCat = (key: string) => setParams(key === "all" ? {} : { cat: key });

  return (
    <div className="max-w-6xl mx-auto px-5 py-5">
      <nav className="text-[12px] text-ink-soft mb-3 flex items-center gap-1.5">
        <Link to="/" className="hover:text-orange-2">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-maroon font-semibold">Shop</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-maroon">
          {activeCat === "all" ? "All Products" : CATEGORIES.find((c) => c.key === activeCat)?.name}
        </h1>
        <button onClick={() => setFiltersOpen(true)} className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-maroon border border-black/10 rounded-full px-3 py-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5 pb-1">
        {["all", ...CATEGORIES.map((c) => c.key)].map((key) => {
          const label = key === "all" ? "All Products" : CATEGORIES.find((c) => c.key === key)?.name;
          return (
            <button
              key={key}
              onClick={() => setCat(key)}
              className={`flex-none px-3.5 py-1.5 rounded-full text-[12px] font-bold border whitespace-nowrap ${
                activeCat === key ? "bg-maroon text-white border-maroon" : "bg-paper text-maroon border-black/10"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <FilterPanel
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          sort={sort}
          setSort={setSort}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div>
          <div className="hidden lg:flex justify-end mb-3">
            <SortSelect sort={sort} setSort={setSort} />
          </div>

          {!loading && filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-maroon font-bold mb-1">No products match your filters</p>
              <p className="text-sm text-ink-soft">Try adjusting the price range or category.</p>
            </div>
          ) : (
            <ProductGrid products={pageItems} loading={loading} />
          )}

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-xs font-bold ${page === i + 1 ? "bg-orange text-white" : "bg-paper border border-black/10 text-maroon"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SortSelect({ sort, setSort }: { sort: SortKey; setSort: (s: SortKey) => void }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value as SortKey)}
      className="text-[12.5px] font-semibold border border-black/10 rounded-full px-3 py-1.5 bg-paper text-maroon outline-none"
    >
      <option value="featured">Sort: Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
}

function FilterPanel({
  open, onClose, sort, setSort, maxPrice, setMaxPrice,
}: {
  open: boolean; onClose: () => void; sort: SortKey; setSort: (s: SortKey) => void; maxPrice: number; setMaxPrice: (n: number) => void;
}) {
  const content = (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2">Sort By</h4>
        <SortSelect sort={sort} setSort={setSort} />
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2">Max Price: ₹{maxPrice}</h4>
        <input type="range" min={99} max={500} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-orange" />
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block bg-paper border border-black/5 rounded-2xl p-4 h-max sticky top-20">{content}</aside>
      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-paper p-5 shadow-lift">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-maroon">Filters</h3>
              <button onClick={onClose}><X className="w-5 h-5" /></button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
