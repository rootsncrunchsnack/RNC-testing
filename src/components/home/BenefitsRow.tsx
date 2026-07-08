import { Truck, Award, ShieldCheck } from "lucide-react";

const BENEFITS = [
  { icon: Truck, label: "Fast Delivery" },
  { icon: Award, label: "Premium Quality" },
  { icon: ShieldCheck, label: "100% Secure" },
];

export default function BenefitsRow() {
  return (
    <div className="bg-paper border-y border-black/5">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-around gap-3">
        {BENEFITS.map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <b.icon className="w-4 h-4 sm:w-5 sm:h-5 text-leaf" strokeWidth={1.75} />
            <span className="text-[11px] sm:text-[13px] font-bold text-maroon whitespace-nowrap">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
