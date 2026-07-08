import { Gift, ArrowRight } from "lucide-react";
import { LinkButton } from "../ui/Button";
import { Sprout, PackageCheck, Sparkles } from "lucide-react";

export function ComboBanner() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange to-orange-2 px-6 py-7 flex items-center justify-between gap-4 text-white">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 max-w-[16ch]">Try Our Combos & Save More!</h3>
          <LinkButton to="/shop?cat=combo" variant="cream" iconRight={<ArrowRight className="w-4 h-4" />}>
            Explore Combos
          </LinkButton>
        </div>
        <div className="relative w-24 sm:w-32 h-20 flex-none hidden xs:block">
          <img src="/products/Thekua_Front.jpg" className="absolute left-0 top-1 w-11 h-16 object-cover rounded-lg rotate-[-8deg] shadow-lg" alt="" />
          <img src="/products/Mint_Makhana_Front.jpg" className="absolute left-8 top-0 w-11 h-16 object-cover rounded-lg z-10 shadow-lg" alt="" />
          <img src="/products/Chikki_Bites_Front.jpg" className="absolute left-16 top-2 w-11 h-16 object-cover rounded-lg rotate-[8deg] shadow-lg" alt="" />
          <Gift className="absolute -right-1 -bottom-1 w-7 h-7 text-white/90" />
        </div>
      </div>
    </div>
  );
}

const BOTTOM_BENEFITS = [
  { icon: Sprout, title: "High in Protein", sub: "Plant-powered energy", grad: "from-leaf/15 to-leaf/5" },
  { icon: PackageCheck, title: "Roasted, Not Fried", sub: "Lighter every time", grad: "from-orange/15 to-orange/5" },
  { icon: Sparkles, title: "No Maida", sub: "Clean, simple ingredients", grad: "from-leaf/15 to-leaf/5" },
];

export function BottomBenefitCards() {
  return (
    <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {BOTTOM_BENEFITS.map((b) => (
        <div
          key={b.title}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.grad} backdrop-blur-sm border border-white/40 p-4 flex items-center gap-3 shadow-card hover:-translate-y-0.5 transition-transform duration-200`}
        >
          <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center flex-none">
            <b.icon className="w-5 h-5 text-maroon" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-[13px] font-extrabold text-maroon">{b.title}</p>
            <p className="text-[11px] text-ink-soft">{b.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
