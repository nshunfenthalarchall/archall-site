class Nav {
  constructor() {
    this.navOpen = false;
    this.dropdownOpen = false;
    this.activeImage = null;
    this.menuButton = document.querySelector('[data-nav="trigger"]');
    this.carat = document.querySelector('[data-sectors="carat"]');
    this.trigger = document.querySelector('[data-nav="dropdown"]');
    this.panel = document.querySelector('[data-nav="panel"]');
    this.optionsWrapper = document.querySelector('[data-nav="options"]');
    this.options = document.querySelectorAll('[data-nav="option"]');
    this.navLinks = document.querySelectorAll(".nav_link");
    this.navContainer = document.querySelector('[data-nav="container"]');
    this.optionsTl = gsap.timeline({ paused: true });
    this.wrapAll = document.querySelector('[data-nav="options-wrap"]');
    this.wrapAll.style.height = 0;
    this.navTl = gsap.timeline({ paused: true });
    this.init();
    this.listeners();
  }

  unlockScrollWhenCLickItem() {
    window.lenis.start();
  }

  toggleDropdown() {
    this.dropdownOpen ? this.optionsTl.reverse() : this.optionsTl.play();
    this.dropdownOpen = !this.dropdownOpen;
    console.log("toggled drop to:", this.dropdownOpen);
  }

  handleSectorIn(index) {
    if (window.innerWidth < 768 || navigator.maxTouchPoints > 0) return; // dont fire this on mobile
    const images = document.querySelectorAll('[data-nav="images"] img');
    if (!images[index] && !navOpen) return;
    images[index].classList.add("active-image");
  }

  handleSectorOut() {
    const images = document.querySelectorAll('[data-nav="images"] img');
    images.forEach((el, i) => {
      el.classList.remove("active-image");
    });
  }

  init() {
    const mm = gsap.matchMedia();
    // desktop
    mm.add("(min-width: 768px)", () => {
      this.optionsTl
        .to(
          this.carat,
          {
            rotate: 180,
            duration: 0.7,
            ease: "expo.out",
          },
          0
        )
        .to(
          this.navLinks,
          {
            opacity: 0.35,
            duration: 0.5,
            ease: "expo.out",
          },
          0
        )
        .to(
          this.wrapAll,
          {
            height: "auto",
            duration: 0.4,
            ease: "expo.out",
          },
          0
        )
        .from(
          this.options,
          {
            duration: 0.8,
            opacity: 0,
            y: 10,
            stagger: 0.04,
            ease: "expo.out",
          },
          0
        );
    });

    // mobile
    mm.add("(max-width: 767px)", () => {
      this.optionsTl
        .to(
          this.carat,
          {
            rotate: 180,
            duration: 0.7,
            ease: "expo.out",
          },
          0
        )
        .to(
          this.navLinks,
          {
            opacity: 0.6,
            duration: 0.5,
            ease: "expo.out",
          },
          0
        )
        .to(
          this.wrapAll,
          {
            height: "auto",
            duration: 0.7,
            ease: "expo.out",
          },
          0
        )
        .from(
          this.options,
          {
            duration: 0.8,
            opacity: 0,
            y: 10,
            stagger: 0.04,
            ease: "expo.out",
          },
          0
        );
    });

    gsap.set(this.panel, {
      clipPath: `inset(0% 100% 0% 0%)`,
    });

    this.navTl.to(
      this.panel,
      {
        clipPath: `inset(0% 0% 0% 0%)`,
        pointerEvents: "auto",
        duration: 0.8,
        ease: "power4.out",
      },
      0
    );
  }

  toggleNav() {
    this.navOpen ? this.navTl.reverse() : this.navTl.play();
    this.navOpen ? window.lenis.start() : window.lenis.stop();
    this.menuButton.textContent = this.navOpen ? "Menu" : "Close";
    this.navOpen = !this.navOpen;
  }

  listeners() {
    this.menuButton.addEventListener("click", this.toggleNav.bind(this));
    this.navLinks.forEach((el, i) => {
      el.addEventListener("click", this.unlockScrollWhenCLickItem.bind(this));
    });
    this.trigger.addEventListener("click", this.toggleDropdown.bind(this));
    this.options.forEach((el, i) => {
      el.addEventListener("mouseover", () => this.handleSectorIn(i));
      el.addEventListener("mouseout", this.handleSectorOut.bind(this));
    });

    console.log("triggers::", this.trigger);
  }
}

new Nav();
