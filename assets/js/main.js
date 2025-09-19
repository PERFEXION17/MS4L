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

// -----ACCRORDION-----

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".agenda-header").forEach((button) => {
//     button.addEventListener("click", () => {
//       const item = button.parentElement;
//       const content = item.querySelector(".agenda-content");
//       const symbol = item.querySelector(".symbol");

//       const isOpen = item.classList.contains("active");

//       // Close all items
//       document.querySelectorAll(".agenda-item").forEach((i) => {
//         i.classList.remove("active");
//         const inner = i.querySelector(".agenda-content");
//         inner.style.maxHeight = null;
//         i.querySelector(".symbol").textContent = "+";
//       });

//       if (!isOpen) {
//         // Open this one
//         item.classList.add("active");
//         content.style.maxHeight = content.scrollHeight + "px";
//         symbol.textContent = "–";
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".agenda-header").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const content = item.querySelector(".agenda-content");
      const symbol = item.querySelector(".symbol");

      const isOpen = item.classList.contains("active");

      // Close all items
      document.querySelectorAll(".agenda-item").forEach((i) => {
        i.classList.remove("active");
        const inner = i.querySelector(".agenda-content");
        inner.style.maxHeight = null;
        i.querySelector(".symbol").textContent = "+";
      });

      if (!isOpen) {
        // Open this one
        item.classList.add("active");

        // Force reflow so padding applies before measuring height
        content.style.maxHeight = "none";
        const fullHeight = content.scrollHeight;

        // Reset to 0, then transition to full height
        content.style.maxHeight = "0px";
        setTimeout(() => {
          content.style.maxHeight = fullHeight + "px";
        }, 10);

        symbol.textContent = "–";
      }
    });
  });
});

