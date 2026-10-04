import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  "INITIALIZING SYSTEM...",
  "LOADING HACKATHON CORE...",
  "CHECKING BUILD STATUS...",
  "ESTABLISHING CONNECTION...",
  "SYSTEM READY.",
];

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => {
        if (current >= bootMessages.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 700);

          return current;
        }

        return current + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white"
    >
      <div className="w-[90%] max-w-xl font-mono">
        <div className="mb-6 text-xs text-gray-500">
          THE_LAST_COMMIT // SYSTEM_BOOT
        </div>

        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm md:text-base"
        >
          <span className="mr-3 text-green-400">{">"}</span>
          {bootMessages[messageIndex]}
        </motion.div>

        <div className="mt-6 h-[2px] w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-green-400"
            initial={{ width: "0%" }}
            animate={{
              width: `${((messageIndex + 1) / bootMessages.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-3 text-right text-xs text-gray-600">
          {Math.round(
            ((messageIndex + 1) / bootMessages.length) * 100
          )}
          %
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;