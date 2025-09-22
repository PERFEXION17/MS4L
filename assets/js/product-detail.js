const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
const product = products.find((p) => p.id === productId);

const productName = document.getElementById("product-name");
const mainImage = document.getElementById("main-image");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const miniImages = document.querySelector(".mini-images");
const colorsDiv = document.getElementById("colors");
const sizeMin = document.getElementById("size-min");
const sizeMax = document.getElementById("size-max");
const sizeInput = document.getElementById("size-input");
const qtyInput = document.getElementById("qty-input");
const totalPrice = document.getElementById("total-price");
const addToCartButton = document.getElementById("add-to-cart");

let selectedColor = "";
let selectedSize = "";
let basePrice = 0;

if (product) {
  productName.textContent = product.name;
  basePrice = product.price;
  productPrice.textContent = `₦${basePrice.toFixed(2)}`;
  productDescription.textContent = product.description;

  mainImage.src = product.images[0];
  product.images.forEach((img, index) => {
    const mini = document.createElement("img");
    mini.src = img;
    mini.alt = `Mini Image ${index + 1}`;
    mini.onclick = () => {
      mainImage.src = img;
      document
        .querySelectorAll(".mini-images img")
        .forEach((m) => m.classList.remove("active"));
      mini.classList.add("active");
    };
    if (index === 0) mini.classList.add("active");
    miniImages.appendChild(mini);
  });

  product.colors.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;
    colorBox.onclick = () => {
      selectedColor = color;
      document
        .querySelectorAll(".color-box")
        .forEach((b) => b.classList.remove("selected"));
      colorBox.classList.add("selected");
    };
    colorsDiv.appendChild(colorBox);
  });

  sizeMin.textContent = product.sizeLimits.min;
  sizeMax.textContent = product.sizeLimits.max;
  sizeInput.min = product.sizeLimits.min;
  sizeInput.max = product.sizeLimits.max;
  sizeInput.value = product.sizeLimits.min;
  selectedSize = sizeInput.value;
  sizeInput.oninput = () => (selectedSize = sizeInput.value);

  updateTotal();

  addToCartButton.onclick = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const item = {
      id: product.id,
      name: product.name,
      image: mainImage.src,
      color: selectedColor,
      size: selectedSize,
      qty: parseInt(qtyInput.value) || 1,
      price: basePrice,
      sku: product.sku,
    };
    const existing = cart.find(
      (i) => i.id === item.id && i.color === item.color && i.size === item.size
    );
    if (existing) {
      existing.qty += item.qty;
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    alert(`${product.name} added to cart!`);
  };
} else {
  productName.textContent = "Product Not Found";
  mainImage.src = "https://via.placeholder.com/200?text=Not+Found";
  productPrice.textContent = "";
  productDescription.textContent = "Sorry, this product doesn't exist.";
  addToCartButton.style.display = "none";
}

function updateTotal() {
  const qty = parseInt(qtyInput.value) || 1;
  totalPrice.textContent = `Total: ₦${(basePrice * qty).toFixed(2)}`;
}
