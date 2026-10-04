import { motion } from "framer-motion";
import { useMemo } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
}

function RepositoryGraph() {
  const nodes = useMemo<Node[]>(() => {
    return Array.from({ length: 55 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/[0.04] blur-[120px]" />

      {/* Repository nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-green-400"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
          }}
          animate={{
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Main branch */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 8% 70% C 25% 60%, 28% 35%, 45% 42% S 70% 65%, 92% 25%"
          fill="none"
          stroke="currentColor"
          className="text-green-400"
          strokeWidth="1"
          strokeDasharray="4 10"
          animate={{
            strokeDashoffset: [0, -100],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <path
          d="M 30% 60% C 38% 50%, 40% 78%, 52% 70%"
          fill="none"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.5"
          strokeDasharray="3 8"
        />

        <path
          d="M 55% 42% C 62% 30%, 70% 35%, 78% 20%"
          fill="none"
          stroke="currentColor"
          className="text-white"
          strokeWidth="0.5"
          strokeDasharray="3 8"
        />
      </svg>
    </div>
  );
}

export default RepositoryGraph;