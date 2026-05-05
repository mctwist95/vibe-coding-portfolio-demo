const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const dots = Array.from(document.querySelectorAll(".dot"));
const heroImage = document.getElementById("heroImage");
const showcaseImage = document.getElementById("showcaseImage");
const slideCounter = document.getElementById("slideCounter");

const slides = [
  {
    hero: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
    showcase:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    hero: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=700&q=80",
    showcase:
      "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=800&q=80"
  },
  {
    hero: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=700&q=80",
    showcase:
      "https://images.unsplash.com/photo-1529336953121-a0ce8d73cd49?auto=format&fit=crop&w=800&q=80"
  }
];

let activeIndex = 0;
let autoTimer = null;

function setSlide(index) {
  activeIndex = index;
  heroImage.src = slides[index].hero;
  showcaseImage.src = slides[index].showcase;
  slideCounter.textContent = `${index + 1} / ${slides.length}`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}

function nextSlide() {
  const nextIndex = (activeIndex + 1) % slides.length;
  setSlide(nextIndex);
}

function restartAutoSlide() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 4500);
}

menuBtn?.addEventListener("click", () => {
  navMenu?.classList.toggle("open");
});

dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    setSlide(idx);
    restartAutoSlide();
  });
});

setSlide(0);
restartAutoSlide();
