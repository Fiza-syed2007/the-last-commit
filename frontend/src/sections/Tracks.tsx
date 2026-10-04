import { motion } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Code2,
  GitBranch,
  Shield,
} from "lucide-react";

const tracks = [
  {
    id: "01",
    branch: "feature/ai",
    title: "ARTIFICIAL",
    subtitle: "INTELLIGENCE",
    description:
      "Build systems that reason, predict, generate, or automate meaningful problems.",
    icon: BrainCircuit,
  },
  {
    id: "02",
    branch: "feature/web",
    title: "WEB",
    subtitle: "ENGINEERING",
    description:
      "Create fast, responsive, intelligent web experiences that people actually want to use.",
    icon: Code2,
  },
  {
    id: "03",
    branch: "feature/cloud",
    title: "CLOUD",
    subtitle: "INFRASTRUCTURE",
    description:
      "Design reliable systems capable of surviving scale, failure, and real-world traffic.",
    icon: Cloud,
  },
  {
    id: "04",
    branch: "feature/security",
    title: "CYBER",
    subtitle: "SECURITY",
    description:
      "Build tools and systems that protect applications, users, data, and infrastructure.",
    icon: Shield,
  },
];

function Tracks() {
  return (
    <section
      id="tracks"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-5 py-32 md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-[0.3fr_1fr]">
          <div>
            <p className="font-mono text-xs text-green-400">
              03 // BRANCHES
            </p>

            <p className="mt-5 max-w-[180px] font-mono text-[10px] leading-5 text-gray-600">
              SELECT YOUR DEVELOPMENT PATH.
            </p>
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-8xl"
            >
              CHOOSE
              <br />
              YOUR
              <br />
              <span className="text-gray-600">BRANCH.</span>
            </motion.h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              Every team starts from the same repository. What you build from
              there is up to you.
            </p>
          </div>
        </div>

        {/* Branch visualization */}
        <div className="relative mt-24">
          {/* Main branch */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-5">
            {tracks.map((track, index) => {
              const Icon = track.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={track.id}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -50 : 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                  className="relative"
                >
                  {/* Branch connection */}
                  <div
                    className={`absolute top-10 hidden h-px w-[calc(50%-24px)] bg-white/10 md:block ${
                      isLeft
                        ? "right-1/2 mr-3"
                        : "left-1/2 ml-3"
                    }`}
                  />

                  {/* Main node */}
                  <div className="absolute left-6 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-green-400 bg-[#050505] md:left-1/2" />

                  {/* Card */}
                  <div
                    className={`pl-14 md:grid md:grid-cols-2 ${
                      isLeft ? "" : ""
                    }`}
                  >
                    <div
                      className={`${
                        isLeft
                          ? "md:pr-16"
                          : "md:col-start-2 md:pl-16"
                      }`}
                    >
                      <motion.div
                        whileHover={{
                          y: -6,
                          borderColor: "rgba(74,222,128,0.45)",
                        }}
                        transition={{ duration: 0.25 }}
                        className="group relative overflow-hidden border border-white/10 bg-[#080808] p-6 md:p-8"
                      >
                        {/* Hover sweep */}
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.7 }}
                          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-green-400/[0.05] to-transparent"
                        />

                        <div className="relative">
                          <div className="flex items-start justify-between">
                            <span className="font-mono text-[10px] text-gray-600">
                              {track.id}
                            </span>

                            <Icon
                              size={19}
                              strokeWidth={1.5}
                              className="text-gray-600 transition-colors duration-300 group-hover:text-green-400"
                            />
                          </div>

                          <div className="mt-7 flex items-center gap-2 font-mono text-[10px] text-green-400">
                            <GitBranch size={12} />
                            {track.branch}
                          </div>

                          <h3 className="mt-5 text-3xl font-black leading-[0.9] tracking-tight md:text-4xl">
                            {track.title}
                            <br />
                            <span className="text-gray-600">
                              {track.subtitle}
                            </span>
                          </h3>

                          <p className="mt-6 max-w-md text-sm leading-6 text-gray-500">
                            {track.description}
                          </p>

                          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[9px] text-gray-600">
                            <span>BRANCH READY</span>
                            <span className="transition-colors group-hover:text-green-400">
                              CHECKOUT →
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Terminal footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border border-white/10 bg-[#080808] p-5 font-mono text-xs"
        >
          <div className="flex gap-2">
            <span className="text-green-400">$</span>
            <span className="text-gray-400">git branch --list</span>
          </div>

          <div className="mt-4 space-y-1 text-gray-600">
            <p className="text-green-400">* main</p>
            <p>  feature/ai</p>
            <p>  feature/web</p>
            <p>  feature/cloud</p>
            <p>  feature/security</p>
          </div>

          <div className="mt-5 text-gray-700">
            4 branches detected. Waiting for your commit.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Tracks;