import { products } from "./products.js";

// ===== HIDE PRELOADER =====

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("preloader-hidden");

    preloader.addEventListener("transitionend", () => {
      preloader.remove();
    });
  }
}
window.onload = hidePreloader;

// =====================================================
// 0. GLOBAL UTILITIES
// =====================================================

const formatPrice = (amount) => `₦${Number(amount).toLocaleString()}`;

// =====================================================
// CART: LIVE COUNTER + MINI-CART SYNC
// =====================================================
window.updateCartCounter = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const itemCount = cart.length;

  // Update ALL cart counters instantly (header, mobile, etc.)
  document.querySelectorAll(".cart-counter").forEach(counter => {
    counter.textContent = itemCount;
    counter.style.display = itemCount > 0 ? "flex" : "none";
  });

  // MINI-CART LIVE UPDATE (even if closed)

  const miniCartItems = document.getElementById("mini-cart-items");
  const miniCartSubtotal = document.getElementById("mini-cart-subtotal");
  const miniCartFooter = document.getElementById("mini-cart-footer");
  const miniCartEmpty = document.getElementById("mini-cart-empty");

  if (miniCartItems) {
    miniCartItems.innerHTML = "";
    let total = 0;

    if (itemCount === 0) {
      if (miniCartFooter) miniCartFooter.style.display = "none";
      if (miniCartEmpty) miniCartEmpty.style.display = "block";
    } else {
      if (miniCartFooter) miniCartFooter.style.display = "block";
      if (miniCartEmpty) miniCartEmpty.style.display = "none";

      cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.className = "mini-cart-item";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="mini-cart-item-info">
            <h5>${item.name}</h5>
            <p>Color: ${item.color} | Size: ${item.size} | Qty: ${item.qty}</p>
            <p><strong>${formatPrice(item.price * item.qty)}</strong></p>
          </div>
        `;
        miniCartItems.appendChild(div);
      });

      if (miniCartSubtotal) miniCartSubtotal.textContent = formatPrice(total);
    }
  }
};

// =====================================================
// WISHLIST SYSTEM — FULLY LIVE
// =====================================================

window.toggleWishlist = (productId) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const index = wishlist.indexOf(productId);
  if (index === -1) wishlist.push(productId);
  else wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCounter();
  renderWishlistHearts();
};

window.updateWishlistCounter = () => {
  const count = JSON.parse(localStorage.getItem("wishlist") || "[]").length;
  document
    .querySelectorAll(".wishlist-counter")
    .forEach((el) => (el.textContent = count));
};

function renderWishlistHearts() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const id = parseInt(btn.dataset.id);
    if (wishlist.includes(id)) {
      btn.classList.add("active");
      btn.innerHTML = '<i class="ph-fill ph-heart"></i>';
    } else {
      btn.classList.remove("active");
      btn.innerHTML = '<i class="ph ph-heart"></i>';
    }
  });
}

function showHeartAnimation(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart-float";
  heart.innerHTML = "<i class='ph-fill ph-heart'></i>";
  heart.style.left = x - 30 + "px";
  heart.style.top = y - 30 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

// =====================================================
// DOM READY — INITIALIZE EVERYTHING
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  updateWishlistCounter();
  renderWishlistHearts();

  // Header wishlist button → go to page
  const headerWishlistBtn = document.querySelector(".wishlist-btn-header");
  if (headerWishlistBtn) {
    headerWishlistBtn.addEventListener("click", () => {
      window.location.href = "wishlist.html";
    });
  }

  // All wishlist buttons (product cards, PDP, etc.)
  document.querySelectorAll(".wishlist-btn[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id);
    });
  });
});

// ===== WISHLIST RENDER =====

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("wishlist-items");
  const empty = document.getElementById("empty-wishlist");
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  if (wishlist.length === 0) {
    empty.style.display = "block";
    return;
  }

  wishlist.forEach((id) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;

    const div = document.createElement("div");
    div.className = "tile";
    div.innerHTML = `
          <div class="tile_img">
            <img src="${p.images[0]}" alt="${p.name}" />
          </div>
          <div class="tile_txt">
            <p class="tile_name">${p.name}</p>
            <p class="price">${formatPrice(p.price)}</p>
            <div class="wishlist-buttons">
              <button onclick="addToCartFromWishlist(${p.id})" class="wishlist-bag">
              Move to Bag
              </button>
              <button class="wishlist-remove" data-id="${
                p.id
              }">
                <i class="ph ph-trash-simple"></i>
              </button>
            </div>
          </div>
        `;
    container.appendChild(div);
  });

  renderWishlistHearts();
});

function addToCartFromWishlist(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    alert("Oops! This product is no longer available.");
    return;
  }

  // === REUSE YOUR EXACT ADD-TO-CART LOGIC (same as shop/product page) ===
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Use the same defaults as your shop pages
  const defaultColor = product.colors[0];
  const defaultSize = product.sizeLimits.min || 0; // even sizes already handled

  // Check if same product + color + size already exists
  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.color === defaultColor &&
      item.size === defaultSize
  );

  if (existingItem) {
    // Just increase quantity
    existingItem.qty += 1;
  } else {
    // Add new item
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: defaultColor,
      size: defaultSize,
      qty: 1,
      image: product.images[0],
      sku:
        product.sku ||
        `PROD-${String(product.id).padStart(3, "0")}-${product.name
          .slice(0, 3)
          .toUpperCase()}`,
    });
  }

  // Save cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // === UPDATE UI INSTANTLY ===
  updateCartCounter(); // Live cart counter + mini-cart
  window.triggerCartModal?.(); // Optional: show success modal

  // === REMOVE FROM WISHLIST ===
  toggleWishlist(id); // Removes heart + updates counter

  // === SUCCESS FEEDBACK ===
  // Optional: Create a floating toast (add to your CSS if you want this)
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    z-index: 10000;
    animation: toastUp 0.6s ease;
  `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Then in the function:
  showToast(`${product.name} moved to bag!`);
}

// === GLOBAL MODAL SYSTEM ===

window.triggerCartModal = function () {
  const modal = document.getElementById("cart-modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn("cart-modal not in DOM. Add it to page HTML.");
  }
};

// Auto-bind close button
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("cart-modal");
      if (modal) modal.style.display = "none";
    });
  }
});

// Link Modal
window.triggerLinkModal = function () {
  const modal = document.getElementById("link-modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn("link-modal not in DOM. Add it to page HTML.");
  }
};
// Auto-bind close button
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-link-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("link-modal");
      if (modal) modal.style.display = "none";
    });
  }
});

// Clear Modal
window.triggerClearModal = function () {
  const modal = document.getElementById("clear-modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn("link-modal not in DOM. Add it to page HTML.");
  }
};
// Auto-bind close button
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-clear-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("clear-modal");
      if (modal) modal.style.display = "none";
    });
  }
});

// ===== BACK BUTTON =====

const prevBtn = document.getElementById("previous-btn");
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (
      document.referrer &&
      document.referrer.includes(window.location.origin)
    ) {
      window.history.back();
    } else {
      window.location.href = "women.html";
    }
  });
}

// "ADD TO CART" FROM SHOP PAGE

document.addEventListener("DOMContentLoaded", () => {
  const isShopPage = ["/women.html", "/men.html"].some((path) =>
    window.location.pathname.includes(path)
  );

  if (!isShopPage) return;

  const addToCartButtons = document.querySelectorAll(".add-to-bag[data-id]");

  if (addToCartButtons.length === 0) {
    console.warn("No add-to-cart buttons found. Check [data-id] attributes.");
    return;
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const productId = parseInt(button.dataset.id, 10);
      if (isNaN(productId)) {
        console.error(`Invalid data-id: ${button.dataset.id}`);
        return;
      }

      const product = products.find((p) => p.id === productId);
      if (!product) {
        console.error(`Product ID ${productId} not found.`);
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const defaultColor = product.colors[0];
      const defaultSize = product.sizeLimits.min || 0;

      const existingItem = cart.find(
        (item) =>
          item.id === product.id &&
          item.color === defaultColor &&
          item.size === defaultSize
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          color: defaultColor,
          size: defaultSize,
          qty: 1,
          image: product.images[0],
          sku:
            product.sku ||
            `PROD-${String(product.id).padStart(3, "0")}-${product.category
              .slice(0, 3)
              .toUpperCase()}`,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
      window.triggerCartModal();
    });
  });
});

// =====================================================
// 4. PRODUCT DETAILS PAGE
// =====================================================

const mainImage = document.getElementById("main-image");
const thumbnailsWrapper = document.getElementById("thumbnails-wrapper");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productColor = document.getElementById("product-color");
const sizeChipsContainer = document.getElementById("size-chips");
const sizeRange = document.getElementById("size-range");
const qtyDecrease = document.getElementById("qty-decrease");
const qtyIncrease = document.getElementById("qty-increase");
const qtyValue = document.getElementById("qty-value");
const totalPrice = document.getElementById("total-price");
const addToCartBtn = document.getElementById("add-to-cart");

if (
  mainImage &&
  thumbnailsWrapper &&
  productName &&
  productPrice &&
  productDescription &&
  productColor &&
  sizeChipsContainer &&
  sizeRange &&
  qtyDecrease &&
  qtyIncrease &&
  qtyValue &&
  totalPrice &&
  addToCartBtn
) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);

  if (product) {
    // Basic Info
    productName.textContent = product.name;

    // === DYNAMIC PHOSPHOR STAR RATING ===

    const ratingContainer = document.getElementById("product-rating");
    if (ratingContainer) {
      const rating = product.rating || 0;
      const reviewCount = product.reviewCount || 0;

      const fullStars = Math.floor(rating);
      const hasHalf = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

      let starsHTML = "";
      for (let i = 0; i < fullStars; i++)
        starsHTML += `<i class="ph-fill ph-star"></i>`;
      if (hasHalf) starsHTML += `<i class="ph-fill ph-star-half"></i>`;
      for (let i = 0; i < emptyStars; i++)
        starsHTML += `<i class="ph ph-star"></i>`;

      ratingContainer.innerHTML = `
    <div class="rating-stars">${starsHTML}</div>
    ${
      reviewCount > 0
        ? `<span class="rating-text">(${reviewCount} reviews)</span>`
        : ""
    }
  `;

      if (reviewCount > 0) {
        ratingContainer.style.cursor = "pointer";
        ratingContainer.title = `See all ${reviewCount} reviews`;
      }
    }
    productPrice.textContent = `\u20a6${product.price.toLocaleString()}`;
    productDescription.textContent = product.description;
    mainImage.src = product.images[0];

    // ===============================================
    // 1. ADVANCED GALLERY (4+ Scrollable + Nav + Zoom)
    // ===============================================
    const thumbnailsContainer = document.createElement("div");
    thumbnailsContainer.className = "thumbnails";
    thumbnailsWrapper.appendChild(thumbnailsContainer);

    let currentIndex = 0;
    const thumbsPerPage = 4;

    product.images.forEach((img, i) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.alt = `${product.name} - view ${i + 1}`;
      thumb.className = "thumbnail";
      if (i === 0) thumb.classList.add("active");
      thumb.addEventListener("click", () => {
        mainImage.src = img;
        document
          .querySelectorAll(".thumbnail")
          .forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        currentIndex = i;
        scrollToThumb(i);
      });
      thumbnailsContainer.appendChild(thumb);
    });

    const thumbnails = document.querySelectorAll(".thumbnail");
    const thumbPrev = document.querySelector(".thumb-prev");
    const thumbNext = document.querySelector(".thumb-next");

    function scrollToThumb(index) {
      const total = thumbnails.length;
      if (total <= thumbsPerPage) return;

      let target = index - 2;
      if (target < 0) target = 0;
      if (target > total - thumbsPerPage) target = total - thumbsPerPage;

      thumbnailsContainer.style.transform = `translateY(-${target * 88}px)`;
      updateNavButtons(target);
    }

    function updateNavButtons(scrollIndex) {
      if (thumbPrev) thumbPrev.disabled = scrollIndex === 0;
      if (thumbNext)
        thumbNext.disabled = scrollIndex >= thumbnails.length - thumbsPerPage;
    }

    if (thumbPrev && thumbNext) {
      thumbPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          thumbnails[currentIndex].click();
        }
      });

      thumbNext.addEventListener("click", () => {
        if (currentIndex < thumbnails.length - 1) {
          currentIndex++;
          thumbnails[currentIndex].click();
        }
      });
    }

    if (thumbnails.length > thumbsPerPage) {
      scrollToThumb(0);
    }

    // === IMAGE ZOOM ON HOVER (FIXED) ===

    const mainWrapper = document.querySelector(".main-image-wrapper");
    const lens = document.querySelector(".zoom-lens");

    if (mainWrapper && lens && mainImage) {
      let isZooming = false;

      const moveLens = (e) => {
        if (!isZooming) return;

        const { left, top, width, height } =
          mainWrapper.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        if (x < 0 || y < 0 || x > width || y > height) {
          lens.style.opacity = 0;
          return;
        }

        lens.style.opacity = 1;
        lens.style.left = `${x - 80}px`;
        lens.style.top = `${y - 80}px`;

        const bgX = (x / width) * 100;
        const bgY = (y / height) * 100;
        lens.style.backgroundImage = `url(${mainImage.src})`;
        lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
      };

      mainWrapper.addEventListener("mouseenter", () => {
        isZooming = true;
        lens.style.opacity = 1;
      });

      mainWrapper.addEventListener("mousemove", moveLens);

      mainWrapper.addEventListener("mouseleave", () => {
        isZooming = false;
        lens.style.opacity = 0;
      });

      // Mobile support
      mainWrapper.addEventListener("touchstart", () => (isZooming = true));
      mainWrapper.addEventListener("touchmove", moveLens);
      mainWrapper.addEventListener("touchend", () => {
        isZooming = false;
        lens.style.opacity = 0;
      });
    }

    // ===============================================
    // 2. COLOR PICKER
    // ===============================================

    let selectedColor = product.colors[0];
    productColor.innerHTML = product.colors
      .map(
        (color) => `
        <div class="color-box" style="background-color: ${color}" data-color="${color}"></div>
      `
      )
      .join("");

    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box) => {
      if (box.dataset.color === selectedColor) box.classList.add("selected");
      box.addEventListener("click", () => {
        colorBoxes.forEach((b) => b.classList.remove("selected"));
        box.classList.add("selected");
        selectedColor = box.dataset.color;
      });
    });

    // ===============================================
    // 3. DYNAMIC SIZE CHIPS (FROM products.js)
    // ===============================================

    // === DYNAMIC SIZE CHIPS — EVEN SIZES ONLY (8,10,12,14,16...) ===
    let selectedSizeValue = product.sizeLimits.min;

    if (product.sizeLimits.min === 0 && product.sizeLimits.max === 0) {
      document.querySelector(".size-selector").style.display = "none";
    } else {
      // Clear existing chips
      sizeChipsContainer.innerHTML = "";

      // Generate ONLY EVEN sizes from min to max
      for (
        let size = product.sizeLimits.min;
        size <= product.sizeLimits.max;
        size += 2
      ) {
        const chip = document.createElement("div");
        chip.className = "size-chip";
        chip.textContent = size;
        chip.dataset.size = size;

        // Auto-select first even size
        if (size === product.sizeLimits.min) {
          chip.classList.add("selected");
          selectedSizeValue = size;
        }

        chip.addEventListener("click", () => {
          document
            .querySelectorAll(".size-chip")
            .forEach((c) => c.classList.remove("selected"));
          chip.classList.add("selected");
          selectedSizeValue = size;
          chip.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

        sizeChipsContainer.appendChild(chip);
      }

      // Update range text
      sizeRange.textContent = `Sizes: ${product.sizeLimits.min} – ${product.sizeLimits.max}`;
    }

    // ===============================================
    // 4. CUSTOM QUANTITY BUTTONS (+ / –)
    // ===============================================

    let quantity = 1;

    qtyDecrease.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyValue.textContent = quantity;
        updateTotalPrice();
      }
    });

    qtyIncrease.addEventListener("click", () => {
      quantity++;
      qtyValue.textContent = quantity;
      updateTotalPrice();
    });

    const updateTotalPrice = () => {
      totalPrice.textContent = `\u20a6${(
        product.price * quantity
      ).toLocaleString()}`;
    };
    updateTotalPrice();

    // ===============================================
    // 5. ADD TO CART (Product Page)
    // ===============================================

    addToCartBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find(
        (item) =>
          item.id === product.id &&
          item.color === selectedColor &&
          item.size === selectedSizeValue
      );

      if (existingItem) {
        existingItem.qty += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          color: selectedColor,
          size: selectedSizeValue,
          qty: quantity,
          image: product.images[0],
          sku:
            product.sku ||
            `PROD-${String(product.id).padStart(3, "0")}-${(
              product.name || "ITEM"
            )
              .slice(0, 3)
              .toUpperCase()}`,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
      window.triggerCartModal();
    });

    // ===============================================
    // 6. RELATED PRODUCTS
    // ===============================================

    const relatedSection = document.createElement("section");
    relatedSection.className = "related-products";
    relatedSection.innerHTML = `<h3>You Might Also Like</h3>
    <div class="related-grid" id="related-grid"></div>`;
    document.querySelector(".product-details-con").after(relatedSection);

    const relatedGrid = document.getElementById("related-grid");

    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    related.forEach((p) => {
      const card = document.createElement("div");
      card.className = "related-card";
      card.innerHTML = `
        <img src="${p.images[0]}" alt="${p.name}" />
        <div class="related-details">
          <h4>${p.name}</h4>
          <p>₦${p.price.toLocaleString()}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `prod_details.html?id=${p.id}`;
      });
      relatedGrid.appendChild(card);
    });

    // ===============================================
    // 7. SHARE BUTTONS
    // ===============================================

    const shareContainer = document.createElement("div");
    shareContainer.className = "share-con";
    shareContainer.innerHTML = `
      <p>Share:</p>
      <div class="share-box">
      <button class="share-btn" data-platform="twitter"><i class="ph ph-x-logo"></i></button>
      <button class="share-btn" data-platform="whatsapp"><i class="ph ph-whatsapp-logo"></i></button>
      <button class="share-btn" data-platform="copy"><i class="ph ph-link-simple"></i></button>
      </div>
    `;
    addToCartBtn.after(shareContainer);

    document.querySelectorAll(".share-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`${product.name} - MS4L`);
        let shareUrl = "";

        switch (btn.dataset.platform) {
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
          case "whatsapp":
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
          case "copy":
            navigator.clipboard.writeText(window.location.href);
            triggerLinkModal();
            // alert("Link copied to clipboard!");
            return;
        }
        window.open(shareUrl, "_blank", "width=600,height=400");
      });
    });

    // ===============================================
    // 8. RECENTLY VIEWED
    // ===============================================

    let recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    recentlyViewed = recentlyViewed.filter((id) => id !== product.id);
    recentlyViewed.unshift(product.id);
    if (recentlyViewed.length > 6) recentlyViewed.pop();
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));

    const recentSection = document.createElement("section");
    recentSection.className = "related-products";
    recentSection.innerHTML = `<h3>Recently Viewed</h3>
    <div class="related-grid" id="recent-grid"></div>`;
    relatedSection.after(recentSection);

    const recentGrid = document.getElementById("recent-grid");
    recentlyViewed.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (p && p.id !== product.id) {
        const card = document.createElement("div");
        card.className = "related-card";
        card.innerHTML = `<img src="${p.images[0]}" alt="${p.name}" />
        <h5>${p.name}</h5>`;
        card.onclick = () => (location.href = `prod_details.html?id=${p.id}`);
        recentGrid.appendChild(card);
      }
    });
  }
}

// =====================================================
// 5. BAG PAGE
// =====================================================

const cartItems = document.getElementById("bag-items");
const cartTotal = document.getElementById("bag-total");
const proceedToCheckout = document.getElementById("proceed-to-checkout");
const emptyCart = document.getElementById("empty-cart");
const startShoppingBtn = document.getElementById("start-shopping");
const bagActions = document.getElementById("bag-actions");
const backBtn = document.getElementById("back-btn");
const clearBagBtn = document.getElementById("clear-bag-btn");

if (cartItems && cartTotal && proceedToCheckout && emptyCart) {
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.innerHTML = "";
    let subtotal = 0;

    // === EMPTY STATE ===
    if (cart.length === 0) {
      cartItems.style.display = "none";
      bagActions.style.display = "none";
      if (cartTotal.parentElement)
        cartTotal.parentElement.style.display = "none";
      if (proceedToCheckout) proceedToCheckout.style.display = "none";
      if (emptyCart) emptyCart.style.display = "block";

      // HIDE SUMMARY
      const existingSummary = document.querySelector(".bag-summary-wrapper");
      if (existingSummary) existingSummary.remove();

      updateCartCounter();
      return;
    }

    // === HAS ITEMS ===

    cartItems.style.display = "block";
    if (cartTotal.parentElement)
      cartTotal.parentElement.style.display = "block";
    if (proceedToCheckout) proceedToCheckout.style.display = "block";
    if (emptyCart) emptyCart.style.display = "none";

    cart.forEach((item, index) => {
      if (!item.sku) {
        item.sku = `PROD-${String(item.id).padStart(3, "0")}-${(
          item.name || "ITEM"
        )
          .slice(0, 3)
          .toUpperCase()}`;
      }

      const itemDiv = document.createElement("div");
      itemDiv.className = "bag_con";
      itemDiv.innerHTML = `
      <div class="bag_box">
        <div class="bag-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="bag-details">
          <div class="bag_name_bin">
            <h4>${item.name}</h4>
            <button class="remove-item" data-index="${index}"><i class="ph ph-trash-simple"></i></button>
          </div>
          <div class="color-box" style="background-color: ${item.color}"></div>
          <div class="bag_mini_box">
            <p>Size: ${item.size}</p>
            <div class="qty-picker" data-index="${index}">
              <button class="qty-btn decrease" type="button"><i class="ph ph-minus"></i></button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn increase" type="button"><i class="ph ph-plus"></i></button>
            </div>
            <p class="bag_subtotal">${formatPrice(item.price * item.qty)}</p>
          </div>
        </div>
      </div>
    `;
      cartItems.appendChild(itemDiv);
      subtotal += item.price * item.qty;
    });

    const tax = subtotal * 0;
    const total = subtotal + tax;

    // === MOBILE TOTAL ===
    cartTotal.textContent = formatPrice(total);

    // === PC SUMMARY (DYNAMIC) ===
    let summaryWrapper = document.querySelector(".bag-summary-wrapper");
    if (!summaryWrapper) {
      summaryWrapper = document.createElement("div");
      summaryWrapper.className = "bag-summary-wrapper";
      cartItems.parentElement.appendChild(summaryWrapper);
    }

    summaryWrapper.innerHTML = `
    <div class="bag-summary">
      <h4>Order Summary</h4>
      <div class="summary-line">
        <span>Subtotal</span>
        <span id="summary-subtotal" class="sum_num">${formatPrice(
          subtotal
        )}</span>
      </div>
      <div class="summary-line">
        <span>Tax (0%)</span>
        <span id="summary-tax" class="sum_num">${formatPrice(tax)}</span>
      </div>
      <div class="summary-line total">
        <strong>Total</strong>
        <strong id="summary-total" class="sum_num">${formatPrice(
          total
        )}</strong>
      </div>
      <button id="proceed-to-checkout-summary" class="btn-primary">Proceed to Checkout</button>
    </div>
  `;

    // Bind PC checkout button
    const proceedBtn = summaryWrapper.querySelector(
      "#proceed-to-checkout-summary"
    );
    if (proceedBtn) {
      proceedBtn.onclick = () => (window.location.href = "checkout.html");
    }

    updateCartCounter();
    bindQuantityPickers();
  }

  // === QUANTITY PICKER: RE-BIND ON EVERY REFRESH ===

  function bindQuantityPickers() {
    document.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const picker = btn.closest(".qty-picker");
        if (!picker) return;

        const index = parseInt(picker.dataset.index);
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (index >= cart.length) return;

        const isIncrease = btn.classList.contains("increase");

        if (isIncrease) {
          cart[index].qty += 1;
        } else {
          if (cart[index].qty > 1) {
            cart[index].qty -= 1;
          } else {
            if (confirm("Remove this item?")) {
              cart.splice(index, 1);
            } else {
              return;
            }
          }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCounter();
        displayCart(); // ← FULL REFRESH + RE-BIND
      });
    });
  }

  // === REMOVE ITEM ===

  cartItems.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-item");
    if (removeBtn) {
      const index = parseInt(removeBtn.dataset.index);
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
      displayCart();
    }
  });

  // === BACK & CLEAR BAG ===

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (
        document.referrer &&
        document.referrer.includes(window.location.origin)
      ) {
        window.history.back();
      } else {
        window.location.href = "women.html"; // ← YOUR FALLBACK
      }
    });
  }

  if (clearBagBtn) {
    clearBagBtn.addEventListener("click", () => {
      triggerClearModal();
    });
  }

  const clearBag = document.getElementById("clear-bag-modal");
  clearBag.addEventListener("click", () => {
    localStorage.removeItem("cart");
    const modal = document.getElementById("clear-modal")
    modal.style.display = "none"
    updateCartCounter();
    displayCart();
  });

  if (startShoppingBtn) {
    startShoppingBtn.addEventListener("click", () => {
      window.location.href = "women.html";
    });
  }

  proceedToCheckout.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  displayCart(); // Initial load + bind
}

// CHECKOUT PAGE

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");
const paystackBtn = document.getElementById("paystack-btn");

if (checkoutItems && checkoutTotal && checkoutForm && paystackBtn) {
  function displayCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    checkoutItems.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
      console.warn("Cart is empty on checkout page");
      checkoutItems.innerHTML =
        "<p>Your cart is empty. Add items to proceed.</p>";
      return;
    }

    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "checkout-item";
      itemDiv.innerHTML = `
      <div class="checkout_box">
        <div class="checkout-img">
        <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="checkout_box_details">
          <div>
            <h4>${item.name}</h4>
            <p> Color: ${item.color || "Not Specified"}</p> 
            <p>Size: ${item.size || "Not Specified"}</p> 
            <p>Qty: ${item.qty}</p>
          </div>
          <p class="checkout_price">₦${(
            item.price * item.qty
          ).toLocaleString()}</p>
        </div>  

      </div>
      `;
      checkoutItems.appendChild(itemDiv);
      total += item.price * item.qty;
    });
    checkoutTotal.textContent = `₦${total.toLocaleString()}`;
  }

  displayCheckout();

  //PAYSTACK CHECKOUT

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total =
      cart.reduce((sum, item) => sum + item.price * item.qty, 0) * 100;
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    const handler = PaystackPop.setup({
      key: "pk_live_988acbd343f21914562810ef81e1bb35db912df7",
      email: email,
      amount: total,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "First Name",
            variable_name: "first_name",
            value: firstName,
          },
          {
            display_name: "Last Name",
            variable_name: "last_name",
            value: lastName,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone,
          },
          {
            display_name: "Email Address",
            variable_name: "email_address",
            value: email,
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: address,
          },
          ...cart.flatMap((item, index) => [
            // Dynamically add per-item fields
            {
              display_name: `Item ${index + 1} SKU`,
              variable_name: `item_${index + 1}_sku`,
              value:
                item.sku ||
                `PROD-${item.id.toString().padStart(3, "0")}-${item.name
                  .slice(0, 3)
                  .toUpperCase()}`, // Fallback if no sku
            },
            {
              display_name: `Item ${index + 1} Color`,
              variable_name: `item_${index + 1}_color`,
              value: item.color,
            },
            {
              display_name: `Item ${index + 1} Size`,
              variable_name: `item_${index + 1}_size`,
              value: item.size,
            },
          ]),
        ],
      },
      callback: function (response) {
        localStorage.setItem("orderRef", response.reference);
        localStorage.removeItem("cart");
        window.location.href = "thankyou.html";
      },
      onClose: function () {
        window.triggerCartModal();
      },
    });
    handler.openIframe();
  });
}

// THANK YOU PAGE

const orderRef = document.getElementById("order-ref");
if (orderRef) {
  orderRef.textContent = localStorage.getItem("orderRef") || "N/A";
}

// =====================================================
// 8. MINI-CART DROPDOWN
// =====================================================

const miniCartToggle = document.getElementById("mini-cart-toggle");
const miniCartDropdown = document.getElementById("mini-cart-dropdown");
const miniCartItems = document.getElementById("mini-cart-items");
const miniCartFooter = document.getElementById("mini-cart-footer");
const miniCartEmpty = document.getElementById("mini-cart-empty");
const miniCartSubtotal = document.getElementById("mini-cart-subtotal");
const closeMiniCart = document.getElementById("close-mini-cart");

if (miniCartToggle && miniCartDropdown) {
  let isOpen = false;

  const openMiniCart = () => {
    miniCartDropdown.classList.add("open");
    isOpen = true;
    renderMiniCart();
  };

  const closeMiniCartFn = () => {
    miniCartDropdown.classList.remove("open");
    isOpen = false;
  };

  miniCartToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen ? closeMiniCartFn() : openMiniCart();
  });

  closeMiniCart?.addEventListener("click", closeMiniCartFn);

  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !miniCartDropdown.contains(e.target) &&
      e.target !== miniCartToggle
    ) {
      closeMiniCartFn();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMiniCartFn();
  });

  const renderMiniCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    miniCartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      miniCartFooter.style.display = "none";
      miniCartEmpty.style.display = "block";
    } else {
      miniCartFooter.style.display = "block";
      miniCartEmpty.style.display = "none";

      cart.forEach((item) => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "mini-cart-item";
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="mini-cart-item-info">
            <h5>${item.name}</h5>
            <p>Color: ${item.color} | Size: ${item.size} | Qty: ${item.qty}</p>
            <p class="cart_price"><strong>${formatPrice(
              item.price * item.qty
            )}</strong></p>
          </div>
        `;
        miniCartItems.appendChild(div);
      });

      miniCartSubtotal.textContent = formatPrice(total);
    }
  };

  const originalUpdate = window.updateCartCounter;
  window.updateCartCounter = () => {
    originalUpdate();
    const counter = document.getElementById("mini-cart-counter");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (counter) counter.textContent = cart.length;
    if (isOpen) renderMiniCart();
  };

  window.updateCartCounter();
}

// -----COLLAPSIBLE SECTION-----

document.querySelectorAll(".toggle-button").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const content = document.getElementById(targetId);
    const isActive = content.classList.contains("active");

    document.querySelectorAll(".toggle-content").forEach((otherContent) => {
      otherContent.classList.remove("active");
    });
    document.querySelectorAll(".toggle-button").forEach((otherButton) => {
      otherButton.classList.remove("active");
    });

    if (!isActive) {
      content.classList.add("active");
      button.classList.add("active");
    }
  });
});

// -----DARKMODE-----

const toggleBtn = document.getElementById("btn");
let darkMode = localStorage.getItem("darkmode");

function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "null");
}

if (darkMode === "active") {
  enableDarkMode();
}

toggleBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "active") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

//MENU TOGGLE

const menuToggle = document.getElementById("menu-btn");
const menuList = document.getElementById("menulist");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  menuList.classList.toggle("active");
});

//SEARCH TOGGLE

const searchToggle = document.getElementById("srch");
const filters = document.getElementById("filters");

searchToggle.addEventListener("click", () => {
  filters.classList.toggle("view");
});
