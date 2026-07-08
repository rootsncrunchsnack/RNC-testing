import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Wallet, Banknote, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { getProductById } from "../data/products";
import { formatINR } from "../lib/format";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/Primitives";
import { ShoppingBag } from "lucide-react";

type PayMethod = "upi" | "card" | "cod";

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const { user, addAddress, placeOrder } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [pay, setPay] = useState<PayMethod>("upi");
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({ name: user?.name ?? "", line1: "", city: "", state: "", pincode: "", phone: "" });

  const shipping = subtotal >= 499 ? 0 : 40;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-6">
        <EmptyState icon={ShoppingBag} title="Nothing to checkout" subtitle="Add a few snacks to your cart first." action={<Link to="/shop"><Button>Start Shopping</Button></Link>} />
      </div>
    );
  }

  const continueToPayment = () => {
    if (!form.name || !form.line1 || !form.city || !form.pincode || !form.phone) {
      show("Please fill in all address fields", "error");
      return;
    }
    setStep("payment");
  };

  const placeOrderNow = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 700));
    const address = { name: form.name, line1: form.line1, city: form.city, state: form.state, pincode: form.pincode, phone: form.phone };
    if (user) addAddress(address);
    const order = placeOrder({
      items: lines.map((l) => {
        const product = getProductById(l.productId);
        const pack = product?.packs.find((p) => p.size === l.packSize);
        return { productId: l.productId, packSize: l.packSize, qty: l.qty, price: pack?.price ?? 0 };
      }),
      total,
      address: { ...address, id: "temp" },
    });
    clear();
    setPlacing(false);
    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-6">
      <nav className="text-[12px] text-ink-soft mb-4 flex items-center gap-1.5">
        <Link to="/cart" className="hover:text-orange-2">Cart</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-maroon font-semibold capitalize">{step}</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <StepPill active={step === "address"} done={step === "payment"} num={1} label="Address" />
        <div className="flex-1 h-px bg-black/10" />
        <StepPill active={step === "payment"} done={false} num={2} label="Payment" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          {step === "address" ? (
            <div className="bg-paper border border-black/5 rounded-2xl p-5 space-y-3">
              <h2 className="font-bold text-maroon mb-2">Delivery Address</h2>
              <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Address" value={form.line1} onChange={(v) => setForm({ ...form, line1: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} />
                <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              </div>
              <Button full className="mt-2" onClick={continueToPayment}>Continue to Payment</Button>
            </div>
          ) : (
            <div className="bg-paper border border-black/5 rounded-2xl p-5">
              <h2 className="font-bold text-maroon mb-4">Payment Method</h2>
              <div className="space-y-2">
                <PayOption id="upi" active={pay === "upi"} onClick={() => setPay("upi")} icon={<Wallet className="w-4 h-4" />} label="UPI" sub="Pay via any UPI app" />
                <PayOption id="card" active={pay === "card"} onClick={() => setPay("card")} icon={<CreditCard className="w-4 h-4" />} label="Credit / Debit Card" sub="Visa, Mastercard, RuPay" />
                <PayOption id="cod" active={pay === "cod"} onClick={() => setPay("cod")} icon={<Banknote className="w-4 h-4" />} label="Cash on Delivery" sub="Pay when it arrives" />
              </div>
              <Button full className="mt-5" disabled={placing} onClick={placeOrderNow}>
                {placing ? "Placing Order..." : `Place Order · ${formatINR(total)}`}
              </Button>
              <button onClick={() => setStep("address")} className="text-xs font-bold text-ink-soft mt-3 block mx-auto">Back to address</button>
            </div>
          )}
        </div>

        <div className="bg-paper border border-black/5 rounded-2xl p-4 h-max">
          <h3 className="font-bold text-maroon mb-3 text-sm">Order Summary</h3>
          <div className="space-y-2 mb-3 max-h-52 overflow-y-auto">
            {lines.map((l) => {
              const product = getProductById(l.productId);
              if (!product) return null;
              return (
                <div key={l.productId + l.packSize} className="flex justify-between text-[12.5px]">
                  <span className="text-ink-soft truncate pr-2">{product.name} × {l.qty}</span>
                  <span className="font-semibold text-maroon flex-none">{formatINR((product.packs.find(p=>p.size===l.packSize)?.price ?? 0) * l.qty)}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-black/10 pt-2 space-y-1 text-sm">
            <div className="flex justify-between text-ink-soft"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between text-ink-soft"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            <div className="flex justify-between font-extrabold text-maroon"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPill({ active, done, num, label }: { active: boolean; done: boolean; num: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${active || done ? "bg-orange text-white" : "bg-cream-2 text-ink-soft"}`}>{num}</div>
      <span className={`text-sm font-bold ${active ? "text-maroon" : "text-ink-soft"}`}>{label}</span>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1 border border-black/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange" />
    </div>
  );
}

function PayOption({ active, onClick, icon, label, sub }: { id: string; active: boolean; onClick: () => void; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 border rounded-xl p-3 text-left ${active ? "border-orange bg-orange-tint/40" : "border-black/10"}`}>
      <div className="w-9 h-9 rounded-full bg-paper border border-black/10 flex items-center justify-center text-maroon flex-none">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-maroon">{label}</p>
        <p className="text-[11px] text-ink-soft">{sub}</p>
      </div>
      <div className={`w-4 h-4 rounded-full border-2 flex-none ${active ? "border-orange bg-orange" : "border-black/20"}`} />
    </button>
  );
}
