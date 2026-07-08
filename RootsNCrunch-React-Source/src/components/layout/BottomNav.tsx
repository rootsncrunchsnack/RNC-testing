import { NavLink } from "react-router-dom";
import { Home, Grid2x2, Heart, User, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function BottomNav() {
  const { count } = useCart();
  const { ids } = useWishlist();

  const items = [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/shop", label: "Categories", icon: Grid2x2 },
    { to: "/wishlist", label: "Wishlist", icon: Heart, badge: ids.length },
    { to: "/cart", label: "Cart", icon: ShoppingBag, badge: count },
    { to: "/account", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-paper border-t border-black/5 lg:hidden">
      <div className="flex">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2 relative ${isActive ? "text-orange" : "text-ink-soft"}`
            }
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {!!item.badge && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-orange text-white text-[8px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[9.5px] font-bold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
