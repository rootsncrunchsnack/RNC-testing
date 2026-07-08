export interface PackOption {
  size: string;
  price: number;
  mrp: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "thekua" | "makhana" | "peanuts" | "combo";
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  imageBack: string;
  rating: number;
  reviewCount: number;
  packs: PackOption[];
  tags: string[];
  badges: ("bestseller" | "new" | "sale")[];
  nutrition: { label: string; value: string }[];
  reviews: Review[];
  moodFit: string[];
}

export interface Category {
  key: Product["category"];
  name: string;
  image: string;
  isNew?: boolean;
}

export interface Mood {
  key: string;
  label: string;
  icon: string;
  productIds: string[];
  blurb: string;
}

export interface CartLine {
  productId: string;
  packSize: string;
  qty: number;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Placed" | "Shipped" | "Delivered" | "Cancelled";
  items: { productId: string; packSize: string; qty: number; price: number }[];
  total: number;
  address: Address;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
}
