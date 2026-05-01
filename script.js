// Auto-update availability date for GitHub Pages/static hosting.
(function () {
  const target = document.getElementById("availability-date");
  if (!target) return;

  const today = new Date();
  target.textContent = today.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
})();


// Button tap feedback + ripple effect.
(function () {
  const pressables = document.querySelectorAll(".button, .header-link, .mobile-bar a");

  pressables.forEach((el) => {
    el.addEventListener("pointerdown", (event) => {
      el.classList.add("is-pressed");

      const ripple = document.createElement("span");
      ripple.className = "ripple";

      const rect = el.getBoundingClientRect();
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;

      el.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 600);
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
      el.addEventListener(type, () => {
        window.setTimeout(() => el.classList.remove("is-pressed"), 90);
      });
    });
  });
})();

// Image lightbox: tap/click images to enlarge.
(function () {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const zoomables = document.querySelectorAll("img.zoomable");

  function openLightbox(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "Expanded image";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeBtn.focus({ preventScroll: true });
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    window.setTimeout(() => {
      if (!lightbox.classList.contains("is-open")) {
        lightboxImg.removeAttribute("src");
      }
    }, 220);
  }

  zoomables.forEach((img) => {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `${img.alt || "Image"} - open larger view`);

    img.addEventListener("click", () => openLightbox(img));

    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
