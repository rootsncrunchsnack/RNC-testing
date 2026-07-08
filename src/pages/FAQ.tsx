import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../data/content";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-2xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-maroon mb-1">Frequently Asked Questions</h1>
      <p className="text-sm text-ink-soft mb-6">Everything you need to know about our snacks and shipping.</p>

      <div className="space-y-2">
        {FAQS.map((f, i) => {
          const open = openIdx === i;
          return (
            <div key={f.q} className="bg-paper border border-black/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="text-sm font-bold text-maroon">{f.q}</span>
                <ChevronDown className={`w-4 h-4 text-ink-soft flex-none transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && <p className="px-4 pb-4 text-[13px] text-ink-soft leading-relaxed animate-fadeIn">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
