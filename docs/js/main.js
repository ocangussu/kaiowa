(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- LOADER ---------- */
  var loader = document.getElementById("loader");
  window.addEventListener("load", function () {
    var delay = reduceMotion ? 0 : 500;
    setTimeout(function () {
      loader.classList.add("hidden");
      revealHero();
    }, delay);
  });

  /* ---------- HERO TEXT REVEAL ---------- */
  function revealHero() {
    var spans = document.querySelectorAll(".hero-title .line span");
    spans.forEach(function (s, i) {
      setTimeout(function () {
        s.style.transform = "translateY(0)";
      }, i * 140);
    });
  }
  // Wrap each hero line's text in a span for the mask-reveal animation
  document.querySelectorAll(".hero-title .line").forEach(function (line) {
    var text = line.textContent;
    line.textContent = "";
    var span = document.createElement("span");
    span.textContent = text;
    line.appendChild(span);
  });

  /* ---------- SIDE MENU ---------- */
  var sideMenu = document.getElementById("sideMenu");
  var menuToggle = document.getElementById("menuToggle");
  var menuClose = document.getElementById("menuClose");
  var menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    sideMenu.classList.add("open");
    sideMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    menuClose.focus();
  }
  function closeMenu() {
    sideMenu.classList.remove("open");
    sideMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    menuToggle.focus();
  }
  menuToggle.addEventListener("click", function () {
    sideMenu.classList.contains("open") ? closeMenu() : openMenu();
  });
  menuClose.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sideMenu.classList.contains("open")) closeMenu();
  });
  sideMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---------- SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- HISTORY PANELS (hover / touch / keyboard) ---------- */
  var panels = document.querySelectorAll(".panel");
  function setActive(panel) {
    panels.forEach(function (p) {
      var active = p === panel;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-expanded", active ? "true" : "false");
    });
  }
  function clearActive() {
    panels.forEach(function (p) {
      p.classList.remove("is-active");
      p.setAttribute("aria-expanded", "false");
    });
  }
  panels.forEach(function (panel) {
    panel.addEventListener("click", function (e) {
      // Touch / click devices: toggle, don't rely on hover
      if (panel.classList.contains("is-active")) {
        clearActive();
      } else {
        setActive(panel);
      }
    });
    panel.addEventListener("focus", function () {
      setActive(panel);
    });
  });
  var panelsWrap = document.getElementById("panels");
  panelsWrap.addEventListener("mouseleave", function () {
    if (!panelsWrap.contains(document.activeElement)) clearActive();
  });

  /* ---------- NAVBAR BACKGROUND ON SCROLL ---------- */
  var navbar = document.getElementById("navbar");
  var lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY;
      navbar.style.background =
        y > 40
          ? "rgba(6,6,7,.92)"
          : "linear-gradient(to bottom, rgba(6,6,7,.85), transparent)";
      lastY = y;
    },
    { passive: true }
  );
})();
