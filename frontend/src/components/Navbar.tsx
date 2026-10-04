import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-40 px-5 py-5 md:px-10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md">
        <a
          href="#home"
          className="font-mono text-sm font-bold tracking-wider"
        >
          T<span className="text-green-400">.</span>LC
        </a>

        <div className="hidden items-center gap-8 font-mono text-xs text-gray-400 md:flex">
  <a href="#about" className="transition hover:text-white">
    HISTORY
  </a>

  <a href="#tracks" className="transition hover:text-white">
    BRANCHES
  </a>

  <a href="#prizes" className="transition hover:text-white">
    RELEASES
  </a>

  <a href="#final" className="transition hover:text-white">
    FINAL
  </a>
</div>

        <a
          href="/register"
          className="group flex items-center gap-2 border border-green-400/40 px-4 py-2 font-mono text-xs text-green-400 transition hover:bg-green-400 hover:text-black"
        >
          REGISTER
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.nav>
  );
}

export default Navbar;