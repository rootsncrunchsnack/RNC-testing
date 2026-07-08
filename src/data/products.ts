import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "jaggery-thekua",
    slug: "jaggery-thekua",
    name: "Jaggery Thekua",
    category: "thekua",
    categoryLabel: "Thekua",
    tagline: "Hand-shaped wheat & jaggery cookie, deep-roasted the old way",
    description:
      "Roots N Crunch Jaggery Thekua is hand-shaped and slow-roasted in small batches using a recipe passed down through generations. Made with whole wheat, pure cow ghee and unrefined jaggery, it's crisp on the outside, soft within, and free of refined sugar or palm oil.",
    image: "/products/Thekua_Front.jpg",
    imageBack: "/products/Thekua_Back.jpg",
    rating: 4.7,
    reviewCount: 98,
    packs: [
      { size: "200g", price: 199, mrp: 229 },
      { size: "400g", price: 349, mrp: 419 },
      { size: "600g", price: 489, mrp: 599 },
    ],
    tags: ["No Refined Sugar", "Hand-Shaped", "Traditional Recipe", "Whole Wheat"],
    badges: ["bestseller"],
    nutrition: [
      { label: "Energy", value: "462 kcal" },
      { label: "Protein", value: "6.8 g" },
      { label: "Carbohydrates", value: "58 g" },
      { label: "Total Fat", value: "22 g" },
      { label: "Fibre", value: "3.1 g" },
    ],
    reviews: [
      { id: "r1", author: "Ananya S.", rating: 5, date: "2 weeks ago", comment: "Tastes exactly like my grandmother's thekua. Perfectly crisp." },
      { id: "r2", author: "Rohit M.", rating: 4, date: "1 month ago", comment: "Great snack with evening chai. A bit sweet for my taste but very good quality." },
    ],
    moodFit: ["relaxed", "hungry"],
  },
  {
    id: "mint-makhana",
    slug: "mint-makhana",
    name: "Mint Makhana",
    category: "makhana",
    categoryLabel: "Makhana",
    tagline: "Cool & crunchy fox nuts, roasted not fried",
    description:
      "Light, airy fox nuts roasted with real mint and a hint of black salt. High in protein and plant-based, these makhana are never fried and carry no added preservatives — a cooling, guilt-free crunch for any time of day.",
    image: "/products/Mint_Makhana_Front.jpg",
    imageBack: "/products/Mint_Makhana_Back.jpg",
    rating: 4.7,
    reviewCount: 120,
    packs: [
      { size: "65g", price: 149, mrp: 179 },
      { size: "150g", price: 279, mrp: 329 },
      { size: "250g", price: 399, mrp: 469 },
    ],
    tags: ["High in Protein", "Roasted Not Fried", "No Added Preservatives", "Light & Crunchy"],
    badges: ["bestseller"],
    nutrition: [
      { label: "Energy", value: "347 kcal" },
      { label: "Protein", value: "9.7 g" },
      { label: "Carbohydrates", value: "76 g" },
      { label: "Total Fat", value: "0.1 g" },
      { label: "Fibre", value: "14.5 g" },
    ],
    reviews: [
      { id: "r1", author: "Priya K.", rating: 5, date: "3 days ago", comment: "So light and refreshing. My go-to evening snack now." },
      { id: "r2", author: "Vikram T.", rating: 4, date: "2 weeks ago", comment: "Good crunch, mint flavour is subtle not overpowering." },
    ],
    moodFit: ["relaxed", "fresh"],
  },
  {
    id: "peri-peri-makhana",
    slug: "peri-peri-makhana",
    name: "Peri Peri Makhana",
    category: "makhana",
    categoryLabel: "Makhana",
    tagline: "Bold & tangy roasted fox nuts",
    description:
      "For those who like a kick — our fox nuts are hand-tossed in a smoky peri peri seasoning and slow-roasted till crisp. Zero frying, zero palm oil, all crunch.",
    image: "/products/Peri_Peri_Makhana_Front.jpg",
    imageBack: "/products/Peri_Peri_Makhana_Back.jpg",
    rating: 4.8,
    reviewCount: 103,
    packs: [
      { size: "65g", price: 149, mrp: 179 },
      { size: "150g", price: 279, mrp: 329 },
      { size: "250g", price: 399, mrp: 469 },
    ],
    tags: ["High in Protein", "Roasted Not Fried", "No Added Preservatives", "Spicy"],
    badges: ["new"],
    nutrition: [
      { label: "Energy", value: "352 kcal" },
      { label: "Protein", value: "9.5 g" },
      { label: "Carbohydrates", value: "75 g" },
      { label: "Total Fat", value: "0.3 g" },
      { label: "Fibre", value: "14 g" },
    ],
    reviews: [
      { id: "r1", author: "Karan D.", rating: 5, date: "1 week ago", comment: "Perfect spice level, doesn't overpower the makhana crunch." },
    ],
    moodFit: ["energetic", "hungry"],
  },
  {
    id: "chikki-bites",
    slug: "chikki-bites",
    name: "Crushed Peanuts Chikki Bites",
    category: "peanuts",
    categoryLabel: "Peanuts & Bites",
    tagline: "Protein-packed jaggery peanut brittle bites",
    description:
      "Crunchy roasted peanuts set in pure jaggery, broken into bite-sized pieces for an energising snack any time of day. No palm oil, no refined sugar, no fuss.",
    image: "/products/Chikki_Bites_Front.jpg",
    imageBack: "/products/Chikki_Bites_Back.jpg",
    rating: 4.6,
    reviewCount: 76,
    packs: [
      { size: "150g", price: 179, mrp: 209 },
      { size: "300g", price: 329, mrp: 389 },
    ],
    tags: ["High Protein", "No Palm Oil", "Small-Batch Roasted", "No Refined Sugar"],
    badges: ["new"],
    nutrition: [
      { label: "Energy", value: "512 kcal" },
      { label: "Protein", value: "14 g" },
      { label: "Carbohydrates", value: "48 g" },
      { label: "Total Fat", value: "29 g" },
      { label: "Fibre", value: "4.6 g" },
    ],
    reviews: [
      { id: "r1", author: "Meera J.", rating: 4, date: "5 days ago", comment: "Great energy bite before workouts." },
    ],
    moodFit: ["energetic", "focused"],
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function getRelated(product: Product, count = 3) {
  return PRODUCTS.filter((p) => p.id !== product.id).slice(0, count);
}
