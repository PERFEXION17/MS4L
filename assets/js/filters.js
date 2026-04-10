// assets/js/filters.js
import { COLLECTIONS } from "./constants.js";

// ────────────────────────────────────────────────
// STATE
// ────────────────────────────────────────────────
let contextProducts = [];
let activeParams = {};

let activeFilters = {
  collections: [],
  subCategories: [],
  colors: [],
  sizes: [],
  minRating: 0,
  maxPrice: 1000000,
  searchTerm: "", // Always a string
};

let onFilterChangeCallback = null;

// ────────────────────────────────────────────────
// INITIALIZATION
// ────────────────────────────────────────────────
export function initFilters(allProducts, callback) {
  onFilterChangeCallback = callback;

  const params = new URLSearchParams(window.location.search);
  activeParams = {
    category: params.get("category"),
    subCategory: params.get("subCategory"),
    silhouette: params.get("silhouette"),
    collection: params.get("collection"),
    search: params.get("search"),
  };

  // Build base context with improved search
  contextProducts = allProducts.filter((p) => {
    if (activeParams.search) {
      return matchesSearch(p, activeParams.search);
    }

    if (activeParams.collection)
      return p.collections.includes(activeParams.collection);
    if (activeParams.subCategory)
      return p.subCategory === activeParams.subCategory;
    if (activeParams.silhouette)
      return p.silhouette === activeParams.silhouette;
    if (activeParams.category) return p.category === activeParams.category;

    return true;
  });

  if (contextProducts.length > 0) {
    activeFilters.maxPrice = Math.max(...contextProducts.map((p) => p.price));
  }

  injectFilterDrawerHTML();
  renderFilterOptions();
  runFilterLogic();
}

// ────────────────────────────────────────────────
// IMPROVED SEARCH MATCHING (this fixes "lingerie", "panty", "panties" etc.)
// ────────────────────────────────────────────────
function matchesSearch(product, term) {
  if (!term) return true;

  const searchTerm = term.toLowerCase().trim();

  // Search in more fields + more forgiving matching
  const fieldsToSearch = [
    product.name || "",
    product.category || "",
    product.subCategory || "",
    product.silhouette || "",
    product.description || "",
    ...(product.tags || []),
  ];

  return fieldsToSearch.some((field) => {
    if (!field) return false;
    const text = String(field).toLowerCase();
    return text.includes(searchTerm);
  });
}

// ────────────────────────────────────────────────
// FILTER LOGIC ENGINE
// ────────────────────────────────────────────────
function runFilterLogic() {
  const finalResults = contextProducts.filter((p) => {
    // Price filter
    if (p.price > activeFilters.maxPrice) return false;

    // Collections
    if (activeFilters.collections.length > 0) {
      if (!activeFilters.collections.some((c) => p.collections.includes(c)))
        return false;
    }

    // Sub Categories
    if (activeFilters.subCategories.length > 0) {
      if (!activeFilters.subCategories.includes(p.subCategory)) return false;
    }

    // Colors
    if (activeFilters.colors.length > 0) {
      const pColors = p.options.colors.map((c) => c.id);
      if (!activeFilters.colors.some((c) => pColors.includes(c))) return false;
    }

    // Sizes
    if (activeFilters.sizes.length > 0) {
      if (!activeFilters.sizes.some((s) => p.availableSizes.includes(s)))
        return false;
    }

    // Rating
    if (p.rating && p.rating < activeFilters.minRating) return false;

    // Search term (using improved matcher)
    if (activeFilters.searchTerm) {
      if (!matchesSearch(p, activeFilters.searchTerm)) return false;
    }

    return true;
  });

  if (onFilterChangeCallback) onFilterChangeCallback(finalResults);
}

// ────────────────────────────────────────────────
// GLOBAL SEARCH (always redirects to shop.html)
// ────────────────────────────────────────────────
export function performSearch(searchTerm) {
  const term = (searchTerm || "").trim();

  if (!term) {
    window.location.href = "shop.html";
    return;
  }

  window.location.href = `shop.html?search=${encodeURIComponent(term)}`;
}

// ────────────────────────────────────────────────
// FILTER DRAWER & UI (unchanged from your original)
// ────────────────────────────────────────────────
function injectFilterDrawerHTML() {
  if (document.querySelector(".filter-drawer")) return;

  const html = `
    <div class="filter-overlay" id="filter-overlay"></div>
    <div class="filter-drawer" id="filter-drawer">
        <div class="filter-header">
            <h3>Filters</h3>
            <button class="filter-close-btn" id="filter-close"><i class="ph-thin ph-x"></i></button>
        </div>
        <div class="filter-body" id="filter-body"></div>
        <div class="filter-footer">
            <button class="btn-clear-filters" id="btn-clear-filters">Clear All</button>
            <button class="btn-apply-filters" id="btn-apply-filters">Apply</button>
        </div>
    </div>`;

  document.body.insertAdjacentHTML("beforeend", html);

  document.getElementById("filter-close").onclick = closeFilterDrawer;
  document.getElementById("filter-overlay").onclick = closeFilterDrawer;
  document.getElementById("btn-apply-filters").onclick = closeFilterDrawer;

  document.getElementById("btn-clear-filters").onclick = () => {
    activeFilters.subCategories = [];
    activeFilters.colors = [];
    activeFilters.sizes = [];
    activeFilters.collections = [];
    activeFilters.minRating = 0;
    activeFilters.searchTerm = "";

    renderFilterOptions();
    runFilterLogic();
  };
}

function renderFilterOptions() {
  const body = document.getElementById("filter-body");
  if (!body) return;

  const uniqueSubCats = [
    ...new Set(contextProducts.map((p) => p.subCategory).filter(Boolean)),
  ];
  const uniqueSizes = [
    ...new Set(contextProducts.flatMap((p) => p.availableSizes)),
  ];

  const colorMap = new Map();
  contextProducts.forEach((p) => {
    p.options.colors.forEach((c) => {
      if (!colorMap.has(c.id)) colorMap.set(c.id, c.hex);
    });
  });

  let html = "";

  // Collections
  html += `
    <div class="filter-group">
        <span class="filter-title">Collections</span>
        <label class="filter-row"><input type="checkbox" onchange="toggleArr('collections', '${COLLECTIONS.NEW_ARRIVALS}')"> New Arrivals</label>
        <label class="filter-row"><input type="checkbox" onchange="toggleArr('collections', 'best-sellers')"> Best Sellers</label>
    </div>`;

  // Sub Category
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

  // Price Slider
  html += `
    <div class="filter-group">
        <span class="filter-title">Max Price: <span id="f-price-val">₦${activeFilters.maxPrice.toLocaleString()}</span></span>
        <div class="price-slider-container">
            <input type="range" id="f-price-range" min="0" max="${activeFilters.maxPrice}" value="${activeFilters.maxPrice}" step="5000">
        </div>
    </div>`;

  // Colors
  if (colorMap.size > 0) {
    html += `<div class="filter-group"><span class="filter-title">Colour</span><div class="filter-colors-grid">`;
    colorMap.forEach((hex, id) => {
      html += `<div class="f-color-btn" style="background:${hex}" onclick="toggleBtn(this, 'colors', '${id}')" title="${id}"></div>`;
    });
    html += `</div></div>`;
  }

  // Sizes
  if (uniqueSizes.length > 0) {
    html += `<div class="filter-group"><span class="filter-title">Size</span><div class="filter-sizes-grid">`;
    uniqueSizes.forEach((s) => {
      html += `<button class="f-size-btn" onclick="toggleBtn(this, 'sizes', '${s}')">${s}</button>`;
    });
    html += `</div></div>`;
  }

  // Rating
  html += `
    <div class="filter-group">
        <span class="filter-title">Rating</span>
        <label class="filter-row"><input type="radio" name="rating" onchange="setRating(4)"> 4 Stars & Up</label>
        <label class="filter-row"><input type="radio" name="rating" onchange="setRating(3)"> 3 Stars & Up</label>
        <label class="filter-row"><input type="radio" name="rating" onchange="setRating(0)" checked> Any Rating</label>
    </div>`;

  body.innerHTML = html;

  // Price range live update
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

// ────────────────────────────────────────────────
// GLOBAL HELPERS
// ────────────────────────────────────────────────
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
