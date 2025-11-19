import { products } from "./products.js";

const container = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const colorFilter = document.getElementById("color-filter");

// Filter only male products
let menProducts = products.filter((p) => p.gender === "women");

// 🧩 Group by category
function groupByCategory(list) {
  return list.reduce((groups, product) => {
    const category = product.category || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});
}

// 🧱 Render grouped products
function renderProducts(list) {
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  const grouped = groupByCategory(list);

  // Optional: custom category order
  const categoryOrder = ["boxer", "brief", "singlet", "shorts"];

  const categories = Object.keys(grouped).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  categories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "category-section";
    section.innerHTML = `<h3>${category.toUpperCase()}</h3>`;

    const grid = document.createElement("div");
    grid.className = "tile_con";

    grouped[category].forEach((p) => {
      const item = document.createElement("div");
      item.className = "tile";
      item.innerHTML = `
      <div  class="tile_img">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      </div>
        <div class="tile_txt">
          <p class="tile_name">${p.name}</p>
          <div class="price_con">
            <p class="price">₦${p.price.toLocaleString()}</p>
            <button class="buy_now" onclick="goToProduct(${
              p.id
            })">Buy Now</button>
          </div>
          <button class="add_bag add-to-bag" data-id="${p.id}">
            <i class="ph ph-handbag regular"></i>
          </button>
        </div>
      `;

      // On-click: go to product page
      // item.addEventListener("click", () => {
      //   window.location.href = `/prod_details.html?id=${p.id}`;
      // });

      // Add JSON-LD structured data
      const ld = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: p.images.map((img) => window.location.origin + img),
        sku: p.sku || "",
        brand: {
          "@type": "Brand",
          name: "My Store For Life",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "NGN",
          price: p.price,
          availability: "https://schema.org/InStock",
          url: window.location.origin + "/product.html?id=" + p.id,
        },
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ld);
      item.appendChild(script);

      grid.appendChild(item);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Apply filters and search
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const colorValue = colorFilter.value;

  const filtered = menProducts.filter((p) => {
    const matchSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm);

    const matchColor =
      !colorValue || (p.colors && p.colors.includes(colorValue));

    return matchSearch && matchColor;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
colorFilter.addEventListener("change", applyFilters);

// 🏁 Initial render
renderProducts(menProducts);
