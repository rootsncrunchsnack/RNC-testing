import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    const ok = signup(name, email, password);
    setSubmitting(false);
    if (ok) navigate("/account", { replace: true });
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold text-maroon mb-1 text-center">Create Account</h1>
      <p className="text-sm text-ink-soft text-center mb-7">Join us for faster checkout and order tracking.</p>
      <form onSubmit={submit} className="space-y-3">
        <Field icon={User} type="text" placeholder="Full name" value={name} onChange={setName} required />
        <Field icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} required />
        <Field icon={Lock} type="password" placeholder="Password (min. 4 characters)" value={password} onChange={setPassword} required minLength={4} />
        <Button type="submit" full disabled={submitting}>{submitting ? "Creating account..." : "Sign Up"}</Button>
      </form>
      <p className="text-center text-sm text-ink-soft mt-5">
        Already have an account? <Link to="/login" className="text-orange-2 font-bold">Log in</Link>
      </p>
    </div>
  );
}

interface FieldProps {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}
function Field({ icon: Icon, value, onChange, ...rest }: FieldProps) {
  return (
    <div className="flex items-center gap-2 border border-black/10 rounded-full px-4 py-2.5 bg-paper">
      <Icon className="w-4 h-4 text-ink-soft flex-none" />
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 outline-none text-sm bg-transparent" />
    </div>
  );
}
