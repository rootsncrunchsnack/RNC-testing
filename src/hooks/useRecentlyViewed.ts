import { useLocalStorage } from "./useLocalStorage";

export function useRecentlyViewed() {
  const [ids, setIds] = useLocalStorage<string[]>("rnc_recently_viewed", []);
  const record = (productId: string) => {
    setIds((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  };
  return { ids, record };
}

export function useRecentSearches() {
  const [terms, setTerms] = useLocalStorage<string[]>("rnc_recent_searches", []);
  const record = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setTerms((prev) => [trimmed, ...prev.filter((t) => t.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6));
  };
  const clear = () => setTerms([]);
  return { terms, record, clear };
}
