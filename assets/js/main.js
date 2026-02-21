// assets/js/main.js

// --- 1. CORE IMPORTS ---
import { hidePreloader } from "./preloader.js";
import { updateCartUI } from "./cart.js"; 
import { initPDPPage } from "./pdp.js";
import { initShopPage } from "./shop.js";

// --- 2. UI & SYSTEMS IMPORTS ---
import {
  setupCollapsibleSections,
  setupMenuToggle,
  setupSearchToggle,
} from "./ui.js";

import {
  triggerCartModal,
  triggerClearModal,
  triggerLinkModal,
  setupModalClosers,
} from "./modals.js";

import {
  toggleWishlist,
  updateWishlistCounter,
  renderWishlistHearts,
  renderWishlistPage,
  addToCartFromWishlist,
} from "./wishlist.js";

// --- 3. PRELOADER ---
window.addEventListener("load", hidePreloader);

// --- 4. GLOBAL APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Main Engine Starting...");

  // A. Initialize UI Components
  setupMenuToggle();
  setupSearchToggle();
  setupCollapsibleSections();
  setupModalClosers();

  // B. Initialize Cart System (Badge + Mini Cart + Cart Page)
  updateCartUI();

  // C. Initialize Page-Specific Logic
  initPDPPage();
  renderWishlistPage();
  initShopPage();

  // D. Initialize Wishlist System
  updateWishlistCounter();
  renderWishlistHearts();
  setupGlobalWishlistEvents();

  // E. One-off Helpers
  handleIntroModal();
});

// --- 5. HELPER FUNCTIONS ---

function setupGlobalWishlistEvents() {
  const headerBtn = document.querySelector(".wishlist-btn-header");
  if (headerBtn) {
    headerBtn.onclick = () => (window.location.href = "wishlist.html");
  }

  document.querySelectorAll(".wishlist-btn[data-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(parseInt(btn.dataset.id));
    });
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".wishlist-bag")) {
      const btn = e.target.closest(".wishlist-bag");
      addToCartFromWishlist(parseInt(btn.dataset.id));
    }
  });
}

function handleIntroModal() {
  const instructModal = document.getElementById("instruct-modal");
  if (instructModal) {
    setTimeout(() => instructModal.remove(), 3500);
  }
}

// --- 6. WINDOW EXPORTS ---
window.toggleWishlist = toggleWishlist;
window.triggerCartModal = triggerCartModal;
window.triggerClearModal = triggerClearModal;
window.triggerLinkModal = triggerLinkModal;
