import { useState } from "react";
import { Link } from "react-router-dom";
import { PlayCircle, ArrowRight } from "lucide-react";
import { RECIPE_TABS } from "../../data/content";

export default function TraditionalRecipesPreview() {
  const [activeKey, setActiveKey] = useState(RECIPE_TABS[0].key);
  const tab = RECIPE_TABS.find((t) => t.key === activeKey)!;

  return (
    <section className="max-w-6xl mx-auto px-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold text-maroon">Traditional Recipes</h2>
          <p className="text-[12.5px] text-ink-soft">Rooted in heritage, made with love</p>
        </div>
        <Link to="/recipes" className="text-xs font-extrabold text-orange-2 flex items-center gap-1 flex-none">
          See All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
        {RECIPE_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveKey(t.key)}
            className={`flex-none px-3.5 py-1.5 rounded-full text-[12px] font-bold border whitespace-nowrap transition-colors ${
              activeKey === t.key ? "bg-maroon text-white border-maroon" : "bg-paper text-maroon border-black/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab.items.length > 0 ? (
        <div key={tab.key} className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
          {tab.items.map((item) => (
            <div key={item.title} className="flex gap-3 bg-paper rounded-2xl border border-black/5 shadow-card p-3">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl flex-none" />
              <div>
                <h4 className="text-[13.5px] font-bold text-maroon mb-1">{item.title}</h4>
                <p className="text-[12px] text-ink-soft line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fadeIn">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded-2xl bg-maroon/90 flex flex-col items-center justify-center text-white gap-2">
              <PlayCircle className="w-8 h-8 opacity-80" />
              <span className="text-[11px] font-bold opacity-80">Coming Soon</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
