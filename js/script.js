document.addEventListener("DOMContentLoaded", () => {
  // Year updating
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const bird = document.getElementById("bird");
  if (bird) {
    const frames = ["images/bird_down_left.png", "images/bird_up_left.png"];

    let flapTimer;
    let i = 0;

    function startFlap() {
      flapTimer = setInterval(() => {
        i = 1 - i;
        bird.src = frames[i];
      }, 550);
    }

    // preload frames
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === frames.length) startFlap();
      };
      img.src = src;
    });

    bird.addEventListener("animationend", (e) => {
      if (e.animationName === "fly-across") {
        clearInterval(flapTimer);
        bird.style.display = "none";
      }
    });
  }

  // Contact form popup (only if form exists)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for contacting us! We answer as quick as possible.");
      form.reset();
    });
  }
});
