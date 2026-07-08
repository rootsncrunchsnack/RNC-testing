import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LinkButton } from "../ui/Button";
import { ArrowRight } from "lucide-react";

interface Slide {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  cta: string;
  href: string;
  images: string[];
}

const SLIDES: Slide[] = [
  {
    id: "featured",
    eyebrow: "Featured Products",
    title: "Healthy Snacking,",
    titleAccent: "Made Delicious!",
    desc: "Wholesome snacks made with real ingredients, traditional recipes and lots of love.",
    cta: "Shop Now",
    href: "/shop",
    images: ["/products/Thekua_Front.jpg", "/products/Mint_Makhana_Front.jpg", "/products/Peri_Peri_Makhana_Front.jpg"],
  },
  {
    id: "offers",
    eyebrow: "Limited-Time Offer",
    title: "Save 10% on",
    titleAccent: "Your First Order",
    desc: "Use code ROOTS10 at checkout and taste the difference real ingredients make.",
    cta: "Explore Offers",
    href: "/shop",
    images: ["/products/Mint_Makhana_Front.jpg", "/products/Chikki_Bites_Front.jpg", "/products/Thekua_Front.jpg"],
  },
  {
    id: "seasonal",
    eyebrow: "Seasonal Collection",
    title: "Festival Packs,",
    titleAccent: "Made to Share",
    desc: "Gift-ready combo boxes featuring our most-loved roasted snacks.",
    cta: "View Combos",
    href: "/shop?cat=combo",
    images: ["/products/Peri_Peri_Makhana_Front.jpg", "/products/Thekua_Front.jpg", "/products/Chikki_Bites_Front.jpg"],
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 3800);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  const slide = SLIDES[index];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-2 pt-5 pb-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-6 items-center">
        <div key={slide.id} className="animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-orange-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" /> {slide.eyebrow}
          </span>
          <h1 className="text-[28px] sm:text-4xl leading-tight font-bold text-maroon">
            {slide.title}
            <span className="block text-leaf">{slide.titleAccent}</span>
          </h1>
          <p className="text-[14px] text-ink-soft max-w-sm mt-3 mb-5">{slide.desc}</p>
          <LinkButton to={slide.href} variant="dark" iconRight={<ArrowRight className="w-4 h-4" />}>
            {slide.cta}
          </LinkButton>
        </div>

        <div key={slide.id + "-visual"} className="relative h-[220px] sm:h-[280px] animate-fadeIn">
          <div className="absolute left-[6%] bottom-[6%] w-[64%] h-16 rounded-full bg-gradient-to-b from-[#6B4226] to-[#4A2E19]" />
          {slide.images.map((img, i) => {
            const positions = ["left-[0%] w-[26%] rotate-[-8deg] z-10", "left-[35%] w-[32%] z-20 -translate-y-2", "left-[68%] w-[26%] rotate-[8deg] z-10"];
            return (
              <img
                key={img + i}
                src={img}
                className={`absolute bottom-[16%] rounded-2xl shadow-lift object-cover aspect-[5/8] ${positions[i]}`}
                alt=""
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={() => go(-1)} aria-label="Previous slide" className="w-8 h-8 rounded-full bg-paper border border-black/10 flex items-center justify-center text-maroon">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-orange" : "w-1.5 bg-black/15"}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next slide" className="w-8 h-8 rounded-full bg-paper border border-black/10 flex items-center justify-center text-maroon">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
