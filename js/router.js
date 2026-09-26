/* ==========================================================================
   ROUTER — lógica central de navegação da SPA
   ========================================================================== */

const routes = {
  "/": renderHome,
  "/projetos": renderProjetos,
  "/cadastro": renderCadastro,
};

function router() {
  const path = window.location.hash.replace("#", "") || "/";
  const render = routes[path] || renderHome;

  const app = document.getElementById("app");
  app.innerHTML = render();

  updateActiveLink(path);
  window.scrollTo({ top: 0, behavior: "instant" });

  const navToggle = document.getElementById("nav-toggle");
  if (navToggle) navToggle.checked = false;

  if (path === "/cadastro") {
    initFormValidation();
  }
}

function updateActiveLink(path) {
  document.querySelectorAll(".site-nav__list a[data-route]").forEach((link) => {
    const linkPath = link.getAttribute("href").replace("#", "");
    if (linkPath === path) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);