// assets/js/cart.js

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- CORE FUNCTIONS ---
export function addToCart(product, quantity = 1, size = null, color = null) {
  if (!product) return;

  const variantId = generateVariantId(product.id, size, color);
  let imageToSave = "assets/img/components/MS4L-logo.webp";

  if (product.media) {
    if (color && product.media[color]) {
      imageToSave = product.media[color][0];
    } else {
      const firstKey = Object.keys(product.media)[0];
      imageToSave = product.media[firstKey][0];
    }
  } else if (product.images) {
    imageToSave = product.images[0];
  }

  const existingItem = cart.find((item) => item.variantId === variantId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      variantId: variantId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: imageToSave,
      size: size || "Univ",
      colorLabel: color || "Default", // You might want to pass the actual label instead of ID here if available
      quantity: quantity,
    });
  }

  saveCart();
  updateCartUI();

  // NEW: Automatically open the drawer when adding
  openCartDrawer();
}

export function updateCartItemQuantity(variantId, change) {
  const itemIndex = cart.findIndex((item) => item.variantId === variantId);
  if (itemIndex === -1) return;

  const item = cart[itemIndex];
  const newQty = item.quantity + change;

  if (newQty > 0) {
    item.quantity = newQty;
  } else {
    if (confirm("Remove this item from bag?")) {
      cart.splice(itemIndex, 1);
    }
  }

  saveCart();
  updateCartUI();
}

export function removeFromCart(variantId) {
  if (!confirm("Remove this item?")) return;
  cart = cart.filter((item) => item.variantId !== variantId);
  saveCart();
  updateCartUI();
}

export function clearCart() {
  if (!confirm("Are you sure you want to clear your bag?")) return;
  cart = [];
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function generateVariantId(productId, size, color) {
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
export function updateCartUI() {
  updateCartCount();
  renderSlideOutCart(); // Replaces renderMiniCart

  if (document.getElementById("bag-items")) renderCartPage();
  if (document.getElementById("checkout-items")) renderCheckoutPage();
}

function updateCartCount() {
  const countElements = document.querySelectorAll(
    "#cart-count, #cart-drawer-count",
  );
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  countElements.forEach((el) => {
    el.textContent = totalQty;
    // Hide the little bubble on the navbar icon if empty, but keep drawer text
    if (el.id === "cart-count")
      el.style.display = totalQty > 0 ? "flex" : "none";
  });
}

// --- NEW: SLIDE-OUT DRAWER LOGIC ---
function renderSlideOutCart() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  const subtotalEl = document.getElementById("cart-drawer-subtotal");

  if (!body) return;

  if (cart.length === 0) {
    body.style.cssText = 'padding-bottom: var(--spacing-xl); display: flex; justify-content: center; align-items: center;'
    body.innerHTML = `
            <div class="drawer-empty-state">
                <p>Your bag is empty.</p>
                <button class="btn-checkout-drawer" onclick="window.location.href='shop.html'">Continue Shopping</button>
            </div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";
  body.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "drawer-item";
    div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
            <div class="drawer-item-info">
                <div>
                    <h4>${item.name}</h4>
                    <div class="drawer-item-meta">
                        ${item.colorLabel !== "Default" && item.colorLabel !== "null" ? `Colour: ${item.colorLabel} <br>` : ""}
                        ${item.size !== "Univ" && item.size !== "null" ? `Size: ${item.size}` : ""}
                    </div>
                </div>
                
                <div class="drawer-item-actions">
                    <div class="drawer-qty-picker">
                        <button class="drawer-qty-btn" onclick="window.updateQty('${item.variantId}', -1)">−</button>
                        <span class="drawer-qty-val">${item.quantity}</span>
                        <button class="drawer-qty-btn" onclick="window.updateQty('${item.variantId}', 1)">+</button>
                    </div>
                    
                    <div style="text-align: right;">
                        <span style="display:block; font-size: var(--font-size-ui); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-xs);">₦${(item.price * item.quantity).toLocaleString()}</span>
                        <button class="drawer-remove-btn" onclick="window.removeItem('${item.variantId}')">Remove</button>
                    </div>
                </div>
            </div>
        `;
    body.appendChild(div);
  });

  if (subtotalEl) subtotalEl.textContent = `₦${subtotal.toLocaleString()}`;
}

export function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer) drawer.classList.add("open");
  if (overlay) overlay.classList.add("active");
}

export function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

// ... (Keep your existing renderCartPage, renderCheckoutPage, and Paystack logic here) ...

// --- GLOBAL EXPORTS ---
window.updateQty = (id, change) => updateCartItemQuantity(id, change);
window.removeItem = (id) => removeFromCart(id);
window.clearCart = clearCart;
window.addToCart = addToCart;
