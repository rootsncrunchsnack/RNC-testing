import { Link } from "react-router-dom";
import { X, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  if (!open) return null;

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop All" },
    { to: "/shop?cat=thekua", label: "Thekua" },
    { to: "/shop?cat=makhana", label: "Makhana" },
    { to: "/shop?cat=peanuts", label: "Peanuts & Bites" },
    { to: "/recipes", label: "Traditional Recipes" },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[80%] bg-paper shadow-lift p-5 flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <img src="/logo.png" alt="Roots N Crunch" className="h-6" />
          <button onClick={onClose} aria-label="Close menu"><X className="w-5 h-5 text-maroon" /></button>
        </div>

        {user ? (
          <Link to="/account" onClick={onClose} className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-cream">
            <div className="w-9 h-9 rounded-full bg-orange text-white flex items-center justify-center font-bold">{user.name[0]}</div>
            <div>
              <p className="text-sm font-bold text-maroon">{user.name}</p>
              <p className="text-[11px] text-ink-soft">View account</p>
            </div>
          </Link>
        ) : (
          <Link to="/login" onClick={onClose} className="flex items-center gap-2 mb-6 p-3 rounded-2xl bg-cream text-maroon font-bold text-sm">
            <User className="w-4 h-4" /> Login / Sign up
          </Link>
        )}

        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose} className="px-3 py-2.5 rounded-xl text-sm font-semibold text-maroon hover:bg-cream">
              {l.label}
            </Link>
          ))}
        </nav>

        {user && (
          <button
            onClick={() => { logout(); onClose(); }}
            className="mt-auto flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        )}
      </div>
    </div>
  );
}
