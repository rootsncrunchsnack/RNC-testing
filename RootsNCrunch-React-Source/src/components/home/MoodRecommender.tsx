import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Zap, Wind, Utensils, Target, ArrowRight } from "lucide-react";
import { MOODS } from "../../data/content";
import { getProductById } from "../../data/products";
import { formatINR } from "../../lib/format";
import { Button } from "../ui/Button";

const ICONS: Record<string, typeof Leaf> = { leaf: Leaf, zap: Zap, wind: Wind, utensils: Utensils, target: Target };

export default function MoodRecommender() {
  const [activeKey, setActiveKey] = useState(MOODS[0].key);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const mood = MOODS.find((m) => m.key === activeKey)!;
  const product = getProductById(mood.productIds[suggestionIdx % mood.productIds.length]);

  const selectMood = (key: string) => {
    setActiveKey(key);
    setSuggestionIdx(0);
  };

  if (!product) return null;
  const pack = product.packs[0];

  return (
    <section className="max-w-6xl mx-auto px-5">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-orange-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-orange" /> AI Snack Assistant
      </span>
      <h2 className="text-xl font-bold text-maroon mb-1">How are you feeling today?</h2>
      <p className="text-[12.5px] text-ink-soft mb-4">Your mood helps us find the right roast for your moment.</p>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {MOODS.map((m) => {
          const Icon = ICONS[m.icon];
          const active = m.key === activeKey;
          return (
            <button
              key={m.key}
              onClick={() => selectMood(m.key)}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-colors ${
                active ? "bg-orange border-orange text-white" : "bg-paper border-black/5 text-maroon hover:border-orange/40"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[9.5px] font-extrabold">{m.label}</span>
            </button>
          );
        })}
      </div>

      <div key={product.id} className="bg-paper rounded-3xl border border-black/5 shadow-card p-4 sm:p-5 flex gap-4 items-center animate-fadeIn">
        <img src={product.image} alt={product.name} className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-2xl flex-none" />
        <div className="flex-1 min-w-0">
          <span className="text-[9.5px] font-bold uppercase tracking-wide text-orange-2">AI Suggests for You</span>
          <h3 className="text-base sm:text-lg font-bold text-maroon truncate">{product.name}</h3>
          <div className="flex flex-wrap gap-1.5 my-2">
            {product.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[9.5px] font-bold text-leaf-2 bg-leaf-tint px-2 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <p className="text-[12px] text-ink-soft mb-3 line-clamp-2">{mood.blurb}</p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold text-maroon">{formatINR(pack.price)}</span>
            <Link to={`/product/${product.slug}`}>
              <Button size="sm" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>View Product</Button>
            </Link>
            {mood.productIds.length > 1 && (
              <button
                onClick={() => setSuggestionIdx((i) => (i + 1) % mood.productIds.length)}
                className="text-[11px] font-bold text-ink-soft underline underline-offset-2"
              >
                Try another
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
