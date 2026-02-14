import { products } from "./products.js";
import { addToCart } from "./cart.js";

export function initPDP() {
  const pdpContainer = document.getElementById("prodetails");
  if (!pdpContainer) return;

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products.find((p) => p.id === productId);

  if (!product) {
    document.querySelector(".single-pro-details").innerHTML =
      "<h2>Product Not Found</h2>";
    return;
  }

  // Render Page Content
  renderBasicInfo(product);
  renderRichMetadata(product);
  renderSizeSelector(product);
  renderGallery(product); // <--- This uses the new Lightbox logic
  renderRelatedProducts(product);
  setupInteractions(product);
}

// --- NEW GALLERY LOGIC (Lightbox) ---
function renderGallery(product) {
  const mainImg = document.getElementById("MainImg");
  const thumbGroup = document.getElementById("small-img-group");

  if (!product.images.length) return;

  // 1. Set Initial Image
  mainImg.src = product.images[0];

  // 2. Create Lightbox Elements (Lazy Load)
  // We check if it exists so we don't create duplicates if user goes back/forth
  let lightbox = document.getElementById("pdp-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "pdp-lightbox";
    lightbox.className = "lightbox-overlay";
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img src="" class="lightbox-img" id="lightbox-img" alt="Fullscreen View">
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  // 3. Main Image Click -> Open Lightbox
  mainImg.onclick = () => {
    lightboxImg.src = mainImg.src; // Sync current image
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // 4. Lightbox Logic
  // A. Click Image -> Toggle Zoom 2x
  lightboxImg.onclick = (e) => {
    e.stopPropagation(); // Don't trigger the background close event
    lightboxImg.classList.toggle("zoomed");

    // Logic to pan around if zoomed (Desktop only)
    if (lightboxImg.classList.contains("zoomed")) {
      lightbox.style.overflow = "auto";
    } else {
      lightbox.style.overflow = "hidden";
    }
  };

  // B. Close Lightbox (Click X or Background)
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightboxImg.classList.remove("zoomed"); // Reset zoom level
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  closeBtn.onclick = closeLightbox;
  lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  };

  // C. Close on Escape Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // 5. Thumbnails (Standard Switcher)
  thumbGroup.innerHTML = "";
  product.images.forEach((src, idx) => {
    const col = document.createElement("div");
    col.className = `small-img-col ${idx === 0 ? "active" : ""}`;

    const img = document.createElement("img");
    img.src = src;
    img.className = "small-img";

    col.onclick = () => {
      mainImg.src = src;
      // Update Active State
      document
        .querySelectorAll(".small-img-col")
        .forEach((c) => c.classList.remove("active"));
      col.classList.add("active");
    };

    col.appendChild(img);
    thumbGroup.appendChild(col);
  });
}

// --- (Keep your existing helpers below unchanged) ---
function renderBasicInfo(product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent =
    `₦${product.price.toLocaleString()}`;
  const cat = product.subCategory || product.category;
  document.getElementById("breadcrumb-category").textContent = cat.replace(
    /-/g,
    " ",
  );
}

function renderRichMetadata(product) {
  if (!product.description) return;
  const mktText = document.getElementById("marketing-text");
  if (mktText) mktText.textContent = product.description.marketing || "";

  const featureList = document.getElementById("features-list");
  if (featureList && product.description.features) {
    featureList.innerHTML = product.description.features
      .map((feat) => `<li>${feat}</li>`)
      .join("");
  }
  const matInfo = document.getElementById("material-info");
  if (matInfo) matInfo.textContent = product.description.material || "N/A";
}

function renderSizeSelector(product) {
  const sizeSelect = document.getElementById("size-select");
  if (!sizeSelect) return;
  sizeSelect.innerHTML = '<option value="">Select Size</option>';

  let options = [];
  if (product.sizes && product.sizes.length > 0) {
    options = product.sizes;
  } else if (product.sizeLimits) {
    for (let i = product.sizeLimits.min; i <= product.sizeLimits.max; i += 2) {
      options.push(i);
    }
  }

  options.forEach((opt) => {
    const el = document.createElement("option");
    el.value = opt;
    el.textContent = opt;
    sizeSelect.appendChild(el);
  });
}

function renderRelatedProducts(currentProduct) {
  const related = products
    .filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id,
    )
    .slice(0, 4);

  const grid = document.getElementById("related-grid");
  if (!grid || related.length === 0) return;

  grid.innerHTML = related
    .map(
      (p) => `
    <div class="pro" onclick="window.location.href='pdp.html?id=${p.id}'">
      <img src="${p.images[0]}" alt="${p.name}">
      <div class="des">
        <span>${p.subCategory || p.category}</span>
        <h5>${p.name}</h5>
        <h4>₦${p.price.toLocaleString()}</h4>
      </div>
      <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
    </div>
  `,
    )
    .join("");
}

function setupInteractions(product) {
  const addBtn = document.querySelector(".single-pro-details button.normal");
  const sizeSelect = document.getElementById("size-select");
  const qtyInput = document.querySelector(
    ".single-pro-details input[type='number']",
  );

  if (addBtn) {
    addBtn.onclick = () => {
      const size = sizeSelect ? sizeSelect.value : null;
      const quantity = parseInt(qtyInput ? qtyInput.value : 1) || 1;

      if ((product.sizes || product.sizeLimits) && (!size || size === "")) {
        alert("Please select a size first.");
        sizeSelect.focus();
        return;
      }
      addToCart(product, quantity, size);
    };
  }
}
