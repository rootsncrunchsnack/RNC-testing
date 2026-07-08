import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-sm mx-auto px-5 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-cream-2 flex items-center justify-center mx-auto mb-4">
        <Compass className="w-7 h-7 text-ink-soft" />
      </div>
      <h1 className="text-xl font-bold text-maroon mb-1">Page Not Found</h1>
      <p className="text-sm text-ink-soft mb-6">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/"><Button>Back to Home</Button></Link>
    </div>
  );
}
