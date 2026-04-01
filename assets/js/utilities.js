// MailerLite Success Logic

export function mailerSuccessMsg() {
  // Listen for MailerLite success (they add ml-submit=success to URL on redirect)
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.get("ml-submit") === "success" ||
      urlParams.has("fields[email]")
    ) {
      // Show success message
      const msg = document.createElement("p");
      msg.className = "newsletter-success";
      msg.textContent =
        "Thank you! You’re now on the list — check your inbox soon.";

      const form = document.querySelector(".newsletter-form");
      if (form) {
        form.parentNode.insertBefore(msg, form.nextSibling);
        // Optional: hide form after success
        form.style.display = "none";
      }

      // Clear URL params so refresh doesn't re-show
      history.replaceState(null, "", window.location.pathname);
    }
  });
}
