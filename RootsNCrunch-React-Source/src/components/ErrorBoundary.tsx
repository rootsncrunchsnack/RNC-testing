import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Unhandled UI error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-cream">
          <div className="w-16 h-16 rounded-full bg-orange-tint flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 text-orange-2" />
          </div>
          <h1 className="text-lg font-bold text-maroon mb-1">Something went wrong</h1>
          <p className="text-sm text-ink-soft mb-5">Please refresh the page and try again.</p>
          <button onClick={() => window.location.assign("/")} className="bg-orange text-white font-bold text-sm px-5 py-2.5 rounded-full">
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
