import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, Leaf } from "lucide-react";
import { subscribeNewsletter } from "../../lib/mockApi";
import { useToast } from "../../context/ToastContext";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const subscribe = async () => {
    if (!email.includes("@")) {
      show("Please enter a valid email address", "error");
      return;
    }
    setLoading(true);
    await subscribeNewsletter(email);
    setLoading(false);
    setEmail("");
    show("Subscribed! Watch your inbox for offers.", "success");
  };

  return (
    <footer className="mt-10">
      {/* Newsletter with clean natural illustration instead of decorative pot */}
      <div className="relative overflow-hidden bg-leaf-tint px-5 py-9">
        <Leaf className="absolute -left-4 -bottom-4 w-28 h-28 text-leaf/15" />
        <Leaf className="absolute right-4 top-2 w-16 h-16 text-orange/15 rotate-45" />
        <div className="relative max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-maroon mb-1">Stay Updated, Stay Healthy!</h2>
          <p className="text-[12.5px] text-ink-soft mb-4">Subscribe for exclusive offers, new launches & healthy snack tips.</p>
          <div className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && subscribe()}
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-black/10 bg-paper px-4 py-2.5 text-[13px] outline-none"
            />
            <button
              onClick={subscribe}
              disabled={loading}
              className="bg-orange text-white rounded-full px-4 py-2.5 font-bold text-[13px] flex items-center gap-1.5 disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" /> {loading ? "..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-maroon text-cream-2 px-5 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="col-span-2 sm:col-span-1">
            <img src="/logo.png" alt="Roots N Crunch" className="h-7 mb-3 brightness-0 invert opacity-90" />
            <p className="text-[12px] leading-relaxed opacity-80">
              Premium healthy snacks made with real ingredients and traditional recipes.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><FacebookIcon /></a>
              <a href="#" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><MessageCircle className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide mb-3 opacity-70">Shop</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link to="/shop?cat=thekua">Thekua</Link></li>
              <li><Link to="/shop?cat=makhana">Makhana</Link></li>
              <li><Link to="/shop?cat=peanuts">Peanuts & Bites</Link></li>
              <li><Link to="/shop?cat=combo">Combo Packs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide mb-3 opacity-70">Company</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/account">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide mb-3 opacity-70">Contact</h4>
            <ul className="space-y-2 text-[13px] opacity-90">
              <li>+91 90077 97751</li>
              <li>support@rootsncrunch.com</li>
              <li>Available across India</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-7 pt-4 text-[11px] opacity-60 flex flex-col sm:flex-row justify-between gap-1">
          <span>© 2026 Roots N Crunch. All rights reserved.</span>
          <span>FSSAI Certified · Made in India</span>
        </div>
      </div>
    </footer>
  );
}
