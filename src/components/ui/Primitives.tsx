import { Star, Minus, Plus, PackageOpen, type LucideIcon } from "lucide-react";

export function StarRating({ rating, count, size = 12 }: { rating: number; count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-ink-soft">
      <Star style={{ width: size, height: size }} className="text-orange fill-orange" />
      <span className="font-semibold text-ink">{rating}</span>
      {typeof count === "number" && <span>({count})</span>}
    </div>
  );
}

export function QuantityStepper({
  qty,
  onChange,
  min = 1,
  max = 10,
}: {
  qty: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-black/10 rounded-full bg-paper">
      <button
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center text-maroon disabled:opacity-30"
        disabled={qty <= min}
        onClick={() => onChange(Math.max(min, qty - 1))}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-7 text-center text-sm font-bold text-maroon">{qty}</span>
      <button
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-maroon disabled:opacity-30"
        disabled={qty >= max}
        onClick={() => onChange(Math.min(max, qty + 1))}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  subtitle,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-cream-2 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-ink-soft" />
      </div>
      <h3 className="text-lg font-bold text-maroon mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-ink-soft mb-5 max-w-xs">{subtitle}</p>}
      {action}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 overflow-hidden bg-paper animate-pulse">
      <div className="aspect-square bg-cream-2" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-cream-2 rounded w-3/4" />
        <div className="h-3 bg-cream-2 rounded w-1/2" />
        <div className="h-4 bg-cream-2 rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}

export function Badge({ children, tone = "leaf" }: { children: React.ReactNode; tone?: "leaf" | "orange" }) {
  const cls = tone === "leaf" ? "bg-leaf-tint text-leaf-2" : "bg-orange-tint text-orange-2";
  return <span className={`text-[9.5px] font-bold px-2 py-1 rounded-full ${cls}`}>{children}</span>;
}
