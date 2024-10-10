const createModalAnimation = () => {
  const modal = document.querySelector(".modal-wrapper");

  if (!modal) return;

  let isOpen = modal.dataset.open === "true";
  const modalContent = modal.querySelector(".modal-form");

  const triggers = document.querySelectorAll('[data-modal="trigger"]');

  const tl = gsap.timeline({
    paused: true,
  });

  tl.to(
    modal,
    {
      display: "flex",
      duration: 0,
      ease: "none",
    },
    0
  )
    .from(
      modal,
      {
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
      },
      0.2
    )
    .to(
      modalContent,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out",
      },
      0.2
    );

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      isOpen ? tl.reverse() : tl.play();
      modal.setAttribute("data-open", isOpen ? "false" : "true");
      isOpen = !isOpen;
    });
  });
};

createModalAnimation();
