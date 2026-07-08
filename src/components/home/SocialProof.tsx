import { ShieldCheck, MapPin, PackageCheck, Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/content";

export default function SocialProof() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="bg-leaf-tint rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {TESTIMONIALS.map((t) => (
              <span key={t.name} className="w-8 h-8 rounded-full border-2 border-leaf-tint flex items-center justify-center text-white text-xs font-bold" style={{ background: t.color }}>
                {t.initial}
              </span>
            ))}
          </div>
          <div>
            <p className="text-[12.5px] font-bold text-maroon">Trusted by 10,000+ Happy Customers</p>
            <div className="flex items-center gap-1 text-[11px] text-orange font-bold">
              <Star className="w-3 h-3 fill-orange" /> 4.8/5 average rating
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-leaf-2"><ShieldCheck className="w-4 h-4" /> FSSAI Certified</span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-leaf-2"><MapPin className="w-4 h-4" /> Made in India</span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-leaf-2"><PackageCheck className="w-4 h-4" /> Hygienically Packed</span>
        </div>
      </div>
    </div>
  );
}
