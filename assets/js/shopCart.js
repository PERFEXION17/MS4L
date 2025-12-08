// shopCart.js – FINAL VERSION (event delegation = works even on late-loaded cards)

import { products } from "./products.js";
import { updateCartCounter } from "./cart.js";
import { triggerCartModal } from "./modals.js";

export function initShopAddToCart() {
  // Use event delegation on document — works even if buttons are added later
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn[data-id]");
    // console.log(`This sh!t works!!!`)
    if (!btn) return;

    e.preventDefault();

    const id = parseInt(btn.dataset.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      console.error("Product not found:", id);
      return;
    }

    const color = product.colors[0];
    const size = product.sizeLimits.min || 0;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (item) => item.id === id && item.color === color && item.size === size
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        color,
        size,
        qty: 1,
        image: product.images[0],
        sku: product.sku || `PROD-${String(id).padStart(3, "0")}`,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart saved:", cart); // ← ADD THIS LINE
    updateCartCounter();
    triggerCartModal();

    // Toast
    const toast = document.createElement("div");
    toast.textContent = `${product.name} added to bag!`;
    toast.style.cssText = `position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
      background:var(--glass); color:var(--text); padding:1rem 2rem; border-radius:2rem;
      font-weight:600; z-index:10000;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });
}
