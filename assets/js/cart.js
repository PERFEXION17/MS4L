import { formatPrice } from "./utils.js";
import { triggerClearModal } from "./modals.js";

let cartItemsContainer = null;

// ONE-TIME EVENT DELEGATION — attached once, never duplicated
document.addEventListener("DOMContentLoaded", () => {
  cartItemsContainer = document.getElementById("bag-items");
  if (!cartItemsContainer) return;

  // + / − QUANTITY BUTTONS
  cartItemsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;

    const picker = btn.closest(".qty-picker");
    if (!picker?.dataset.index) return;

    const index = parseInt(picker.dataset.index);
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (btn.classList.contains("increase") || btn.classList.contains("plus")) {
      cart[index].qty += 1;
    } else if (
      btn.classList.contains("decrease") ||
      btn.classList.contains("minus")
    ) {
      if (cart[index].qty > 1) {
        cart[index].qty -= 1;
      } else {
        if (!confirm("Remove this item from bag?")) return;
        cart.splice(index, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    displayCart();
  });

  // REMOVE ITEM BUTTON
  cartItemsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-item");
    if (!btn?.dataset.index) return;

    const index = parseInt(btn.dataset.index);
    if (!confirm("Remove this item?")) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    displayCart();
  });
});

// UPDATE COUNTER + MINI-CART
export function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const count = cart.length;

  document.querySelectorAll(".cart-counter").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });

  const miniItems = document.getElementById("mini-cart-items");
  const miniSubtotal = document.getElementById("mini-cart-subtotal");
  const miniFooter = document.getElementById("mini-cart-footer");
  const miniEmpty = document.getElementById("mini-cart-empty");

  if (!miniItems) return;

  miniItems.innerHTML = "";
  let total = 0;

  if (count === 0) {
    miniFooter && (miniFooter.style.display = "none");
    miniEmpty && (miniEmpty.style.display = "block");
  } else {
    miniFooter && (miniFooter.style.display = "");
    miniEmpty && (miniEmpty.style.display = "none");

    cart.forEach((item) => {
      total += item.price * item.qty;
      const div = document.createElement("div");
      div.className = "mini-cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="mini-cart-item-info">
          <h5>${item.name}</h5>
          <p>Color: ${item.color} | Size: ${item.size} | Qty: ${item.qty}</p>
          <p><strong>${formatPrice(item.price * item.qty)}</strong></p>
        </div>
      `;
      miniItems.appendChild(div);
    });

    miniSubtotal && (miniSubtotal.textContent = formatPrice(total));
  }
}

// MAIN BAG PAGE RENDER + ALL BUTTONS FIXED
export function displayCart() {
  const cartItems = document.getElementById("bag-items");
  const cartTotal = document.getElementById("bag-total");
  const emptyCart = document.getElementById("empty-cart");
  const bagActions = document.getElementById("bag-actions");
  const backBtn =
    document.getElementById("previous-btn") ||
    document.getElementById("back-btn");
  const clearBagBtn = document.getElementById("clear-bag-btn");
  const proceedBtn = document.getElementById("proceed-to-checkout");
  const startShopping = document.getElementById("start-shopping");

  if (!cartItems || !cartTotal || !emptyCart) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cartItems.innerHTML = "";
  let subtotal = 0;

  // EMPTY STATE
  if (cart.length === 0) {
    emptyCart.style.display = "block";
    bagActions && (bagActions.style.display = "none");
    proceedBtn && (proceedBtn.style.display = "none");
    document.querySelector(".bag-total").style.display = "none";
    cartTotal.textContent = formatPrice(0);
    removeSummary();
    updateCartCounter();
    return;
  }

  // HAS ITEMS
  emptyCart.style.display = "none";
  bagActions && (bagActions.style.display = "flex");
  proceedBtn && (proceedBtn.style.display = "block");

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "bag_con";
    div.innerHTML = `
      <div class="bag_box">
        <div class="bag-img"><img src="${item.image}" alt="${
      item.name
    }" /></div>
        <div class="bag-details">
          <div class="bag_name_bin">
            <h4>${item.name}</h4>
            <button class="remove-item" data-index="${index}">
              <i class="ph ph-trash-simple"></i>
            </button>
          </div>
          <div class="color-box" style="background-color: ${item.color}"></div>
          <div class="bag_mini_box">
            <p>Size: ${item.size}</p>
            <div class="qty-picker" data-index="${index}">
              <button class="qty-btn decrease" type="button">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn increase" type="button">+</button>
            </div>
            <p class="bag_subtotal">${formatPrice(item.price * item.qty)}</p>
          </div>
        </div>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = formatPrice(subtotal);

  // ORDER SUMMARY (DESKTOP) — NOW WORKS
  renderOrderSummary(subtotal);

  // BACK BUTTON
  if (backBtn) {
    backBtn.onclick = () => window.history.back();
  }

  // CLEAR BAG BUTTON
  if (clearBagBtn) {
    clearBagBtn.onclick = () => {
      triggerClearModal();
    };
    const clearBagYes = document.getElementById("clear-bag-modal");
    const clearBagNo = document.getElementById("close-clear-modal");
    const clearModal = document.getElementById("clear-modal");

    clearBagYes.onclick = () => {
      localStorage.removeItem("cart");
      updateCartCounter();
      displayCart();
      clearModal.remove();
    };

    clearBagNo.onclick = () => {
      clearModal.style.display = "none";
    };
  }

  // PROCEED TO CHECKOUT (MAIN BUTTON)
  if (proceedBtn) {
    proceedBtn.onclick = () => (window.location.href = "checkout.html");
  }

  // START SHOPPING (EMPTY STATE)
  if (startShopping) {
    startShopping.onclick = () => (window.location.href = "women.html");
  }

  updateCartCounter();
}

// CHECKOUT PAGE
export function displayCheckout() {
  const items = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  if (!items || !totalEl) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  items.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    items.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <div class="checkout_box">
        <div class="checkout-img">
        <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="checkout_box_details">
          <div>
            <h4>${item.name}</h4>
            <p> Color: ${item.color || "Not Specified"}</p> 
            <p>Size: ${item.size || "Not Specified"}</p> 
            <p>Qty: ${item.qty}</p>
          </div>
          <p class="checkout_price">₦${(
            item.price * item.qty
          ).toLocaleString()}</p>
        </div>  
      </div>
    `;
    items.appendChild(div);
  });

  totalEl.textContent = `₦${total.toLocaleString()}`;
}

// THANK YOU PAGE
export function setupThankYouPage() {
  const ref = document.getElementById("order-ref");
  if (ref) ref.textContent = localStorage.getItem("orderRef") || "N/A";
}

// HELPER: ORDER SUMMARY (DESKTOP)
function renderOrderSummary(subtotal) {
  const cartItems = document.getElementById("bag-items");
  let wrapper = document.querySelector(".bag-summary-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "bag-summary-wrapper";
    document.querySelector(".bag-items-wrapper")?.appendChild(wrapper) ||
      // document.body.appendChild(wrapper);
      cartItems.parentElement.appendChild(wrapper);
  }

  wrapper.innerHTML = `
    <div class="bag-summary">
      <h4>Order Summary</h4>
      <div class="summary-line"><span>Subtotal</span><span>${formatPrice(
        subtotal
      )}</span></div>
      <div class="summary-line"><span>Tax (0%)</span><span>${formatPrice(
        0
      )}</span></div>
      <div class="summary-line total"><strong>Total</strong><strong>${formatPrice(
        subtotal
      )}</strong></div>
      <button id="proceed-to-checkout-summary" class="btn-primary">Proceed to Checkout</button>
    </div>
  `;

  // This is the key fix
  wrapper
    .querySelector("#proceed-to-checkout-summary")
    ?.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
}

function removeSummary() {
  document.querySelector(".bag-summary-wrapper")?.remove();
}

// PAYSTACK INTEGRATION — ADD THIS TO THE END OF cart.js

export function initPaystackCheckout() {
  const form = document.getElementById("checkout-form");
  const payBtn = document.getElementById("paystack-btn");
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");

  if (!form || !payBtn) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      alert("Your bag is empty!");
      return;
    }

    const totalAmount =
      cart.reduce((sum, item) => sum + item.price * item.qty, 0) * 100; // in kobo
    const email = document.getElementById("email").value.trim();

    const handler = PaystackPop.setup({
      key: "pk_live_988acbd343f21914562810ef81e1bb35db912df7", // ← your live key
      email: email,
      amount: totalAmount,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "First Name",
            variable_name: "first_name",
            value: firstName,
          },
          {
            display_name: "Last Name",
            variable_name: "last_name",
            value: lastName,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone,
          },
          {
            display_name: "Email Address",
            variable_name: "email_address",
            value: email,
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: address,
          },
          ...cart.flatMap((item, index) => [
            // Dynamically add per-item fields
            {
              display_name: `Item ${index + 1} SKU`,
              variable_name: `item_${index + 1}_sku`,
              value:
                item.sku ||
                `PROD-${item.id.toString().padStart(3, "0")}-${item.name
                  .slice(0, 3)
                  .toUpperCase()}`, // Fallback if no sku
            },
            {
              display_name: `Item ${index + 1} Color`,
              variable_name: `item_${index + 1}_color`,
              value: item.color,
            },
            {
              display_name: `Item ${index + 1} Size`,
              variable_name: `item_${index + 1}_size`,
              value: item.size,
            },
          ]),
        ],
      },
      callback: function (response) {
        localStorage.setItem("orderRef", response.reference);
        localStorage.removeItem("cart");
        window.location.href = "thankyou.html";
      },
      onClose: function () {
        // optional: show modal again
        const modal = document.getElementById("cart-modal");
        if (modal) modal.style.display = "flex";
      },
    });
    handler.openIframe();
  });
}
