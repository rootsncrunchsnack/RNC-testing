import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ShieldCheck, Truck, PackageCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import { formatINR } from "../lib/format";
import { QuantityStepper, EmptyState } from "../components/ui/Primitives";
import { Button, LinkButton } from "../components/ui/Button";
import { applyCoupon } from "../lib/mockApi";
import { useToast } from "../context/ToastContext";

export default function Cart() {
  const { lines, removeItem, setQty, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [checking, setChecking] = useState(false);
  const { show } = useToast();
  const navigate = useNavigate();

  const shipping = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
  const discount = Math.round((subtotal * discountPct) / 100);
  const total = subtotal - discount + shipping;

  const submitCoupon = async () => {
    if (!code.trim()) return;
    setChecking(true);
    const res = await applyCoupon(code);
    setChecking(false);
    if (res.valid) {
      setDiscountPct(res.discountPct);
      show(res.message, "success");
    } else {
      setDiscountPct(0);
      show(res.message, "error");
    }
  };

  if (lines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-6">
        <h1 className="text-xl font-bold text-maroon mb-2">Cart</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          subtitle="Looks like you haven't added anything yet. Let's fix that."
          action={<LinkButton to="/shop">Start Shopping</LinkButton>}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <h1 className="text-xl font-bold text-maroon mb-5">Cart ({lines.length})</h1>
      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-4">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            const pack = product.packs.find((p) => p.size === line.packSize) ?? product.packs[0];
            return (
              <div key={line.productId + line.packSize} className="flex gap-3 bg-paper border border-black/5 rounded-2xl p-3">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl flex-none" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.slug}`}><h4 className="font-bold text-maroon text-sm truncate">{product.name}</h4></Link>
                  <p className="text-[11.5px] text-ink-soft mb-2">{line.packSize}</p>
                  <div className="flex items-center justify-between">
                    <QuantityStepper qty={line.qty} onChange={(n) => setQty(line.productId, line.packSize, n)} />
                    <span className="font-extrabold text-maroon text-sm">{formatINR(pack.price * line.qty)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(line.productId, line.packSize)} aria-label="Remove item" className="text-ink-soft hover:text-red-600 flex-none">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-paper border border-black/5 rounded-2xl p-4 h-max">
          <div className="flex gap-2 mb-4">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code (try ROOTS10)"
              className="flex-1 border border-black/10 rounded-full px-3.5 py-2 text-[12.5px] outline-none"
            />
            <Button variant="dark" size="sm" onClick={submitCoupon} disabled={checking}>{checking ? "..." : "Apply"}</Button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            {discountPct > 0 && <div className="flex justify-between text-leaf-2 font-semibold"><span>Discount ({discountPct}%)</span><span>-{formatINR(discount)}</span></div>}
            <div className="flex justify-between text-ink-soft"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            <div className="border-t border-black/10 pt-2 flex justify-between font-extrabold text-maroon text-base"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>

          <Button full className="mt-4" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>

          <div className="flex justify-between mt-4 text-[10.5px] text-ink-soft">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Secure</span>
            <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Fast</span>
            <span className="flex items-center gap-1"><PackageCheck className="w-3.5 h-3.5" /> Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
