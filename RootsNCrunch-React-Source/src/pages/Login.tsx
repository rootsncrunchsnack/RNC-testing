import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/account";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    const ok = login(email, password);
    setSubmitting(false);
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold text-maroon mb-1 text-center">Welcome Back</h1>
      <p className="text-sm text-ink-soft text-center mb-7">Log in to track orders and manage your account.</p>
      <form onSubmit={submit} className="space-y-3">
        <FieldIcon icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} required />
        <FieldIcon icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} required />
        <Button type="submit" full disabled={submitting}>{submitting ? "Logging in..." : "Log In"}</Button>
      </form>
      <p className="text-center text-sm text-ink-soft mt-5">
        New here? <Link to="/signup" className="text-orange-2 font-bold">Create an account</Link>
      </p>
      <p className="text-center text-[11px] text-ink-soft mt-8 bg-cream-2 rounded-xl p-3">
        This is a demo store. Sign up first to create a mock account, then log back in any time — your data stays on this device.
      </p>
    </div>
  );
}

interface FieldIconProps {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}
function FieldIcon({ icon: Icon, value, onChange, ...rest }: FieldIconProps) {
  return (
    <div className="flex items-center gap-2 border border-black/10 rounded-full px-4 py-2.5 bg-paper">
      <Icon className="w-4 h-4 text-ink-soft flex-none" />
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 outline-none text-sm bg-transparent" />
    </div>
  );
}
