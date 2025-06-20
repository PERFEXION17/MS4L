const menu = document.getElementById("menu");
const toggleButton = document.getElementById("menu-toggle");

toggleButton.addEventListener("click", function (e) {
  e.stopPropagation();
  menu.classList.toggle("active");
  toggleButton.classList.toggle("ri-grid-fill");
  toggleButton.classList.toggle("ri-close-line");
});

// Close menu on outside click and reset icon
document.addEventListener("click", function (e) {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnToggle = toggleButton.contains(e.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    menu.classList.remove("active");
    toggleButton.classList.remove("ri-close-line");
    toggleButton.classList.add("ri-grid-fill");
  }
});
