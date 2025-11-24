import React, { useEffect, useRef } from "react";

const DNAAnimation: React.FC = () => {
  const dnaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dna = dnaRef.current;
    if (!dna) return;

    const colors = [
      "#1e88e5",
      "#ea6024",
      "#ccc24f",
      "#89b82a",
      "#bda098",
      "#188cc5",
      "#8b909c",
      "#f7b561",
      "#e86421",
      "#dac258",
      "#3676a0",
    ];

    const createDNA = () => {
      if (!dna) return;
      dna.innerHTML = "";
      const width = dna.offsetWidth;
      const height = dna.offsetHeight;

      const cols = Math.floor(width / 30);
      const rows = 9;
      const spacingX = width / (cols + 1);
      const spacingY = height / (rows + 1);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const offset1 = Math.sin((c / cols) * Math.PI * 2) * 40;
          const y1 = r * spacingY + offset1 + spacingY / 2;
          if (Math.random() > 0.6) continue;
          addDot(c * spacingX, y1);

          const offset2 = Math.sin((c / cols) * Math.PI * 2 + Math.PI) * 40;
          const y2 = r * spacingY + offset2 + spacingY / 2;
          if (Math.random() > 0.6) continue;
          addDot(c * spacingX, y2);
        }
      }
    };

    const addDot = (left: number, top: number) => {
      const dot = document.createElement("div");
      const size = 6 + Math.random() * 12;
      dot.className = "dot";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${left}px`;
      dot.style.top = `${top}px`;
      dot.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      dna.appendChild(dot);
    };

    createDNA();
    window.addEventListener("resize", createDNA);
    return () => window.removeEventListener("resize", createDNA);
  }, []);

  return <div id="dna" ref={dnaRef} className="dna"></div>;
};

export default DNAAnimation;
