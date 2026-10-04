import { motion } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import RepositoryGraph from "../components/RepositoryGraph";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 md:px-10"
    >
      <RepositoryGraph />
      

      {/* Green ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-7 flex items-center gap-3 font-mono text-xs text-green-400"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            SYSTEM ONLINE // HACKATHON 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="max-w-5xl text-[15vw] font-black leading-[0.8] tracking-[-0.07em] sm:text-8xl md:text-[9rem] lg:text-[10rem]"
          >
            THE
            <br />
            LAST
            <br />
            <span className="text-green-400">COMMIT</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-10 max-w-xl text-sm leading-7 text-gray-400 md:text-base"
          >
            The clock is running. Your team has one final chance to build
            something that matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="/register"
              className="bg-green-400 px-6 py-3 font-mono text-xs font-bold text-black transition hover:bg-green-300"
            >
              ENTER THE HACKATHON →
            </a>

            <a
              href="#about"
              className="border border-white/15 px-6 py-3 font-mono text-xs text-gray-300 transition hover:border-white/40 hover:text-white"
            >
              EXPLORE
            </a>
          </motion.div>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative"
        >
          <div className="border border-white/10 bg-[#090909]/90 shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>

              <Terminal size={15} className="text-gray-600" />

              <span className="font-mono text-[9px] text-gray-600">
                final_commit.sh
              </span>
            </div>

            {/* Terminal content */}
            <div className="min-h-[300px] p-5 font-mono text-xs leading-7 md:min-h-[350px]">
              <p className="text-gray-500">
                $ git status
              </p>

              <p className="mt-3 text-green-400">
                ● SYSTEM READY
              </p>

              <p className="text-gray-500">
                ● BUILD STATUS:
                <span className="text-green-400"> PASSING</span>
              </p>

              <p className="text-gray-500">
                ● DEPLOYMENT:
                <span className="text-yellow-400"> PENDING</span>
              </p>

              <div className="my-6 h-px bg-white/10" />

              <p className="text-gray-500">
                $ git commit -m
              </p>

              <p className="mt-2 text-white">
                "make it count"
              </p>

              <p className="mt-6 text-green-400">
                [████████████████████] 100%
              </p>

              <p className="mt-3 text-gray-600">
                Everything comes down to this.
              </p>

              <span className="mt-2 inline-block h-4 w-2 animate-pulse bg-green-400" />
            </div>
          </div>

          {/* Terminal status */}
          <div className="mt-4 flex justify-between font-mono text-[9px] text-gray-600">
            <span>BUILD #026</span>
            <span>LATENCY 12ms</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-600 md:flex"
      >
        <span className="font-mono text-[9px]">SCROLL TO EXPLORE</span>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  );
}

export default Hero;