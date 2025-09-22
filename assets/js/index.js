function renderProducts(searchTerm = "", selectedCategory = "") {
  const categorySections = document.getElementById("category-sections");
  categorySections.innerHTML = "";
  const categories = [...new Set(products.map((p) => p.category))];

  // Populate category filter
  const categoryFilter = document.getElementById("category-filter");
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const filteredCategories = [
    ...new Set(filteredProducts.map((p) => p.category)),
  ];
  if (filteredCategories.length === 0) {
    categorySections.innerHTML = "<p>No products found.</p>";
  } else {
    filteredCategories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.id = category;
      categoryDiv.innerHTML = `<h2>${category}</h2><div class="product-grid" id="${category}-products"></div>`;
      categorySections.appendChild(categoryDiv);

      const productGrid = document.getElementById(`${category}-products`);
      filteredProducts
        .filter((p) => p.category === category)
        .forEach((product) => {
          const tile = document.createElement("div");
          tile.className = "product-tile";
          tile.onclick = () => goToProduct(product.id);
          tile.innerHTML = `
                                <img src="${product.images[0]}" alt="${
            product.name
          }">
                                <h3>${product.name}</h3>
                                <p>₦${product.price.toFixed(2)}</p>
                            `;
          productGrid.appendChild(tile);
        });
    });
  }

  // Featured products (random 2 from filtered)
  const featuredGrid = document.getElementById("featured-products");
  featuredGrid.innerHTML = "";
  const shuffled = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 2);
  shuffled.forEach((product) => {
    const tile = document.createElement("div");
    tile.className = "product-tile";
    tile.onclick = () => goToProduct(product.id);
    tile.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₦${product.price.toFixed(2)}</p>
                `;
    featuredGrid.appendChild(tile);
  });
}

// Event listeners
document.getElementById("search-input").addEventListener("input", () => {
  const searchTerm = document.getElementById("search-input").value;
  const selectedCategory = document.getElementById("category-filter").value;
  renderProducts(searchTerm, selectedCategory);
});

document.getElementById("category-filter").addEventListener("change", () => {
  const searchTerm = document.getElementById("search-input").value;
  const selectedCategory = document.getElementById("category-filter").value;
  renderProducts(searchTerm, selectedCategory);
});

document.getElementById("clear-search").onclick = () => {
  document.getElementById("search-input").value = "";
  document.getElementById("category-filter").value = "";
  renderProducts();
};

// Initial render
renderProducts();
