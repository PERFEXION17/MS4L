// Populate order reference from URL
const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get("ref");

if (ref) {
  document.getElementById("order-ref-display").textContent = ref;

  // Pre-fill WhatsApp message
  const whatsappNumber = "2348100334346"; // ← YOUR real business number
  const message = encodeURIComponent(
    `Hello MS4L team! I just placed order #${ref}\nI'd like to add some notes / instructions / questions:`,
  );
  document.getElementById("whatsapp-contact").href =
    `https://wa.me/${whatsappNumber}?text=${message}`;
} else {
  document.getElementById("order-ref-display").textContent = "Not found";
}
