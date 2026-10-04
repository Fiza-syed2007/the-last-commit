import { motion } from "framer-motion";
import {
  Box,
  Download,
  GitCommit,
  Package,
  Trophy,
} from "lucide-react";

const prizes = [
  {
    version: "v1.0.0",
    name: "THE FINAL BUILD",
    label: "GRAND PRIZE",
    description:
      "The team that delivers the final build earns the primary release.",
    icon: Trophy,
    amount: "₹50,000",
  },
  {
    version: "v0.9.0",
    name: "BREAKTHROUGH",
    label: "SECOND PRIZE",
    description:
      "For a solution that demonstrates a strong technical idea and execution.",
    icon: Package,
    amount: "₹25,000",
  },
  {
    version: "v0.8.0",
    name: "RISING BUILD",
    label: "THIRD PRIZE",
    description:
      "For a team that turns a promising concept into a working product.",
    icon: Box,
    amount: "₹15,000",
  },
];

function Prizes() {
  return (
    <section
      id="prizes"
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-5 py-32 md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="font-mono text-xs text-green-400">
              04 // RELEASES
            </p>

            <p className="mt-5 max-w-[190px] font-mono text-[10px] leading-5 text-gray-600">
              SUCCESSFUL BUILDS ARE REWARDED WITH RELEASES.
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
              SHIP
              <br />
              THE
              <br />
              <span className="text-gray-600">BUILD.</span>
            </motion.h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
              Build something worth releasing. Every successful submission
              becomes part of the repository history.
            </p>
          </div>
        </div>

        {/* Release list */}
        <div className="mt-28">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;

            return (
              <motion.div
                key={prize.version}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                className="group relative border-t border-white/10"
              >
                <div className="grid gap-8 py-10 md:grid-cols-[0.2fr_0.45fr_1fr_0.25fr] md:items-center md:gap-10">
                  {/* Version */}
                  <div>
                    <div className="font-mono text-xs text-green-400">
                      {prize.version}
                    </div>

                    <div className="mt-2 font-mono text-[9px] text-gray-700">
                      RELEASE
                    </div>
                  </div>

                  {/* Prize */}
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-gray-600 transition-colors duration-300 group-hover:text-green-400"
                      />

                      <span className="font-mono text-[10px] text-gray-500">
                        {prize.label}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                      {prize.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="max-w-xl text-sm leading-6 text-gray-500">
                    {prize.description}
                  </p>

                  {/* Amount */}
                  <div className="md:text-right">
                    <span className="font-mono text-2xl font-bold text-white md:text-3xl">
                      {prize.amount}
                    </span>
                  </div>
                </div>

                {/* Hover line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-green-400"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Release terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 border border-white/10 bg-[#080808]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <GitCommit size={15} className="text-green-400" />

              <span className="font-mono text-[10px] text-gray-500">
                RELEASE_PIPELINE
              </span>
            </div>

            <span className="font-mono text-[9px] text-gray-700">
              PRODUCTION
            </span>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-3 md:p-8">
            <div>
              <p className="font-mono text-[9px] text-gray-700">
                BUILD STATUS
              </p>

              <p className="mt-3 font-mono text-sm text-green-400">
                ● PASSING
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-gray-700">
                TESTS
              </p>

              <p className="mt-3 font-mono text-sm text-white">
                128 / 128 PASSED
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] text-gray-700">
                DEPLOYMENT
              </p>

              <p className="mt-3 flex items-center gap-2 font-mono text-sm text-white">
                <Download size={13} />
                READY
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing */}
        <div className="mt-12 flex flex-col justify-between gap-4 font-mono text-[9px] text-gray-700 md:flex-row">
          <span>RELEASES // 03</span>
          <span>BUILD. TEST. SHIP.</span>
        </div>
      </div>
    </section>
  );
}

export default Prizes;