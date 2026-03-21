// assets/js/checkout.js
import { cart } from "./cart.js"; // we only need cart here now

// ────────────────────────────────────────────────
// Global loading helpers (reusable site-wide)
// ────────────────────────────────────────────────
window.showLoading = () => {
  const overlay = document.getElementById("global-loading");
  if (overlay) overlay.style.display = "flex";
};

window.hideLoading = () => {
  const overlay = document.getElementById("global-loading");
  if (overlay) overlay.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  // ────────────────────────────────────────────────
  // DOM References
  // ────────────────────────────────────────────────
  const checkoutContent = document.getElementById("checkout-content");
  const emptyState = document.getElementById("empty-checkout");
  const payBtn = document.getElementById("paystack-btn");
  const mobilePayBtn = document.getElementById("mobile-pay-btn");
  const totalDisplay = document.getElementById("total-display");
  const mobileTotalDisplay = document.getElementById("mobile-total");
  const grandTotalEl = document.getElementById("grand-total");
  const subtotalEl = document.getElementById("subtotal");
  const deliveryFeeEl = document.getElementById("delivery-fee-display");
  const itemsList = document.getElementById("cart-items-list");
  const form = document.getElementById("checkout-form");
  const stateSelect = document.getElementById("state");
  const summaryHeaderTally = document.getElementById("order-summary-tally");

  const requiredFields = document.querySelectorAll("#checkout-form [required]");

  // ────────────────────────────────────────────────
  // 1. Empty cart guard
  // ────────────────────────────────────────────────
  if (!cart || cart.length === 0) {
    emptyState.style.display = "flex";
    checkoutContent.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  checkoutContent.style.display = "grid";

  // ────────────────────────────────────────────────
  // Nigerian states + delivery fees (placeholders – tune later)
  // ────────────────────────────────────────────────
  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const deliveryFees = {
    Lagos: 2500,
    FCT: 3500,
    Rivers: 4000,
    Oyo: 3800,
    Kano: 4500,
    Kaduna: 4200,
    Abuja: 3500,
    Plateau: 1000,
    default: 5000,
  };

  states.forEach((state) => {
    const opt = document.createElement("option");
    opt.value = state;
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });

  // ────────────────────────────────────────────────
  // 2. Render cart items + update totals (incl. delivery)
  // ────────────────────────────────────────────────
  function updateTotals() {
    const selectedState = stateSelect?.value || "";
    const deliveryFee = deliveryFees[selectedState] || deliveryFees.default;

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const grandTotal = subtotal + deliveryFee;

    const format = (n) => n.toLocaleString();

    subtotalEl.textContent = format(subtotal);
    if (deliveryFeeEl) deliveryFeeEl.textContent = format(deliveryFee);
    grandTotalEl.textContent = format(grandTotal);
    totalDisplay.textContent = format(grandTotal);
    if (mobileTotalDisplay) mobileTotalDisplay.textContent = format(grandTotal);

    summaryHeaderTally.textContent = format(grandTotal);

    // Sync mobile pay button state
    if (mobilePayBtn) mobilePayBtn.disabled = payBtn.disabled;

    return grandTotal; // numeric value for Paystack
  }

  function renderSummary() {
    itemsList.innerHTML = "";

    cart.forEach((item) => {
      const div = document.createElement("div");
      div.className = "summary-item";
      div.innerHTML = `
        <div class="item-preview">
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="60" height="80"/>
        </div>
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.colorLabel || "Default"} • Size ${item.size || "—"}</p>
          <p>Qty: ${item.quantity} × ₦${item.price.toLocaleString()}</p>
        </div>
        <div class="item-price">
          ₦${(item.price * item.quantity).toLocaleString()}
        </div>
      `;
      itemsList.appendChild(div);
    });

    updateTotals();
  }

  renderSummary();
  stateSelect.addEventListener("change", updateTotals);

  // ────────────────────────────────────────────────
  // 3. Form validation + inline error messages
  // ────────────────────────────────────────────────
  function validateField(field) {
    const errorEl = document.getElementById(`${field.id}-error`);
    if (!errorEl) return;

    errorEl.textContent = "";

    if (field.validity.valueMissing) {
      errorEl.textContent = "This field is required";
    } else if (field.validity.typeMismatch) {
      errorEl.textContent = `Please enter a valid ${field.type}`;
    } else if (field.id === "phone" && field.validity.patternMismatch) {
      errorEl.textContent =
        "Please enter a valid Nigerian phone number (e.g. 08012345678)";
    }
  }

  // Replace your checkFormValidity with:
  function checkFormValidity() {
    const allValid = Array.from(requiredFields).every((f) => f.checkValidity());

    payBtn.disabled = !allValid;
    payBtn.classList.toggle("active", allValid); // ← this line was missing

    if (mobilePayBtn) {
      mobilePayBtn.disabled = !allValid;
      mobilePayBtn.classList.toggle("active", allValid);
    }
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field);
      checkFormValidity();
    });
    field.addEventListener("blur", () => validateField(field));
  });

  checkFormValidity();

  // ────────────────────────────────────────────────
  // 4. Paystack submission with loading overlay
  // ────────────────────────────────────────────────
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Final validation round
    let valid = true;
    requiredFields.forEach((field) => {
      validateField(field);
      if (!field.checkValidity()) valid = false;
    });

    if (!valid) {
      document.querySelector(".error-message:not(:empty)")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    showLoading();

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const address = document.getElementById("address").value.trim();
    const address2 = document.getElementById("address2")?.value.trim() || "";
    const state = stateSelect.value;
    const lga = document.getElementById("lga").value.trim();

    const fullAddress = `${address}${address2 ? ", " + address2 : ""}, ${lga}, ${state}`;

    const amountInKobo = updateTotals() * 100; // latest grand total

    const handler = PaystackPop.setup({
      key: "pk_test_d20590ef86fe4669a36f97288826af15ca69c90b",
      email,
      amount: amountInKobo,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "First Name",
            variable_name: "first_name",
            value: firstname,
          },
          {
            display_name: "Last Name",
            variable_name: "last_name",
            value: lastname,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone,
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: fullAddress,
          },
          ...cart
            .map((item, i) => [
              {
                display_name: `Item ${i + 1} Name`,
                variable_name: `item_${i + 1}_name`,
                value: item.name,
              },
              {
                display_name: `Item ${i + 1} Color`,
                variable_name: `item_${i + 1}_color`,
                value: item.colorLabel || "Default",
              },
              {
                display_name: `Item ${i + 1} Size`,
                variable_name: `item_${i + 1}_size`,
                value: item.size || "—",
              },
              {
                display_name: `Item ${i + 1} Qty`,
                variable_name: `item_${i + 1}_qty`,
                value: String(item.quantity),
              },
            ])
            .flat(),
        ],
      },
      callback: (response) => {
        hideLoading();
        localStorage.setItem("lastOrderRef", response.reference);
        localStorage.removeItem("cart");
        window.location.href = `thankyou.html?ref=${response.reference}`;
      },
      onClose: () => {
        hideLoading();
        const msgEl = document.createElement("p");
        msgEl.className = "payment-message error";
        msgEl.textContent =
          "Payment was not completed. Please try again.";
        payBtn.parentNode.insertBefore(msgEl, payBtn.nextSibling);
        // auto-remove after 8s or on next submit
        setTimeout(() => msgEl.remove(), 8000);
      },
    });

    handler.openIframe();
  });

  // Mobile pay button forwards to form submit
  if (mobilePayBtn) {
    mobilePayBtn.addEventListener("click", () => {
      if (!mobilePayBtn.disabled) {
        form.requestSubmit(); // modern & clean
      }
    });
  }
});

// pk_live_988acbd343f21914562810ef81e1bb35db912df7;
