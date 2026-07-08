import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { fetchProducts } from "../lib/mockApi";
import { ProductGrid } from "../components/product/ProductRail";
import { EmptyState } from "../components/ui/Primitives";
import { useRecentSearches } from "../hooks/useRecentlyViewed";
import type { Product } from "../types";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [input, setInput] = useState(q);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { terms, record, clear } = useRecentSearches();

  useEffect(() => setInput(q), [q]);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    setLoading(true);
    fetchProducts({ query: q }).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [q]);

  const submit = (term: string) => {
    if (!term.trim()) return;
    record(term);
    setParams({ q: term });
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-6">
      <div className="flex items-center gap-2 border border-black/10 rounded-full px-4 py-2.5 bg-paper mb-5">
        <SearchIcon className="w-4 h-4 text-ink-soft flex-none" />
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(input)}
          placeholder="Search for makhana, thekua, chikki..."
          className="flex-1 outline-none text-sm bg-transparent"
        />
        {input && <button onClick={() => setInput("")}><X className="w-4 h-4 text-ink-soft" /></button>}
      </div>

      {!q && (
        <div>
          {terms.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft">Recent Searches</h4>
                <button onClick={clear} className="text-[11px] text-orange-2 font-bold">Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {terms.map((t) => (
                  <button key={t} onClick={() => submit(t)} className="text-xs font-semibold bg-cream-2 text-maroon px-3 py-1.5 rounded-full">{t}</button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-soft mb-2">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {["Makhana", "Thekua", "Chikki", "Peri Peri", "Combo"].map((t) => (
                <button key={t} onClick={() => submit(t)} className="text-xs font-semibold bg-cream-2 text-maroon px-3 py-1.5 rounded-full">{t}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {q && (
        <>
          <p className="text-sm text-ink-soft mb-4">
            {loading ? "Searching..." : `${results.length} result${results.length === 1 ? "" : "s"} for "${q}"`}
          </p>
          {!loading && results.length === 0 ? (
            <EmptyState icon={SearchIcon} title="No results found" subtitle="Try a different keyword or browse our categories instead." />
          ) : (
            <ProductGrid products={results} loading={loading} />
          )}
        </>
      )}
    </div>
  );
}
