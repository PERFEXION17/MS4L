function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalItems = cart.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const cartLink = document.querySelector('nav a[href="cart.html"]');
  if (cartLink) {
    cartLink.textContent = `Cart (${totalItems})`;
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCounter);
