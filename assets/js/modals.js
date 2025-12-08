// =====================================================
// GLOBAL MODAL SYSTEM
// =====================================================

// CART MODAL
export function triggerCartModal() {
  const modal = document.getElementById("cart-modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn("cart-modal not in DOM. Add it to page HTML.");
  }
  setTimeout(() => modal.style.display = "none", 3000)
}

// LINK MODAL
export function triggerLinkModal() {
  const modal = document.getElementById("link-modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn("link-modal not in DOM. Add it to page HTML.");
  }
  setTimeout(() => (modal.style.display = "none"), 3000);
}

// CLEAR MODAL
export function triggerClearModal() {
  const modal = document.getElementById("clear-modal");
  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn("link-modal not in DOM. Add it to page HTML.");
  }
}

// CLOSE ALL MODALS

export function setupModalClosers() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
  // Escape key for all modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none";
      });
    }
  });
}