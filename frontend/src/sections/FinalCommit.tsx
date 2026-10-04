import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  GitCommit,
  Terminal,
} from "lucide-react";

function FinalCommit() {
  return (
    <section
      id="final"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-white/10 bg-[#050505] px-5 py-32 md:px-10 md:py-48"
    >
      {/* Background commit number */}
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 font-black text-[35vw] leading-none tracking-[-0.1em] text-white/[0.025]">
        05
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 font-mono text-xs text-green-400"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              05 // FINAL_COMMIT
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-8 text-6xl font-black leading-[0.82] tracking-[-0.07em] md:text-[9rem]"
            >
              MAKE
              <br />
              IT
              <br />
              <span className="text-green-400">COUNT.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 max-w-lg text-sm leading-7 text-gray-500 md:text-base"
            >
              The repository is ready. The branches are open. There's only
              one thing left to do.
            </motion.p>
          </div>

          {/* Right terminal */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-white/10 bg-[#080808] shadow-2xl"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <Terminal size={15} className="text-green-400" />

                <span className="font-mono text-[10px] text-gray-500">
                  final_commit.sh
                </span>
              </div>

              <span className="font-mono text-[9px] text-gray-700">
                THE_LAST_COMMIT
              </span>
            </div>

            {/* Terminal body */}
            <div className="min-h-[380px] p-6 font-mono text-xs leading-7 md:p-8">
              <div className="text-gray-600">
                $ git status
              </div>

              <div className="mt-4 text-green-400">
                ● ALL SYSTEMS READY
              </div>

              <div className="text-gray-600">
                ● BRANCH:
                <span className="text-white"> main</span>
              </div>

              <div className="text-gray-600">
                ● HEAD:
                <span className="text-green-400"> FINAL</span>
              </div>

              <div className="my-8 h-px bg-white/10" />

              <div className="text-gray-600">
                $ git commit -m
              </div>

              <div className="mt-2 text-white">
                "make it count"
              </div>

              <div className="mt-8 space-y-2">
                <p className="text-gray-600">
                  &gt; validating author...
                  <span className="ml-2 text-green-400">OK</span>
                </p>

                <p className="text-gray-600">
                  &gt; checking team...
                  <span className="ml-2 text-green-400">OK</span>
                </p>

                <p className="text-gray-600">
                  &gt; checking repository...
                  <span className="ml-2 text-green-400">OK</span>
                </p>

                <p className="text-gray-600">
                  &gt; preparing final commit...
                  <span className="ml-2 text-green-400">OK</span>
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3 text-green-400">
                  <Check size={14} />
                  READY TO PUSH
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="border-t border-white/10 p-5">
              <a
                href="/register"
                className="group flex w-full items-center justify-between bg-green-400 px-5 py-4 font-mono text-xs font-bold text-black transition hover:bg-green-300"
              >
                <span>CREATE FINAL COMMIT</span>

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom status */}
        <div className="mt-24 grid gap-6 border-t border-white/10 pt-6 font-mono text-[9px] text-gray-700 md:grid-cols-3">
          <div className="flex items-center gap-2">
            <GitCommit size={12} />
            HEAD → FINAL
          </div>

          <div>STATUS → WAITING FOR AUTHOR</div>

          <div className="md:text-right">
            COMMIT REMAINING → 01
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCommit;