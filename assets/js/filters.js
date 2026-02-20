import { COLLECTIONS } from "./constants.js";

// --- STATE ---
let contextProducts = []; // The "Base" list based on URL (e.g., all Lingerie)
let activeParams = {}; // Stores URL params to decide what filters to hide

let activeFilters = {
  collections: [],
  subCategories: [],
  colors: [],
  sizes: [],
  minRating: 0,
  maxPrice: 1000000,
};

let onFilterChangeCallback = null;

// --- INITIALIZATION ---
export function initFilters(allProducts, callback) {
  onFilterChangeCallback = callback;

  // 1. ANALYZE URL CONTEXT
  const params = new URLSearchParams(window.location.search);
  activeParams = {
    category: params.get("category"),
    subCategory: params.get("subCategory"),
    silhouette: params.get("silhouette"),
    collection: params.get("collection"),
    search: params.get("search"),
  };

  // 2. ESTABLISH BASE CONTEXT (Filter Master List -> Page List)
  contextProducts = allProducts.filter((p) => {
    if (activeParams.search) {
      const term = activeParams.search.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
      );
    }
    if (activeParams.collection)
      return p.collections.includes(activeParams.collection);
    if (activeParams.subCategory)
      return p.subCategory === activeParams.subCategory;
    if (activeParams.silhouette)
      return p.silhouette === activeParams.silhouette;
    if (activeParams.category) return p.category === activeParams.category;

    return true; // "All Products" page
  });

  // 3. SET DYNAMIC PRICE MAX
  if (contextProducts.length > 0) {
    const max = Math.max(...contextProducts.map((p) => p.price));
    activeFilters.maxPrice = max;
  }

  // 4. SETUP UI
  injectFilterDrawerHTML();
  renderFilterOptions(); // This now uses activeParams to decide what to show

  // 5. INITIAL RUN
  runFilterLogic();
}

// --- LOGIC ENGINE ---
function runFilterLogic() {
  // We filter the CONTEXT list
  const finalResults = contextProducts.filter((p) => {
    // A. Price
    if (p.price > activeFilters.maxPrice) return false;

    // B. Collections
    if (activeFilters.collections.length > 0) {
      const hasMatch = activeFilters.collections.some((c) =>
        p.collections.includes(c),
      );
      if (!hasMatch) return false;
    }

    // C. SubCategories (Only applies if user selects them in filter)
    if (activeFilters.subCategories.length > 0) {
      if (!activeFilters.subCategories.includes(p.subCategory)) return false;
    }

    // D. Colors (OR Logic)
    if (activeFilters.colors.length > 0) {
      const pColors = p.options.colors.map((c) => c.id);
      const hasMatch = activeFilters.colors.some((c) => pColors.includes(c));
      if (!hasMatch) return false;
    }

    // E. Sizes (OR Logic)
    if (activeFilters.sizes.length > 0) {
      const hasMatch = activeFilters.sizes.some((s) =>
        p.availableSizes.includes(s),
      );
      if (!hasMatch) return false;
    }

    // F. Ratings
    if (p.rating && p.rating < activeFilters.minRating) return false;

    return true;
  });

  if (onFilterChangeCallback) onFilterChangeCallback(finalResults);
}

// --- DOM GENERATOR ---
function injectFilterDrawerHTML() {
  if (document.querySelector(".filter-drawer")) return;

  const html = `
    <div class="filter-overlay" id="filter-overlay"></div>
    <div class="filter-drawer" id="filter-drawer">
        <div class="filter-header">
            <h3>Filters</h3>
            <button class="filter-close-btn" id="filter-close"><i class="ph-thin ph-x"></i></button>
        </div>
        
        <div class="filter-body" id="filter-body">
            </div>

        <div class="filter-footer">
            <button class="btn-clear-filters" id="btn-clear-filters">Clear All</button>
            <button class="btn-apply-filters" id="btn-apply-filters">Apply</button>
        </div>
    </div>`;

  document.body.insertAdjacentHTML("beforeend", html);

  // Event Listeners
  document.getElementById("filter-close").onclick = closeFilterDrawer;
  document.getElementById("filter-overlay").onclick = closeFilterDrawer;
  document.getElementById("btn-apply-filters").onclick = closeFilterDrawer;

  document.getElementById("btn-clear-filters").onclick = () => {
    // Reset State
    activeFilters.subCategories = [];
    activeFilters.colors = [];
    activeFilters.sizes = [];
    activeFilters.collections = [];
    activeFilters.minRating = 0;

    // Reset UI (Uncheck boxes)
    renderFilterOptions();
    runFilterLogic();
  };
}

function renderFilterOptions() {
  const body = document.getElementById("filter-body");

  // 1. EXTRACT DATA FROM CONTEXT
  const uniqueSubCats = [
    ...new Set(contextProducts.map((p) => p.subCategory).filter(Boolean)),
  ];
  const uniqueSizes = [
    ...new Set(contextProducts.flatMap((p) => p.availableSizes)),
  ];

  // Colors Map
  const colorMap = new Map();
  contextProducts.forEach((p) => {
    p.options.colors.forEach((c) => {
      if (!colorMap.has(c.id)) colorMap.set(c.id, c.hex);
    });
  });

  // 2. BUILD HTML
  let html = "";

  // A. Collections (Always Show)
  html += `
    <div class="filter-group">
        <span class="filter-title">Collections</span>
        <label class="filter-row"><input type="checkbox" onchange="toggleArr('collections', '${COLLECTIONS.NEW_ARRIVALS}')"> New Arrivals</label>
        <label class="filter-row"><input type="checkbox" onchange="toggleArr('collections', 'best-sellers')"> Best Sellers</label>
    </div>`;

  // B. Sub Categories (SMART DISPLAY)
  // Only show if:
  // 1. We have subcategories to show AND
  // 2. We are NOT already on a specific subCategory page AND
  // 3. We are NOT on a silhouette page
  const shouldShowSubCats =
    uniqueSubCats.length > 0 &&
    !activeParams.subCategory &&
    !activeParams.silhouette;

  if (shouldShowSubCats) {
    html += `<div class="filter-group"><span class="filter-title">Sub Category</span>`;
    uniqueSubCats.forEach((s) => {
      html += `<label class="filter-row"><input type="checkbox" onchange="toggleArr('subCategories', '${s}')"> ${formatTitle(s)}</label>`;
    });
    html += `</div>`;
  }

  // C. Price
  html += `
    <div class="filter-group">
        <span class="filter-title">Max Price: <span id="f-price-val">₦${activeFilters.maxPrice.toLocaleString()}</span></span>
        <div class="price-slider-container">
            <input type="range" id="f-price-range" min="0" max="${activeFilters.maxPrice}" value="${activeFilters.maxPrice}" step="5000">
        </div>
    </div>`;

  // D. Colors
  if (colorMap.size > 0) {
    html += `<div class="filter-group"><span class="filter-title">Colour</span><div class="filter-colors-grid">`;
    colorMap.forEach((hex, id) => {
      html += `<div class="f-color-btn" style="background:${hex}" onclick="toggleBtn(this, 'colors', '${id}')" title="${id}"></div>`;
    });
    html += `</div></div>`;
  }

  // E. Sizes
  if (uniqueSizes.length > 0) {
    html += `<div class="filter-group"><span class="filter-title">Size</span><div class="filter-sizes-grid">`;
    uniqueSizes.forEach((s) => {
      html += `<button class="f-size-btn" onclick="toggleBtn(this, 'sizes', '${s}')">${s}</button>`;
    });
    html += `</div></div>`;
  }

  // F. Ratings
  html += `
    <div class="filter-group">
        <span class="filter-title">Rating</span>
        <label class="filter-row"><input type="radio" name="rating" onchange="setRating(4)"> 4 Stars & Up</label>
        <label class="filter-row"><input type="radio" name="rating" onchange="setRating(3)"> 3 Stars & Up</label>
        <label class="filter-row"><input type="radio" name="rating" onchange="setRating(0)" checked> Any Rating</label>
    </div>`;

  body.innerHTML = html;

  // Attach Price Listener
  const range = document.getElementById("f-price-range");
  const label = document.getElementById("f-price-val");
  if (range) {
    range.oninput = (e) => {
      const val = Number(e.target.value);
      activeFilters.maxPrice = val;
      label.textContent = `₦${val.toLocaleString()}`;
      runFilterLogic();
    };
  }
}

// --- GLOBAL HELPERS ---

window.toggleArr = (key, val) => {
  const idx = activeFilters[key].indexOf(val);
  if (idx > -1) activeFilters[key].splice(idx, 1);
  else activeFilters[key].push(val);
  runFilterLogic();
};

window.toggleBtn = (el, key, val) => {
  el.classList.toggle("active");
  window.toggleArr(key, val);
};

window.setRating = (val) => {
  activeFilters.minRating = val;
  runFilterLogic();
};

// --- DRAWER CONTROLS ---
export function openFilterDrawer() {
  const d = document.getElementById("filter-drawer");
  const o = document.getElementById("filter-overlay");
  if (d) d.classList.add("open");
  if (o) o.classList.add("active");
}

export function closeFilterDrawer() {
  const d = document.getElementById("filter-drawer");
  const o = document.getElementById("filter-overlay");
  if (d) d.classList.remove("open");
  if (o) o.classList.remove("active");
}

function formatTitle(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
