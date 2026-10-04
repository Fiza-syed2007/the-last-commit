import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
  });

  const y = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/[0.06] blur-2xl md:block"
      style={{
        left: x,
        top: y,
      }}
    />
  );
}

export default CursorGlow;