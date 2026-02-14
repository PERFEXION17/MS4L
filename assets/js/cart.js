// assets/js/cart.js

// --- IMPORTS ---
import { formatPrice } from "./utils.js"; // Ensure this exists or replace with helper below

// --- STATE MANAGEMENT ---
export let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// --- CORE FUNCTIONS ---

/**
 * Adds a product to the cart.
 * Handles logic for existing items (same ID + size + color) vs new items.
 */
export function addToCart(product, quantity = 1, size = null, color = null) {
  if (!product) return;

  // 1. Generate Unique ID for Variant (e.g. "105-L-Red")
  const cartItemId = generateCartItemId(product.id, size, color);

  // 2. Check if this specific variant is already in cart
  const existingItem = cart.find((item) => item.cartItemId === cartItemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      cartItemId: cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: size || "Univ",
      color: color || "Default",
      quantity: quantity,
    });
  }

  saveCart();
  updateCartUI();
  showToast(`${quantity} x ${product.name} added to bag!`);
}

/**
 * Removes an item or decreases quantity.
 */
export function updateCartItemQuantity(cartItemId, change) {
  const itemIndex = cart.findIndex((item) => item.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  const item = cart[itemIndex];
  const newQty = item.quantity + change;

  if (newQty > 0) {
    item.quantity = newQty;
  } else {
    // Remove if quantity becomes 0
    if (confirm("Remove this item from bag?")) {
      cart.splice(itemIndex, 1);
    }
  }

  saveCart();
  updateCartUI();
}

/**
 * Completely removes an item row.
 */
export function removeFromCart(cartItemId) {
  if (!confirm("Remove this item?")) return;
  cart = cart.filter((item) => item.cartItemId !== cartItemId);
  saveCart();
  updateCartUI();
}

/**
 * Clears the entire cart.
 */
export function clearCart() {
  if (!confirm("Are you sure you want to clear your bag?")) return;
  cart = [];
  saveCart();
  updateCartUI();
}

// --- HELPER FUNCTIONS ---

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function generateCartItemId(productId, size, color) {
  // Creates a unique string like "12-L-Red" or "12-null-null"
  return `${productId}-${size || "null"}-${color || "null"}`;
}

export function showToast(message) {
  // Remove existing toast to prevent stacking
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;

  // Basic Toast Styles (Add to your CSS for better control)
  toast.style.cssText = `
    position: fixed; bottom: 20px; right: 20px;
    background: #088178; color: #fff; padding: 12px 24px;
    border-radius: 4px; z-index: 10000; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- UI UPDATERS ---

/**
 * Master function to update all Cart UIs (Badge, Mini-Cart, Cart Page)
 */
export function updateCartUI() {
  updateCartCount();
  renderMiniCart();
  renderCartPage(); // Only runs if on cart page
  renderCheckoutPage(); // Only runs if on checkout page
}

function updateCartCount() {
  const countElements = document.querySelectorAll(".cart-count, .cart-counter");
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  countElements.forEach((el) => {
    el.textContent = totalQty;
    el.style.display = totalQty > 0 ? "flex" : "none";
  });
}

// Internal helper function for cart.js
function renderMiniCart() {
  const container = document.getElementById("mini-cart-items");
  const subtotalEl = document.getElementById("mini-cart-subtotal");
  const footer = document.getElementById("mini-cart-footer");
  const emptyMsg = document.getElementById("mini-cart-empty");
  const cartCount = document.getElementById("cart-count");

  // Safety check: exit if elements don't exist (e.g. on a page without nav)
  if (!container) return;

  // 1. Update Badge
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalQty;
    // Optional: Hide badge if 0
    cartCount.style.display = totalQty > 0 ? "flex" : "none";
  }

  // 2. Handle Empty State
  if (cart.length === 0) {
    container.innerHTML = "";
    if (footer) footer.style.display = "none";
    if (emptyMsg) emptyMsg.style.display = "block";
    if (subtotalEl) subtotalEl.textContent = "₦0";
    return;
  }

  // 3. Handle Full State
  if (footer) footer.style.display = "block";
  if (emptyMsg) emptyMsg.style.display = "none";
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "mini-cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="mini-cart-item-info">
        <h5>${item.name}</h5>
        <p>Qty: ${item.quantity} ${item.size !== "Univ" ? `| Size: ${item.size}` : ""}</p>
        <p style="font-weight:600; margin-top:2px; color: var(--price-color); font-size: 14px;">₦${(item.price * item.quantity).toLocaleString()}</p>
      </div>
    `;
    container.appendChild(div);
  });

  // 4. Update Subtotal
  if (subtotalEl) subtotalEl.textContent = `₦${total.toLocaleString()}`;
}

function renderCartPage() {
  const container = document.getElementById("bag-items");
  const totalEl = document.getElementById("bag-total");
  const emptyEl = document.getElementById("empty-cart");
  const actionsEl = document.getElementById("bag-actions");

  if (!container) return; // Not on cart page

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyEl) emptyEl.style.display = "block";
    if (actionsEl) actionsEl.style.display = "none";
    if (totalEl) totalEl.textContent = "₦0";
    return;
  }

  if (emptyEl) emptyEl.style.display = "none";
  if (actionsEl) actionsEl.style.display = "flex";

  let subtotal = 0;
  container.innerHTML = "";

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "bag_con";
    div.innerHTML = `
      <div class="bag_box">
        <div class="bag-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="bag-details">
          <div class="bag_name_bin">
            <h4>${item.name}</h4>
            <button class="remove-item-btn" data-id="${item.cartItemId}">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="bag_meta">
            ${item.color !== "Default" ? `<span class="meta-tag">Color: ${item.color}</span>` : ""}
            ${item.size !== "Univ" ? `<span class="meta-tag">Size: ${item.size}</span>` : ""}
          </div>
          <div class="bag_mini_box">
            <div class="qty-picker">
              <button class="qty-btn" onclick="window.updateQty('${item.cartItemId}', -1)">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="window.updateQty('${item.cartItemId}', 1)">+</button>
            </div>
            <p class="bag_subtotal">₦${(item.price * item.quantity).toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  if (totalEl) totalEl.textContent = `₦${subtotal.toLocaleString()}`;

  // Attach Event Listeners for Remove Buttons
  document.querySelectorAll(".remove-item-btn").forEach((btn) => {
    btn.onclick = () => removeFromCart(btn.dataset.id);
  });
}

function renderCheckoutPage() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    if (totalEl) totalEl.textContent = "₦0";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach((item) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <div class="checkout_box">
        <img src="${item.image}" class="checkout-img" alt="${item.name}">
        <div class="checkout_box_details">
          <h4>${item.name}</h4>
          <p class="sm-text">Qty: ${item.quantity} ${item.size !== "Univ" ? `| Size: ${item.size}` : ""}</p>
          <p class="checkout_price">₦${(item.price * item.quantity).toLocaleString()}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`;
}

// --- GLOBAL EXPORTS FOR HTML ONCLICK ---
// (Required because modules isolate scope, but HTML onclick needs global scope)
window.updateQty = (id, change) => updateCartItemQuantity(id, change);

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // Clear Cart Button Logic
  const clearBtn = document.getElementById("clear-bag-btn");
  if (clearBtn) clearBtn.onclick = clearCart;

  // Paystack Initialization
  const payForm = document.getElementById("checkout-form");
  if (payForm) initPaystackCheckout(payForm);
});

// --- PAYSTACK LOGIC ---
function initPaystackCheckout(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your bag is empty!");
      return;
    }

    const totalAmount =
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100; // Kobo
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstname").value;

    const handler = PaystackPop.setup({
      key: "pk_live_988acbd343f21914562810ef81e1bb35db912df7",
      email: email,
      amount: totalAmount,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "Customer",
            variable_name: "customer_name",
            value: firstName,
          },
          ...cart.map((item, i) => ({
            display_name: `Item ${i + 1}`,
            variable_name: `item_${i + 1}`,
            value: `${item.name} (${item.quantity}x) - ${item.size}`,
          })),
        ],
      },
      callback: function (response) {
        localStorage.setItem("orderRef", response.reference);
        cart = []; // Clear internal variable
        saveCart(); // Clear local storage
        window.location.href = "thankyou.html";
      },
      onClose: function () {
        alert("Transaction cancelled.");
      },
    });

    handler.openIframe();
  });
}
