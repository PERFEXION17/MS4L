import { products } from "./products.js";
import { addToCart } from "./cart.js";

// --- 1. TOGGLE WISHLIST (The Engine) ---
export function toggleWishlist(productId) {
  const id = String(productId);

  // 1. GET & SANITIZE
  let rawList = JSON.parse(localStorage.getItem("wishlist") || "[]");
  let wishlist = rawList.filter((item) => item && item.id);

  // 2. CHECK INDEX
  const existingIndex = wishlist.findIndex((item) => String(item.id) === id);

  if (existingIndex > -1) {
    // REMOVE
    wishlist.splice(existingIndex, 1);
    console.log(`Removed ${id} from wishlist`);
  } else {
    // ADD
    const product = products.find((p) => String(p.id) === id);

    if (product) {
      // Safe Image Resolver
      let mainImg = "assets/img/no-image.jpg";

      if (
        product.options &&
        product.options.colors &&
        product.options.colors.length > 0
      ) {
        const defaultColorId = product.options.colors[0].id;
        if (product.media && product.media[defaultColorId]) {
          mainImg = product.media[defaultColorId][0];
        }
      } else if (product.images && product.images.length > 0) {
        mainImg = product.images[0];
      }

      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: mainImg,
        stock: product.inStock,
        slug: product.slug || "",
      });
      // Animation removed as requested
    }
  }

  // 3. SAVE
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // 4. UPDATE UI
  updateWishlistCounter();
  renderWishlistHearts();
  window.dispatchEvent(new Event("wishlistUpdated"));
}

// --- 2. UPDATE NOTIFICATION DOT ---
export function updateWishlistCounter() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const hasItems = wishlist.length > 0;

  const dot = document.getElementById("wishlist-count");
  if (dot) {
    // Simply toggle visibility. No numbers.
    dot.style.display = hasItems ? "block" : "none";
  }
}

// --- 3. RENDER HEARTS (On Product Cards) ---
export function renderWishlistHearts() {
  const wishlistIds = getWishlistIds();

  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = btn.dataset.id;
    const icon = btn.querySelector("i");

    if (wishlistIds.includes(id)) {
      // ACTIVE: Solid Heart
      btn.classList.add("active");
      if (icon) {
        icon.classList.remove("ph-thin");
        icon.classList.add("ph-fill");
      } else {
        btn.innerHTML = '<i class="ph-fill ph-heart"></i>';
      }
    } else {
      // INACTIVE: Thin Heart
      btn.classList.remove("active");
      if (icon) {
        icon.classList.remove("ph-fill");
        icon.classList.add("ph-thin");
      } else {
        btn.innerHTML = '<i class="ph-thin ph-heart"></i>';
      }
    }
  });
}

// --- 4. RENDER WISHLIST PAGE (Branded) ---
export function renderWishlistPage() {
  const container = document.getElementById("wishlist-items");
  const empty = document.getElementById("empty-wishlist");

  if (!container) return;

  const rawList = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const wishlist = rawList.filter((item) => item && item.id);

  container.innerHTML = "";

  if (wishlist.length === 0) {
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  wishlist.forEach((item) => {
    const div = document.createElement("div");
    div.className = "wishlist-card";

    div.innerHTML = `
      <div class="tile_img" onclick="window.location.href='pdp.html?id=${item.id}'" style="cursor: pointer;">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="tile_txt">
        <h5 style="font-family: var(--ff-heading); font-size: 1rem; margin-bottom: 5px;">${item.name}</h5>
        
        <h4 style="font-family: var(--ff-numeric); color: var(--text-muted); font-size: 0.95rem;">
            ₦${item.price.toLocaleString()}
        </h4>

        <div class="wishlist-buttons" style="margin-top: 15px; display: flex; gap: 10px;">
          <button class="wishlist-bag-btn" data-id="${item.id}" 
                  style="flex: 1; padding: 10px; background: var(--brand-main); color: #fff; border: none; font-family: var(--ff-body); text-transform: uppercase; font-size: 0.8rem; cursor: pointer;">
            Move to Bag
          </button>
          <button class="wishlist-remove-btn" data-id="${item.id}"
                  style="width: 40px; background: transparent; border: 1px solid var(--border-light); color: var(--status-error); cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <i class="ph-thin ph-trash" style="font-size: 1.2rem;"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  // Attach Events
  document.querySelectorAll(".wishlist-bag-btn").forEach((btn) => {
    btn.onclick = () => addToCartFromWishlist(btn.dataset.id);
  });

  document.querySelectorAll(".wishlist-remove-btn").forEach((btn) => {
    btn.onclick = () => {
      toggleWishlist(btn.dataset.id);
      renderWishlistPage();
    };
  });
}

// --- 5. MOVE TO BAG ---
export function addToCartFromWishlist(id) {
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    alert("Product details not found.");
    return;
  }

  const defaultSize =
    product.availableSizes && product.availableSizes[0]
      ? product.availableSizes[0]
      : product.sizes
        ? product.sizes[0]
        : "Univ";

  const defaultColor =
    product.options && product.options.colors && product.options.colors[0]
      ? product.options.colors[0].id
      : "Default";

  addToCart(product, 1, defaultSize, defaultColor);
  toggleWishlist(id);

  if (document.getElementById("wishlist-items")) {
    renderWishlistPage();
  }
}

// --- 6. HELPER ---
export function getWishlistIds() {
  const raw = localStorage.getItem("wishlist");
  if (!raw) return [];

  try {
    const list = JSON.parse(raw);
    return list
      .filter((item) => item && item.id)
      .map((item) => String(item.id));
  } catch (err) {
    localStorage.removeItem("wishlist");
    return [];
  }
}
