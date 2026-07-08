import type { Category, Mood } from "../types";

export const CATEGORIES: Category[] = [
  { key: "thekua", name: "Thekua", image: "/products/Thekua_Front.jpg" },
  { key: "makhana", name: "Makhana", image: "/products/Mint_Makhana_Front.jpg" },
  { key: "peanuts", name: "Peanuts & Bites", image: "/products/Chikki_Bites_Front.jpg", isNew: true },
  { key: "combo", name: "Combo Packs", image: "/products/Peri_Peri_Makhana_Front.jpg" },
];

export const MOODS: Mood[] = [
  { key: "relaxed", label: "Relaxed", icon: "leaf", productIds: ["mint-makhana", "jaggery-thekua"], blurb: "A cool mint roast to help you unwind, light enough for a quiet evening." },
  { key: "energetic", label: "Energetic", icon: "zap", productIds: ["chikki-bites", "peri-peri-makhana"], blurb: "Protein-packed bites to keep you going through a busy day." },
  { key: "fresh", label: "Fresh", icon: "wind", productIds: ["mint-makhana"], blurb: "Light, airy and cooling, a refreshing bite whenever you need a reset." },
  { key: "hungry", label: "Hungry", icon: "utensils", productIds: ["jaggery-thekua", "peri-peri-makhana"], blurb: "Something more filling to properly satisfy that craving." },
  { key: "focused", label: "Focused", icon: "target", productIds: ["chikki-bites"], blurb: "Steady energy without the crash, good company for deep work." },
];

export const RECIPE_TABS = [
  { key: "recipes", label: "Recipes", items: [
    { title: "Thekua Kheer", desc: "Crumble jaggery thekua into warm milk kheer for a festive twist.", image: "/products/Thekua_Front.jpg" },
    { title: "Makhana Trail Mix", desc: "Toss peri peri makhana with nuts and dried fruit for a party mix.", image: "/products/Peri_Peri_Makhana_Front.jpg" },
  ]},
  { key: "tips", label: "Cooking Tips", items: [
    { title: "Keep it crisp", desc: "Store makhana in an airtight jar away from moisture to keep the crunch.", image: "/products/Mint_Makhana_Front.jpg" },
    { title: "Warm before serving", desc: "A light 2-minute warm-up in a dry pan revives thekua's crispness.", image: "/products/Thekua_Front.jpg" },
  ]},
  { key: "pairings", label: "Serving Suggestions", items: [
    { title: "With evening chai", desc: "Jaggery thekua pairs beautifully with a hot cup of masala chai.", image: "/products/Thekua_Front.jpg" },
    { title: "As a yoghurt topper", desc: "Crush chikki bites over plain yoghurt for crunch and sweetness.", image: "/products/Chikki_Bites_Front.jpg" },
  ]},
  { key: "healthy-pairings", label: "Healthy Pairings", items: [
    { title: "Makhana + berries", desc: "Mint makhana with a handful of berries makes a light, cooling snack.", image: "/products/Mint_Makhana_Front.jpg" },
    { title: "Peanuts + banana", desc: "Chikki bites crumbled over banana slices for a quick energy fix.", image: "/products/Chikki_Bites_Front.jpg" },
  ]},
  { key: "snack-ideas", label: "Snack Ideas", items: [
    { title: "Office drawer stash", desc: "Single-serve makhana packs are perfect for your desk drawer.", image: "/products/Peri_Peri_Makhana_Front.jpg" },
    { title: "Travel-friendly bites", desc: "Chikki bites survive a long train or flight without going soft.", image: "/products/Chikki_Bites_Front.jpg" },
  ]},
  { key: "seasonal", label: "Seasonal Recipes", items: [
    { title: "Monsoon comfort", desc: "Warm thekua with chai is the ultimate rainy-day comfort snack.", image: "/products/Thekua_Front.jpg" },
    { title: "Summer cooler", desc: "Mint makhana alongside chilled buttermilk beats the summer heat.", image: "/products/Mint_Makhana_Front.jpg" },
  ]},
  { key: "videos", label: "Quick Videos", items: [] },
];

export const FAQS = [
  { q: "Are your snacks fried?", a: "No, everything we make is roasted, never fried. Our makhana, thekua and chikki are all slow-roasted in small batches." },
  { q: "Do your products contain palm oil or refined sugar?", a: "None of our products use palm oil. Our jaggery-based snacks use unrefined jaggery instead of refined sugar." },
  { q: "How long do the snacks stay fresh?", a: "Unopened packs stay fresh for 4 to 6 months. Once opened, we recommend finishing within 2 to 3 weeks and storing in an airtight container." },
  { q: "Do you ship pan-India?", a: "Yes, we currently ship across India with delivery typically within 2 to 5 business days depending on your location." },
  { q: "What is your return policy?", a: "If a product arrives damaged or isn't to your satisfaction, you can request a return within 7 days of delivery." },
  { q: "Are your snacks suitable for kids?", a: "Yes, our snacks are made with natural ingredients and are a healthier alternative to fried or preservative-heavy packaged snacks for kids." },
];

export const TESTIMONIALS = [
  { name: "Ananya", initial: "A", color: "#E85D0C" },
  { name: "Rohit", initial: "R", color: "#4B7A3E" },
  { name: "Sana", initial: "S", color: "#C24B08" },
];
