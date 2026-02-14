import { products } from "./products.js";
import { addToCart, updateCartUI } from "./cart.js"; // <--- FIXED IMPORTS

// --- STATE MANAGEMENT ---

export function toggleWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const index = wishlist.indexOf(productId);

  if (index === -1) {
    wishlist.push(productId);
    showHeartAnimation(); // Optional visual feedback
  } else {
    wishlist.splice(index, 1);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCounter();
  renderWishlistHearts();
}

export function updateWishlistCounter() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const count = wishlist.length;

  document.querySelectorAll(".wishlist-counter").forEach((el) => {
    el.textContent = count;
    // Optional: Hide badge if 0
    // el.style.display = count > 0 ? "flex" : "none";
  });
}

export function renderWishlistHearts() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = parseInt(btn.dataset.id);
    if (wishlist.includes(id)) {
      btn.classList.add("active");
      // Use FontAwesome classes consistent with your setup
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove("active");
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });
}

// --- VISUALS ---

export function showHeartAnimation(x, y) {
  // If coordinates aren't passed (e.g. from a non-pointer event), default to center
  const top = y || window.innerHeight / 2;
  const left = x || window.innerWidth / 2;

  const heart = document.createElement("div");
  heart.className = "heart-float";
  heart.innerHTML = "<i class='fas fa-heart'></i>";
  heart.style.position = "fixed";
  heart.style.left = left + "px";
  heart.style.top = top + "px";
  heart.style.color = "#ff0000";
  heart.style.zIndex = "10000";
  heart.style.pointerEvents = "none";
  heart.style.animation = "floatUp 1s ease-out forwards";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

// --- WISHLIST PAGE RENDERER ---

export function renderWishlistPage() {
  const container = document.getElementById("wishlist-items");
  const empty = document.getElementById("empty-wishlist");

  if (!container) return; // Not on wishlist page

  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  container.innerHTML = "";

  if (wishlist.length === 0) {
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  wishlist.forEach((id) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;

    // Create Tile
    const div = document.createElement("div");
    div.className = "wishlist-card"; // Suggest renaming class for clarity
    div.innerHTML = `
      <div class="tile_img">
        <img src="${p.images[0]}" alt="${p.name}" onclick="window.location.href='pdp.html?id=${p.id}'" />
      </div>
      <div class="tile_txt">
        <p class="tile_name">${p.name}</p>
        <p class="price">₦${p.price.toLocaleString()}</p>
        <div class="wishlist-buttons">
          <button class="wishlist-bag-btn" data-id="${p.id}">
            Move to Bag
          </button>
          <button class="wishlist-remove-btn" data-id="${p.id}">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  // Attach Events
  document.querySelectorAll(".wishlist-bag-btn").forEach((btn) => {
    btn.onclick = () => addToCartFromWishlist(parseInt(btn.dataset.id));
  });

  document.querySelectorAll(".wishlist-remove-btn").forEach((btn) => {
    btn.onclick = () => {
      toggleWishlist(parseInt(btn.dataset.id));
      renderWishlistPage(); // Re-render immediately
    };
  });
}

// --- MOVE TO BAG LOGIC ---

export function addToCartFromWishlist(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    alert("Product no longer available.");
    return;
  }

  // 1. Determine Defaults
  let defaultSize = "Univ";
  if (product.sizes && product.sizes.length > 0) defaultSize = product.sizes[0];
  else if (product.sizeLimits) defaultSize = product.sizeLimits.min;

  const defaultColor = product.colors ? product.colors[0] : "Default";

  // 2. Call the Engine's Add Function
  addToCart(product, 1, defaultSize, defaultColor);

  // 3. Remove from Wishlist
  toggleWishlist(id);

  // 4. Update UI (Already handled by addToCart, but if on wishlist page, re-render list)
  if (document.getElementById("wishlist-items")) {
    renderWishlistPage();
  }
}
