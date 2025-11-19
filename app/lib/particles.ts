"use client";

import { useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
  useEffect(() => {
    // Pre-load slim
    loadSlim((window as any).tsParticles as Engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
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
      }}
      className="fixed inset-0 -z-10"
    />
  );
}
