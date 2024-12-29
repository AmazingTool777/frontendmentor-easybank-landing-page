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
    navbar.classList.add(SHADOW_CLASSNAME);
  } else {
    navbar.classList.remove(SHADOW_CLASSNAME);
  }
}

// Setup of the bottom shadow of the navbar on scroll
applyNavbarShadowOnScroll();
window.addEventListener("scroll", applyNavbarShadowOnScroll);
