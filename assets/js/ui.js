// =====================================================
// COLLAPSIBLE SECTION
// =====================================================

export function setupCollapsibleSections() {
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
}

// =====================================================
// SEARCH TOGGLE
// =====================================================

export function setupSearchToggle() {
  const searchToggle = document.getElementById("srch");
  const filters = document.getElementById("filters");

  if (!searchToggle) {
    return;
  }

  searchToggle.addEventListener("click", () => {
    filters.classList.toggle("view");
  });
}

// =====================================================
// BACK BUTTON
// ===========================================

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

// ==========
// HYBRID MENU
// ==========

export function setupMenuToggle() {
  const header = document.querySelector("header");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu-btn");
  const menuList = document.getElementById("menulist");
  const body = document.body;
  let lastScrollTop = 0;
  let scrollTimeout;

  // 1. Hybrid Scroll Logic
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < 50) {
        header.classList.remove("nav-hidden");
        lastScrollTop = scrollTop;
        return;
      }

      if (scrollTop > lastScrollTop) {
        header.classList.add("nav-hidden");
        clearTimeout(scrollTimeout);
      } else {
        header.classList.remove("nav-hidden");
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (window.pageYOffset > 50) {
            header.classList.add("nav-hidden");
          }
        }, 3000);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    { passive: true },
  );

  // 2. Menu Open/Close Logic
  const openMenu = () => {
    if (menuList) {
      menuList.classList.add("active");
      body.style.overflow = "hidden";
    }
  };

  const closeMenu = () => {
    if (menuList) {
      menuList.classList.remove("active");
      body.style.overflow = "";
    }
  };

  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // 3. Accordion Logic (Mobile Dropdowns)
  const dropdownHeaders = document.querySelectorAll(".dropdown-header");
  dropdownHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const icon = header.querySelector("i");

      // Close others
      document.querySelectorAll(".mobile-dropdown.active").forEach((item) => {
        if (item !== parent) {
          item.classList.remove("active");
          const otherIcon = item.querySelector(".dropdown-header i");
          if (otherIcon) otherIcon.classList.replace("ph-minus", "ph-plus");
        }
      });

      parent.classList.toggle("active");
      if (parent.classList.contains("active")) {
        icon.classList.replace("ph-plus", "ph-minus");
      } else {
        icon.classList.replace("ph-minus", "ph-plus");
      }
    });
  });
}
