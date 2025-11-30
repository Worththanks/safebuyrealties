// =======================================================
// Safe Buy Realties – Official JavaScript (2025 Final)
// Fully compatible with: index.html, listings.html, property-*.html
// Features: Mobile menu, dropdown, year update, lightbox, WhatsApp float, smooth scroll
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Auto-update Copyright Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("active");
      document.body.style.overflow = isOpen ? "auto" : "hidden"; // Prevent background scroll
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll("#nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "auto";
      });
    });
  }

  // 3. Register Dropdown (Desktop + Mobile)
  const registerToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector("#register-dropdown");

  if (registerToggle && dropdownMenu) {
    const openDropdown = () => {
      registerToggle.setAttribute("aria-expanded", "true");
      dropdownMenu.style.opacity = "1";
      dropdownMenu.style.visibility = "visible";
      dropdownMenu.style.transform = "translateY(0)";
    };

    const closeDropdown = () => {
      registerToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.style.opacity = "0";
      dropdownMenu.style.visibility = "hidden";
      dropdownMenu.style.transform = "translateY(-10px)";
    };

    registerToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = registerToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeDropdown() : openDropdown();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!registerToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });
  }

  // 4. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 100; // adjust for fixed navbar
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }
    });
  });

  // 5. Sticky WhatsApp Floating Button (only on property pages)
  if (
    window.location.pathname.includes("property-") ||
    document.body.classList.contains("property-page")
  ) {
    const waBtn = document.createElement("a");
    waBtn.href = "https://wa.me/2348030000000?text=Hi, I'm interested in this verified property!";
    waBtn.target = "_blank";
    waBtn.rel = "noopener";
    waBtn.className = "whatsapp-float";
    waBtn.innerHTML = "💬";
    waBtn.title = "Chat with us on WhatsApp";
    waBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #25d366;
      color: #ffffff;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      box-shadow: 0 10px 30px rgba(37, 211, 102, 0.5);
      z-index: 9999;
      transition: all 0.3s ease;
      animation: float 3s ease-in-out infinite;
      text-decoration: none;
    `;

    document.body.appendChild(waBtn);

    // Add floating animation
    const floatStyle = document.createElement("style");
    floatStyle.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      .whatsapp-float:hover {
        transform: scale(1.15) !important;
        box-shadow: 0 15px 40px rgba(37, 211, 102, 0.7);
      }
    `;
    document.head.appendChild(floatStyle);
  }

  // 6. Beautiful Lightbox for Property Gallery Images
  const galleryImages = document.querySelectorAll(
    ".gallery img, .grid-gallery img, .property-image img"
  );

  if (galleryImages.length > 0) {
    // Create lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "sb-lightbox";
    lightbox.innerHTML = `
      <div class="lb-overlay"></div>
      <img src="" alt="Property image">
      <button class="lb-close" aria-label="Close">×</button>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector("img");
    const lbOverlay = lightbox.querySelector(".lb-overlay");
    const lbClose = lightbox.querySelector(".lb-close");

    // Open lightbox
    galleryImages.forEach(img => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        lbImg.src = img.src || img.dataset.src || "";
        if (!lbImg.src) return;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    lbOverlay.addEventListener("click", closeLightbox);
    lbClose.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });

    // Lightbox styles
    const lbStyle = document.createElement("style");
    lbStyle.textContent = `
      .sb-lightbox {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.96);
        backdrop-filter: blur(10px);
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 20px;
      }
      .sb-lightbox.active { display: flex; }
      .sb-lightbox img {
        max-width: 96vw;
        max-height: 92vh;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      }
      .lb-close {
        position: absolute;
        top: 30px;
        right: 30px;
        background: transparent;
        color: #ffffff;
        border: 3px solid #ffffff;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        font-size: 40px;
        font-weight: 300;
        cursor: pointer;
        transition: 0.3s;
      }
      .lb-close:hover { background: rgba(255,255,255,0.1); }
      .lb-overlay { position: absolute; inset: 0; }
    `;
    document.head.appendChild(lbStyle);
  }
});


let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
  setTimeout(showSlides, 6000); // Change every 6 seconds
}

function currentSlide(n) {
  slideIndex = n - 1;
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === slideIndex);
    dots[i].classList.toggle('active', i === slideIndex);
  });
}

// Start slideshow
showSlides();