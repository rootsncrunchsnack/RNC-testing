import { Wheat, ShieldCheck, Flame, type LucideIcon } from "lucide-react";

interface TrustItem { icon: LucideIcon; title: string; sub: string; from: string; to: string; iconColor: string; }

const ITEMS: TrustItem[] = [
  { icon: Wheat, title: "No Maida", sub: "Whole grains only", from: "from-leaf-tint", to: "to-white", iconColor: "text-leaf" },
  { icon: ShieldCheck, title: "No Preservatives", sub: "Nothing artificial", from: "from-orange-tint", to: "to-white", iconColor: "text-orange-2" },
  { icon: Flame, title: "Roasted Not Fried", sub: "Lighter, cleaner crunch", from: "from-leaf-tint", to: "to-white", iconColor: "text-leaf" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-6xl mx-auto px-5">
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className={`group relative rounded-2xl bg-gradient-to-b ${item.from} ${item.to} border border-black/5 p-3 sm:p-4 text-center shadow-card hover:-translate-y-0.5 hover:shadow-lift transition-all duration-200 cursor-default`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-white shadow-card flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
            <item.icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.75} />
          </div>
          <p className="text-[11px] sm:text-[12.5px] font-extrabold text-maroon leading-tight">{item.title}</p>
          <p className="text-[9.5px] sm:text-[10.5px] text-ink-soft mt-0.5 hidden sm:block">{item.sub}</p>
        </div>
      ))}
    </div>
  );
}
