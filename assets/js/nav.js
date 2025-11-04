function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalItems = cart.reduce((sum, item) => sum + parseInt(item.qty), 0);
  const cartNoSpans = document.querySelectorAll(".cart_no");
  if (cartNoSpans) {
    cartNoSpans.forEach((span) => {
      span.textContent = totalItems;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    updateCartCounter();
  } catch (e) {
    console.error("Error updating cart counter:", e);
  }
});

export {updateCartCounter}
