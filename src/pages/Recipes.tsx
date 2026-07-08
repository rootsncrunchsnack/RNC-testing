import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { RECIPE_TABS } from "../data/content";

export default function Recipes() {
  const [activeKey, setActiveKey] = useState(RECIPE_TABS[0].key);
  const tab = RECIPE_TABS.find((t) => t.key === activeKey)!;

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-maroon mb-1">Traditional Recipes</h1>
      <p className="text-sm text-ink-soft mb-6">Rooted in heritage, made with love, one snack at a time.</p>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
        {RECIPE_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveKey(t.key)}
            className={`flex-none px-4 py-2 rounded-full text-[13px] font-bold border whitespace-nowrap transition-colors ${
              activeKey === t.key ? "bg-maroon text-white border-maroon" : "bg-paper text-maroon border-black/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab.items.length > 0 ? (
        <div key={tab.key} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          {tab.items.map((item) => (
            <div key={item.title} className="bg-paper border border-black/5 rounded-2xl overflow-hidden shadow-card">
              <img src={item.image} alt={item.title} className="w-full aspect-video object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-maroon mb-1">{item.title}</h3>
                <p className="text-[13px] text-ink-soft">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4 animate-fadeIn">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video rounded-2xl bg-maroon flex flex-col items-center justify-center text-white gap-2">
              <PlayCircle className="w-10 h-10 opacity-80" />
              <span className="text-sm font-bold opacity-80">Coming Soon</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
