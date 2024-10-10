gsap.registerPlugin(ScrollTrigger);

const DISTANCE = 32;
const createParallax = () => {
  // Containers to images
  const elements = document.querySelectorAll('[data-animation="parallax"]');

  if (!elements?.length > 0) {
    return;
  }

  elements.forEach((el, i) => {
    const img = el.querySelector("img");
    img.style.scale = 100 + DISTANCE + "%";

    gsap.to(img, {
      yPercent: DISTANCE / 2,
      ease: "none",
      scrollTrigger: {
        start: "top bottom",
        end: "bottom top",
        trigger: el,
        scrub: true,
      },
    });
  });
};
const initLenis = () => {
  if (!Lenis) {
    return;
  }
  const lenis = new Lenis();

  // lenis.on('scroll', (e) => {
  //     console.log(e)
  // })
  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

const createListFades = () => {
  const elements = document.querySelectorAll(".project-list-item");
  if (!elements?.length) return;
  // only do it for 3 and on since 2 are in viewport
  [...elements].slice(2).forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        start: "top 90%",
        trigger: el.parentNode,
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: "expo.out",
    });
  });
};

const createNumberCounters = () => {
  const elements = document.querySelectorAll('[data-animation="count"]');
  if (!elements?.length) return;
  elements.forEach((el, i) => {
    if (+el.textContent) {
      const currentNum = +el.textContent;
      gsap.from(el, {
        textContent: 0,
        snap: { textContent: 1 },
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          start: "top 95%",
          trigger: el,
        },
      });
    }
  });
};

createNumberCounters();
createListFades();
createParallax();
initLenis();
