const blocksToMix = document.querySelectorAll(".mixing-blocks > *");
const projectsWrapper = document.querySelector(".sector-projects-wrapper");
const projects = projectsWrapper?.children;

console.log({
  projectsWrapper,
  blocksToMix,
  p: projects?.length,
});

const gridPatternIndex = (num) => {
  return num * 3;
};

const alignMixBlock = (el) => {
  const align = el.dataset?.align?.toLowerCase() || "left"; // default to left
  el.style.justifyContent = align === "left" ? "flex-start" : "flex-end";
};

const hideMixBlock = (el) => {
  el.style.display = "none";
  el.setAttribute("aria-hidden", "true");
};

const addStatsToProjectList = () => {
  blocksToMix.forEach((block, i) => {
    // console.log({ i })
    const indexToPlace = gridPatternIndex(i + 1);
    // console.log('placing at:', indexToPlace)

    if (indexToPlace + 1 > projects.length) {
      hideMixBlock(block);
      return;
    }

    const projectBefore = projects[indexToPlace - 1];

    projectsWrapper.insertBefore(block, projectBefore);
    alignMixBlock(block);
  });
};

const addSlashes = () => {
  const elements = document.querySelectorAll(".has-slashes");
};

addStatsToProjectList();
