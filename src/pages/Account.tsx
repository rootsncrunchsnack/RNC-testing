import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Package, MapPin, User as UserIcon, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../data/products";
import { formatINR } from "../lib/format";
import { EmptyState } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";

type Tab = "orders" | "addresses" | "profile";

export default function Account() {
  const { user, orders, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");

  if (!user) return null; // ProtectedRoute guarantees this won't render, guards TypeScript null checks

  return (
    <div className="max-w-4xl mx-auto px-5 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-lg">{user.name[0]}</div>
        <div>
          <p className="font-bold text-maroon">Hello, {user.name.split(" ")[0]}</p>
          <p className="text-xs text-ink-soft">{user.email}</p>
        </div>
        <button onClick={logout} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-red-600">
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        <TabBtn active={tab === "orders"} onClick={() => setTab("orders")} icon={Package} label="Orders" />
        <TabBtn active={tab === "addresses"} onClick={() => setTab("addresses")} icon={MapPin} label="Addresses" />
        <TabBtn active={tab === "profile"} onClick={() => setTab("profile")} icon={UserIcon} label="Profile" />
      </div>

      {tab === "orders" && (
        orders.length === 0 ? (
          <EmptyState icon={Package} title="No orders yet" subtitle="Your placed orders will show up here." action={<Link to="/shop"><Button>Shop Now</Button></Link>} />
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="bg-paper border border-black/5 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-maroon text-sm">#{o.id}</span>
                  <span className="text-[11px] font-bold text-leaf-2 bg-leaf-tint px-2 py-0.5 rounded-full">{o.status}</span>
                </div>
                <p className="text-[11px] text-ink-soft mb-2">{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                <div className="space-y-1 mb-2">
                  {o.items.map((it, i) => {
                    const p = getProductById(it.productId);
                    return (
                      <div key={i} className="flex justify-between text-[12.5px]">
                        <span className="text-ink-soft truncate pr-2">{p?.name ?? "Item"} ({it.packSize}) × {it.qty}</span>
                        <span className="font-semibold text-maroon flex-none">{formatINR(it.price * it.qty)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between border-t border-black/5 pt-2 font-extrabold text-maroon text-sm">
                  <span>Total</span><span>{formatINR(o.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "addresses" && (
        user.addresses.length === 0 ? (
          <EmptyState icon={MapPin} title="No saved addresses" subtitle="Addresses you use at checkout will be saved here." />
        ) : (
          <div className="space-y-3">
            {user.addresses.map((a) => (
              <div key={a.id} className="bg-paper border border-black/5 rounded-2xl p-4 flex items-start justify-between">
                <div>
                  <p className="font-bold text-maroon text-sm">{a.name}</p>
                  <p className="text-[12.5px] text-ink-soft">{a.line1}, {a.city}, {a.state} - {a.pincode}</p>
                  <p className="text-[12.5px] text-ink-soft">{a.phone}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-ink-soft flex-none" />
              </div>
            ))}
          </div>
        )
      )}

      {tab === "profile" && (
        <div className="bg-paper border border-black/5 rounded-2xl p-5 space-y-3 max-w-sm">
          <div><p className="text-[11px] font-bold text-ink-soft uppercase">Name</p><p className="text-sm font-semibold text-maroon">{user.name}</p></div>
          <div><p className="text-[11px] font-bold text-ink-soft uppercase">Email</p><p className="text-sm font-semibold text-maroon">{user.email}</p></div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof Package; label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border ${active ? "bg-maroon text-white border-maroon" : "bg-paper text-maroon border-black/10"}`}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </button>
  );
}
