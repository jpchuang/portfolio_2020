const signs = document.querySelectorAll(".neon");
const randomIn = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const mixupInterval = el => {
  const ms = randomIn(50, 1000);
  el.style.setProperty("--interval", `${ms}ms`);
};

signs.forEach(el => {
  mixupInterval(el);
  el.addEventListener("webkitAnimationIteration", () => {
    mixupInterval(el);
  });
});
