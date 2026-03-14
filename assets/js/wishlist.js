// assets/js/wishlist.js

import { products } from "./products.js";
import { addToCart } from "./cart.js";

// ────────────────────────────────────────────────
// 1. CORE WISHLIST OPERATIONS
// ────────────────────────────────────────────────

export function toggleWishlist(productId) {
  const id = String(productId);
  let wishlist = getWishlist();

  const index = wishlist.findIndex((item) => item.id === id);

  if (index !== -1) {
    // Remove
    wishlist.splice(index, 1);
    console.debug(`[WISHLIST] Removed ${id}`);
  } else {
    // Add
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.warn(`[WISHLIST] Product ${id} not found in catalog`);
      return;
    }

    wishlist.push(createWishlistItem(product));
    console.debug(`[WISHLIST] Added ${id} — ${product.name}`);
  }

  saveWishlist(wishlist);

  // Broadcast & refresh UI
  updateWishlistCounter();
  renderWishlistHearts();
  window.dispatchEvent(new Event("wishlistUpdated"));
}

// ────────────────────────────────────────────────
// 2. STORAGE HELPERS
// ────────────────────────────────────────────────

function getWishlist() {
  try {
    const raw = localStorage.getItem("wishlist") || "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item) => item && item.id)
      : [];
  } catch (err) {
    console.error("[WISHLIST] Storage parse error → resetting", err);
    localStorage.removeItem("wishlist");
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
}

// ────────────────────────────────────────────────
// 3. ITEM FACTORY
// ────────────────────────────────────────────────

function createWishlistItem(product) {
  let image = "assets/img/components/MS4L-logo.webp";

  if (product.media && product.options?.colors?.length > 0) {
    const defaultColorId = product.options.colors[0].id;
    image = product.media[defaultColorId]?.[0] ?? image;
  } else if (product.media) {
    const firstColorKey = Object.keys(product.media)[0];
    image = product.media[firstColorKey]?.[0] ?? image;
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image,
    slug: product.slug || "",
    defaultColorId: product.options?.colors?.[0]?.id || "default",
    defaultSize: product.availableSizes?.[0] || "M",
    inStock: !!product.inStock,
  };
}

// ────────────────────────────────────────────────
// 4. UI UPDATERS
// ────────────────────────────────────────────────

export function updateWishlistCounter() {
  const count = getWishlist().length;
  const dot = document.getElementById("wishlist-count");
  if (dot) {
    dot.style.display = count > 0 ? "block" : "none";
  }
}

export function renderWishlistHearts() {
  const wishlistedIds = new Set(getWishlist().map((item) => item.id));

  document.querySelectorAll(".wishlist-btn[data-id]").forEach((btn) => {
    const id = btn.dataset.id;
    const icon = btn.querySelector("i");

    const isActive = wishlistedIds.has(id);

    btn.classList.toggle("active", isActive);

    if (icon) {
      icon.classList.toggle("ph-fill", isActive);
      icon.classList.toggle("ph-thin", !isActive);
    }
  });
}

export function renderWishlistPage() {
  const container = document.getElementById("wishlist-items");
  const emptyState = document.getElementById("empty-wishlist");

  if (!container) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    container.innerHTML = "";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  container.innerHTML = wishlist
    .map(
      (item) => `
      <div class="wishlist-card">
        <div class="tile_img" 
             role="link" 
             tabindex="0"
             data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="tile_txt">
          <h5>${item.name}</h5>
          <h4>₦${item.price.toLocaleString()}</h4>

          <div class="wishlist-buttons">
            <button class="wishlist-bag-btn" data-id="${item.id}">
              Move to Bag
            </button>
            <button class="wishlist-remove-btn" data-id="${item.id}">
              <i class="ph-thin ph-trash-simple"></i>
            </button>
          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

// ────────────────────────────────────────────────
// 5. MOVE TO CART
// ────────────────────────────────────────────────

export function addToCartFromWishlist(productId) {
  const id = String(productId);
  const product = products.find((p) => p.id === id);

  if (!product) {
    showToast?.("Product no longer available") || alert("Product not found");
    return;
  }

  const defaultSize = product.availableSizes?.[0] || "M";
  const defaultColorObj = product.options?.colors?.[0] || {
    id: "default",
    label: "Default",
  };
  const defaultColor = defaultColorObj.id;

  addToCart(product, 1, defaultSize, defaultColor);

  toggleWishlist(id);

  if (document.getElementById("wishlist-items")) {
    renderWishlistPage();
  }

  if (typeof openCartDrawer === "function") {
    openCartDrawer();
  }
}

// ────────────────────────────────────────────────
// 6. EVENT DELEGATION — attached only once
// ────────────────────────────────────────────────

function handleWishlistCardClick(e) {
  // 1. Handle buttons first (Move to Bag + Remove)
  const btn = e.target.closest("button");
  if (btn) {
    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("wishlist-bag-btn")) {
      addToCartFromWishlist(id);
      e.preventDefault(); // optional: prevent any weird default
    } else if (btn.classList.contains("wishlist-remove-btn")) {
      toggleWishlist(id);
      renderWishlistPage();
      e.preventDefault();
    }
    return; // stop here if it was a button click
  }

  // 2. Handle card / image click → go to PDP
  const cardOrImg = e.target.closest(".wishlist-card, .tile_img");
  if (cardOrImg) {
    // Prefer the data-id from the closest element that has it
    const id =
      cardOrImg.dataset.id || cardOrImg.querySelector("[data-id]")?.dataset.id;

    if (id) {
      console.log(`[WISHLIST] Navigating to PDP for product ${id}`);
      window.location.href = `pdp.html?id=${id}`;
    }
  }
}

// Attach listener only once when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("wishlist-items");
  if (container) {
    container.addEventListener("click", handleWishlistCardClick);
  }
});

// ────────────────────────────────────────────────
// 7. PUBLIC HELPERS
// ────────────────────────────────────────────────

export function getWishlistIds() {
  return getWishlist().map((item) => item.id);
}

// Devtools helper
window.__getWishlist = getWishlist;
