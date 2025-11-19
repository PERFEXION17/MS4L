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

export { updateCartCounter }

//QTY SELECTOR

document.addEventListener("DOMContentLoaded", () => {
  const picker = document.querySelector(".qty-picker");
  if (!picker) return;

  const input = picker.querySelector(".qty-input");
  const minusBtn = picker.querySelector(".minus-btn");
  const plusBtn = picker.querySelector(".plus-btn");

  // Function to update the disabled state of the minus button
  const updateButtons = (currentValue) => {
    minusBtn.disabled = currentValue <= parseInt(input.min);
    plusBtn.disabled = currentValue >= parseInt(input.max);
  };

  // Initial check when the page loads
  updateButtons(parseInt(input.value));

  picker.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;

    let currentValue = parseInt(input.value);
    const type = btn.dataset.type;
    const minVal = parseInt(input.min) || 1;
    const maxVal = parseInt(input.max) || 99;

    if (type === "minus" && currentValue > minVal) {
      currentValue--;
    } else if (type === "plus" && currentValue < maxVal) {
      currentValue++;
    }

    // Update input and button state
    input.value = currentValue;
    updateButtons(currentValue);
  });
});