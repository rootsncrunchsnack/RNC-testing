import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Address, Order, User } from "../types";
import { useToast } from "./ToastContext";

interface StoredUser extends User {
  password: string;
  orders: Order[];
}

interface AuthContextValue {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addAddress: (address: Omit<Address, "id">) => void;
  placeOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<StoredUser[]>("rnc_users", []);
  const [sessionEmail, setSessionEmail] = useLocalStorage<string | null>("rnc_session", null);
  const { show } = useToast();

  const stored = users.find((u) => u.email === sessionEmail) ?? null;
  const user: User | null = stored ? { id: stored.id, name: stored.name, email: stored.email, addresses: stored.addresses } : null;
  const orders = stored?.orders ?? [];

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      show("Invalid email or password", "error");
      return false;
    }
    setSessionEmail(found.email);
    show(`Welcome back, ${found.name.split(" ")[0]}!`, "success");
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      show("An account with this email already exists", "error");
      return false;
    }
    const newUser: StoredUser = { id: "u" + Date.now(), name, email, password, addresses: [], orders: [] };
    setUsers((prev) => [...prev, newUser]);
    setSessionEmail(email);
    show(`Welcome to Roots N Crunch, ${name.split(" ")[0]}!`, "success");
    return true;
  };

  const logout = () => {
    setSessionEmail(null);
    show("Logged out successfully", "info");
  };

  const addAddress = (address: Omit<Address, "id">) => {
    if (!stored) return;
    const newAddr: Address = { ...address, id: "a" + Date.now() };
    setUsers((prev) => prev.map((u) => (u.email === stored.email ? { ...u, addresses: [...u.addresses, newAddr] } : u)));
  };

  const placeOrder = (order: Omit<Order, "id" | "date" | "status">): Order => {
    const newOrder: Order = { ...order, id: "ORD" + Date.now().toString().slice(-8), date: new Date().toISOString(), status: "Placed" };
    if (stored) {
      setUsers((prev) => prev.map((u) => (u.email === stored.email ? { ...u, orders: [newOrder, ...u.orders] } : u)));
    }
    return newOrder;
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, signup, logout, addAddress, placeOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
