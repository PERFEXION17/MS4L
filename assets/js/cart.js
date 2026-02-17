// assets/js/cart.js

// --- STATE MANAGEMENT ---
// We initialize the cart from Local Storage or start empty
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- CORE FUNCTIONS ---

/**
 * Adds a product to the cart.
 * Handles logic for new Sapphire Schema (media objects) vs Old Data.
 */
export function addToCart(product, quantity = 1, size = null, color = null) {
  if (!product) return;

  // 1. Generate Unique ID for Variant (e.g. "prod_001-L-noir")
  const variantId = generateVariantId(product.id, size, color);

  // 2. RESOLVE IMAGE (The Fix)
  // We try to find the image for the specific color. Fallback to the first available media.
  let imageToSave = "assets/img/components/MS4L-logo.webp";

  if (product.media) {
    if (color && product.media[color]) {
      imageToSave = product.media[color][0]; // Correct: Get first image of selected color
    } else {
      // Fallback: Get the first key in the media object (e.g. "noir")
      const firstKey = Object.keys(product.media)[0];
      imageToSave = product.media[firstKey][0];
    }
  } else if (product.images) {
    // Legacy support for old products
    imageToSave = product.images[0];
  }

  // 3. Check if this specific variant is already in cart
  const existingItem = cart.find((item) => item.variantId === variantId);

  if (existingItem) {
    existingItem.quantity += quantity;
    showToast(`Updated quantity for ${product.name}`);
  } else {
    cart.push({
      variantId: variantId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: imageToSave, // Saved the resolved image
      size: size || "Univ",
      color: color || "Default",
      quantity: quantity,
    });
    showToast(`${product.name} added to bag!`);
  }

  saveCart();
  updateCartUI();

  // Open the mini-cart automatically for feedback
  const miniCart = document.getElementById("mini-cart-dropdown");
  if (miniCart) {
    miniCart.classList.add("active");
    setTimeout(() => miniCart.classList.remove("active"), 3000);
  }
}

/**
 * Update Quantity (Increase/Decrease)
 */
export function updateCartItemQuantity(variantId, change) {
  const itemIndex = cart.findIndex((item) => item.variantId === variantId);
  if (itemIndex === -1) return;

  const item = cart[itemIndex];
  const newQty = item.quantity + change;

  if (newQty > 0) {
    item.quantity = newQty;
  } else {
    // If quantity becomes 0, remove it
    if (confirm("Remove this item from bag?")) {
      cart.splice(itemIndex, 1);
    }
  }

  saveCart();
  updateCartUI();
}

/**
 * Remove Item Completely
 */
export function removeFromCart(variantId) {
  if (!confirm("Remove this item?")) return;
  cart = cart.filter((item) => item.variantId !== variantId);
  saveCart();
  updateCartUI();
}

/**
 * Clear Entire Cart
 */
export function clearCart() {
  if (!confirm("Are you sure you want to clear your bag?")) return;
  cart = [];
  saveCart();
  updateCartUI();
}

// --- HELPER FUNCTIONS ---

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function generateVariantId(productId, size, color) {
  // Creates a unique string like "prod_001-L-noir"
  return `${productId}-${size || "null"}-${color || "null"}`;
}

export function showToast(message) {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;

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

  // Only render these if the elements exist on the current page
  if (document.getElementById("bag-items")) renderCartPage();
  if (document.getElementById("checkout-items")) renderCheckoutPage();
}

function updateCartCount() {
  const countElements = document.querySelectorAll("#cart-count");
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  countElements.forEach((el) => {
    el.textContent = totalQty;
    el.style.display = totalQty > 0 ? "flex" : "none";
  });
}

function renderMiniCart() {
  const container = document.getElementById("mini-cart-items");
  const subtotalEl = document.getElementById("mini-cart-subtotal");
  const footer = document.getElementById("mini-cart-footer");
  const emptyMsg = document.getElementById("mini-cart-empty");

  if (!container) return;

  // 1. Calculate Totals
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // 2. Handle Empty State
  if (cart.length === 0) {
    container.innerHTML = "";
    if (footer) footer.style.display = "none";
    if (emptyMsg) emptyMsg.style.display = "flex";
    if (subtotalEl) subtotalEl.textContent = "₦0";
    return;
  }

  // 3. Handle Full State
  if (footer) footer.style.display = "block";
  if (emptyMsg) emptyMsg.style.display = "none";
  container.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "mini-cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="mini-cart-item-info">
        <h5>${item.name}</h5>
        <p class='mini-cart-item-data'>
          Qty: ${item.quantity} ${item.size !== "Univ" ? `| Size: ${item.size}` : ""}
          <button onclick="window.removeItem('${item.variantId}')">
          <i class="ph-thin ph-trash-simple""></i></button>
        </p>
        <p>
            ₦${(item.price * item.quantity).toLocaleString()}
        </p>
      </div>
    `;
    container.appendChild(div);
  });

  // 4. Update Subtotal
  if (subtotalEl) subtotalEl.textContent = `₦${totalPrice.toLocaleString()}`;
}

function renderCartPage() {
  const container = document.getElementById("bag-items");
  const totalEl = document.getElementById("bag-total");
  const emptyEl = document.getElementById("empty-cart");
  const actionsEl = document.getElementById("bag-actions");

  if (!container) return;

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
            <button class="remove-item-btn" onclick="window.removeItem('${item.variantId}')">
              <i class="ph-light ph-trash"></i>
            </button>
          </div>
          <div class="bag_meta">
            ${item.color !== "Default" && item.color !== "null" ? `<span class="meta-tag">Color: <span style="display:inline-block; width:10px; height:10px; background:${item.color}; border-radius:50%; margin-left:5px;"></span></span>` : ""}
            ${item.size !== "Univ" && item.size !== "null" ? `<span class="meta-tag">Size: ${item.size}</span>` : ""}
          </div>
          <div class="bag_mini_box">
            <div class="qty-picker">
              <button class="qty-btn" onclick="window.updateQty('${item.variantId}', -1)">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="window.updateQty('${item.variantId}', 1)">+</button>
            </div>
            <p class="bag_subtotal">₦${(item.price * item.quantity).toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  if (totalEl) totalEl.textContent = `₦${subtotal.toLocaleString()}`;
}

function renderCheckoutPage() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  const payForm = document.getElementById("checkout-form");

  // Initialize Paystack listener once if on checkout page
  if (payForm && !payForm.dataset.init) {
    initPaystackCheckout(payForm);
    payForm.dataset.init = "true";
  }

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
    const phone = document.getElementById("phone").value;

    const handler = PaystackPop.setup({
      // Your Public Key
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
          { display_name: "Phone", variable_name: "phone", value: phone },
          ...cart.map((item, i) => ({
            display_name: `Item ${i + 1}`,
            variable_name: `item_${i + 1}`,
            value: `${item.name} (${item.quantity}x) - ${item.size} / ${item.color}`,
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

// --- GLOBAL EXPORTS FOR HTML ONCLICK ATTRIBUTES ---
// Necessary because <button onclick="..."> cannot see inside modules
window.updateQty = (id, change) => updateCartItemQuantity(id, change);
window.removeItem = (id) => removeFromCart(id);
window.clearCart = clearCart;
window.addToCart = addToCart;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // Clear Cart Button Logic (if exists on page)
  const clearBtn = document.getElementById("clear-bag-btn");
  if (clearBtn) clearBtn.onclick = clearCart;
});
