import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/content";

export default function CategoryStrip() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      <h2 className="text-lg font-bold text-maroon mb-3">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {CATEGORIES.map((c) => (
          <Link key={c.key} to={`/shop?cat=${c.key}`} className="group flex flex-col items-center gap-2">
            <div className="relative w-full aspect-square rounded-full overflow-hidden bg-cream-2 border border-black/5">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {c.isNew && <span className="absolute top-1 right-1 bg-leaf text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">New</span>}
            </div>
            <span className="text-[11px] sm:text-[12.5px] font-extrabold text-maroon text-center">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
