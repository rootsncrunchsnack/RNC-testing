const MESSAGES = [
  "Freshly Packed, Not Warehouse Stored",
  "FSSAI Certified",
  "Small-Batch Roasted",
  "No Refined Sugar",
  "No Palm Oil",
];

export default function Marquee() {
  return (
    <div className="bg-maroon text-white overflow-hidden py-2" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((rep) => (
          <div className="flex" key={rep}>
            {MESSAGES.map((m) => (
              <span key={m} className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide px-5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                {m}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
