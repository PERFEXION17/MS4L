import { products } from "./products.js";
import { addToCart } from "./cart.js";
import { toggleWishlist, getWishlistIds } from "./wishlist.js";
import { COLLECTIONS } from "./constants.js";

// --- STATE ---
let currentQuickProduct = null;
let selectedSize = null;
let selectedColor = null;

// --- INITIALIZATION ---
export function initShopPage() {
  const container = document.getElementById("shop-products-container");

  if (!container) return; // Guard clause

  // 1. Inject Side Drawer HTML
  injectDrawerHTML();

  // 2. Setup Global Wishlist Listener (Updates UI when localStorage changes)
  window.addEventListener("wishlistUpdated", () => {
    updateHeartIcons();
    updateWishlistCounter(); // If you have a counter in header
  });

  // 3. Get URL Params
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const subCategory = params.get("subCategory");
  const collection = params.get("collection");
  const tag = params.get("tag");
  const search = params.get("search");

  // 4. Filter Logic
  let filtered = products;
  let pageTitle = "All Collections";

  if (search) {
    const term = search.toLowerCase();
    filtered = products.filter((p) => p.name.toLowerCase().includes(term));
    pageTitle = `Search: "${search}"`;
  } else if (collection) {
    filtered = products.filter((p) => p.collections.includes(collection));
    pageTitle = formatTitle(collection);
  } else if (subCategory) {
    filtered = products.filter((p) => p.subCategory === subCategory);
    pageTitle = formatTitle(subCategory);
  } else if (tag) {
    filtered = products.filter((p) => p.tags.includes(tag));
    pageTitle = formatTitle(tag);
  } else if (category) {
    filtered = products.filter((p) => p.category === category);
    pageTitle = formatTitle(category);
  }

  // 5. Update Title
  const titleEl = document.getElementById("page-title");
  if (titleEl) titleEl.textContent = pageTitle;

  // 6. Render
  renderGrid(container, filtered);
}

// --- RENDER GRID ---
function renderGrid(container, items) {
  container.innerHTML = "";
  const wishlistIds = getWishlistIds();

  if (items.length === 0) {
    container.innerHTML = `<div class="no-products"><h3>No items found.</h3></div>`;
    return;
  }

  items.forEach((product) => {
    // Image Logic
    const defaultColor = product.options.colors[0];
    const mediaList = product.media[defaultColor.id];
    const imgFront = mediaList[0];
    const imgBack = mediaList.length > 1 ? mediaList[1] : imgFront;

    // Badge Logic (Fixed)
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
              <img src="${imgFront}" class="main-img" loading="lazy">
              <img src="${imgBack}" class="hover-img" loading="lazy">
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

    // Events
    const wishBtn = card.querySelector(".wishlist-btn");
    wishBtn.onclick = (e) => {
      e.stopPropagation();
      toggleWishlist(product.id);
      // UI update handled by event listener in initShopPage
    };

    const qaBtn = card.querySelector(".quick-add-btn");
    qaBtn.onclick = (e) => {
      e.stopPropagation();
      openDrawer(product);
    };

    container.appendChild(card);
  });
}

// --- HELPER: Update Hearts without re-rendering grid ---
function updateHeartIcons() {
  const ids = getWishlistIds();
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = btn.dataset.id;
    if (ids.includes(id)) {
      btn.classList.add("active");
      btn.innerHTML = '<i class="ph-fill ph-heart"></i>';
    } else {
      btn.classList.remove("active");
      btn.innerHTML = '<i class="ph-thin ph-heart"></i>';
    }
  });
}

function updateWishlistCounter() {
  const count = getWishlistIds().length;
  const badge = document.getElementById("wishlist-count");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

// --- SIDE DRAWER LOGIC ---

function injectDrawerHTML() {
  if (document.querySelector(".qa-drawer")) return;

  const html = `
    <div class="qa-overlay" id="qa-overlay"></div>
    <div class="qa-drawer" id="qa-drawer">
        <div class="qa-header">
            <h3>Quick Add</h3>
            <button class="qa-close" id="qa-close"><i class="ph-thin ph-x"></i></button>
        </div>
        <div class="qa-body" id="qa-body">
            </div>
        <div class="qa-footer">
            <button class="btn-add-drawer" id="btn-add-drawer">Add to Bag</button>
        </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", html);

  // Close Events
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
  const footer = document.querySelector(".qa-footer"); // Target the footer container
  const btn = document.getElementById("btn-add-drawer");

  // Reset Button
  btn.classList.remove("ready");
  btn.textContent = "Select Options";
  btn.onclick = null;

  // Determine initial image
  const defaultColor = product.options.colors[0];
  const img = product.media[defaultColor.id][0];

  // 1. INJECT BODY HTML (Product & Options)
  body.innerHTML = `
    <div class="qa-product-preview">
        <img src="${img}" class="qa-img">
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
            <button class="qa-qty-btn" id="qa-qty-minus">
                <i class="ph-thin ph-minus"></i>
            </button>
            <span class="qa-qty-value" id="qa-qty-display">1</span>
            <button class="qa-qty-btn" id="qa-qty-plus">
                <i class="ph-thin ph-plus"></i>
            </button>
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

  // 2. INJECT FOOTER HTML (Subtotal + Button)
  // We overwrite the footer to ensure the subtotal resets every time we open a new product
  footer.innerHTML = `
        <div class="qa-subtotal-row">
            <span class="qa-sub-label">Subtotal</span>
            <span class="qa-sub-price" id="qa-subtotal-display">₦${product.price.toLocaleString()}</span>
        </div>
        <button class="btn-add-drawer" id="btn-add-drawer">Add to Bag</button>
    `;
  // Re-select the button since we just overwrote it in the DOM
  const actionBtn = document.getElementById("btn-add-drawer");

  // --- INTERACTION LOGIC ---

  const colorBtns = body.querySelectorAll(".qa-color-btn");
  const sizeBtns = body.querySelectorAll(".qa-opt-btn");
  const qtyDisplay = body.querySelector("#qa-qty-display");
  const subtotalDisplay = footer.querySelector("#qa-subtotal-display");
  const minusBtn = body.querySelector("#qa-qty-minus");
  const plusBtn = body.querySelector("#qa-qty-plus");

  // Helper: Update Price Display
  const updateCalculations = () => {
    const total = product.price * currentQty;
    qtyDisplay.textContent = currentQty;
    subtotalDisplay.textContent = `₦${total.toLocaleString()}`;

    // If ready, update the button text too for extra clarity
    if (selectedSize && selectedColor) {
      actionBtn.textContent = `Add - ₦${total.toLocaleString()}`;
    }
  };

  // 1. Quantity Events
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

  // 2. Selection Check Logic
  function checkReady() {
    if (selectedSize && selectedColor) {
      actionBtn.classList.add("ready");
      updateCalculations(); // Updates button text

      actionBtn.onclick = () => {
        addToCart(product, currentQty, selectedSize, selectedColor);
        closeDrawer();
      };
    }
  }

  // 3. Color Selection
  colorBtns.forEach((b) => {
    b.onclick = () => {
      colorBtns.forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selectedColor = b.dataset.id;

      // Update Preview Image
      if (product.media[selectedColor]) {
        body.querySelector(".qa-img").src = product.media[selectedColor][0];
      }
      checkReady();
    };
  });

  // 4. Size Selection
  sizeBtns.forEach((b) => {
    b.onclick = () => {
      sizeBtns.forEach((x) => x.classList.remove("selected"));
      b.classList.add("selected");
      selectedSize = b.dataset.val;
      checkReady();
    };
  });

  // Open Drawer
  drawer.classList.add("open");
  overlay.classList.add("active");
}

function closeDrawer() {
  document.getElementById("qa-drawer").classList.remove("open");
  document.getElementById("qa-overlay").classList.remove("active");
}

function formatTitle(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
