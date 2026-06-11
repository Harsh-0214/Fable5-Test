import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import { Counter } from "./ui";
import { STATS } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.8, ease: [0.21, 0.6, 0.35, 1] as const },
  }),
};

export default function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-[6vw] pt-32 pb-20 text-center"
    >
      <ParticleField />
      <div className="relative z-10 max-w-5xl">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-9 inline-block rounded-full border border-gold/35 bg-gold/5 px-4 py-2 font-mono text-xs tracking-[0.25em] text-gold uppercase"
        >
          Anthropic · Mythos-class · claude-fable-5
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-serif text-[clamp(3rem,8vw,6.4rem)] leading-[1.02] font-[380] tracking-[-0.02em]"
        >
          The model that works
          <br />
          like a{" "}
          <em className="bg-gradient-to-r from-gold to-ember bg-clip-text font-[560] text-transparent italic">
            colleague
          </em>
          ,
          <br />
          not a chatbot.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-8 max-w-2xl text-lg font-light text-paper-dim"
        >
          Claude Fable 5 is Anthropic's most capable widely released model —
          the first of the Claude 5 family, built for the hardest reasoning and
          the longest-running autonomous work. This is your field guide: what
          it does, how to drive it, and what to build with it.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-11 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#capabilities"
            className="rounded-full bg-gold px-8 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,176,75,0.35)]"
          >
            Explore what it can do
          </a>
          <a
            href="#playbook"
            className="hairline rounded-full border px-8 py-3.5 text-paper transition hover:border-gold hover:text-gold"
          >
            Skip to the playbook
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="hairline mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="hairline border bg-ink-2/80 px-4 py-6 backdrop-blur"
            >
              <div className="font-serif text-[2.1rem] font-medium text-gold">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-[0.72rem] tracking-[0.14em] text-paper-dim uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 text-[0.75rem] tracking-[0.2em] text-paper-dim uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        scroll ↓
      </motion.div>
    </header>
  );
}
