import { products } from "./products.js";
// import { formatPrice } from "./utils.js";
import { updateCartCounter } from "./cart.js";
import { triggerCartModal } from "./modals.js";
// import { toggleWishlist } from "./wishlist.js";

export function initProductDetailPage() {
  {
    const elements = {
      mainImage: document.getElementById("main-image"),
      thumbnailsWrapper: document.getElementById("thumbnails-wrapper"),
      productName: document.getElementById("product-name"),
      productPrice: document.getElementById("product-price"),
      productDescription: document.getElementById("product-description"),
      productColor: document.getElementById("product-color"),
      sizeChipsContainer: document.getElementById("size-chips"),
      sizeRange: document.getElementById("size-range"),
      qtyDecrease: document.getElementById("qty-decrease"),
      qtyIncrease: document.getElementById("qty-increase"),
      qtyValue: document.getElementById("qty-value"),
      totalPrice: document.getElementById("total-price"),
      addToCartBtn: document.getElementById("add-to-cart"),
      ratingContainer: document.getElementById("product-rating"),
      mainWrapper: document.querySelector(".main-image-wrapper"),
      lens: document.querySelector(".zoom-lens"),
      thumbPrev: document.querySelector(".thumb-prev"),
      thumbNext: document.querySelector(".thumb-next"),
    };

    // Guard clause: if not on PDP, exit silently
    if (!elements.mainImage || !elements.addToCartBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    // === 1. BASIC PRODUCT INFO ===

    elements.productName.textContent = product.name;
    elements.productPrice.textContent = `₦${product.price.toLocaleString()}`;
    elements.productDescription.textContent = product.description;
    elements.mainImage.src = product.images[0];

    // === 2. DYNAMIC STAR RATING ===

    if (elements.ratingContainer) {
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

      elements.ratingContainer.innerHTML = `
      <div class="rating-stars">${starsHTML}</div>
      ${
        reviewCount > 0
          ? `<span class="rating-text">(${reviewCount} reviews)</span>`
          : ""
      }
    `;

      if (reviewCount > 0) {
        elements.ratingContainer.style.cursor = "pointer";
        elements.ratingContainer.title = `See all ${reviewCount} reviews`;
      }
    }

    // === 3. ADVANCED GALLERY (Scrollable Thumbnails + Nav + Zoom) ===

    const thumbnailsContainer = document.createElement("div");
    thumbnailsContainer.className = "thumbnails";
    elements.thumbnailsWrapper.appendChild(thumbnailsContainer);

    let currentIndex = 0;
    const thumbsPerPage = 4;

    product.images.forEach((img, i) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.alt = `${product.name} - view ${i + 1}`;
      thumb.className = "thumbnail";
      if (i === 0) thumb.classList.add("active");

      thumb.addEventListener("click", () => {
        elements.mainImage.src = img;
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

    function scrollToThumb(index) {
      if (thumbnails.length <= thumbsPerPage) return;
      let target = index - 2;
      if (target < 0) target = 0;
      if (target > thumbnails.length - thumbsPerPage)
        target = thumbnails.length - thumbsPerPage;
      thumbnailsContainer.style.transform = `translateY(-${target * 88}px)`;
      updateNavButtons();
    }

    function updateNavButtons() {
      if (elements.thumbPrev) elements.thumbPrev.disabled = currentIndex <= 2;
      if (elements.thumbNext)
        elements.thumbNext.disabled = currentIndex >= thumbnails.length - 3;
    }

    if (elements.thumbPrev && elements.thumbNext) {
      elements.thumbPrev.addEventListener("click", () => {
        if (currentIndex > 0) thumbnails[--currentIndex].click();
      });

      elements.thumbNext.addEventListener("click", () => {
        if (currentIndex < thumbnails.length - 1)
          thumbnails[++currentIndex].click();
      });
    }

    if (thumbnails.length > thumbsPerPage) scrollToThumb(0);

    // === 4. IMAGE ZOOM ON HOVER (Desktop + Mobile) ===

    if (elements.mainWrapper && elements.lens) {
      let isZooming = false;

      const moveLens = (e) => {
        if (!isZooming) return;
        const rect = elements.mainWrapper.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
          elements.lens.style.opacity = 0;
          return;
        }

        elements.lens.style.opacity = 1;
        elements.lens.style.left = `${x - 80}px`;
        elements.lens.style.top = `${y - 80}px`;

        const bgX = (x / rect.width) * 100;
        const bgY = (y / rect.height) * 100;
        elements.lens.style.backgroundImage = `url(${elements.mainImage.src})`;
        elements.lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
      };

      const enableZoom = () => {
        isZooming = true;
        elements.lens.style.opacity = 1;
      };
      const disableZoom = () => {
        isZooming = false;
        elements.lens.style.opacity = 0;
      };

      elements.mainWrapper.addEventListener("mouseenter", enableZoom);
      elements.mainWrapper.addEventListener("mousemove", moveLens);
      elements.mainWrapper.addEventListener("mouseleave", disableZoom);

      elements.mainWrapper.addEventListener("touchstart", enableZoom);
      elements.mainWrapper.addEventListener("touchmove", moveLens);
      elements.mainWrapper.addEventListener("touchend", disableZoom);
    }

    // === 5. COLOR PICKER ===

    let selectedColor = product.colors[0];
    elements.productColor.innerHTML = product.colors
      .map(
        (color) => `
      <div class="color-box" style="background-color: ${color}" data-color="${color}"></div>
    `
      )
      .join("");

    document.querySelectorAll(".color-box").forEach((box) => {
      if (box.dataset.color === selectedColor) box.classList.add("selected");
      box.addEventListener("click", () => {
        document
          .querySelectorAll(".color-box")
          .forEach((b) => b.classList.remove("selected"));
        box.classList.add("selected");
        selectedColor = box.dataset.color;
      });
    });

    // === 6. DYNAMIC SIZE CHIPS (Even sizes only) ===
    let selectedSizeValue = product.sizeLimits.min;

    if (product.sizeLimits.min === 0 && product.sizeLimits.max === 0) {
      document.querySelector(".size-selector").style.display = "none";
    } else {
      elements.sizeChipsContainer.innerHTML = "";
      elements.sizeRange.textContent = `Sizes: ${product.sizeLimits.min} - ${product.sizeLimits.max}`;

      for (
        let size = product.sizeLimits.min;
        size <= product.sizeLimits.max;
        size += 2
      ) {
        const chip = document.createElement("div");
        chip.className = "size-chip";
        chip.textContent = size;
        chip.dataset.size = size;

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

        elements.sizeChipsContainer.appendChild(chip);
      }
    }

    // === 7. QUANTITY CONTROLS & TOTAL PRICE ===

    let quantity = 1;
    elements.qtyValue.textContent = quantity;

    elements.qtyDecrease.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        elements.qtyValue.textContent = quantity;
        elements.totalPrice.textContent = `₦${(
          product.price * quantity
        ).toLocaleString()}`;
      }
    });

    elements.qtyIncrease.addEventListener("click", () => {
      quantity++;
      elements.qtyValue.textContent = quantity;
      elements.totalPrice.textContent = `₦${(
        product.price * quantity
      ).toLocaleString()}`;
    });

    elements.totalPrice.textContent = `₦${product.price.toLocaleString()}`;

    // === 8. ADD TO CART ===

    elements.addToCartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

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
            `PROD-${String(product.id).padStart(3, "0")}-${product.name
              .slice(0, 3)
              .toUpperCase()}`,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
      triggerCartModal();

      showToast(`${quantity}  ${product.name} added to bag!`);
    });

    // === 9. RELATED PRODUCTS ===

    const relatedSection = document.createElement("section");
    relatedSection.className = "related-products";
    relatedSection.innerHTML = `<h3>You Might Also Like</h3>
    <div class="related-grid" id="related-grid"></div>`;
    document.querySelector(".product-details-con").after(relatedSection);

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
      document.getElementById("related-grid").appendChild(card);
    });

    // === 10. SHARE BUTTONS ===

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
    elements.addToCartBtn.after(shareContainer);

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
            showToast("Link copied!");
            return;
        }
        window.open(shareUrl, "_blank", "width=600,height=400");
      });
    });

    // === 11. RECENTLY VIEWED ===

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

    recentlyViewed.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (p && p.id !== product.id) {
        const card = document.createElement("div");
        card.className = "related-card";
        card.innerHTML = `<img src="${p.images[0]}" alt="${p.name}" /><h5>${p.name}</h5>`;
        card.onclick = () => (location.href = `prod_details.html?id=${p.id}`);
        document.getElementById("recent-grid").appendChild(card);
      }
    });
  }

  // Reusable toast (you can also move this to utils.js later)
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
    position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
    background:var(--glass); color:var(--text); padding:1rem 2rem; border-radius:var(--border-radius); border: var(--border);
    font-weight:600; z-index:10000; animation:toastUp .6s ease;
  `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}
