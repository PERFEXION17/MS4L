import { products } from "./products.js"; // For rendering and adding to cart
import { formatPrice } from "./utils.js";
import { updateCartCounter } from "./cart.js";

export function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const index = wishlist.indexOf(productId);
  if (index === -1) wishlist.push(productId);
  else wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCounter();
  renderWishlistHearts();
}

export function updateWishlistCounter() {
  const count = JSON.parse(localStorage.getItem("wishlist") || "[]").length;
  document
    .querySelectorAll(".wishlist-counter")
    .forEach((el) => (el.textContent = count));
}

export function renderWishlistHearts() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = parseInt(btn.dataset.id);
    if (wishlist.includes(id)) {
      btn.classList.add("active");
      btn.innerHTML = '<i class="ph-fill ph-heart"></i>';
    } else {
      btn.classList.remove("active");
      btn.innerHTML = '<i class="ph ph-heart"></i>';
    }
  });
}

export function showHeartAnimation(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart-float";
  heart.innerHTML = "<i class='ph-fill ph-heart'></i>";
  heart.style.left = x - 30 + "px";
  heart.style.top = y - 30 + "px";
  heart.style.color = "var(--red)"
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

/**
 * Renders wishlist page (wishlist.html). Safe on any page.
 */
export function renderWishlistPage() {
  const container = document.getElementById("wishlist-items");
  const empty = document.getElementById("empty-wishlist");

  if (!container || !empty) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  container.innerHTML = "";

  if (wishlist.length === 0) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  wishlist.forEach((id) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;

    const div = document.createElement("div");
    div.className = "tile";
    div.innerHTML = `
      <div class="tile_img">
        <img src="${p.images[0]}" alt="${p.name}" />
      </div>
      <div class="tile_txt">
        <p class="tile_name">${p.name}</p>
        <p class="price">${formatPrice(p.price)}</p>
        <div class="wishlist-buttons">
          <button class="wishlist-bag" data-id='${p.id}'>
            Move to Bag
          </button>
          <button class="wishlist-remove" data-id="${p.id}">
            <i class="ph ph-trash-simple"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  renderWishlistHearts();

  // Bind remove from wishlist (since onclick not used for remove)
  document.querySelectorAll(".wishlist-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id);
      renderWishlistPage(); // Re-render
    });
  });
}

export function addToCartFromWishlist(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    alert("Oops! This product is no longer available.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const defaultColor = product.colors[0];
  const defaultSize = product.sizeLimits.min || 0;

  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.color === defaultColor &&
      item.size === defaultSize
  );

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: defaultColor,
      size: defaultSize,
      qty: 1,
      image: product.images[0],
      sku:
        product.sku ||
        `PROD-${String(product.id).padStart(3, "0")}-${product.name
          .slice(0, 3)
          .toUpperCase()}`,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  window.triggerCartModal?.();
  toggleWishlist(id);

  // Success toast (local to this function, but could move to utils if reused)
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--glass);
      color: var(--text);
      padding: 1rem 2rem;
      border: var(--border);
      border-radius: 2rem;
      font-weight: 600;
      z-index: 10000;
      animation: toastUp 0.6s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  showToast(`${product.name} moved to bag!`);
}
