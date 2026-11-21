'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    sidebarBtn.setAttribute("aria-expanded", sidebar.classList.contains("active") ? "true" : "false");
  });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal controls only when the testimonials modal exists
if (modalContainer && modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// Project filtering is not needed on the Publications page.

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Accessible page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = this.textContent.trim().toLowerCase();

    pages.forEach((page) => {
      const isActive = page.dataset.page === targetPage;
      page.classList.toggle("active", isActive);
      if (isActive) page.scrollTop = 0;
    });

    navigationLinks.forEach((navLink) => {
      const isActive = navLink === this;
      navLink.classList.toggle("active", isActive);
      navLink.setAttribute("aria-current", isActive ? "page" : "false");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// Publications search and year filter
const publicationSearch = document.querySelector("[data-publication-search]");
const publicationYear = document.querySelector("[data-publication-year]");
const publicationCards = Array.from(document.querySelectorAll("[data-publication-list] .publication-item"));
const publicationResults = document.querySelector("[data-publication-results]");
const publicationEmpty = document.querySelector("[data-publication-empty]");

const filterPublications = function () {
  const query = (publicationSearch?.value || "").trim().toLowerCase();
  const year = publicationYear?.value || "all";
  let visible = 0;

  publicationCards.forEach((card) => {
    const matchesQuery = !query || (card.textContent + " " + card.dataset.search).toLowerCase().includes(query);
    const matchesYear = year === "all" || card.dataset.year === year;
    const show = matchesQuery && matchesYear;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (publicationResults) publicationResults.textContent = `Showing ${visible} of ${publicationCards.length} publications`;
  if (publicationEmpty) publicationEmpty.hidden = visible !== 0;
};

publicationSearch?.addEventListener("input", filterPublications);
publicationYear?.addEventListener("change", filterPublications);


// Accessible light/dark theme toggle with saved preference
const themeToggle = document.querySelector("[data-theme-toggle]");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");

const updateThemeToggle = function () {
  if (!themeToggle) return;
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.setAttribute("aria-pressed", isLight ? "true" : "false");
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.innerHTML = isLight
    ? '<ion-icon name="moon-outline" aria-hidden="true"></ion-icon><span>Dark</span>'
    : '<ion-icon name="sunny-outline" aria-hidden="true"></ion-icon><span>Light</span>';
};

updateThemeToggle();
themeToggle?.addEventListener("click", function () {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  updateThemeToggle();
});
