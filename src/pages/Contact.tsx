import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { submitContactForm } from "../lib/mockApi";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/ui/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { show } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      show("Please fill in all fields", "error");
      return;
    }
    setSubmitting(true);
    await submitContactForm(form);
    setSubmitting(false);
    setForm({ name: "", email: "", message: "" });
    show("Message sent! We'll get back to you soon.", "success");
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-6">
      <h1 className="text-2xl font-bold text-maroon mb-1">Contact Us</h1>
      <p className="text-sm text-ink-soft mb-6">We'd love to hear from you.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={submit} className="space-y-3">
          <input
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name" className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
          <input
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email" placeholder="Your email" className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange"
          />
          <textarea
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?" rows={5} className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange resize-none"
          />
          <Button type="submit" full disabled={submitting}>{submitting ? "Sending..." : "Send Message"}</Button>
        </form>

        <div className="space-y-4">
          <ContactRow icon={Phone} label="Phone" value="+91 90077 97751" />
          <ContactRow icon={Mail} label="Email" value="support@rootsncrunch.com" />
          <ContactRow icon={MapPin} label="Availability" value="Shipping across India, 7 days a week" />
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 bg-paper border border-black/5 rounded-2xl p-4">
      <div className="w-10 h-10 rounded-full bg-cream-2 flex items-center justify-center flex-none"><Icon className="w-4 h-4 text-maroon" /></div>
      <div>
        <p className="text-[11px] font-bold text-ink-soft uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-maroon">{value}</p>
      </div>
    </div>
  );
}
