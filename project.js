class HotspotPoint {
  constructor({
    point,
    containerHeight,
    containerWidth,
    isMobile,
    container,
    index,
    selected,
  }) {
    this.point = point;
    this.selected = selected;
    this.isMobile = window.innerWidth <= 786;
    this.container = container;
    this.containerHeight = containerHeight;
    this.containerWidth = containerWidth;
    this.marker = this.point.querySelector('[data-point="marker"]');
    this.img = this.container.querySelector('[data-point="image"] img');

    this.mobilePopup = [
      ...this.container.querySelectorAll('[data-point="mobile-popup"]'),
    ][index];
    this.posX = this.marker.dataset.x / 100;
    this.posY = this.marker.dataset.y / 100;
    this.mobileCloseButton = this.mobilePopup.querySelector("img");
    this.isPopupLeft = this.isMobile ? false : this.posX >= 0.8;
    console.log("is mobilio:", this.isMobile, this.posX);
    this.popup = this.point.querySelector('[data-point="popup"]');
    this.closeButton = this.point.querySelector('[data-point="close"]');

    this.init();
    this.listeners();
    this.setPosition();
  }

  listeners() {
    if (this.img.complete) {
      this.setPosition();
    } else {
      this.img.onload = () => {
        this.setPosition();
      };
    }
  }

  setPosition() {
    this.containerHeight = this.container.querySelector(
      '[data-point="image"]'
    ).clientHeight;

    const x = Math.min(this.posX, 0.9);
    const y = Math.min(this.posY, 0.9);

    console.log({ x, y });

    const s = `translate(${x * this.containerWidth}px, ${
      y * this.containerHeight
    }px)`;

    this.point.style.transform = s;

    this.isPopupLeft = this.isMobile ? false : this.posX >= 0.8;

    if (this.isPopupLeft) {
      // this.popup.style.transform = `translate(calc(-100% - 75px),20px,0px);`;
      this.popup.classList.add("is-left");
    } else {
      this.popup.classList.remove("is-left");
    }
  }

  open() {
    this.container.active = true;
    this.point.dataset.open = true;
    if (this.isMobile) {
      gsap.to(this.mobilePopup, {
        opacity: 1,
        ease: "expo.out",
        duration: 0.8,
      });
    } else {
      gsap.to(this.popup, {
        opacity: 1,
        ease: "expo.out",
        duration: 0.8,
      });
    }
  }

  close() {
    this.container.dataset.active = false;
    this.point.dataset.open = false;

    if (this.isMobile) {
      gsap.to(this.mobilePopup, {
        opacity: 0,
        ease: "expo.out",
        duration: 0.8,
      });
    } else {
      gsap.to(this.popup, {
        opacity: 0,
        ease: "expo.out",
        duration: 0.8,
      });
    }
  }

  resize() {
    this.containerWidth = this.img.getBoundingClientRect().width;
    this.containerHeight = this.img.getBoundingClientRect().height;

    if (window.innerWidth <= 768 && this.isMobile) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.setPosition();
  }

  init() {
    this.popup.style.opacity = 0;
    this.mobilePopup.style.opacity = 0;

    console.log({ isLeft: this.isPopupLeft });

    if (this.isPopupLeft) {
      this.popup.style.transform = `translate(calc(-100% - 75px),20px,0px);`;
    }
    this.point.style.position = "absolute";
  }

  listeners() {
    this.marker.addEventListener("click", () => this.open.bind(this)());
    this.closeButton.addEventListener("click", () => this.close.bind(this)());
    this.mobileCloseButton.addEventListener("click", () =>
      this.close.bind(this)()
    );
  }
}

class HotspotSection {
  constructor(el) {
    this.container = el;
    this.isMobile = window.innerWidth <= 768;
    this.image = this.container.querySelector('[data-point="image"] > img');
    this.containerHeight = this.image.getBoundingClientRect().height;
    this.containerWidth = this.image.getBoundingClientRect().width;
    this.selected = null;

    this.createPoints();
    this.listeners();
  }

  createPoints() {
    this.points = [...this.container.querySelectorAll('[data-point="point"]')];
    this.points = this.points.map(
      (point, index) =>
        new HotspotPoint({
          point,
          index,
          isMobile: this.isMobile,
          containerHeight: this.containerHeight,
          containerWidth: this.containerWidth,
          container: this.container,
          selected: this.selected,
        })
    );
  }

  listeners() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
      this.containerHeight = this.image.getBoundingClientRect().height;
      this.containerWidth = this.image.getBoundingClientRect().width;
      this.points.forEach((point) => point.resize());
    });

    if (this.image.complete) {
      this.containerHeight = this.image.getBoundingClientRect().height;
      this.containerWidth = this.image.getBoundingClientRect().width;
    } else {
      this.image.onload = () => {
        this.containerHeight = this.image.getBoundingClientRect().height;
        this.containerWidth = this.image.getBoundingClientRect().width;
      };
    }

    this.points.forEach((point, index) => {
      point.marker.addEventListener("click", () => {
        if (this.selected !== index) {
          this.points.forEach((p) => p.close());
          point.open();
        } else {
        }

        this.selected = index;
      });

      point.closeButton.addEventListener("click", () => {
        point.close();
        this.points
          .filter((index) => index !== this.selected)
          .forEach((p) => p.close());
        this.selected = null;
      });

      point.mobileCloseButton.addEventListener("click", () => {
        this.points
          .filter((index) => index !== this.selected)
          .forEach((p) => p.close());
        this.selected = null;
      });
    });
  }
}

class Project {
  constructor() {
    this.createCarousel();
    this.randomizeProjectsInSlider();
    this.createHotspots();
  }

  shuffle() {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  createCarousel() {
    const emblaNode = document.querySelector('[data-slider="wrapper"]');
    if (!emblaNode) return;

    let nextButtonHidden = false;
    let prevButtonHidden = true;
    const options = { loop: false, dragFree: true };
    const emblaApi = EmblaCarousel(emblaNode, options);
    const gradientNext = document.querySelector('[data-slider="fade-next"]');
    const nextBtn = gradientNext.querySelector('[data-slider="button"');
    const gradientPrev = document.querySelector('[data-slider="fade-prev"]');
    const prevBtn = gradientPrev.querySelector('[data-slider="button"');

    gradientPrev.classList.add("cant-scroll");

    emblaApi.on("scroll", (e) => {
      if (!emblaApi.canScrollNext() && !nextButtonHidden) {
        gradientNext.classList.add("cant-scroll");
        nextButtonHidden = true;
      } else if (emblaApi.canScrollNext() && nextButtonHidden) {
        gradientNext.classList.remove("cant-scroll");
        nextButtonHidden = false;
      }

      if (!emblaApi.canScrollPrev() && !prevButtonHidden) {
        gradientPrev.classList.add("cant-scroll");
        prevButtonHidden = true;
      } else if (emblaApi.canScrollPrev() && prevButtonHidden) {
        gradientPrev.classList.remove("cant-scroll");
        prevButtonHidden = false;
      }
    });

    nextBtn.addEventListener("click", () => {
      emblaApi.scrollNext();
    });

    prevBtn.addEventListener("click", () => {
      emblaApi.scrollPrev();
    });
  }

  randomizeProjectsInSlider() {
    const items = document.querySelectorAll(".project-slider-item");
    const parent = document.querySelector('[data-slider="container"]');

    if (!items?.length > 0 && !parent) return;

    for (var i = items.length; i >= 0; i--) {
      parent.appendChild(items[(Math.random() * i) | 0]);
    }
  }

  createHotspots() {
    this.containers = [
      ...document.querySelectorAll('[data-points="container"]'),
    ];
    if (this.containers?.length === 0) return;
    this.containers = this.containers.map((el) => new HotspotSection(el));
  }
}

new Project();
