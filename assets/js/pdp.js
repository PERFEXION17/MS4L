import { products } from "./products.js";
import { addToCart } from "./cart.js";
import { toggleWishlist, getWishlistIds } from "./wishlist.js";

// --- STATE ---
let currentProduct = null;
let selectedColor = null;
let selectedSize = null;

// --- INITIALIZATION (Called by main.js) ---
export function initPDPPage() {
  const container = document.querySelector(".pdp-main");
  if (!container) return; // Guard clause

  // 1. Get Product ID from URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  currentProduct = products.find((p) => String(p.id) === String(productId));

  if (!currentProduct) {
    container.innerHTML = `<div class="empty-pdp"><h2>Product not found.</h2><a href="shop.html" class="btn-primary">Return to Shop</a></div>`;
    return;
  }

  // 2. Set Initial State
  selectedColor = currentProduct.options.colors[0]; // Default to first colour

  // 3. Render Page Components
  renderProductInfo();
  renderGallery(selectedColor.id);
  renderOptions();
  setupAccordions();
  setupInteractions(); // NEW: Injected Modals and Share Logic

  // 4. Render Bottom Sections
  renderCompleteTheLook();
  renderYouMayAlsoLike();
  updateRecentlyViewed(currentProduct.id);
  renderRecentlyViewed();
  renderBreadcrumbs();

  // 5. Update Browser Tab Title
  document.title = `MS4L | ${currentProduct.name}`;
}

// --- 1. RENDER INFO & ACTIONS ---
function renderProductInfo() {
  // Basic Info
  document.getElementById("pdp-title").textContent = currentProduct.name;
  document.getElementById("pdp-price").textContent =
    `₦${currentProduct.price.toLocaleString()}`;

  // Trust Signals (Rating & Reviews)
  const rating = currentProduct.rating || 5.0;
  const reviews = currentProduct.reviewCount || 0;
  const reviewText = document.querySelector(".review-count");
  if (reviewText) {
    reviewText.textContent = `${rating} (${reviews} Reviews)`;
  }

  // ACCORDION 1: Description
  document.getElementById("pdp-desc-text").textContent =
    currentProduct.description ||
    "A luxury essential designed for elegance and comfort.";

  // ACCORDION 2: Details & Fit (Bullet Points)
  const fitContent = document.getElementById("pdp-fit-content");
  let detailsHtml = "";

  if (currentProduct.details && currentProduct.details.length > 0) {
    detailsHtml += `<ul style="padding-left: 18px; margin-top: 5px; margin-bottom: 15px;">`;
    currentProduct.details.forEach((detail) => {
      detailsHtml += `<li style="margin-bottom: 8px;">${detail}</li>`;
    });
    detailsHtml += `</ul>`;
  }

  fitContent.innerHTML =
    detailsHtml || "<p>Refer to our size guide for perfect measurements.</p>";

  // ACCORDION 3: Materials & Care
  document.getElementById("pdp-composition-text").textContent =
    currentProduct.composition ? `Fabric: ${currentProduct.composition}` : "";
  document.getElementById("pdp-care-text").textContent =
    currentProduct.careInstructions || "Hand wash cold. Lay flat to dry.";

  // Action Buttons
  const btnAdd = document.getElementById("pdp-add-to-bag");
  const btnWish = document.getElementById("pdp-wishlist-btn");

  // Check initial wishlist state
  const wishlistIds = getWishlistIds();
  const wishIcon = btnWish.querySelector("i");
  if (wishlistIds.includes(String(currentProduct.id))) {
    wishIcon.classList.replace("ph-thin", "ph-fill");
    btnWish.style.color = "var(--brand-main)";
  }

  // Add to Bag Event
  btnAdd.onclick = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    // addToCart defaults to 1 qty.
    addToCart(currentProduct, 1, selectedSize, selectedColor.id);

    btnAdd.textContent = "Added to Bag";
    setTimeout(() => (btnAdd.textContent = "Add to Bag"), 2000);
  };

  // Wishlist Event
  btnWish.onclick = () => {
    toggleWishlist(currentProduct.id);
    const updatedIds = getWishlistIds();
    if (updatedIds.includes(String(currentProduct.id))) {
      wishIcon.classList.replace("ph-thin", "ph-fill");
      btnWish.style.color = "var(--brand-main)";
    } else {
      wishIcon.classList.replace("ph-fill", "ph-thin");
      btnWish.style.color = "inherit";
    }
  };
}

// --- 2. RENDER DYNAMIC GALLERY (With Hover Zoom & Indicator) ---
function renderGallery(colorId) {
  const gallery = document.getElementById("pdp-gallery");
  gallery.innerHTML = ""; // Clear existing

  const images = currentProduct.media[colorId] || ["assets/img/no-image.jpg"];

  images.forEach((imgSrc) => {
    const wrapper = document.createElement("div");
    wrapper.className = "pdp-img-wrapper";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = currentProduct.name;
    img.loading = "lazy";

    // Logo Placeholder Fade-in Logic
    img.onload = () => img.classList.add("loaded");
    if (img.complete) img.classList.add("loaded"); // If cached

    // Inner-Hover Zoom Logic (Desktop Only)
    wrapper.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 900) return; // NEW: Disable zoom on mobile to allow swiping

      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = "scale(2)"; // Zoom multiplier
    });

    wrapper.addEventListener("mouseleave", () => {
      img.style.transformOrigin = "center center";
      img.style.transform = "scale(1)";
    });

    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
  });

  // NEW: Mobile Indicator Logic
  const indicator = document.getElementById("pdp-mobile-indicator");
  if (indicator) {
    const totalImages = images.length;
    indicator.textContent = `1 / ${totalImages}`; // Set initial state

    // Listen for scroll snapping on mobile
    gallery.addEventListener("scroll", () => {
      const scrollPosition = gallery.scrollLeft;
      const imageWidth = gallery.clientWidth;
      if (imageWidth > 0) {
        const currentIndex = Math.round(scrollPosition / imageWidth) + 1;
        indicator.textContent = `${currentIndex} / ${totalImages}`;
      }
    });
  }
}

// --- 3. RENDER OPTIONS (Colors & Sizes) ---
function renderOptions() {
  // A. COLOURS
  const colorGrid = document.getElementById("pdp-colors");
  const colorLabel = document.getElementById("selected-color-name");
  colorGrid.innerHTML = "";
  colorLabel.textContent = selectedColor.label;

  currentProduct.options.colors.forEach((color) => {
    const btn = document.createElement("div");
    btn.className = `f-color-btn ${color.id === selectedColor.id ? "active" : ""}`;
    btn.style.background = color.hex;
    btn.title = color.label;

    btn.onclick = () => {
      // Update UI State
      document
        .querySelectorAll("#pdp-colors .f-color-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update JS State
      selectedColor = color;
      colorLabel.textContent = color.label;

      // Swap 4K Gallery Images!
      renderGallery(color.id);
    };
    colorGrid.appendChild(btn);
  });

  // B. SIZES
  const sizeGrid = document.getElementById("pdp-sizes");
  sizeGrid.innerHTML = "";

  currentProduct.availableSizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.className = "f-size-btn";
    btn.textContent = size;

    btn.onclick = () => {
      document
        .querySelectorAll("#pdp-sizes .f-size-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = size;
    };
    sizeGrid.appendChild(btn);
  });
}

// --- 4. ACCORDIONS ---
function setupAccordions() {
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach((header) => {
    header.onclick = () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector("i");

      // Toggle open class
      content.classList.toggle("open");

      // Swap icon (Plus to Minus)
      if (content.classList.contains("open")) {
        icon.classList.replace("ph-plus", "ph-minus");
      } else {
        icon.classList.replace("ph-minus", "ph-plus");
      }
    };
  });
}

// --- 5. COMPLETE THE LOOK (Manual IDs) ---
function renderCompleteTheLook() {
  const container = document.getElementById("cross-sell-container");
  const wrapper = document.getElementById("pdp-complete-look");

  if (!currentProduct.crossSell || currentProduct.crossSell.length === 0) {
    wrapper.style.display = "none";
    return;
  }

  container.innerHTML = "";

  currentProduct.crossSell.forEach((id) => {
    const item = products.find((p) => String(p.id) === String(id));
    if (item) {
      // Use first available image
      const img = item.media[item.options.colors[0].id][0];

      const div = document.createElement("div");
      div.classList.add("comp-the-look");
      div.onclick = () => (window.location.href = `pdp.html?id=${item.id}`);

      div.innerHTML = `
              <div class="comp-the-look-img">
                <img src="${img}">
              </div>
                <div style="flex:1;">
                    <h5>${item.name}</h5>
                    <span>₦${item.price.toLocaleString()}</span>
                </div>
            `;
      container.appendChild(div);
    }
  });
}

// --- 6. YOU MAY ALSO LIKE (Algorithmic) ---
function renderYouMayAlsoLike() {
  const container = document.getElementById("ymal-grid");
  if (!container) return;

  // Filter: Same silhouette OR subcategory, exclude current product
  let recommendations = products.filter(
    (p) =>
      p.id !== currentProduct.id &&
      (p.silhouette === currentProduct.silhouette ||
        p.subCategory === currentProduct.subCategory),
  );

  // Limit to 4 items
  recommendations = recommendations.slice(0, 4);

  if (recommendations.length === 0) {
    document.getElementById("ymal-grid").parentElement.style.display = "none";
    return;
  }

  container.innerHTML = recommendations
    .map((p) => generateProductCardHTML(p))
    .join("");
}

// --- 7. RECENTLY VIEWED (LocalStorage) ---
function updateRecentlyViewed(id) {
  let recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");

  // Remove if already exists to push to front
  recent = recent.filter((item) => item !== id);
  recent.unshift(id); // Add to front

  // Keep max 10
  if (recent.length > 10) recent.pop();

  localStorage.setItem("recentProducts", JSON.stringify(recent));
}

function renderRecentlyViewed() {
  const container = document.getElementById("recent-grid");
  if (!container) return;

  const recentIds = JSON.parse(localStorage.getItem("recentProducts") || "[]");

  // Filter out the current product from the recently viewed display
  const idsToDisplay = recentIds
    .filter((id) => id !== String(currentProduct.id))
    .slice(0, 4);

  if (idsToDisplay.length === 0) {
    container.parentElement.style.display = "none";
    return;
  }

  const recentProducts = idsToDisplay
    .map((id) => products.find((p) => String(p.id) === String(id)))
    .filter(Boolean);

  container.innerHTML = recentProducts
    .map((p) => generateProductCardHTML(p))
    .join("");
}

// --- 8. BREADCRUMBS ---
function renderBreadcrumbs() {
  const bc = document.getElementById("pdp-breadcrumbs");
  if (!bc) return;

  const cat = formatTitle(currentProduct.category);
  const sub = formatTitle(currentProduct.subCategory);

  bc.innerHTML = `
        <a href="index.html" style="color:inherit; text-decoration:none;">Home</a> <i class="ph-thin ph-caret-right"></i> 
        <a href="shop.html?category=${currentProduct.category}" style="color:inherit; text-decoration:none;">${cat}</a> <i class="ph-thin ph-caret-right"></i> 
        <a href="shop.html?subCategory=${currentProduct.subCategory}" style="color:inherit; text-decoration:none;">${sub}</a> <i class="ph-thin ph-caret-right"></i> 
        <span style="color:var(--text-primary);">${currentProduct.name}</span>
    `;
}

// --- 9. NEW: INTERACTIONS (Modal & Share) ---
function setupInteractions() {
  // 1. SIZE GUIDE MODAL
  const btnSize = document.getElementById("btn-size-guide");
  const modal = document.getElementById("sg-modal");
  const overlay = document.getElementById("sg-overlay");
  const closeBtn = document.getElementById("sg-close");

  if (btnSize && modal && overlay && closeBtn) {
    const openModal = () => {
      modal.classList.add("active");
      overlay.classList.add("active");
    };
    const closeModal = () => {
      modal.classList.remove("active");
      overlay.classList.remove("active");
    };

    btnSize.onclick = openModal;
    closeBtn.onclick = closeModal;
    overlay.onclick = closeModal;
  }

  // 2. SHARE BUTTONS
  const url = window.location.href;
  const text = currentProduct
    ? `Check out ${currentProduct.name} at MS4L!`
    : "Check this out at MS4L!";

  const shareWa = document.getElementById("share-wa");
  if (shareWa) {
    shareWa.onclick = () => {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
        "_blank",
      );
    };
  }

  const shareX = document.getElementById("share-x");
  if (shareX) {
    shareX.onclick = () => {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    };
  }

  const shareLink = document.getElementById("share-link");
  if (shareLink) {
    shareLink.onclick = () => {
      if (navigator.share) {
        navigator
          .share({ title: "MS4L", text: text, url: url })
          .catch(console.error);
      } else {
        navigator.clipboard.writeText(url).then(() => {
          const feedback = document.getElementById("share-feedback");
          if (feedback) {
            feedback.classList.add("show");
            setTimeout(() => feedback.classList.remove("show"), 2000);
          }
        });
      }
    };
  }
}

// --- UTILS ---
function formatTitle(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Reusable basic card generator for the bottom sliders
function generateProductCardHTML(product) {
  const defaultColor = product.options.colors[0];
  const img = product.media[defaultColor.id]
    ? product.media[defaultColor.id][0]
    : "assets/img/components/MS4L-logo.webp";

  return `
        <div class="pro" onclick="window.location.href='pdp.html?id=${product.id}'" style="cursor:pointer;">
            <div class="pro-img-box">
                <img src="${img}" class="main-img" loading="lazy">
            </div>
            <div class="des">
                <h5>${product.name}</h5>
                <h4>₦${product.price.toLocaleString()}</h4>
            </div>
        </div>
    `;
}
