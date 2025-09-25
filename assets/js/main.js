//MENU TOGGLE

const menu = document.getElementById("menu");
const toggleButton = document.getElementById("menu-toggle");

if (menu && toggleButton) {
  toggleButton.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("active");
    toggleButton.classList.toggle("ri-menu-5-fill");
    toggleButton.classList.toggle("ri-close-line");
  });

  document.addEventListener("click", function (e) {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnToggle = toggleButton.contains(e.target);
    if (!isClickInsideMenu && !isClickOnToggle) {
      menu.classList.remove("active");
      toggleButton.classList.remove("ri-close-line");
      toggleButton.classList.add("ri-menu-5-fill");
    }
  });
}

// MODAL CONTROL

function showModal() {
  const modal = document.getElementById("cart-modal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal() {
  const modal = document.getElementById("cart-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

const closeModalBtn = document.getElementById("close-modal");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

// "ADD TO CART" FROM SHOP PAGE

const addToCartButtons = document.querySelectorAll(".add-to-cart");
if (addToCartButtons) {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering goToProduct
      const productId = parseInt(button.dataset.id);
      const product = products.find((p) => p.id === productId);
      if (product) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const defaultColor = product.colors[0];
        const defaultSize = product.sizeLimits.min;
        const existingItem = cart.find(
          (item) =>
            item.id === product.id &&
            item.color === defaultColor &&
            item.size === defaultSize
        );
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            color: defaultColor,
            size: defaultSize,
            qty: 1,
            image: product.images[0],
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCounter();
        showModal();
      }
    });
  });
}

// PRODUCT DETAILS

const mainImage = document.getElementById("main-image");
const thumbnailImages = document.querySelector(".thumbnail-images");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productColor = document.getElementById("product-color");
const productSize = document.getElementById("product-size");
const productQuantity = document.getElementById("product-quantity");
const addToCartBtn = document.getElementById("add-to-cart");

if (
  mainImage &&
  thumbnailImages &&
  productName &&
  productPrice &&
  productDescription &&
  productColor &&
  productSize &&
  addToCartBtn
) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);

  if (product) {
    productName.textContent = product.name;
    productPrice.textContent = `\u20a6${product.price.toFixed(2)}`;
    productDescription.textContent = product.description;
    mainImage.src = product.images[0];

    thumbnailImages.innerHTML = product.images
      .map(
        (img) => `
      <img src="${img}" alt="${product.name}" class="thumbnail" />
    `
      )
      .join("");

    productColor.innerHTML = product.colors
      .map(
        (color) => `
      <div class="color-box" style="background-color: ${color}" data-color="${color}"></div>
    `
      )
      .join("");

    productSize.value = product.sizeLimits.min;
    productSize.min = 6;
    productSize.max = 16;

    document.querySelectorAll(".thumbnail").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
      });
    });

    let selectedColor = product.colors[0];
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box) => {
      if (box.dataset.color === selectedColor) {
        box.classList.add("selected");
      }
      box.addEventListener("click", () => {
        colorBoxes.forEach((b) => b.classList.remove("selected"));
        box.classList.add("selected");
        selectedColor = box.dataset.color;
      });
    });

    productSize.addEventListener("input", () => {
      const size = parseInt(productSize.value);
      if (size < 6 || isNaN(size)) productSize.value = 6;
      if (size > 16) productSize.value = 16;
    });

    addToCartBtn.addEventListener("click", () => {
      const size = parseInt(productSize.value);
      if (size < 6 || size > 16 || isNaN(size)) {
        alert("Please select a size between 6 and 16.");
        return;
      }
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find(
        (item) =>
          item.id === product.id &&
          item.color === selectedColor &&
          item.size === size
      );
      if (existingItem) {
        existingItem.qty += parseInt(productQuantity.value);
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          color: selectedColor,
          size: size,
          qty: parseInt(productQuantity.value),
          image: product.images[0],
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCounter();
      showModal();
    });
  }
}

// CART PAGE

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const proceedToCheckout = document.getElementById("proceed-to-checkout");
const emptyCart = document.getElementById("empty-cart");
const startShoppingBtn = document.getElementById("start-shopping");

if (cartItems && cartTotal && proceedToCheckout && emptyCart) {
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItems.style.display = "none";
      cartTotal.parentElement.style.display = "none";
      proceedToCheckout.style.display = "none";
      emptyCart.style.display = "block";
    } else {
      cartItems.style.display = "block";
      cartTotal.parentElement.style.display = "block";
      proceedToCheckout.style.display = "block";
      emptyCart.style.display = "none";

      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
        <div class="cart_con">

          <div class="cart_box">

            <div class="item-image">
              <img src="${item.image}" alt="${item.name}" />
            </div>

            <div class="item-details">
              <h4>${item.name}</h4>

              <div class="item-mini-box">
                <div class="color-box" style="background-color: ${item.color}">
                </div>
                <p>Size: ${item.size}</p>
              </div>

              <div class="item-mini-box">
                <p><input type="number" class="item-qty" value="${
                  item.qty
                }" min="1" data-index="${index}" /></p>
                <p>&#8358;${item.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}"><i class="ri-close-line"></i></button>
              </div>
            </div>

          </div>

        </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price * item.qty;
      });
      cartTotal.textContent = `₦${total.toFixed(2)}`;
    }
    updateCartCounter();
  }

  cartItems.addEventListener("change", (e) => {
    if (e.target.classList.contains("item-qty")) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty < 1) {
        cart.splice(index, 1);
      } else {
        cart[index].qty = newQty;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.closest(".remove-item")) {
      const index = e.target.closest(".remove-item").dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }
  });

  if (startShoppingBtn) {
    startShoppingBtn.addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }

  displayCart();
}

// CHECKOUT PAGE

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");
const paystackBtn = document.getElementById("paystack-btn");

if (checkoutItems && checkoutTotal && checkoutForm && paystackBtn) {
  function displayCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    checkoutItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "checkout-item";
      itemDiv.innerHTML = `
      <div class="checkout_box">
        <h3>${item.name}</h3>
        <div class="checkout_box_details">
          <p> Color: ${item.color}</p> 
          <p>Size: ${item.size}</p> 
          <p>Qty: ${item.qty}</p>
        </div>  
        <p class="checkout_price">₦${(item.price * item.qty).toFixed(2)}</p>
      </div>
      `;
      checkoutItems.appendChild(itemDiv);
      total += item.price * item.qty;
    });
    checkoutTotal.textContent = `₦${total.toFixed(2)}`;
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total =
      cart.reduce((sum, item) => sum + item.price * item.qty, 0) * 100; // Paystack uses kobo
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const handler = PaystackPop.setup({
      key: "pk_test_d20590ef86fe4669a36f97288826af15ca69c90b", // Replace with your Paystack public key
      email: email,
      amount: total,
      currency: "NGN",
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: name,
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
        ],
      },
      callback: function (response) {
        localStorage.setItem("orderRef", response.reference);
        localStorage.removeItem("cart");
        window.location.href = "thankyou.html";
      },
      onClose: function () {
        alert("Payment cancelled.");
      },
    });
    handler.openIframe();
  });

  displayCheckout();
}

// THANK YOU PAGE

const orderRef = document.getElementById("order-ref");
if (orderRef) {
  orderRef.textContent = localStorage.getItem("orderRef") || "N/A";
}

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
