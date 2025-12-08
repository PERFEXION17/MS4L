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
// DARKMODE
// =====================================================

export function setupDarkMode() {
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
}

// =====================================================
// MENU TOGGLE
// =====================================================

export function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-btn");
  const menuList = document.getElementById("menulist");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    menuList.classList.toggle("active");
  });
}

// =====================================================
// SEARCH TOGGLE
// =====================================================

export function setupSearchToggle() {
  const searchToggle = document.getElementById("srch");
  const filters = document.getElementById("filters");

  if(!searchToggle){
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
