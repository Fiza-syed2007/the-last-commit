import { motion, useScroll, useTransform } from "framer-motion";
import { GitCommitHorizontal } from "lucide-react";
import { useRef } from "react";

const commits = [
  {
    hash: "7f21a9",
    label: "INIT",
    title: "THE IDEA",
    description:
      "Every project begins with a single decision. A blank repository. An empty canvas. One idea worth building.",
  },
  {
    hash: "91bc42",
    label: "BUILD",
    title: "THE FIRST BUILD",
    description:
      "The architecture takes shape. Components connect. The first working version appears.",
  },
  {
    hash: "c4e871",
    label: "CHAOS",
    title: "THINGS BREAK",
    description:
      "Deadlines get closer. Bugs appear. Features collide. The repository becomes a battlefield.",
  },
  {
    hash: "a83f91",
    label: "FINAL",
    title: "THE LAST COMMIT",
    description:
      "One final push. Your team. Your idea. Your code. This is where the history changes.",
  },
];

function GitHistory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-5 py-32 md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="font-mono text-xs text-green-400">
              02 // GIT_HISTORY
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 font-mono text-xs text-gray-600"
            >
              REPOSITORY LOG
            </motion.div>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-8xl"
            >
              EVERY
              <br />
              COMMIT
              <br />
              <span className="text-gray-600">MATTERS.</span>
            </motion.h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              A repository is a record of every decision that came before.
              Your hackathon journey is no different.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-32">
          {/* Background timeline */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          {/* Animated timeline */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-px origin-top bg-green-400 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-32 md:space-y-48">
            {commits.map((commit, index) => (
              <motion.div
                key={commit.hash}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                className={`relative grid md:grid-cols-2 ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {/* Commit marker */}
                <div className="absolute left-4 top-0 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    whileInView={{
                      scale: [0.7, 1.2, 1],
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex h-9 w-9 items-center justify-center border border-green-400/50 bg-[#050505]"
                  >
                    <GitCommitHorizontal
                      size={15}
                      className="text-green-400"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`pl-14 md:w-[80%] ${
                    index % 2 === 0
                      ? "md:col-start-1 md:pr-16 md:pl-0"
                      : "md:col-start-2 md:ml-auto md:pl-16"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gray-600">
                    COMMIT {index + 1} / {commits.length}
                  </div>

                  <div className="mt-3 flex items-center gap-3 font-mono text-xs text-green-400 md:justify-start">
                    <span>{commit.hash}</span>
                    <span className="text-gray-700">—</span>
                    <span>{commit.label}</span>
                  </div>

                  <h3 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
                    {commit.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-gray-500">
                    {commit.description}
                  </p>

                  <div
                    className={`mt-8 inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] text-gray-600 ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    VERIFIED COMMIT
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ending statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-40 border-t border-white/10 pt-10"
        >
          <div className="flex flex-col justify-between gap-6 font-mono text-xs text-gray-600 md:flex-row">
            <span>HEAD → FINAL</span>
            <span>HISTORY IS WAITING</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GitHistory;