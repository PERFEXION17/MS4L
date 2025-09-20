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