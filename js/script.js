document.addEventListener("DOMContentLoaded", () => {
  // Year updating
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Bird flap, appears across the screen four times
  const bird = document.getElementById("bird");
  if (bird) {
    const frames = ["images/bird_down_left.png", "images/bird_up_left.png"];

    // Preload both frames
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === frames.length) startFlap();
      };
      img.onerror = () => console.error("FAILED to load:", src);
      img.src = src;
    });

    function startFlap() {
      let i = 0;
      setInterval(() => {
        i = 1 - i;
        bird.src = frames[i];
      }, 550); // slower flap
    }
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
