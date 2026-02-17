/**
 * CONSTANTS.JS
 * The single source of truth for the Sapphire Signature architecture.
 */

// 1. Category IDs (Main Departments)
export const CATEGORY_IDS = {
  ACTIVEWEAR: "activewear", // Updated from "gym-sets" to broader term
  LINGERIE: "lingerie",
  NIGHTWEAR: "nightwear",
  INTIMATES: "intimates",
  TEXTILES: 'textiles',
};

// 2. Collection Tags (For Homepage Sections)
export const COLLECTIONS = {
  NEW_ARRIVALS: "new-in",
  BEST_SELLERS: "best-sellers",
  EDITOR_PICK: "editor-pick",
  SALE: "sale",
};

// 3. Silhouettes (The "Cut" of the garment - CRITICAL for Filters)
export const SILHOUETTES = {
  // Activewear
  TWO_PIECE_SET: "two-piece-set",
  JUMPSUIT: "jumpsuit",
  LEGGING: "legging",
  SPORTS_BRA: "sports-bra",

  // Lingerie & Intimates
  BODYSUIT: "bodysuit",
  CORSET: "corset",
  TEDDY: "teddy",
  BABYDOLL: "babydoll",
  GARTER_SET: "garter-set",
  BUSTIER_SET: "bustier-set",
  BRA_SET: "bra-set",
  THONG: "thong",
  BRIEF: "brief",
  BOXER: "boxer",

  // Nightwear
  ROBE: "robe",
  KIMONO: "kimono",
  SLIP_DRESS: "slip-dress",
  PJ_SET: "pj-set",
};

export const FABRICS = {
  LACE: "lace",
  COTTON: "cotton",
  SEAMLESS: "seamless",
  MESH: "mesh",
  SATIN: "satin",
};

// 4. Common Search Tags (Standardized for Search Weights)
// Use these to prevent "Seamless" vs "seamless" duplicates in your filter list.
export const SEARCH_TAGS = {
  // Fabrics
  LACE: "lace",
  SATIN: "satin",
  MESH: "mesh",
  COTTON: "cotton",
  SILK: "silk",
  RHINESTONE: "rhinestone",

  // Vibes/Features
  SEAMLESS: "seamless",
  HIGH_WAIST: "high-waist",
  STRAPPY: "strappy",
  SHEER: "sheer",
  BRIDAL: "bridal",
  COQUETTE: "coquette",
  PLUS_SIZE: "plus-size",
};

// 5. Currency
export const CURRENCY = {
  NGN: { code: "NGN", symbol: "₦", locale: "en-NG" },
  USD: { code: "USD", symbol: "$", locale: "en-US" },
};

// 6. Sizing Logic
export const SIZE_TYPES = {
  LETTER: "letter", // XS, S, M, L
  NUMERICAL: "numerical", // 8, 10, 12, 14
};
