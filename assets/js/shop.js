import { products } from "./products.js";
import { addToCart } from "./cart.js";
import {
  toggleWishlist,
  getWishlistIds,
  updateWishlistCounter,
  renderWishlistHearts,
} from "./wishlist.js";
// NEW: Import PAGE_DESCRIPTIONS
import { COLLECTIONS, PAGE_DESCRIPTIONS } from "./constants.js";
import { initFilters, openFilterDrawer } from "./filters.js";
import { showSkeleton } from "./utilities.js";

// --- STATE ---
let currentQuickProduct = null;
let selectedSize = null;
let selectedColor = null;

// --- INITIALIZATION ---
export function initShopPage() {
  const container = document.getElementById("shop-products-container");
  if (!container) return;

  // 1. Inject Quick Add Drawer
  injectDrawerHTML();

  // 2. Setup Wishlist
  window.addEventListener("wishlistUpdated", () => {
    renderWishlistHearts();
    updateWishlistCounter();
  });

  // 3. Setup Filter Button
  const filterBtn = document.getElementById("filter-trigger-btn");
  if (filterBtn) {
    filterBtn.onclick = openFilterDrawer;
  }

  // 4. Show skeleton BEFORE initializing filters
  showSkeleton(container, 8, "product");

  // 5. INITIALIZE FILTERS with skeleton support
  initFilters(products, (filteredList) => {
    // Render the real grid using your existing renderGrid function
    renderGrid(container, filteredList);

    // Update Header (Title + Description + Count)
    updatePageHeader(filteredList.length);

    const pageCount = document.getElementById("page-count");
    if (pageCount) {
      pageCount.textContent = `${filteredList.length} products found`;
    }
  });
}

// --- DYNAMIC HEADER LOGIC (Refactored) ---
function updatePageHeader(count) {
  const titleEl = document.getElementById("page-title");
  const descEl = document.getElementById("page-desc");

  if (!titleEl || !descEl) return;

  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");
  const collection = params.get("collection");
  const silhouette = params.get("silhouette");
  const subCategory = params.get("subCategory");
  const category = params.get("category");

  let newTitle = "The Collection";
  let newDesc =
    PAGE_DESCRIPTIONS["default"] || "Explore our luxury essentials.";

  // Logic Priority: Search > Collection > Silhouette > SubCat > Cat
  if (search) {
    newTitle = `Search: "${search}"`;
    newDesc = `We found ${count} results matching your search.`;
  } else if (collection) {
    newTitle = formatTitle(collection);
    newDesc = PAGE_DESCRIPTIONS[collection] || newDesc;
  } else if (silhouette) {
    newTitle = formatTitle(silhouette);
    newDesc =
      PAGE_DESCRIPTIONS[silhouette] ||
      `Explore our exclusive range of ${newTitle}.`;
  } else if (subCategory) {
    newTitle = formatTitle(subCategory);
    newDesc =
      PAGE_DESCRIPTIONS[subCategory] || `Shop our latest ${newTitle} styles.`;
  } else if (category) {
    newTitle = formatTitle(category);
    newDesc = PAGE_DESCRIPTIONS[category] || newDesc;
  }

  // Apply to DOM
  titleEl.textContent = newTitle;
  descEl.textContent = newDesc;

  // Update Browser Tab
  document.title = `MS4L | ${newTitle}`;
}

// --- RENDER GRID ---
function renderGrid(container, items) {
  container.innerHTML = "";
  const wishlistIds = getWishlistIds();

  if (items.length === 0) {
    container.innerHTML = `
        <div class="no-products-msg">
            <h3>No items match your selection.</h3>
            <button onclick="window.location.reload()">Clear Filters</button>
        </div>`;
    return;
  }

  items.forEach((product) => {
    // Image Logic (Sapphire Schema)
    const defaultColor = product.options.colors[0];
    const mediaList =
      product.media && product.media[defaultColor.id]
        ? product.media[defaultColor.id]
        : ["assets/img/no-image.jpg"];
    const imgFront = mediaList[0];
    const imgBack = mediaList.length > 1 ? mediaList[1] : imgFront;

    // Badge Logic
    let badgeHTML = "";
    if (!product.inStock) {
      badgeHTML = '<span class="status-badge sold-out">Sold Out</span>';
    } else if (product.collections.includes(COLLECTIONS.NEW_ARRIVALS)) {
      badgeHTML = '<span class="status-badge new">New In</span>';
    } else if (product.lowStockWarning) {
      badgeHTML = '<span class="status-badge low-stock">Low Stock</span>';
    }

    // Wishlist State
    const isWishlisted = wishlistIds.includes(String(product.id));

    const card = document.createElement("div");
    card.className = "pro";

    card.onclick = (e) => {
      if (!e.target.closest(".action-btn")) {
        window.location.href = `pdp.html?id=${product.id}`;
      }
    };

    card.innerHTML = `
          <div class="pro-img-box">
              <img src="${imgFront}" class="main-img" loading="lazy" alt="${product.name}">
              <img src="${imgBack}" class="hover-img" loading="lazy" alt="${product.name}">
              ${badgeHTML}
              
              <div class="pro-actions">
                  <button class="action-btn wishlist-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}">
                      <i class="${isWishlisted ? "ph-fill" : "ph-thin"} ph-heart"></i>
                  </button>
                  <button class="action-btn quick-add-btn" data-id="${product.id}">
                      <i class="ph-thin ph-handbag"></i>
                  </button>
              </div>
          </div>
          <div class="des">
              <h5>${product.name}</h5>
              <h4>₦${product.price.toLocaleString()}</h4>
          </div>
      `;

    const wishBtn = card.querySelector(".wishlist-btn");
    wishBtn.onclick = (e) => {
      e.stopPropagation();
      toggleWishlist(product.id);
    };

    const qaBtn = card.querySelector(".quick-add-btn");
    qaBtn.onclick = (e) => {
      e.stopPropagation();
      openDrawer(product);
    };

    container.appendChild(card);
  });
}

// --- HELPERS ---

// Format Title helper
function formatTitle(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// --- SIDE DRAWER LOGIC (Unchanged) ---

function injectDrawerHTML() {
  if (document.querySelector(".qa-drawer")) return;

  const html = `
    <div class="qa-overlay" id="qa-overlay"></div>
    <div class="qa-drawer" id="qa-drawer">
        <div class="qa-header">
            <h3>Quick Add</h3>
            <button class="qa-close" id="qa-close"><i class="ph-thin ph-x"></i></button>
        </div>
        <div class="qa-body" id="qa-body"></div>
        <div class="qa-footer">
            <button class="btn-add-drawer" id="btn-add-drawer">Add to Bag</button>
        </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  document.getElementById("qa-close").onclick = closeDrawer;
  document.getElementById("qa-overlay").onclick = closeDrawer;
}

function openDrawer(product) {
  currentQuickProduct = product;
  selectedSize = null;
  selectedColor = null;
  let currentQty = 1;

  const drawer = document.getElementById("qa-drawer");
  const overlay = document.getElementById("qa-overlay");
  const body = document.getElementById("qa-body");
  const footer = document.querySelector(".qa-footer");
  const btn = document.getElementById("btn-add-drawer");

  btn.classList.remove("ready");
  btn.textContent = "Select Options";
  btn.onclick = null;

  const defaultColor = product.options.colors[0];
  const img = product.media[defaultColor.id][0];

  body.innerHTML = `
    <div class="qa-product-preview">
        <img src="${img}" class="qa-img" alt="${product.name}">
        <div class="qa-details">
            <h4>${product.name}</h4>
            <div class="qa-price">₦${product.price.toLocaleString()}</div>
        </div>
    </div>

    <div class="qa-group-max">
      <div class="qa-group">
        <span class="qa-label">Colour</span>
        <div class="qa-options-grid" id="qa-colors">
            ${product.options.colors
              .map(
                (c) =>
                  `<div class="qa-color-btn" style="background:${c.hex}" data-id="${c.id}" title="${c.label}"></div>`,
              )
              .join("")}
        </div>
      </div>

      <div class="qa-group">
        <span class="qa-label">Quantity</span>
        <div class="qa-qty-wrapper">
            <button class="qa-qty-btn" id="qa-qty-minus"><i class="ph-thin ph-minus"></i></button>
            <span class="qa-qty-value" id="qa-qty-display">1</span>
            <button class="qa-qty-btn" id="qa-qty-plus"><i class="ph-thin ph-plus"></i></button>
        </div>
      </div>
      <div class="qa-group">
          <span class="qa-label">Size</span>
          <div class="qa-options-grid" id="qa-sizes">
              ${product.availableSizes
                .map(
                  (s) =>
                    `<button class="qa-opt-btn" data-val="${s}">${s}</button>`,
                )
                .join("")}
          </div>
      </div>
    </div>
    `;

  footer.innerHTML = `
        <div class="qa-subtotal-row">
            <span class="qa-sub-label">Subtotal</span>
            <span class="qa-sub-price" id="qa-subtotal-display">₦${product.price.toLocaleString()}</span>
        </div>
        <button class="btn-add-drawer" id="btn-add-drawer">Add to Bag</button>
    `;

  const actionBtn = document.getElementById("btn-add-drawer");

  const colorBtns = body.querySelectorAll(".qa-color-btn");
  const sizeBtns = body.querySelectorAll(".qa-opt-btn");
  const qtyDisplay = body.querySelector("#qa-qty-display");
  const subtotalDisplay = footer.querySelector("#qa-subtotal-display");
  const minusBtn = body.querySelector("#qa-qty-minus");
  const plusBtn = body.querySelector("#qa-qty-plus");

  const updateCalculations = () => {
    const total = product.price * currentQty;
    qtyDisplay.textContent = currentQty;
    subtotalDisplay.textContent = `₦${total.toLocaleString()}`;

    if (selectedSize && selectedColor) {
      actionBtn.textContent = `Add - ₦${total.toLocaleString()}`;
    }
  };

  minusBtn.onclick = () => {
    if (currentQty > 1) {
      currentQty--;
      updateCalculations();
    }
  };

  plusBtn.onclick = () => {
    currentQty++;
    updateCalculations();
  };

  function checkReady() {
    if (selectedSize && selectedColor) {
      actionBtn.classList.add("ready");
      updateCalculations();

      actionBtn.onclick = () => {
        addToCart(product, currentQty, selectedSize, selectedColor);
        closeDrawer();
      };
    }
  }

  colorBtns.forEach((b) => {
    b.onclick = () => {
      colorBtns.forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selectedColor = b.dataset.id;
      if (product.media[selectedColor]) {
        body.querySelector(".qa-img").src = product.media[selectedColor][0];
      }
      checkReady();
    };
  });

  sizeBtns.forEach((b) => {
    b.onclick = () => {
      sizeBtns.forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selectedSize = b.dataset.val;
      checkReady();
    };
  });

  drawer.classList.add("open");
  overlay.classList.add("active");
}

function closeDrawer() {
  document.getElementById("qa-drawer").classList.remove("open");
  document.getElementById("qa-overlay").classList.remove("active");
}
