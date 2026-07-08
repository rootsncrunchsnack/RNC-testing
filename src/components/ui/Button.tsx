import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface BaseProps {
  variant?: "primary" | "dark" | "outline" | "ghost" | "cream";
  size?: "sm" | "md";
  icon?: ReactNode;
  iconRight?: ReactNode;
  full?: boolean;
  className?: string;
  children?: ReactNode;
}

const variants: Record<string, string> = {
  primary: "bg-orange text-white shadow-card hover:bg-orange-2 active:scale-[.97]",
  dark: "bg-maroon text-white hover:bg-maroon-2 active:scale-[.97]",
  outline: "bg-transparent border-1.5 border-maroon text-maroon hover:bg-maroon hover:text-white active:scale-[.97]",
  ghost: "bg-paper border border-black/10 text-maroon hover:bg-cream-2 active:scale-[.97]",
  cream: "bg-paper text-maroon hover:bg-cream-2 active:scale-[.97]",
};

const sizes: Record<string, string> = {
  sm: "text-[12.5px] px-4 py-2",
  md: "text-[14px] px-5 py-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  full,
  className = "",
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-transform border border-transparent whitespace-nowrap ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

export function LinkButton({
  to,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  full,
  className = "",
  children,
}: BaseProps & { to: string }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-transform border border-transparent whitespace-nowrap ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${className}`}
    >
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}
