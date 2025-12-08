import { hidePreloader } from "./preloader.js";
import {
  updateCartCounter,
  displayCart,
  displayCheckout,
  setupThankYouPage,
  initPaystackCheckout,
} from "./cart.js";
import {
  toggleWishlist,
  updateWishlistCounter,
  renderWishlistHearts,
  renderWishlistPage,
  addToCartFromWishlist,
} from "./wishlist.js";
import {
  triggerCartModal,
  triggerClearModal,
  triggerLinkModal,
  setupModalClosers,
} from "./modals.js";
import {
  setupCollapsibleSections,
  setupDarkMode,
  setupMenuToggle,
  setupSearchToggle,
} from "./ui.js";
import { setupMiniCart } from "./minicart.js";
import { initProductDetailPage } from "./pdp.js";
import { initShopAddToCart } from "./shopCart.js";
import "./video-gallery.js";
// Preloader
window.onload = hidePreloader;

// Global App Init
document.addEventListener("DOMContentLoaded", () => {
  // Core systems
  updateCartCounter();
  updateWishlistCounter();
  renderWishlistHearts();
  setupModalClosers();
  setupCollapsibleSections();
  setupDarkMode();
  setupMenuToggle();
  setupSearchToggle();
  setupMiniCart(updateCartCounter);

  // Page-specific inits
  initShopAddToCart();
  initProductDetailPage();
  initPaystackCheckout();
  renderWishlistPage();
  displayCart();
  displayCheckout();
  setupThankYouPage();

  // Global wishlist header button
  const headerWishlistBtn = document.querySelector(".wishlist-btn-header");
  if (headerWishlistBtn) {
    headerWishlistBtn.addEventListener("click", () => {
      window.location.href = "wishlist.html";
    });
  }

  // Global wishlist buttons on cards
  document.querySelectorAll(".wishlist-btn[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleWishlist(parseInt(btn.dataset.id));
    });
  });

  // Move to Bag buttons (wishlist page)
  document.addEventListener("click", (e) => {
    const moveBtn = e.target.closest(".wishlist-bag");
    if (!moveBtn) return;

    const id = parseInt(moveBtn.dataset.id);
    addToCartFromWishlist(id);
  });

  // Close Gestue in Gallery
  const instructModal = document.getElementById("instruct-modal");
  
  setTimeout(() => instructModal.remove(), 3500);

});

// Global exports for inline onclicks (if any)
window.toggleWishlist = toggleWishlist;
window.updateCartCounter = updateCartCounter;
window.triggerCartModal = triggerCartModal;
window.triggerClearModal = triggerClearModal;
window.triggerLinkModal = triggerLinkModal;
