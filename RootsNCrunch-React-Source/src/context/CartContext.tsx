import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getProductById } from "../data/products";
import type { CartLine } from "../types";
import { useToast } from "./ToastContext";

interface CartContextValue {
  lines: CartLine[];
  addItem: (productId: string, packSize: string, qty?: number) => void;
  removeItem: (productId: string, packSize: string) => void;
  setQty: (productId: string, packSize: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useLocalStorage<CartLine[]>("rnc_cart_v2", []);
  const { show } = useToast();

  const addItem = (productId: string, packSize: string, qty = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId && l.packSize === packSize);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { productId, packSize, qty }];
    });
    const product = getProductById(productId);
    show(`Added ${product?.name ?? "item"} to cart`, "success");
  };

  const removeItem = (productId: string, packSize: string) => {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.packSize === packSize)));
  };

  const setQty = (productId: string, packSize: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.productId === productId && l.packSize === packSize ? { ...l, qty: Math.max(1, qty) } : l))
    );
  };

  const clear = () => setLines([]);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(() => {
    return lines.reduce((sum, l) => {
      const product = getProductById(l.productId);
      const pack = product?.packs.find((p) => p.size === l.packSize);
      return sum + (pack?.price ?? 0) * l.qty;
    }, 0);
  }, [lines]);

  return (
    <CartContext.Provider value={{ lines, addItem, removeItem, setQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
