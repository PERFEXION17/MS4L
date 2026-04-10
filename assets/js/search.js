// assets/js/search.js
import { performSearch } from "./filters.js";

export function initSearch() {
  const searchBtn = document.getElementById("search-btn");
  const searchInputContainer = document.getElementById(
    "search-input-container",
  );
  const searchInput = document.getElementById("search-input");
  const searchCloseBtn = document.getElementById("search-close-btn");
  const suggestionsContainer = document.getElementById("search-suggestions");

  // Guard clause - prevent error if elements don't exist on the page
  if (!searchBtn || !searchInputContainer || !searchInput) {
    return;
  }

  // Click icon → show input
  searchBtn.addEventListener("click", () => {
    searchInputContainer.style.display = "flex";
    searchInput.focus();
  });

  // Close button
  searchCloseBtn.addEventListener("click", () => {
    // searchInput.value = "";
    // performSearch("");
    searchInputContainer.style.display = "none";
    searchBtn.style.display = "block";
  });

  // Real-time search with debounce
  let timeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 1000);
  });

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchInputContainer.style.display !== "none") {
      searchCloseBtn.click();
    }
  });
}
