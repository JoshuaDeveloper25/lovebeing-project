import { useEffect } from "react";

const handleScrollReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("visible");
    } else {
      reveal.classList.remove("visible");
    }
  });
};

const ViewAnimationScroll = () => {
  useEffect(() => {
    window.addEventListener("scroll", handleScrollReveal);
    handleScrollReveal(); // Ejecuta al cargar para revelar elementos que ya están en la vista

    return () => {
      window.removeEventListener("scroll", handleScrollReveal);
    };
  }, []);
};

export default ViewAnimationScroll;
