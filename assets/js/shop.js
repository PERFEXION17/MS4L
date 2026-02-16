import { products } from "./products.js";
import { addToCart } from "./cart.js"; // Ensure this path is correct
import { COLLECTIONS } from "./constants.js";

export function initShopPage() {
  const container = document.getElementById("shop-products-container");
  const titleEl = document.getElementById("page-title");
  const descEl = document.getElementById("page-desc");

  // Guard Clause: Only run if we are on the shop page
  if (!container) return;

  // 1. Get URL Parameters
  const params = new URLSearchParams(window.location.search);

  const category = params.get("category"); // ?category=lingerie
  const subCategory = params.get("subCategory"); // ?subCategory=teddies
  const silhouette = params.get("silhouette"); // ?silhouette=garter-set
  const collection = params.get("collection"); // ?collection=new-arrivals
  const tag = params.get("tag"); // ?tag=lace
  const search = params.get("search"); // ?search=black

  // 2. Filter Logic & Title Setting
  let filtered = products;
  let pageTitle = "All Collections";
  let pageDesc = "Explore our latest luxury pieces";

  if (search) {
    const term = search.toLowerCase();
    filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term)),
    );
    pageTitle = `Search: "${search}"`;
    pageDesc = `${filtered.length} results found`;
  } else if (collection) {
    // Matches "new-arrivals", "best-sellers" inside the p.collections array
    filtered = products.filter(
      (p) => p.collections && p.collections.includes(collection),
    );
    pageTitle = formatTitle(collection);
    if (collection === COLLECTIONS.NEW_ARRIVALS)
      pageDesc = "Fresh from the atelier";
  } else if (silhouette) {
    filtered = products.filter((p) => p.silhouette === silhouette);
    pageTitle = formatTitle(silhouette);
  } else if (subCategory) {
    filtered = products.filter((p) => p.subCategory === subCategory);
    pageTitle = formatTitle(subCategory);
  } else if (tag) {
    filtered = products.filter((p) => p.tags.includes(tag));
    pageTitle = `${formatTitle(tag)} Collection`;
  } else if (category) {
    // Matches explicit category OR falls back to old subcategory links
    filtered = products.filter((p) => p.category === category);
    pageTitle = formatTitle(category);
  }

  // 3. Update DOM Titles
  if (titleEl) titleEl.textContent = pageTitle;
  if (descEl) descEl.textContent = pageDesc;

  // Dynamic Browser Tab Title (e.g., "MS4L | Lingerie")
  document.title = `MS4L | ${pageTitle}`;

  // 4. Render Grid
  renderGrid(container, filtered);
}

// --- RENDER FUNCTION (Sapphire Schema Edition) ---
function renderGrid(container, items) {
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
        <div class="no-products-msg">
            <h3>No treasures found here.</h3>
            <p>Try a different collection or search term.</p>
            <a class='no-products-link' href="shop.html?collection=new-arrivals">
                View New Arrivals <i class="ph-thin ph-arrow-up-right"></i>
            </a>
        </div>`;
    return;
  }

  items.forEach((product) => {
    // A. DETERMINE DEFAULT IMAGES
    // Logic: Look at the first color option -> Get its ID -> Get matching media
    const defaultColor = product.options.colors[0];
    const mediaList = product.media[defaultColor.id];

    // Safety check: Ensure media exists
    if (!mediaList || mediaList.length === 0) return;

    const imgFront = mediaList[0];
    // If a second image exists, use it for hover. If not, reuse front.
    const imgBack = mediaList.length > 1 ? mediaList[1] : imgFront;

    // B. INVENTORY BADGES
    let badgeHTML = "";
    if (!product.inStock) {
      badgeHTML = '<span class="badge sold-out">Sold Out</span>';
    } else if (product.lowStockWarning) {
      badgeHTML = '<span class="badge low-stock">Low Stock</span>';
    } else if (product.collections.includes("new-arrivals")) {
      badgeHTML = '<span class="badge new">New</span>';
    }

    // C. CREATE CARD
    const card = document.createElement("div");
    card.className = "pro"; // Uses your new CSS class

    // Clicking card goes to PDP with ID
    card.onclick = () => (window.location.href = `pdp.html?id=${product.id}`);

    card.innerHTML = `
        <div class="pro-img-box">
            <img src="${imgFront}" alt="${product.name}" class="main-img" loading="lazy">
            <img src="${imgBack}" alt="${product.name}" class="hover-img" loading="lazy">
            ${badgeHTML}
        </div>
        
        <div class="des">
            <h5>${product.name}</h5>
            <div class="star">
                ${renderStars(product.rating)}
            </div>
            <h4>₦${product.price.toLocaleString()}</h4>
        </div>
        
        <button class="cart-btn" aria-label="Add to Cart">
            <i class="ph-light ph-shopping-cart"></i>
        </button>
    `;

    // D. QUICK ADD TO CART (Stop Propagation)
    const cartBtn = card.querySelector(".cart-btn");
    cartBtn.onclick = (e) => {
      e.stopPropagation(); // Stop click from opening PDP
      e.preventDefault();

      if (!product.inStock) {
        alert("Sorry, this item is currently sold out.");
        return;
      }

      // Add to cart with defaults: (product, qty, size, colorId)
      addToCart(
        product,
        1,
        product.availableSizes[0], // Default to first available size
        defaultColor.id, // Default to first color
      );
    };

    container.appendChild(card);
  });
}

// --- HELPERS ---

function formatTitle(str) {
  if (!str) return "";
  // "gym-sets" -> "Gym Sets"
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function renderStars(rating) {
  // Simple star renderer
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars += '<i class="ph-fill ph-star" style="color: #f3b519;"></i>';
    } else {
      stars += '<i class="ph-light ph-star" style="color: #f3b519;"></i>';
    }
  }
  return stars;
}
