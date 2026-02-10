import { products } from "./products.js";
import { formatPrice } from "./utils.js"; // Helper if you have it, else use .toLocaleString()

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const categoryTitle = document.getElementById("category-title");

  // 1. Get URL Params
  const urlParams = new URLSearchParams(window.location.search);
  const targetCategory = urlParams.get("category");

  // 2. Filter Logic
  let filteredProducts = [];

  if (!targetCategory || targetCategory === "all") {
    // Show everything if no category specified
    filteredProducts = products;
    categoryTitle.textContent = "All Products";
  } else if (targetCategory === "new-arrivals") {
    // Logic for New Arrivals (e.g., last 10 items or specific IDs)
    filteredProducts = products.filter(
      (p) => p.category === "new-arrivals" || p.id <= 8,
    );
    categoryTitle.textContent = "New Arrivals";
  } else {
    // Standard Category Filter
    // This checks if the product's category OR sub-category includes the URL param
    // ensuring ?category=babydolls finds items labeled as "Babydoll"
    filteredProducts = products.filter((p) => {
      const cat = p.category ? p.category.toLowerCase() : "";
      const type = p.type ? p.type.toLowerCase() : ""; // Assuming you have a 'type' field
      const slug = targetCategory.toLowerCase();

      return cat.includes(slug) || type.includes(slug);
    });

    // Format Title (remove hyphens)
    categoryTitle.textContent = targetCategory.replace(/-/g, " ").toUpperCase();
  }

  // 3. Render
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
        <div class="no-products-msg">
            <h3>No products found in this collection.</h3>
            <a href="shop.html?category=new-arrivals" class="no-products-link">View New Arrivals</a>
        </div>`;
  } else {
    renderGrid(filteredProducts);
  }
});

// --- RENDER FUNCTION (9:16 CARDS) ---
function renderGrid(items) {
  const productGrid = document.getElementById("product-grid");

  productGrid.innerHTML = items
    .map(
      (product) => `
    <div class="tile" onclick="window.location.href='prod_details.html?id=${product.id}'">
      
      <div class="tile_img">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        
        <button class="wishlist-btn" data-id="${product.id}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
          <i class="ph ph-heart"></i>
        </button>
      </div>

      <div class="tile_txt">
        <p class="tile_name">${product.name}</p>
        <div class="price_con">
          <p class="price">₦${product.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}
