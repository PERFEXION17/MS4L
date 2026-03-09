import {
  CATEGORY_IDS,
  COLLECTIONS,
  CURRENCY,
  FABRICS,
  SEARCH_TAGS,
  SILHOUETTES,
  SIZE_TYPES,
} from "./constants.js";

export const products = [
  {
    // --- 1. CORE IDENTITY ---
    // Fully Annotated Example (See constants.js for ENUMS)
    id: "prod_0001",
    slug: "aura-greek-key-set",
    name: "Aura Greek Key Active Short Set",

    // --- 2. CATEGORIZATION ---
    category: CATEGORY_IDS.ACTIVEWEAR,
    subCategory: "gym-sets",
    //Powers the "Cut" filter
    silhouette: SILHOUETTES.TWO_PIECE_SET,
    //Powers the Search Bar weighting
    tags: [SEARCH_TAGS.HIGH_WAIST, "greek-key", "luxury", "gym-outfit"],
    collections: [COLLECTIONS.NEW_ARRIVALS, COLLECTIONS.BEST_SELLERS],

    // --- 3. PRICING ---
    price: 13000,
    priceUSD: 10.0, // Approx conversion with psychological pricing
    currency: CURRENCY.NGN.code,
    discountPrice: null,

    // --- 4. INVENTORY & LOGIC ---
    inStock: true,
    lowStockWarning: true, // Derived from "Best Seller" status
    crossSell: ["", ""],

    // --- 5. SIZING STRATEGY ---
    sizeType: SIZE_TYPES.LETTER, // High-stretch activewear uses Letter sizing
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 8-10 (Waist 26-27")',
      M: 'UK 12 (Waist 28-29")',
      L: 'UK 14 (Waist 30-31")',
      XL: 'UK 16 (Waist 32-34")',
    },

    // --- 6. FABRIC & MATERIAL ---
    composition: "85% Polyester, 15% Spandex",
    gsm: 210, // Standard activewear weight
    careInstructions: "Machine wash cold. Do not iron trim.",

    // --- 7. VARIANT OPTIONS ---
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [{ id: "crimson-greek", label: "Crimson Greek", hex: "#BC0000" }],
    },

    // --- 8. MEDIA STRATEGY ---
    media: {
      "crimson-greek": [
        "./assets/img/active-wears/gym-sets/active-wear-1-red-greek-key-short-set-1.webp",
        "./assets/img/active-wears/gym-sets/active-wear-1-red-greek-key-short-set-2.webp",
        "./assets/img/active-wears/gym-sets/active-wear-1-red-greek-key-short-set-3.webp",
      ],
    },

    // --- 9. CONTENT ---
    description:
      "Make a statement at the gym or on the streets. This eye-catching activewear set features a bold Greek Key elasticated waistband, blending high-fashion aesthetics with athletic functionality.",
    details: [
      "Iconic gold and black Greek Key elasticated trim",
      "Supportive sports bra and matching dolphin-cut shorts",
      "High-stretch, breathable fabric for maximum mobility",
    ],

    // --- 10. METADATA ---
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 42,
  },

  {
    id: "prod_0002",
    slug: "iconic-band-red-set",
    name: "Iconic Band Red Active Short Set",
    category: CATEGORY_IDS.ACTIVEWEAR,
    subCategory: "gym-sets",
    silhoutte: SILHOUETTES.TWO_PIECE_SET,
    tags: [SEARCH_TAGS.HIGH_WAIST, "greek-key", "luxury", "gym-outfit"],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 13000,
    priceUSD: 10.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    sizeChart: {
      S: 'UK 8-10 (Waist 26-27")',
      M: 'UK 12 (Waist 28-29")',
      L: 'UK 14 (Waist 30-31")',
      XL: 'UK 16 (Waist 32-34")',
      XXL: 'UK 18 (Waist 35-37")',
    },
    composition: "90% Cotton, 10% Spandex",
    gsm: 180,
    careInstructions: "Wash cold inside out.",
    options: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [{ id: "scarlet-sport", label: "Scarlet Sport", hex: "#FF2400" }],
    },
    media: {
      "scarlet-sport": [
        "./assets/img/active-wears/gym-sets/active-wear-2-red-branded-athletic-short-set-1.webp",
        "./assets/img/active-wears/gym-sets/active-wear-2-red-branded-athletic-short-set-2.webp",
        "./assets/img/active-wears/gym-sets/active-wear-2-red-branded-athletic-short-set-3.webp",
      ],
    },
    description:
      "Classic comfort with a designer edge. This vibrant set features a signature logo-band waist, offering a sporty-chic look that transitions from stretches to lounging.",
    details: [
      "Signature wide white logo-text elastic band",
      "Soft, breathable cotton-stretch blend",
      "Retro curved hem on shorts with contrast piping",
    ],
    releaseDate: "2026-02-14",
    rating: 4.7,
    reviewCount: 28,
  },

  {
    id: "prod_0003",
    slug: "velocity-seamless-gym-set",
    name: "Velocity Two-Tone Seamless Gym Set",
    category: CATEGORY_IDS.ACTIVEWEAR,
    subCategory: "gym-sets",
    tags: [
      SEARCH_TAGS.HIGH_WAIST,
      "gym-outfit",
      "gym-wear",
      "joggers",
      "up-and-down",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS, COLLECTIONS.BEST_SELLERS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 8 (Waist 26-27")',
      M: 'UK 10-12 (Waist 28-29")',
      L: 'UK 14 (Waist 30-31")',
      XL: 'UK 16 (Waist 32-33")',
    },
    composition: "90% Nylon, 10% Spandex",
    gsm: 280,
    careInstructions: "Machine wash cold. Lay flat to dry.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "emerald-obsidian", label: "Emerald Obsidian", hex: "#00402E" },
        { id: "cobalt-noir", label: "Cobalt Noir", hex: "#001F3F" },
        { id: "blush-pink", label: "Blush Frost", hex: "#FADADD" },
      ],
    },
    media: {
      "emerald-obsidian": [
        "./assets/img/active-wears/gym-sets/gym-wear-1-green-black-seamless-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-green-black-seamless-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-green-black-seamless-gym-set-3.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-green-black-seamless-gym-set-4.webp",
      ],
      "cobalt-noir": [
        "./assets/img/active-wears/gym-sets/gym-wear-1-blue-black-seamless-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-blue-black-seamless-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-blue-black-seamless-gym-set-3.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-blue-black-seamless-gym-set-4.webp",
      ],
      "blush-pink": [
        "./assets/img/active-wears/gym-sets/gym-wear-1-pink-pink-seamless-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-pink-pink-seamless-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-1-pink-pink-seamless-gym-set-3.webp",
      ],
    },
    description:
      "Dominate your workout with high-performance seamless technology. Featuring body-contouring shading to accentuate curves and a zip-up crop top for adjustable ventilation.",
    details: [
      "Body-contour shading panels to enhance natural curves",
      "Zip-up front crop top with high neck",
      "Squat-proof seamless fabric with 4-way stretch",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 88,
  },

  {
    id: "prod_0004",
    slug: "classic-cobalt-boxers",
    name: "Classic Cobalt Pinstripe Boxers",
    category: "men",
    subCategory: "boxers",
    silhouette: SILHOUETTES.BOXER,
    tags: [SEARCH_TAGS.COTTON, "breathable", "classic-fit", "pinstripe"],
    collections: [COLLECTIONS.BEST_SELLERS],
    price: 9500,
    priceUSD: 7.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["M", "L", "XL", "XXL"],
    sizeChart: {
      M: 'Waist 32-34"',
      L: 'Waist 36-38"',
      XL: 'Waist 40-42"',
      XXL: 'Waist 44-46"',
    },
    composition: "100% Cotton",
    gsm: 160,
    careInstructions: "Machine wash warm.",
    options: {
      sizes: ["M", "L", "XL", "XXL"],
      colors: [{ id: "cobalt-stripe", label: "Cobalt Stripe", hex: "#0047AB" }],
    },
    media: {
      "cobalt-stripe": [
        "./assets/img/underwears/boxers/boxers-1-mens-blue-pinstripe-boxers.webp",
        "./assets/img/underwears/boxers/boxers-1-mens-gray-jersey-boxers.webp", // Included as variant detail
        "./assets/img/underwears/boxers/boxers-1-mens-yellow-plaid-boxers.webp", // Included as variant detail
      ],
    },
    description:
      "Everyday comfort redefined. These classic woven boxers are crafted from breathable, crisp cotton with a relaxed fit that ensures total freedom of movement.",
    details: [
      "100% premium woven cotton for maximum breathability",
      "Soft elastic waistband designed for zero digging",
      "Functional button-fly front and relaxed fit",
    ],
    releaseDate: "2026-01-20",
    rating: 4.7,
    reviewCount: 215,
  },

  {
    id: "prod_0005",
    slug: "obsidian-heart-bodysuit",
    name: "Obsidian Heart Strappy Bodysuit",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "teddies",
    silhouette: SILHOUETTES.BODYSUIT,
    tags: [
      SEARCH_TAGS.STRAPPY,
      SEARCH_TAGS.SHEER,
      "heart-hardware",
      "rave-wear",
      "festival",
    ],
    fabric: FABRICS.LACE,
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 22000,
    priceUSD: 16.5,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: 'UK 8 (Waist 26")',
      M: 'UK 10 (Waist 28")',
      L: 'UK 12 (Waist 30")',
    },
    composition: "95% Polyester, 5% Elastane",
    gsm: 140,
    careInstructions: "Hand wash only. Protect hardware.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        { id: "midnight-onyx", label: "Midnight Onyx", hex: "#0A0A0A" },
        { id: "passion-red", label: "Passion Red", hex: "#D2042D" },
      ],
    },
    media: {
      "midnight-onyx": [
        "./assets/img/lingeries/teddies/lingerie-2-black-strappy-heart-bodysuit-1.webp",
        "./assets/img/lingeries/teddies/lingerie-2-black-strappy-heart-bodysuit-2.webp",
        "./assets/img/lingeries/teddies/lingerie-2-black-strappy-heart-bodysuit-3.webp",
      ],
      "passion-red": [
        "./assets/img/lingeries/teddies/lingerie-2-red-strappy-heart-bodysuit-1.webp",
        "./assets/img/lingeries/teddies/lingerie-2-red-strappy-heart-bodysuit-2.webp",
        "./assets/img/lingeries/teddies/lingerie-2-red-strappy-heart-bodysuit-3.webp",
      ],
    },
    description:
      "A daring statement piece for the fearless. This architectural bodysuit features an intricate web of straps connected by silver heart-shaped hardware for an edgy, seductive look.",
    details: [
      "Signature silver-tone heart hardware connectors",
      "Fully adjustable straps for a bespoke precision fit",
      "Bold cutout design with a provocative thong back",
    ],
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 34,
  },

  {
    id: "prod_0006",
    slug: "royal-sapphire-chain-set",
    name: "Royal Sapphire Chain Lingerie Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.GARTER_SET,
    tags: [
      SEARCH_TAGS.SATIN,
      SEARCH_TAGS.HIGH_WAIST,
      "gold-chain",
      "hardware",
      "luxury",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS, COLLECTIONS.BEST_SELLERS],
    crossSell: ["prod_0005", "prod_0007"],
    price: 22000,
    priceUSD: 16.5,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: true,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 8 (Waist 26")',
      M: 'UK 10 (Waist 28")',
      L: 'UK 12 (Waist 30")',
      XL: 'UK 14 (Waist 32")',
    },
    composition: "90% Polyester Satin, 10% Elastane",
    gsm: 150,
    careInstructions: "Hand wash only. Remove chains if possible.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "obsidian-gold", label: "Obsidian Gold", hex: "#000000" },
        { id: "electric-sapphire", label: "Electric Sapphire", hex: "#0F52BA" },
        { id: "electric-fuchsia", label: "Electric Fuchsia", hex: "#FF1493" },
        { id: "scarlet-ember", label: "Scarlet Ember", hex: "#D32F2F" },
      ],
    },
    media: {
      "obsidian-gold": [
        "./assets/img/lingeries/lingerie-sets/lingerie-4-black-gold-chain-lingerie-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-black-gold-chain-lingerie-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-black-gold-chain-lingerie-set-3.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-black-gold-chain-lingerie-set-4.webp",
      ],
      "electric-sapphire": [
        "./assets/img/lingeries/lingerie-sets/lingerie-4-blue-gold-chain-lingerie-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-blue-gold-chain-lingerie-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-blue-gold-chain-lingerie-set-3.webp",
      ],
      "electric-fuchsia": [
        "./assets/img/lingeries/lingerie-sets/lingerie-4-pink-gold-chain-lingerie-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-pink-gold-chain-lingerie-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-pink-gold-chain-lingerie-set-3.webp",
      ],
      "scarlet-ember": [
        "./assets/img/lingeries/lingerie-sets/lingerie-4-red-gold-chain-lingerie-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-red-gold-chain-lingerie-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-4-red-gold-chain-lingerie-set-3.webp",
      ],
    },
    description:
      "Drape yourself in royalty. This stunning set features heavy gold-chain accents that highlight your silhouette, paired with smooth satin cups for a finish that radiates opulence.",
    details: [
      "Heavy gold-tone chain details on straps and waist",
      "High-waisted garter belt with adjustable luxury clips",
      "Includes matching sheer thigh-high stockings",
    ],
    releaseDate: "2026-02-14",
    rating: 5.0,
    reviewCount: 62,
  },

  {
    id: "prod_0007",
    slug: "noir-aristocrat-corset",
    name: "Noir Aristocrat Corset Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.CORSET,
    tags: [
      SEARCH_TAGS.SATIN,
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.BRIDAL,
      "boning",
      "evening-wear",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.NUMERICAL, // Structured Item
    availableSizes: [8, 10, 12, 14], // Mapping S/M/L to UK sizes
    sizeChart: {
      8: 'Small (Waist 26")',
      10: 'Medium (Waist 28")',
      12: 'Large (Waist 30")',
      14: 'X-Large (Waist 32")',
    },
    composition: "92% Satin Polyester, 8% Elastane",
    gsm: 200,
    careInstructions: "Hand wash cold.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "midnight-black", label: "Midnight Black", hex: "#050505" },
        { id: "rouge-passion", label: "Rouge Passion", hex: "#B22222" },
        { id: "ivory-radience", label: "Ivory Radience", hex: "#FFFFFF" },
      ],
    },
    media: {
      "midnight-black": [
        "./assets/img/lingeries/lingerie-sets/lingerie-6-black-lace-corset-bridal-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-black-lace-corset-bridal-set-3.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-black-lace-corset-bridal-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-black-lace-corset-bridal-set-4.webp",
      ],
      "rouge-passion": [
        "./assets/img/lingeries/lingerie-sets/lingerie-6-red-lace-corset-bridal-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-red-lace-corset-bridal-set-3.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-red-lace-corset-bridal-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-red-lace-corset-bridal-set-4.webp",
      ],
      "ivory-radience": [
        "./assets/img/lingeries/lingerie-sets/lingerie-6-white-lace-corset-bridal-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-white-lace-corset-bridal-set-3.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-6-white-lace-corset-bridal-set-2.webp",
      ],
    },
    description:
      "A study in dark romance, this structured satin corset ensemble sculpts the figure with unapologetic precision. It blurs the line between intimate apparel and cinematic evening wear.",
    details: [
      "Structured satin bodice with vertical boning for cinched definition",
      "Semi-sheer eyelash lace skirt overlay with integrated garters",
      "Includes matching satin ribbon choker accessory",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 18,
  },

  {
    id: "prod_0008",
    slug: "celestial-bride-tulle-set",
    name: "Celestial Bride Tulle Ensemble",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "bridal",
    silhouette: SILHOUETTES.CORSET,
    tags: [
      SEARCH_TAGS.BRIDAL,
      SEARCH_TAGS.SATIN,
      SEARCH_TAGS.SHEER,
      "tulle",
      "white-party",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 22000,
    priceUSD: 16.5,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.NUMERICAL,
    availableSizes: [8, 10, 12, 14],
    sizeChart: {
      8: 'Small (Waist 26")',
      10: 'Medium (Waist 28")',
      12: 'Large (Waist 30")',
      14: 'X-Large (Waist 32")',
    },
    composition: "85% Satin, 15% Nylon Tulle",
    gsm: 190,
    careInstructions: "Dry clean recommended.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "pristine-white", label: "Pristine White", hex: "#FFFFFF" },
      ],
    },
    media: {
      "pristine-white": [
        "./assets/img/lingeries/lingerie-sets/lingerie-5-white-satin-corset-tulle-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-5-white-satin-corset-tulle-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-5-white-satin-corset-tulle-set-3.webp",
      ],
    },
    description:
      "Angelic decadence defined. This pristine white satin corset sculpts with architectural grace, while the frothy tulle skirt adds a playful, ballet-inspired volume.",
    details: [
      "Underwired satin cups with structured bodice paneling",
      "Voluminous layered tulle mini-skirt with garter functionality",
      "Accessorized with matching opera-length gloves and choker",
    ],
    releaseDate: "2026-02-14",
    rating: 5.0,
    reviewCount: 12,
  },

  {
    id: "prod_0009",
    slug: "midnight-whisper-robe",
    name: "Midnight Whisper Sheer Robe",
    category: CATEGORY_IDS.NIGHTWEAR,
    subCategory: "robes",
    silhouette: SILHOUETTES.ROBE,
    tags: [
      SEARCH_TAGS.MESH,
      SEARCH_TAGS.SHEER,
      SEARCH_TAGS.LACE,
      "cover-up",
      "layering",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 15000,
    priceUSD: 12.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["One Size"],
    sizeChart: {
      "One Size": "Fits UK 8-16 (Adjustable Tie)",
    },
    composition: "95% Nylon Mesh, 5% Elastane",
    gsm: 80,
    careInstructions: "Hand wash cold. Drip dry.",
    options: {
      sizes: ["One Size"],
      colors: [
        { id: "obsidian-sheer", label: "Obsidian Sheer", hex: "#1A1A1A" },
        { id: "graphite-silk", label: "Graphite Silk", hex: "#707070" },
        { id: "sunset-silk", label: "Sunset Silk", hex: "#FFBD88" },
        { id: "midnight-garnet", label: "midnight garnet", hex: "#8B0000" },
      ],
    },
    media: {
      "obsidian-sheer": [
        "./assets/img/lingeries/robes/robe-1-black-mesh-robe-lingerie-set-1.webp",
        "./assets/img/lingeries/robes/robe-1-black-mesh-robe-lingerie-set-2.webp",
        "./assets/img/lingeries/robes/robe-1-black-mesh-robe-lingerie-set-3.webp",
      ],
      "graphite-silk": [
        "./assets/img/lingeries/robes/robe-1-gray-mesh-robe-lingerie-set-1.webp",
        "./assets/img/lingeries/robes/robe-1-gray-mesh-robe-lingerie-set-2.webp",
        "./assets/img/lingeries/robes/robe-1-gray-mesh-robe-lingerie-set-3.webp",
      ],
      "sunset-silk": [
        "./assets/img/lingeries/robes/robe-1-pink-mesh-robe-lingerie-set-1.webp",
        "./assets/img/lingeries/robes/robe-1-pink-mesh-robe-lingerie-set-2.webp",
        "./assets/img/lingeries/robes/robe-1-pink-mesh-robe-lingerie-set-3.webp",
      ],
      "midnight-garnet": [
        "./assets/img/lingeries/robes/robe-1-red-mesh-robe-lingerie-set-1.webp",
        "./assets/img/lingeries/robes/robe-1-red-mesh-robe-lingerie-set-2.webp",
        "./assets/img/lingeries/robes/robe-1-red-mesh-robe-lingerie-set-3.webp",
      ],
    },
    description:
      "A veil of translucent mystery, this sheer mesh robe drapes the figure in shadowy elegance. It is the ultimate luxury layering piece for the after-hours muse.",
    details: [
      "Lightweight sheer mesh for a breathable, barely-there feel",
      "Intricate floral lace detailing on cuffs and hemline",
      "Adjustable satin waist tie for a customized cinched fit",
    ],
    releaseDate: "2026-02-14",
    rating: 4.7,
    reviewCount: 9,
  },

  {
    id: "prod_0010",
    slug: "onyx-sculpt-jumpsuit",
    name: "Onyx Sculpt Jumpsuit",
    category: CATEGORY_IDS.ACTIVEWEAR,
    subCategory: "jumpsuits",
    silhouette: SILHOUETTES.JUMPSUIT,
    tags: [SEARCH_TAGS.SEAMLESS, "compression", "ribbed", "yoga", "one-piece"],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 8 (Waist 26")',
      M: 'UK 10-12 (Waist 28-29")',
      L: 'UK 14 (Waist 30-31")',
      XL: 'UK 16 (Waist 32-34")',
    },
    composition: "82% Nylon, 18% Spandex",
    gsm: 250,
    careInstructions: "Machine wash cold.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "obsidian-black", label: "Obsidian Black", hex: "#000000" },
        { id: "cerulean-pulse", label: "Cerulean Pulse", hex: "#007FFF" },
        { id: "cognac-earth", label: "Cognac Earth", hex: "#5C4033" },
        { id: "titanium-mist", label: "Titanium Mist", hex: "#808080" },
        { id: "ruby-garnet", label: "Ruby Garnet", hex: "#8B1A1A" },
      ],
    },
    media: {
      "obsidian-black": [
        "./assets/img/active-wears/gym-sets/gym-wear-2-black-one-piece-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-black-one-piece-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-black-one-piece-gym-set-3.webp",
      ],
      "cerulean-pulse": [
        "./assets/img/active-wears/gym-sets/gym-wear-2-blue-one-piece-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-blue-one-piece-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-blue-one-piece-gym-set-3.webp",
      ],
      "cognac-earth": [
        "./assets/img/active-wears/gym-sets/gym-wear-2-brown-one-piece-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-brown-one-piece-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-brown-one-piece-gym-set-3.webp",
      ],
      "titanium-mist": [
        "./assets/img/active-wears/gym-sets/gym-wear-2-gray-one-piece-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-gray-one-piece-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-gray-one-piece-gym-set-3.webp",
      ],
      "ruby-garnet": [
        "./assets/img/active-wears/gym-sets/gym-wear-2-red-one-piece-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-red-one-piece-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-2-red-one-piece-gym-set-3.webp",
      ],
    },
    description:
      "Engineered for the modern athlete who refuses to compromise. This sleek one-piece provides a seamless, second-skin fit for effortless sophistication in the studio.",
    details: [
      "Ribbed compression fabric for ultimate muscle support",
      "Scoop neckline with racerback for maximum range of motion",
      "Moisture-wicking technical textile for cool comfort",
    ],
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 15,
  },

  {
    id: "prod_0011",
    slug: "slate-zenith-performance",
    name: "Slate Zenith Performance Set",
    category: CATEGORY_IDS.ACTIVEWEAR,
    subCategory: "gym-sets",
    silhouette: SILHOUETTES.TWO_PIECE_SET,
    tags: [
      SEARCH_TAGS.HIGH_WAIST,
      "ribbed-knit",
      "zip-front",
      "industrial-chic",
      "shorts-set",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 13500,
    priceUSD: 10.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: 'UK 8 (Waist 26")',
      M: 'UK 10 (Waist 28")',
      L: 'UK 12 (Waist 30")',
    },
    composition: "85% Polyamide, 15% Elastane",
    gsm: 230,
    careInstructions: "Machine wash cold.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        { id: "zenith-white", label: "Zenith White", hex: "#ffffff" },
        { id: "slate-industrial", label: "Slate Industrial", hex: "#708090" },
      ],
    },
    media: {
      "zenith-white": [
        "./assets/img/active-wears/gym-sets/gym-wear-3-white-cropped-vest-shorts-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-3-white-cropped-vest-shorts-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-3-white-cropped-vest-shorts-gym-set-3.webp",
      ],
      "slate-industrial": [
        "./assets/img/active-wears/gym-sets/gym-wear-3-gray-cropped-vest-shorts-gym-set-1.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-3-gray-cropped-vest-shorts-gym-set-2.webp",
        "./assets/img/active-wears/gym-sets/gym-wear-3-gray-cropped-vest-shorts-gym-set-3.webp",
      ],
    },
    description:
      "A fusion of industrial chic and athletic precision. Featuring a sharp, zip-front cropped vest paired with high-contouring shorts for a commanding studio look.",
    details: [
      "Signature ribbed technical knit for superior flexibility",
      "Functional silver-tone zip-front cropped vest",
      "Ultra-high waistband designed for high-intensity security",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 22,
  },

  {
    id: "prod_0012",
    slug: "midnight-muse-babydoll",
    name: "Midnight Muse Babydoll",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "babydolls",
    silhouette: SILHOUETTES.BABYDOLL,
    tags: [
      SEARCH_TAGS.MESH,
      SEARCH_TAGS.SHEER,
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.COQUETTE,
      "romantic",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 10500,
    priceUSD: 8.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: "UK 8-10",
      M: "UK 12",
      L: "UK 14",
      XL: "UK 16",
    },
    composition: "90% Nylon, 10% Spandex",
    gsm: 100,
    careInstructions: "Hand wash delicate.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "obsidian-lace", label: "Obsidian Lace", hex: "#080808" },
        { id: "crimson-velvet", label: "Crimson Velvet", hex: "#800020" },
      ],
    },
    media: {
      "obsidian-lace": [
        "./assets/img/lingeries/babydolls/lingerie-7-black-lace-babydoll-set-1.webp",
        "./assets/img/lingeries/babydolls/lingerie-7-black-lace-babydoll-set-2.webp",
      ],
      "crimson-velvet": [
        "./assets/img/lingeries/babydolls/lingerie-7-red-lace-babydoll-set-1.webp",
        "./assets/img/lingeries/babydolls/lingerie-7-red-lace-babydoll-set-2.webp",
      ],
    },
    description:
      "Surrender to the enchantment of the night. Crafted from sheer, lightweight mesh, this ethereal babydoll offers a delicate balance of innocence and intrigue.",
    details: [
      "Sheer mesh body with a flared, floaty silhouette",
      "Delicate lace cups with a satin ribbon bow detail",
      "Adjustable spaghetti straps for a personalized fit",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 21,
  },

  {
    id: "prod_0013",
    slug: "nocturnal-rhapsody-gown",
    name: "Nocturnal Rhapsody Gown",
    category: CATEGORY_IDS.NIGHTWEAR,
    subCategory: "gowns",
    silhouette: SILHOUETTES.SLIP_DRESS,
    tags: [
      SEARCH_TAGS.MESH,
      SEARCH_TAGS.SHEER,
      SEARCH_TAGS.RHINESTONE,
      "ruffle",
      "maxi-dress",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 15500,
    priceUSD: 12.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: "UK 8-10",
      M: "UK 12",
      L: "UK 14",
    },
    composition: "95% Polyamide Mesh, 5% Metallic Fibres",
    gsm: 120,
    careInstructions: "Hand wash only. Do not steam.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        { id: "shadow-rhapsody", label: "Shadow Rhapsody", hex: "#020202" },
        { id: "crimson-veil", label: "Crimson Veil", hex: "#DC143C" },
      ],
    },
    media: {
      "shadow-rhapsody": [
        "./assets/img/lingeries/teddies/lingerie-8-black-sheer-mesh-ruffle-gown-set-1.webp",
        "./assets/img/lingeries/teddies/lingerie-8-black-sheer-mesh-ruffle-gown-set-2.webp",
      ],
      "crimson-veil": [
        "./assets/img/lingeries/teddies/lingerie-8-red-sheer-mesh-ruffle-gown-set-1.webp",
        "./assets/img/lingeries/teddies/lingerie-8-red-sheer-mesh-ruffle-gown-set-2.webp",
      ],
    },
    description:
      "An exquisite exploration of transparency and volume. This floor-sweeping gown features dramatic ruffled tiers and a thigh-high slit for unparalleled cinematic opulence.",
    details: [
      "Sheer pleated mesh with a layered ruffle empire waist",
      "Floor-length skirt featuring a high-lateral slit",
      "Slender diamante-embellished straps for brilliance",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 14,
  },

  {
    id: "prod_0014",
    slug: "noir-fleurette-babydoll",
    name: "Noir Fleurette Babydoll",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "babydolls",
    silhouette: SILHOUETTES.BABYDOLL,
    tags: [
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.SHEER,
      SEARCH_TAGS.COQUETTE,
      "floral",
      "bows",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 10500,
    priceUSD: 8.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: "UK 8-10",
      M: "UK 12",
      L: "UK 14",
      XL: "UK 16",
    },
    composition: "88% Nylon, 12% Elastane",
    gsm: 110,
    careInstructions: "Hand wash delicate.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "floral-obsidian", label: "Floral Obsidian", hex: "#000000" },
        { id: "scarlet-rose", label: "Scarlet Rose", hex: "#D21F3C" },
      ],
    },
    media: {
      "floral-obsidian": [
        "./assets/img/lingeries/babydolls/lingerie-9-black-lace-floral-babydoll-set-1.webp",
        "./assets/img/lingeries/babydolls/lingerie-9-black-lace-floral-babydoll-set-2.webp",
      ],
      "scarlet-rose": [
        "./assets/img/lingeries/babydolls/lingerie-9-red-lace-floral-babydoll-set-1.webp",
        "./assets/img/lingeries/babydolls/lingerie-9-red-lace-floral-babydoll-set-2.webp",
      ],
    },
    description:
      "Embrace the dark side of romance. Intricately designed with semi-sheer panels and delicate satin bows, it offers a sophisticated play on shadow and skin.",
    details: [
      "Exquisite floral lace cups with structural under-bust detailing",
      "Sheer mesh skirt with a scalloped lace hemline",
      "Triple satin bow embellishments for a refined finish",
    ],
    releaseDate: "2026-02-14",
    rating: 4.7,
    reviewCount: 19,
  },

  {
    id: "prod_0015",
    slug: "gilded-empress-caged-set",
    name: "Gilded Empress Caged Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.GARTER_SET,
    tags: [
      SEARCH_TAGS.STRAPPY,
      "caged",
      "hardware",
      "gold-chain",
      "bondage-aesthetic",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: 'UK 8 (Waist 26")',
      M: 'UK 10 (Waist 28")',
      L: 'UK 12 (Waist 30")',
    },
    composition: "85% Polyamide, 15% Zinc Alloy",
    gsm: 160,
    careInstructions: "Hand wash only. Dry hardware immediately.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [{ id: "obsidian-24k", label: "Obsidian & 24K", hex: "#111111" }],
    },
    media: {
      "obsidian-24k": [
        "./assets/img/lingeries/lingerie-sets/lingerie-10-black-caged-strappy-gold-chain-detail-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-10-black-caged-strappy-gold-chain-detail-set-2.webp",
      ],
    },
    description:
      "Dominance meets decadence. Featuring architectural caged strapwork and opulent gold-tone chain accents, this set is high-fashion wearable armor.",
    details: [
      "Multi-strap caged waist cincher with gold-tone hardware",
      "Underwired balcony bra with delicate gold chain swags",
      "Integrated adjustable leg garters for a commanding look",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 22,
  },

  {
    id: "prod_0016",
    slug: "onyx-ostrich-plume-teddy",
    name: "Onyx Ostrich Plume Teddy",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "teddies",
    silhouette: SILHOUETTES.TEDDY,
    tags: [SEARCH_TAGS.MESH, "feathers", "fishnet", "maximalist", "party-wear"],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: "UK 8",
      M: "UK 10",
      L: "UK 12",
    },
    composition: "82% Polyamide, 6% Ostrich Feathers",
    gsm: 170,
    careInstructions: "Specialist dry clean only.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        { id: "midnight-ostrich", label: "Midnight Ostrich", hex: "#010101" },
      ],
    },
    media: {
      "midnight-ostrich": [
        "./assets/img/lingeries/teddies/lingerie-11-black-feather-trim-fishnet-bodysuit-set-1.webp",
        "./assets/img/lingeries/teddies/lingerie-11-black-feather-trim-fishnet-bodysuit-set-2.webp",
      ],
    },
    description:
      "A breathtaking collision of texture. This avant-garde bodysuit features provocative fishnet panels juxtaposed against plush ostrich feather trims.",
    details: [
      "Authentic ostrich feather trim along the décolletage",
      "Sheer fishnet paneling with structural solid contouring",
      "Adjustable buckled waist belt with attached thigh garters",
    ],
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 16,
  },

  {
    id: "prod_0017",
    slug: "serengeti-vixen-set",
    name: "Serengeti Vixen Garter Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.GARTER_SET,
    tags: [
      SEARCH_TAGS.STRAPPY,
      SEARCH_TAGS.HIGH_WAIST,
      "leopard-print",
      "animal-print",
      "exotic",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 22000,
    priceUSD: 16.5,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: "UK 8",
      M: "UK 10",
      L: "UK 12",
    },
    composition: "85% Polyamide, 15% Elastane",
    gsm: 150,
    careInstructions: "Hand wash cold.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        { id: "classic-leopard", label: "Classic Leopard", hex: "#C6934B" },
      ],
    },
    media: {
      "classic-leopard": [
        "./assets/img/lingeries/lingerie-sets/lingerie-12-leopard-print-strappy-halter-garter-belt-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-12-leopard-print-strappy-halter-garter-belt-set-2.webp",
      ],
    },
    description:
      "Unleash primal elegance. Designed with a provocative strappy halter neck and high-waisted garter details, it is a masterclass in exotic luxury.",
    details: [
      "Halter-style bra with gold-tone O-ring hardware",
      "High-waisted architectural garter belt with leg straps",
      "Classic leopard print on high-stretch luxury microfibre",
    ],
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 26,
  },

  {
    id: "prod_0018",
    slug: "rose-coquette-bustier-set",
    name: "Rosé Coquette Bustier Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.BUSTIER_SET,
    tags: [
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.COQUETTE,
      SEARCH_TAGS.SHEER,
      "bows",
      "pastel-pink",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 22000,
    priceUSD: 16.5,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.NUMERICAL,
    availableSizes: [8, 10, 12, 14],
    sizeChart: {
      8: 'Small (Waist 26")',
      10: 'Medium (Waist 28")',
      12: 'Large (Waist 30")',
      14: 'X-Large (Waist 32")',
    },
    composition: "85% Nylon, 15% Elastane",
    gsm: 160,
    careInstructions: "Hand wash only.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [{ id: "peony-petal", label: "Peony Petal", hex: "#FFC1CC" }],
    },
    media: {
      "peony-petal": [
        "./assets/img/lingeries/lingerie-sets/lingerie-13-pink-lace-bustier-garter-skirt-set-bow-details-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-13-pink-lace-bustier-garter-skirt-set-bow-details-set-2.webp",
      ],
    },
    description:
      "A symphony of delicate lace and flirtatious charm. This bustier set features dainty satin bows and a feminine garter skirt for a playful look.",
    details: [
      "Underwired lace cups with charming satin bow accents",
      "Sheer floral lace garter skirt with adjustable straps",
      "Soft-stretch mesh panelling for a sculpted silhouette",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 31,
  },

  {
    id: "prod_0019",
    slug: "paisley-opulence-set",
    name: "Paisley Opulence Rhinestone Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.GARTER_SET,
    tags: [
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.RHINESTONE,
      "paisley",
      "sparkle",
      "crystal",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: "UK 8",
      M: "UK 10",
      L: "UK 12",
    },
    composition: "82% Nylon, 18% Elastane",
    gsm: 150,
    careInstructions: "Hand wash cold. Protect rhinestones.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        {
          id: "midnight-rhinestone",
          label: "Midnight Rhinestone",
          hex: "#0D0D0D",
        },
      ],
    },
    media: {
      "midnight-rhinestone": [
        "./assets/img/lingeries/lingerie-sets/lingerie-14-black-paisley-lace--rhinestone-straps-garters-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-14-black-paisley-lace--rhinestone-straps-garters-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-14-black-paisley-lace--rhinestone-straps-garters-set-3.webp",
      ],
    },
    description:
      "Decadent celebration of light-catching brilliance. Exquisite paisley lace elevated by dazzling rhinestone straps and a crystal heart charm.",
    details: [
      "Paisley lace cups with rhinestone-encrusted straps",
      "Architectural garter belt with silver heart hardware",
      "Includes matching lace-trimmed luxury stockings",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 17,
  },

  {
    id: "prod_0020",
    slug: "crimson-allure-balcony-set",
    name: "Crimson Allure Balcony Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.GARTER_SET,
    tags: [
      SEARCH_TAGS.SATIN,
      SEARCH_TAGS.STRAPPY,
      SEARCH_TAGS.MESH,
      "balcony-bra",
      "red-lingerie",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.NUMERICAL,
    availableSizes: [8, 10, 12, 14],
    sizeChart: {
      8: 'Small (Waist 26")',
      10: 'Medium (Waist 28")',
      12: 'Large (Waist 30")',
      14: 'X-Large (Waist 32")',
    },
    composition: "85% Polyamide, 15% Elastane",
    gsm: 180,
    careInstructions: "Hand wash cold.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "scarlet-crimson", label: "Scarlet Crimson", hex: "#B22222" },
      ],
    },
    media: {
      "scarlet-crimson": [
        "./assets/img/lingeries/lingerie-sets/lingerie-15-red-satin-mesh-balcony-bra-criss-cross-garter-set-1.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-15-red-satin-mesh-balcony-bra-criss-cross-garter-set-2.webp",
        "./assets/img/lingeries/lingerie-sets/lingerie-15-red-satin-mesh-balcony-bra-criss-cross-garter-set-3.webp",
      ],
    },
    description:
      "Striking fusion of classic elegance and provocative design. Lustrous satin balcony bra paired with a commanding waist-defining garter belt.",
    details: [
      "Satin balcony bra with architectural mesh cut-outs",
      "High-waisted garter featuring multi-strap criss-cross design",
      "Coordinating red mesh thigh bands for a cohesive look",
    ],
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 19,
  },

  {
    id: "prod_0021",
    slug: "noir-coquette-corset",
    name: "Noir Coquette Lace Corset Set",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "teddies",
    silhouette: SILHOUETTES.CORSET,
    tags: [
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.COQUETTE,
      SEARCH_TAGS.SHEER,
      "ribbon-lacing",
      "tutu",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.NUMERICAL,
    availableSizes: [8, 10, 12],
    sizeChart: {
      8: 'Small (Waist 26")',
      10: 'Medium (Waist 28")',
      12: 'Large (Waist 30")',
    },
    composition: "85% Polyamide, 15% Elastane",
    gsm: 190,
    careInstructions: "Hand wash cold. Do not twist.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [
        { id: "obsidian-peony", label: "Obsidian & Peony", hex: "#0A0A0A" },
      ],
    },
    media: {
      "obsidian-peony": [
        "./assets/img/lingeries/teddies/lingerie-16-black-lace-corset-bodysuit-pink-ribbon-tutu-skirt-set-1.webp",
        "./assets/img/lingeries/teddies/lingerie-16-black-lace-corset-bodysuit-pink-ribbon-tutu-skirt-set-2.webp",
      ],
    },
    description:
      "A flirtatious masterpiece of dark romance and playful charm. This structured black lace corset is defined by contrasting peony pink ribbon lacing and delicate bows, finished with a whimsical heart-motif tutu skirt for a look that is unapologetically coquette.",
    details: [
      "Floral lace corset bodice with functional pink satin ribbon lace-up detailing",
      "Sheer heart-patterned tulle tutu skirt for a voluminous, feminine silhouette",
      "Adjustable shoulder straps and supportive underwired cups for a perfect contour",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 24,
  },

  {
    id: "prod_0022",
    slug: "rosette-noir-lace-robe",
    name: "Rosette Noir Lace Ensemble",
    category: CATEGORY_IDS.NIGHTWEAR,
    subCategory: "robes",
    silhouette: SILHOUETTES.ROBE,
    tags: [
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.SHEER,
      SEARCH_TAGS.COQUETTE,
      "rosette",
      "3d-floral",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 20000,
    priceUSD: 15.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: "UK 8-10",
      M: "UK 12",
      L: "UK 14",
      XL: "UK 16",
    },
    composition: "90% Nylon, 10% Elastane",
    gsm: 120,
    careInstructions: "Hand wash delicate. Do not iron rosettes.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "obsidian-bloom", label: "Obsidian Bloom", hex: "#080808" },
        { id: "scarlet-bloom", label: "Scarlet Bloom", hex: "#B22222" },
        { id: "royal-bloom", label: "Royal Bloom", hex: "#0F52BA" },
      ],
    },
    media: {
      "obsidian-bloom": [
        "./assets/img/lingeries/robes/lingerie-17-black-lace-robe-rosette-sleeves-bralette-set-1.webp",
        "./assets/img/lingeries/robes/lingerie-17-black-lace-robe-rosette-sleeves-bralette-set-2.webp",
        "./assets/img/lingeries/robes/lingerie-17-black-lace-robe-rosette-sleeves-bralette-set-3.webp",
      ],
      "scarlet-bloom": [
        "./assets/img/lingeries/robes/lingerie-17-red-lace-robe-rosette-sleeves-bralette-set-1.webp",
        "./assets/img/lingeries/robes/lingerie-17-red-lace-robe-rosette-sleeves-bralette-set-2.webp",
        "./assets/img/lingeries/robes/lingerie-17-red-lace-robe-rosette-sleeves-bralette-set-3.webp",
      ],
      "royal-bloom": [
        "./assets/img/lingeries/robes/lingerie-17-blue-lace-robe-rosette-sleeves-bralette-set-1.webp",
        "./assets/img/lingeries/robes/lingerie-17-blue-lace-robe-rosette-sleeves-bralette-set-2.webp",
      ],
    },
    description:
      "A dramatic fusion of artisanal texture and midnight allure. This exquisite sheer lace robe is defined by its voluminous, 3D rosette-embellished sleeves, creating a high-fashion silhouette that transforms intimate lounging into a cinematic event.",
    details: [
      "Sheer floral lace construction with dramatic 3D rosette-sculpted cuffs",
      "Includes coordinating scalloped lace bralette and high-waist satin-panelled panty",
      "Open-front design with a delicate drape for effortless elegance",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 15,
  },

  {
    id: "prod_0023",
    slug: "obsidian-garter-bodysuit",
    name: "Obsidian Heart-Lace Garter Bodysuit",
    category: CATEGORY_IDS.LINGERIE,
    subCategory: "teddies",
    silhouette: SILHOUETTES.BODYSUIT,
    tags: [
      SEARCH_TAGS.MESH,
      SEARCH_TAGS.STRAPPY,
      "fishnet",
      "garter",
      "lace-up",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 25000,
    priceUSD: 19.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L"],
    sizeChart: {
      S: "UK 8",
      M: "UK 10",
      L: "UK 12",
    },
    composition: "85% Polyamide, 15% Elastane",
    gsm: 160,
    careInstructions: "Hand wash cold.",
    options: {
      sizes: ["S", "M", "L"],
      colors: [{ id: "obsidian-noir", label: "Obsidian Noir", hex: "#0A0A0A" }],
    },
    media: {
      "obsidian-noir": [
        "./assets/img/lingeries/teddies/lingerie-18-black-mesh-lace-up-garter-bodysuit-fishnet-stockings-set-1.webp",
        "./assets/img/lingeries/teddies/lingerie-18-black-mesh-lace-up-garter-bodysuit-fishnet-stockings-set-2.webp",
        "./assets/img/lingeries/teddies/lingerie-18-black-mesh-lace-up-garter-bodysuit-fishnet-stockings-set-3.webp",
      ],
    },
    description:
      "A cinematic masterpiece of structural allure and intricate detail. This obsidian mesh bodysuit features daring side lace-up panels secured with silver heart-shaped hardware, flowing seamlessly into integrated garter straps for a silhouette that is both architectural and undeniably provocative.",
    details: [
      "Sheer mesh and solid contour paneling with functional side lace-up detailing",
      "Signature silver-tone heart hardware eyelets and adjustable garter attachments",
      "Includes coordinating high-density fishnet stockings for a complete high-glamour look",
    ],
    releaseDate: "2026-02-14",
    rating: 4.9,
    reviewCount: 22,
  },

  {
    id: "prod_0024",
    slug: "amethyst-flora-sleepset",
    name: "Amethyst Flora Rhinestone Sleepset",
    category: CATEGORY_IDS.NIGHTWEAR,
    subCategory: "lingerie-sets",
    silhouette: SILHOUETTES.PJ_SET,
    tags: [
      SEARCH_TAGS.SATIN,
      SEARCH_TAGS.LACE,
      SEARCH_TAGS.RHINESTONE,
      "floral-print",
      "sleep-shorts",
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 6500,
    priceUSD: 5.0,
    currency: CURRENCY.NGN.code,
    inStock: true,
    lowStockWarning: false,
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: "UK 8-10",
      M: "UK 12",
      L: "UK 14",
      XL: "UK 16",
    },
    composition: "95% Polyester Satin, 5% Elastane",
    gsm: 150,
    careInstructions: "Hand wash cold.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "amethyst-cream", label: "Amethyst & Cream", hex: "#602F6B" },
        { id: "golden-honey", label: "Golden Honey", hex: "#DAA520" },
      ],
    },
    media: {
      "amethyst-cream": [
        "./assets/img/sleep-and-loungewear/sleepwear-sets/sleepwear-1-purple-lace-floral-satin-rhinestone-detail-set-1.webp",
        "./assets/img/sleep-and-loungewear/sleepwear-sets/sleepwear-1-purple-lace-floral-satin-rhinestone-detail-set-2.webp",
        "./assets/img/sleep-and-loungewear/sleepwear-sets/sleepwear-1-purple-lace-floral-satin-rhinestone-detail-set-3.webp",
      ],
      "golden-honey": [
        "./assets/img/sleep-and-loungewear/sleepwear-sets/sleepwear-1-yellow-lace-floral-satin-rhinestone-detail-set-1.webp",
        "./assets/img/sleep-and-loungewear/sleepwear-sets/sleepwear-1-yellow-lace-floral-satin-rhinestone-detail-set-2.webp",
        "./assets/img/sleep-and-loungewear/sleepwear-sets/sleepwear-1-yellow-lace-floral-satin-rhinestone-detail-set-3.webp",
      ],
    },
    description:
      "Elevate your evening ritual with a touch of botanical brilliance. This luxurious sleepset pairs a delicate amethyst lace bralette, accented with a criss-cross rhinestone harness, with creamy satin shorts featuring a vintage-inspired purple rose print.",
    details: [
      "Sheer amethyst floral lace bralette with shimmering rhinestone-embellished straps",
      "Lustrous cream satin shorts with a romantic purple rosette pattern and scalloped lace hem",
      "Elasticated waistband on shorts for a relaxed, comfortable fit without sacrificing style",
    ],
    releaseDate: "2026-02-14",
    rating: 4.8,
    reviewCount: 12,
  },
  {
    id: "prod_0025",
    slug: "sculpt-seamless-high-waist-thong",
    name: "Sculpt Seamless High-Waist Thong",
    category: "intimates",
    subCategory: "shaper-wear",
    silhouette: "shaping-thong",
    tags: [
      SEARCH_TAGS.SEAMLESS, 
      SEARCH_TAGS.HIGH_WAIST, 
      "compression", 
      "tummy-control", 
      "invisible-finish"
    ],
    collections: [COLLECTIONS.BEST_SELLERS, COLLECTIONS.NEW_ARRIVALS],

    price: 11000,
    priceUSD: 8.50,
    currency: CURRENCY.NGN.code,
    discountPrice: null,

    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0021", "prod_0010"],

    sizeType: SIZE_TYPES.LETTER, 
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: {
      S: 'UK 8 (Waist 25-26")',
      M: 'UK 10-12 (Waist 27-29")',
      L: 'UK 14 (Waist 30-32")',
      XL: 'UK 16 (Waist 33-35")',
      "2XL": 'UK 18 (Waist 36-38")'
    },

    composition: "78% Nylon, 22% Spandex",
    gsm: 280,
    careInstructions: "Hand wash cold only. Lay flat to dry to maintain elasticity.",

    options: {
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: [
        { id: "onyx-black", label: "Onyx Black", hex: "#000000" },
      ],
    },

    media: {
      "onyx-black": [
        "./assets/img/underwears/shapewear/shapewear-1-black-seamless-high-waist-sculpting-thong-1.webp",
        "./assets/img/underwears/shapewear/shapewear-1-black-seamless-high-waist-sculpting-thong-2.webp",
        "./assets/img/underwears/shapewear/shapewear-1-black-seamless-high-waist-sculpting-thong-3.webp"
      ],
    },

    description: "Engineered for ultimate control without the bulk. This seamless high-waist thong provides 360-degree midsection compression while remaining completely invisible under your most form-fitting Sapphire Signature dresses.",
    details: [
      "Ultra-high waistband with anti-slip silicone lining",
      "Reinforced front panel for targeted tummy smoothing",
      "Thong back design to eliminate visible panty lines (VPL)",
      "Breathable, sweat-wicking foundation fabric"
    ],

    releaseDate: "2026-03-08",
    rating: 4.9,
    reviewCount: 112,
  },
  {
    id: "prod_0026",
    slug: "sculpt-seamless-mid-thigh-short",
    name: "Sculpt Seamless Mid-Thigh Short",
    category: "intimates",
    subCategory: "shaper-wear",
    silhouette: "shaping-short",
    tags: [
      SEARCH_TAGS.SEAMLESS, 
      SEARCH_TAGS.HIGH_WAIST, 
      "compression", 
      "anti-chafing", 
      "thigh-sculpting"
    ],
    collections: [COLLECTIONS.BEST_SELLERS],
    price: 11000,
    priceUSD: 8.50,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0025", "prod_0001"],
    sizeType: SIZE_TYPES.LETTER, 
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    sizeChart: {
      S: 'UK 8 (Waist 25-26")',
      M: 'UK 10-12 (Waist 27-29")',
      L: 'UK 14 (Waist 30-32")',
      XL: 'UK 16 (Waist 33-35")',
      "2XL": 'UK 18 (Waist 36-38")'
    },
    composition: "75% Nylon, 25% Spandex",
    gsm: 300,
    careInstructions: "Hand wash cold. Avoid fabric softeners to preserve compression power.",
    options: {
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: [
        { id: "onyx-black", label: "Onyx Black", hex: "#000000" },
      ],
    },
    media: {
      "onyx-black": [
        "./assets/img/underwears/shapewear/shapewear-2-black-seamless-high-waist-mid-thigh-short-1.webp",
        "./assets/img/underwears/shapewear/shapewear-2-black-seamless-high-waist-mid-thigh-short-2.webp",
        "./assets/img/underwears/shapewear/shapewear-2-black-seamless-high-waist-mid-thigh-short-3.webp"
      ],
    },
    description: "The ultimate foundation for a flawless silhouette. These mid-thigh shorts provide intense core compression and targeted thigh sculpting, finished with sheer mesh panels for breathability and a smooth transition under clothing.",
    details: [
      "Extended high-waist coverage for total midsection control",
      "Sheer mesh thigh panels for targeted ventilation",
      "Laser-cut edges for a zero-line finish",
      "Double-layered abdominal panel for maximum smoothing"
    ],
    releaseDate: "2026-03-08",
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "prod_0027",
    slug: "azure-lace-sculpt-brief",
    name: "Azure Lace Sculpt High-Waist Brief",
    category: CATEGORY_IDS.INTIMATES,
    subCategory: "panties",
    silhouette: "briefs",
    tags: [
      SEARCH_TAGS.LACE, 
      SEARCH_TAGS.HIGH_WAIST, 
      "tummy-control", 
      "floral-lace", 
      "light-compression"
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 2200,
    priceUSD: 2.00,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0025", "prod_0026"],
    sizeType: SIZE_TYPES.LETTER, 
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 8 (Waist 25-26")',
      M: 'UK 10-12 (Waist 27-29")',
      L: 'UK 14 (Waist 30-32")',
      XL: 'UK 16 (Waist 33-35")'
    },
    composition: "82% Polyamide, 18% Elastane",
    gsm: 240,
    careInstructions: "Hand wash cold. Use a lingerie bag if machine washing on delicate cycle.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "azure-blue", label: "Azure Blue", hex: "#87CEEB" },
      ],
    },
    media: {
      "azure-blue": [
        "./assets/img/underwears/panties/panties-1-blue-floral-lace-high-waist-shaping-brief-1.webp",
        "./assets/img/underwears/panties/panties-1-blue-floral-lace-high-waist-shaping-brief-2.webp",
      "./assets/img/underwears/panties/panties-1-blue-floral-lace-high-waist-shaping-brief-3.webp"
      ],
    },
    description: "A beautiful fusion of elegance and functionality. This high-waist shaping brief features a smooth azure blue front panel for gentle tummy control, accented by delicate floral lace side panels for a feminine touch that doesn't sacrifice support.",
    details: [
      "Targeted light-to-medium compression for abdominal smoothing",
      "Sheer floral lace side panels for breathability and style",
      "Soft elasticated waistband designed to sit flat against the skin",
      "Full back coverage with a flattering high-cut leg"
    ],
    releaseDate: "2026-03-08",
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: "prod_0028",
    slug: "ribbed-cotton-modal-heart-brief",
    name: "Essential Ribbed Cotton-Modal Brief",
    category: CATEGORY_IDS.INTIMATES,
    subCategory: "panties",
    silhouette: "brief",
    tags: [
      SEARCH_TAGS.HIGH_WAIST,
      "ribbed-texture",
      "gold-hardware",
      "daily-luxury",
      "breathable"
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS, COLLECTIONS.BEST_SELLERS],
    price: 2200,
    priceUSD: 2.00,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: true,
    crossSell: ["prod_0027", "prod_0025"],
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 6-8 (Hips 34-36")',
      M: 'UK 10 (Hips 37-38")',
      L: 'UK 12-14 (Hips 39-41")',
      XL: 'UK 16 (Hips 42-44")'
    },
    composition: "47% Cotton, 47% Modal, 6% Spandex",
    gsm: 180,
    careInstructions: "Machine wash warm in a mesh bag. Tumble dry low.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "soft-sand", label: "Soft Sand", hex: "#D9C5B2" },
      ],
    },
    media: {
      "soft-sand": [
        "./assets/img/underwears/panties/panties-2-sand-ribbed-cotton-modal-brief-1.webp",
        "./assets/img/underwears/panties/panties-2-sand-ribbed-cotton-modal-brief-2.webp"
      ],
    },
    description: "The ultimate everyday foundation. Crafted from a premium cotton-modal blend with a soft ribbed texture, this brief features a delicate lace-trim waistband and a signature gold heart charm for a touch of Sapphire elegance.",
    details: [
      "Ultra-soft breathable ribbed fabric for all-day wear",
      "Intricate geometric lace waistband detail",
      "Signature 14K gold-plated heart charm at center front",
      "Full back coverage with a mid-to-high rise fit"
    ],
    releaseDate: "2026-03-08",
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "prod_0029",
    slug: "linear-accent-high-waist-panty",
    name: "Linear Accent High-Waist Panty",
    category: CATEGORY_IDS.INTIMATES,
    subCategory: "panties",
    silhouette: "brief",
    tags: [
      SEARCH_TAGS.HIGH_WAIST, 
      SEARCH_TAGS.SEAMLESS,
      "sport-luxe", 
      "breathable-mesh",
      "daily-comfort"
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 2200,
    priceUSD: 2.00,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0028", "prod_0001"],
    sizeType: SIZE_TYPES.LETTER, 
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 8 (Hips 34-36")',
      M: 'UK 10-12 (Hips 37-39")',
      L: 'UK 14 (Hips 40-42")',
      XL: 'UK 16 (Hips 43-45")'
    },
    composition: "90% Nylon, 10% Spandex",
    gsm: 160,
    careInstructions: "Machine wash cold. Tumble dry low. Do not iron.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "cream-slate", label: "Cream & Slate", hex: "#F5F5DC" }
      ],
    },
    media: {
      "cream-slate": [
        "./assets/img/underwears/panties/panties-3-cream-linear-accent-high-waist-panty-1.webp",
        "./assets/img/underwears/panties/panties-3-cream-linear-accent-high-waist-panty-2.webp"
      ]
    },
    description: "Modern athletic aesthetics meet everyday comfort. This high-waist panty features contrast linear detailing and a micro-ribbed texture, offering a secure fit with a breathable, lightweight finish perfect for active days.",
    details: [
      "Contrast slate-grey linear detailing for a sporty silhouette",
      "Soft, high-rise waistband for a flattering, stay-put fit",
      "Moisture-wicking micro-mesh fabric panels",
      "Seamless edges for a smooth look under leggings or jeans"
    ],
    releaseDate: "2026-03-08",
    rating: 4.7,
    reviewCount: 12,
  },
  {
    id: "prod_0030",
    slug: "signature-ribbed-v-hardware-thong",
    name: "Signature Ribbed V-Hardware Thong",
    category: CATEGORY_IDS.INTIMATES,
    subCategory: "panties",
    silhouette: "thong",
    tags: [
      SEARCH_TAGS.RIB_KNIT,
      "gold-hardware",
      "v-hardware",
      "minimalist-luxury",
      "low-rise"
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS],
    price: 2500,
    priceUSD: 2.00,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0028", "prod_0029"],
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 6-8 (Hips 34-36")',
      M: 'UK 10 (Hips 37-38")',
      L: 'UK 12-14 (Hips 39-41")',
      XL: 'UK 16 (Hips 42-44")'
    },
    composition: "92% Nylon, 8% Spandex",
    gsm: 170,
    careInstructions: "Hand wash recommended to preserve hardware finish. If machine washing, use a delicate bag.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "arctic-white", label: "Arctic White", hex: "#FFFFFF" },
      ],
    },
    media: {
      "arctic-white": [
        "./assets/img/underwears/panties/panties-4-white-ribbed-v-hardware-thong-1.webp",
        "./assets/img/underwears/panties/panties-4-white-ribbed-v-hardware-thong-2.webp"
      ],
    },
    description: "Elevate your essentials with the Signature V-Hardware Thong. Featuring a clean ribbed texture and polished rose-gold 'V' hardware at the hips, this piece combines a sporty aesthetic with high-fashion detail.",
    details: [
      "Premium micro-ribbed stretch fabric for a contoured fit",
      "Bespoke rose-gold plated 'V' hardware accents at the hips",
      "Seamless thong back for an invisible finish under clothing",
      "Lined cotton gusset for superior all-day comfort"
    ],
    releaseDate: "2026-03-08",
    rating: 4.8,
    reviewCount: 21,
  },
  {
    id: "prod_0031",
    slug: "crimson-ribbed-hardware-thong",
    name: "Crimson Ribbed Gold-Link Thong",
    category: CATEGORY_IDS.INTIMATES,
    subCategory: "panties",
    silhouette: "thong",
    tags: [
      SEARCH_TAGS.RIB_KNIT,
      "gold-hardware",
      "bold-color",
      "minimalist",
      "low-rise"
    ],
    collections: [COLLECTIONS.NEW_ARRIVALS, COLLECTIONS.BEST_SELLERS],
    price: 2200,
    priceUSD: 2.00,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0030", "prod_0001"],
    sizeType: SIZE_TYPES.LETTER,
    availableSizes: ["S", "M", "L", "XL"],
    sizeChart: {
      S: 'UK 6-8 (Hips 34-36")',
      M: 'UK 10 (Hips 37-38")',
      L: 'UK 12-14 (Hips 39-41")',
      XL: 'UK 16 (Hips 42-44")'
    },
    composition: "90% Nylon, 10% Spandex",
    gsm: 175,
    careInstructions: "Hand wash cold to maintain the brilliance of the crimson dye and gold hardware.",
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { id: "crimson-red", label: "Crimson Red", hex: "#BC0000" }
      ],
    },
    media: {
      "crimson-red": [
        "./assets/img/underwears/panties/panties-5-red-ribbed-gold-link-thong-1.webp",
        "./assets/img/underwears/panties/panties-5-red-ribbed-gold-link-thong-2.webp",
        "./assets/img/underwears/panties/panties-5-red-ribbed-gold-link-thong-3.webp",
        "./assets/img/underwears/panties/panties-5-red-ribbed-gold-link-thong-4.webp"
      ]
    },
    description: "Make a vibrant statement with our Crimson Ribbed Thong. Designed with a flattering high-cut leg and accented by subtle circular gold-link hardware at the hips, this piece brings an opulent edge to your daily intimates.",
    details: [
      "Vibrant crimson rib-knit stretch fabric",
      "Delicate gold-link hardware connectors at the hip",
      "Ultra-slim waistband for a modern, minimalist fit",
      "Cotton-lined gusset for breathable, all-day comfort"
    ],
    releaseDate: "2026-03-08",
    rating: 4.9,
    reviewCount: 14,
  },
  {
    id: "prod_0032",
    slug: "seamless-contour-essentials-bra",
    name: "Seamless Contour Essentials Bra",
    category: CATEGORY_IDS.INTIMATES,
    subCategory: "bras",
    silhouette: "push-up",
    tags: [
      SEARCH_TAGS.SEAMLESS,
      "t-shirt-bra",
      "daily-comfort",
      "moulded-cups",
      "wire-free"
    ],
    collections: [COLLECTIONS.BEST_SELLERS],
    price: 10000,
    priceUSD: 7.50,
    currency: CURRENCY.NGN.code,
    discountPrice: null,
    inStock: true,
    lowStockWarning: false,
    crossSell: ["prod_0031", "prod_0028"],
    sizeType: SIZE_TYPES.BRA,
    availableSizes: ["32B", "34B", "34C", "36C", "38D"],
    sizeChart: {
      "32B": "Underbust 27-28 in",
      "34B": "Underbust 29-30 in",
      "34C": "Underbust 29-30 in",
      "36C": "Underbust 31-32 in",
      "38D": "Underbust 33-34 in"
    },
    composition: "85% Polyamide, 15% Elastane",
    gsm: 210,
    careInstructions: "Hand wash only. Do not wring or twist. Dry flat to maintain cup shape.",
    options: {
      sizes: ["32B", "34B", "34C", "36C", "38D"],
      colors: [
        { id: "magenta-berry", label: "Magenta Berry", hex: "#A4345D" }
      ],
    },
    media: {
      "magenta-berry": [
        "./assets/img/underwears/bras/bras-1-magenta-seamless-contour-bra-1.webp",
        "./assets/img/underwears/bras/bras-1-magenta-seamless-contour-bra-2.webp",
        "./assets/img/underwears/bras/bras-1-magenta-seamless-contour-bra-3.webp",
        "./assets/img/underwears/bras/bras-1-magenta-seamless-contour-bra-4.webp",
        "./assets/img/underwears/bras/bras-1-magenta-seamless-contour-bra-5.webp"
      ]
    },
    description: "The ultimate invisible layer. Our Seamless Contour Bra features ultra-smooth, moulded cups and a wire-free design that provides natural lift and support without any visible lines, finished in a rich magenta berry hue.",
    details: [
      "Smooth, seamless finish for zero visibility under clothing",
      "Breathable, lightweight foam contour cups",
      "Adjustable straps and hook-and-eye back closure",
      "Wide comfort wings for smooth back and side support"
    ],
    releaseDate: "2026-03-08",
    rating: 4.9,
    reviewCount: 64,
  }
];
