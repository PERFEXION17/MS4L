import { formatPrice } from "./utils.js";

export function setupMiniCart(updateCartCounter) {
  // Pass in updateCartCounter for override
  const miniCartToggle = document.getElementById("mini-cart-toggle");
  const miniCartDropdown = document.getElementById("mini-cart-dropdown");
  const miniCartItems = document.getElementById("mini-cart-items");
  const miniCartFooter = document.getElementById("mini-cart-footer");
  const miniCartEmpty = document.getElementById("mini-cart-empty");
  const miniCartSubtotal = document.getElementById("mini-cart-subtotal");
  const closeMiniCart = document.getElementById("close-mini-cart");

  if (!miniCartToggle || !miniCartDropdown) return;

  let isOpen = false;

  const openMiniCart = () => {
    miniCartDropdown.classList.add("open");
    isOpen = true;
    renderMiniCart();
  };

  const closeMiniCartFn = () => {
    miniCartDropdown.classList.remove("open");
    isOpen = false;
  };

  miniCartToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? closeMiniCartFn() : openMiniCart();
  });

  if (closeMiniCart) {
    closeMiniCart.addEventListener("click", closeMiniCartFn);
  }

  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !miniCartDropdown.contains(e.target) &&
      e.target !== miniCartToggle
    ) {
      closeMiniCartFn();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMiniCartFn();
  });

  const renderMiniCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    miniCartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      miniCartFooter.style.display = "none";
      miniCartEmpty.style.display = "block";
    } else {
      miniCartFooter.style.display = "block";
      miniCartEmpty.style.display = "none";

      cart.forEach((item) => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.className = "mini-cart-item";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="mini-cart-item-info">
            <h5>${item.name}</h5>
            <p>Color: ${item.color} | Size: ${item.size} | Qty: ${item.qty}</p>
            <p class="cart_price"><strong>${formatPrice(
              item.price * item.qty
            )}</strong></p>
          </div>
        `;
        miniCartItems.appendChild(div);
      });

      miniCartSubtotal.textContent = formatPrice(total);
    }
  };

  // Override updateCartCounter to refresh mini-cart if open
  const originalUpdate = updateCartCounter;
  window.updateCartCounter = () => {
    originalUpdate();
    const counter = document.getElementById("mini-cart-counter");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (counter) counter.textContent = cart.length;
    if (isOpen) renderMiniCart();
  };

  window.updateCartCounter(); // Initial call
}
