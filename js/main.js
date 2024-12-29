import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { setupNavbarMenu } from "./components/navbar-menu";
import { setupOverlay } from "./components/overlay";

const NAVBAR_MENU_OVERLAY_EXIT_CLASSNAME = "leave";

function navbarMenuOverlayConstructor() {
  const element = document.createElement("div");
  element.id = "navbar-menu-overlay";
  element.classList.add("hide-desktop");

  // Actually hide the overlay after the fade-out animation
  element.addEventListener("animationend", () => {
    if (element.classList.contains(NAVBAR_MENU_OVERLAY_EXIT_CLASSNAME)) {
      navbarMenuOverlay.hide();
      element.classList.remove(NAVBAR_MENU_OVERLAY_EXIT_CLASSNAME);
    }
  });

  return element;
}

// Navbar menu overlay setup
const navbarMenuOverlay = setupOverlay({
  element: navbarMenuOverlayConstructor,
  onClick() {
    navbarMenu.close();
  },
});

const NAVBAR_MENU_HIDDEN_CLASSNAME = "hide-mobile";

// Navigation bar menu setup
const navbarMenu = setupNavbarMenu({
  menuId: "navbar-navlinks",
  animated: true,
  desktopBreakpoint: 1024,
  onOpen({ activator, menu }) {
    navbarMenuOverlay.show();
    const [hambugerIcon, closeIcon] = [...activator.children];
    hambugerIcon.setAttribute("aria-hidden", true);
    closeIcon.setAttribute("aria-hidden", false);
    menu.classList.remove(NAVBAR_MENU_HIDDEN_CLASSNAME);
  },
  onClose({ activator, menu }) {
    navbarMenuOverlay.element.classList.add(NAVBAR_MENU_OVERLAY_EXIT_CLASSNAME);
    const [hambugerIcon, closeIcon] = [...activator.children];
    hambugerIcon.setAttribute("aria-hidden", false);
    closeIcon.setAttribute("aria-hidden", true);
    menu.classList.add(NAVBAR_MENU_HIDDEN_CLASSNAME);
  },
});

function applyNavbarShadowOnScroll() {
  const navbar = document.querySelector(".navbar");
  const SHADOW_CLASSNAME = "shadowed";
  if (window.scrollY > 0) {
    !navbar.classList.contains(SHADOW_CLASSNAME) &&
      navbar.classList.add(SHADOW_CLASSNAME);
  } else {
    navbar.classList.contains(SHADOW_CLASSNAME) &&
      navbar.classList.remove(SHADOW_CLASSNAME);
  }
}

// Setup of the bottom shadow of the navbar on scroll
applyNavbarShadowOnScroll();
window.addEventListener("scroll", applyNavbarShadowOnScroll);

// GSAP plugins registration
gsap.registerPlugin(ScrollTrigger);

// Intro section animation
const introTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro__text",
    toggleActions: "play none none none",
    start: "center bottom",
  },
});
const INTRO_ITEMS_DURATION = 0.2;
introTl
  .to(".intro__heading", {
    x: 0,
    opacity: 1,
    duration: INTRO_ITEMS_DURATION,
  })
  .to(".intro__text", {
    x: 0,
    opacity: 1,
    duration: INTRO_ITEMS_DURATION,
  })
  .to(".intro__cta", {
    x: 0,
    opacity: 1,
    duration: INTRO_ITEMS_DURATION,
  });
const illustrationTl = gsap.timeline({
  delay: INTRO_ITEMS_DURATION * 3 + 0.25,
});
illustrationTl
  .to(".intro__illustration-bg", {
    x: "var(--illustration-mockups-offset-y)",
    opacity: 1,
    duration: 0.15,
  })
  .to(".intro__illustration-mockups", {
    y: "var(--illustration-mockups-offset-y)",
    opacity: 1,
    duration: 0.5,
  });

// Features animation
gsap.to(".feature", {
  scrollTrigger: {
    trigger: ".feature:first-child",
    toggleActions: "play none none none",
    start: "center bottom",
  },
  opacity: 1,
  y: 0,
  duration: 0.25,
  stagger: 0.15,
});

// Latest articles animation
gsap.to(".latest-article", {
  scrollTrigger: {
    trigger: ".latest-article:first-child",
    toggleActions: "play none none none",
    start: "center bottom",
  },
  opacity: 1,
  x: 0,
  skewX: 0,
  duration: 0.25,
  stagger: 0.25,
});
