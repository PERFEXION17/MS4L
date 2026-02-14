import { products } from "./products.js";
import { formatPrice } from "./utils.js"; // Helper if you have it, else use .toLocaleString()

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const categoryTitle = document.getElementById("category-title");

  // 1. Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const targetCategory = urlParams.get("category");       // e.g. ?category=lingerie
  const targetSubCategory = urlParams.get("subCategory"); // e.g. ?subCategory=teddies

  let filteredProducts = [];
  
  // Helper to format title (e.g., "gym-wear" -> "GYM WEAR")
  const formatTitle = (str) => str ? str.replace(/-/g, " ").toUpperCase() : "";

  // 2. Filter Logic
  
  // SCENARIO A: Explicit Sub-Category (The new, correct way)
  if (targetSubCategory) {
    filteredProducts = products.filter(
      (p) => p.subCategory && p.subCategory.toLowerCase() === targetSubCategory.toLowerCase()
    );
    categoryTitle.textContent = formatTitle(targetSubCategory);
  } 
  
  // SCENARIO B: New Arrivals (Using the boolean flag in your new data)
  else if (targetCategory === "new-arrivals") {
    filteredProducts = products.filter((p) => p.newArrival === true);
    categoryTitle.textContent = "NEW ARRIVALS";
  } 
  
  // SCENARIO C: Main Category (or "Catch-All" for old links)
  else if (targetCategory && targetCategory !== "all") {
    const slug = targetCategory.toLowerCase();
    
    filteredProducts = products.filter((p) => {
      // 1. Check Main Category
      const catMatch = p.category && p.category.toLowerCase() === slug;
      // 2. Check Sub Category (Backup for old links)
      const subCatMatch = p.subCategory && p.subCategory.toLowerCase() === slug;
      
      return catMatch || subCatMatch;
    });
    
    categoryTitle.textContent = formatTitle(targetCategory);
  } 
  
  // SCENARIO D: Default (Show All)
  else {
    filteredProducts = products;
    categoryTitle.textContent = "ALL PRODUCTS";
  }

  // 3. Render
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
        <div class="no-products-msg">
            <h3>No products found in this collection.</h3>
            <a href="shop.html?category=new-arrivals" class="no-products-link">View New Arrivals <i class="ph-light ph-arrow-up-right"></i
          ></a>
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
    <div class="tile" onclick="window.location.href='pdp.html?id=${product.id}'">
      
      <div class="tile_img">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        
        <button class="wishlist-btn" data-id="${product.id}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
          <i class="ph-light ph-heart"></i>
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
