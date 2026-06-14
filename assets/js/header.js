(() => {
  const header = document.querySelector("[data-site-header]");

  if (!header) {
    return;
  }

  const menuToggle = header.querySelector("[data-site-header-toggle]");
  const submenuToggles = Array.from(header.querySelectorAll("[data-site-header-submenu-toggle]"));
  const languageSwitchers = Array.from(header.querySelectorAll(".site-header__language-switcher"));
  const desktopQuery = window.matchMedia("(min-width: 64rem)");
  const openLabel = menuToggle?.dataset.openLabel || menuToggle?.getAttribute("aria-label") || "";
  const closeLabel = menuToggle?.dataset.closeLabel || openLabel;
  const submenuCloseDelay = 180;
  const submenuCloseTimers = new WeakMap();

  const clearSubmenuCloseTimer = (item) => {
    const timer = submenuCloseTimers.get(item);

    if (timer) {
      window.clearTimeout(timer);
      submenuCloseTimers.delete(item);
    }
  };

  const setMenuOpen = (isOpen) => {
    if (!menuToggle) {
      return;
    }

    header.classList.toggle("is-mobile-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
  };

  const setSubmenuOpen = (item, isOpen) => {
    if (!item) {
      return;
    }

    const toggle = item.querySelector("[data-site-header-submenu-toggle]");

    clearSubmenuCloseTimer(item);
    item.classList.toggle("is-submenu-open", isOpen);

    if (toggle) {
      toggle.setAttribute("aria-expanded", String(isOpen));
    }
  };

  const scheduleSubmenuClose = (item) => {
    if (!item) {
      return;
    }

    clearSubmenuCloseTimer(item);

    const timer = window.setTimeout(() => {
      setSubmenuOpen(item, false);
    }, submenuCloseDelay);

    submenuCloseTimers.set(item, timer);
  };

  const closeSubmenus = (exceptItem) => {
    submenuToggles.forEach((toggle) => {
      const item = toggle.closest(".site-header__item--has-children");

      if (item && item !== exceptItem) {
        setSubmenuOpen(item, false);
      }
    });
  };

  const closeLanguageSwitchers = (exceptSwitcher) => {
    languageSwitchers.forEach((switcher) => {
      if (switcher !== exceptSwitcher) {
        switcher.open = false;
      }
    });
  };

  header.classList.add("is-enhanced");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(!header.classList.contains("is-mobile-open"));
    });
  }

  submenuToggles.forEach((toggle) => {
    const item = toggle.closest(".site-header__item--has-children");

    if (item) {
      item.addEventListener("pointerenter", (event) => {
        if (!desktopQuery.matches || event.pointerType === "touch") {
          return;
        }

        closeSubmenus(item);
        setSubmenuOpen(item, true);
      });

      item.addEventListener("pointerleave", (event) => {
        if (!desktopQuery.matches || event.pointerType === "touch") {
          return;
        }

        scheduleSubmenuClose(item);
      });
    }

    toggle.addEventListener("click", () => {
      const isOpen = item?.classList.contains("is-submenu-open") || false;

      if (!isOpen && desktopQuery.matches) {
        closeSubmenus(item);
      }

      setSubmenuOpen(item, !isOpen);
    });
  });

  document.addEventListener("click", (event) => {
    const activeLanguageSwitcher = languageSwitchers.find((switcher) => switcher.contains(event.target));

    closeLanguageSwitchers(activeLanguageSwitcher);

    if (header.contains(event.target)) {
      return;
    }

    setMenuOpen(false);
    closeSubmenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    setMenuOpen(false);
    closeSubmenus();
    closeLanguageSwitchers();
  });

  const handleViewportChange = (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  };

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", handleViewportChange);
  } else {
    desktopQuery.addListener(handleViewportChange);
  }
})();
