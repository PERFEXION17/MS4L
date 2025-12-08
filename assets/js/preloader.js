export function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("preloader-hidden");
    preloader.addEventListener("transitionend", () => {
      preloader.remove();
    });
  }
}
