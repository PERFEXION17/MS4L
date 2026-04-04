// MailerLite Success Logic
export function mailerSuccessMsg() {
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.get("ml-submit") === "success" ||
      urlParams.has("fields[email]")
    ) {
      const msg = document.createElement("p");
      msg.className = "newsletter-success";
      msg.textContent =
        "Thank you! You’re now on the list — check your inbox soon.";

      const form = document.querySelector(".newsletter-form");
      if (form) {
        form.parentNode.insertBefore(msg, form.nextSibling);
        form.style.display = "none";
      }

      history.replaceState(null, "", window.location.pathname);
    }
  });
}

// ==========================================
// PREMIUM SKELETON LOADING SYSTEM
// Elegant shimmer – Lounge-inspired for MS4L
// ==========================================

export function showSkeleton(container, count = 1, type = "product") {
  if (!container) return;
  container.innerHTML = "";

  if (type === "product") {
    const html = Array(count)
      .fill(0)
      .map(
        () => `
      <div class="pro skeleton-card">
        <div class="pro-img-box">
          <div class="skeleton skeleton-image"></div>
        </div>
        <div class="des">
          <div class="skeleton skeleton-line" style="width: 85%;"></div>
          <div class="skeleton skeleton-line-sm" style="width: 55%;"></div>
        </div>
      </div>
    `,
      )
      .join("");
    container.innerHTML = html;
  } else if (type === "pdp") {
    container.innerHTML = `
      <div class="pdp-skeleton">
        <div class="pdp-gallery">
          <div class="skeleton skeleton-image" style="aspect-ratio: 1 / 1; width:100%;"></div>
        </div>
        <div class="pdp-info">
          <div class="skeleton skeleton-line" style="width: 70%; height: 2.8rem;"></div>
          <div class="skeleton skeleton-line" style="width: 40%;"></div>
          <div class="skeleton skeleton-line" style="width: 100%;"></div>
          <div class="skeleton skeleton-line" style="width: 60%;"></div>
        </div>
      </div>
    `;
  } else if (type === "cart-item") {
    const html = Array(count)
      .fill(0)
      .map(
        () => `
      <div class="drawer-item skeleton">
        <div class="drawer-item-img">
          <div class="skeleton skeleton-image" style="width:70px; height:90px;"></div>
        </div>
        <div class="drawer-item-info">
          <div class="skeleton skeleton-line" style="width:75%;"></div>
          <div class="skeleton skeleton-line-sm" style="width:45%;"></div>
        </div>
      </div>
    `,
      )
      .join("");
    container.innerHTML = html;
  }
}

export function hideSkeletonAndShow(container, realHTML) {
  if (!container) return;
  container.innerHTML = realHTML;

  // Smooth fade-in for real content
  container
    .querySelectorAll(".pro, .pdp-main, .summary-item, .drawer-item")
    .forEach((el) => {
      el.classList.add("real-content");
    });
}

// SKELETON LOADER (Legacy alias - kept for backward compatibility)
export function showSkeletonLegacy(container, count = 1, type = "product") {
  showSkeleton(container, count, type);
}

export function hideSkeletonAndShowLegacy(container, realHTML) {
  hideSkeletonAndShow(container, realHTML);
}
