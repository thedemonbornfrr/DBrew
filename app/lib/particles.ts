import { tsParticles } from "tsparticles-slim";
import { loadSlim } from "tsparticles-slim";

export async function initParticles() {
  await loadSlim(tsParticles);

  tsParticles.load("tsparticles", {
    background: {
      color: "#0d0d0d",
    },
    fpsLimit: 120,
    particles: {
      color: { value: "#ffffff" },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: { enable: true, speed: 2 },
      number: { value: 80, density: { enable: true, area: 800 } },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  });
}
