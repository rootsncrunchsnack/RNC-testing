import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getProductById } from "../data/products";
import { useToast } from "./ToastContext";

interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<string[]>("rnc_wishlist_v2", []);
  const { show } = useToast();

  const toggle = (productId: string) => {
    setIds((prev) => {
      const exists = prev.includes(productId);
      const product = getProductById(productId);
      show(exists ? `Removed ${product?.name ?? "item"} from wishlist` : `Added ${product?.name ?? "item"} to wishlist`, "info");
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const has = (productId: string) => ids.includes(productId);

  return <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
