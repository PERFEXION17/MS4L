import { formatPrice } from "./utils.js";

export function setupMiniCart() {
  const wrapper = document.querySelector(".mini-cart-wrapper");
  const dropdown = document.getElementById("mini-cart-dropdown");
  const itemsContainer = document.getElementById("mini-cart-items");
  const footer = document.getElementById("mini-cart-footer");
  const emptyMsg = document.getElementById("mini-cart-empty");
  const subtotalEl = document.getElementById("mini-cart-subtotal");
  const cartCountBadge = document.getElementById("cart-count");

  // Safety check: if wrapper or dropdown don't exist, stop.
  if (!wrapper || !dropdown) return;

  let closeTimeout;

  // --- RENDER FUNCTION ---
  const renderMiniCart = () => {
    // 1. Get Cart from Storage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 2. Clear current list
    if (itemsContainer) itemsContainer.innerHTML = "";

    let total = 0;

    // 3. Update Badge
    if (cartCountBadge) cartCountBadge.textContent = cart.length;

    // 4. Handle Empty vs Full State
    if (cart.length === 0) {
      if (footer) footer.style.display = "none";
      if (emptyMsg) emptyMsg.style.display = "block";
    } else {
      if (footer) footer.style.display = "block";
      if (emptyMsg) emptyMsg.style.display = "none";

      // 5. Render Items
      cart.forEach((item) => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "mini-cart-item";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="mini-cart-item-info">
            <h5>${item.name}</h5>
            <p>Size: ${item.size} | Qty: ${item.qty}</p>
            <p class="cart_price"><strong>${formatPrice(item.price * item.qty)}</strong></p>
          </div>
        `;
        if (itemsContainer) itemsContainer.appendChild(div);
      });

      // 6. Update Subtotal
      if (subtotalEl) subtotalEl.textContent = formatPrice(total);
    }
  };

  // --- HOVER EVENTS ---
  wrapper.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
    renderMiniCart(); // Fetch fresh data on hover
    dropdown.classList.add("active");
  });

  wrapper.addEventListener("mouseleave", () => {
    closeTimeout = setTimeout(() => {
      dropdown.classList.remove("active");
    }, 300);
  });

  // --- GLOBAL UPDATE HOOK ---
  window.updateMiniCart = () => {
    renderMiniCart();
    // Optional: Auto-open briefly
    dropdown.classList.add("active");
    setTimeout(() => dropdown.classList.remove("active"), 2500);
  };

  // --- INITIAL RENDER ---
  renderMiniCart();
}
