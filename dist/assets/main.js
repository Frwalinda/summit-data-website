const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const contactForm = document.querySelector("[data-contact-form]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

if (contactForm instanceof HTMLFormElement) {
  const status = contactForm.querySelector("[data-form-status]");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!(submitButton instanceof HTMLButtonElement)) return;

    const endpoint = contactForm.action;
    const formData = new FormData(contactForm);
    const originalLabel = submitButton.textContent || "Send Message";

    setFormStatus(status, "Sending your message...");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Email delivery is not configured yet.");
      }

      contactForm.reset();
      setFormStatus(status, "Thanks. Your message has been sent to Summit Data.");
    } catch (error) {
      setFormStatus(
        status,
        error instanceof Error
          ? error.message
          : "The form could not send right now. Please email admin@summitdataltd.com or use WhatsApp."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
}

function setFormStatus(status, message) {
  if (status) status.textContent = message;
}
