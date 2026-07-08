import { PRODUCTS } from "../data/products";
import type { Product } from "../types";

const DELAY = 450;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts(params?: { category?: string; query?: string }): Promise<Product[]> {
  await wait(DELAY);
  let list = [...PRODUCTS];
  if (params?.category && params.category !== "all") {
    list = list.filter((p) => p.category === params.category);
  }
  if (params?.query) {
    const q = params.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return list;
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  await wait(DELAY);
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function submitContactForm(_data: { name: string; email: string; message: string }): Promise<{ ok: true }> {
  await wait(600);
  return { ok: true };
}

export async function subscribeNewsletter(_email: string): Promise<{ ok: true }> {
  await wait(500);
  return { ok: true };
}

export async function applyCoupon(code: string): Promise<{ valid: boolean; discountPct: number; message: string }> {
  await wait(500);
  const normalized = code.trim().toUpperCase();
  if (normalized === "ROOTS10") {
    return { valid: true, discountPct: 10, message: "10% discount applied!" };
  }
  return { valid: false, discountPct: 0, message: "Invalid or expired coupon code." };
}
