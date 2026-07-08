import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import type { Order } from "../types";
import { formatINR } from "../lib/format";
import { Button } from "../components/ui/Button";

export default function OrderConfirmation() {
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="max-w-md mx-auto px-5 py-14 text-center">
      <div className="w-16 h-16 rounded-full bg-leaf-tint flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-leaf" />
      </div>
      <h1 className="text-xl font-bold text-maroon mb-2">Order Placed Successfully!</h1>
      <p className="text-sm text-ink-soft mb-6">
        Thank you, {order.address.name.split(" ")[0]}. Your order <span className="font-bold text-maroon">#{order.id}</span> has been confirmed.
      </p>
      <div className="bg-paper border border-black/5 rounded-2xl p-4 text-left mb-6">
        <div className="flex justify-between text-sm mb-1"><span className="text-ink-soft">Order Total</span><span className="font-extrabold text-maroon">{formatINR(order.total)}</span></div>
        <div className="flex justify-between text-sm mb-1"><span className="text-ink-soft">Delivering to</span><span className="font-semibold text-maroon">{order.address.city}, {order.address.pincode}</span></div>
        <div className="flex justify-between text-sm"><span className="text-ink-soft">Estimated Delivery</span><span className="font-semibold text-maroon">2-5 business days</span></div>
      </div>
      <div className="flex gap-2">
        <Link to="/account" className="flex-1"><Button variant="outline" full>View Orders</Button></Link>
        <Link to="/shop" className="flex-1"><Button full>Continue Shopping</Button></Link>
      </div>
    </div>
  );
}
