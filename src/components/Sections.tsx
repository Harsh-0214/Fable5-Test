import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAPABILITIES, PLAYBOOK, MONEY, MARQUEE, CREATIVE } from "../data";
import { Reveal, SectionHead } from "./ui";

/* ============ Capabilities ============ */
export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-[6vw] py-28">
      <SectionHead
        num="01 — CAPABILITIES"
        title={
          <>
            Don't test it on yesterday's tasks.
            <br />
            <em className="text-gold italic">Give it the hard ones.</em>
          </>
        }
      >
        Fable 5's biggest gains are on work <strong>above</strong> what prior
        models could do. Teams with the best results gave it their hardest
        unsolved problems first — let it scope the problem, ask questions,
        then execute.
      </SectionHead>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.08}>
            <div className="hairline card-hover h-full rounded-2xl border bg-ink-2 p-7">
              <span className="mb-3.5 block text-2xl">{c.icon}</span>
              <h3 className="mb-2.5 font-serif text-xl font-medium">
                {c.title}
              </h3>
              <p className="text-[0.95rem] font-light text-paper-dim">
                {c.body}
              </p>
              <span className="mt-4 inline-block rounded-full border border-teal/30 px-2.5 py-1 font-mono text-[0.68rem] tracking-wider text-teal">
                {c.tag}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Playbook ============ */
export function Playbook() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="playbook" className="mx-auto max-w-7xl px-[6vw] py-28">
      <SectionHead
        num="03 — THE PLAYBOOK"
        title={
          <>
            How to get <em className="text-gold italic">10×</em> out of it.
          </>
        }
      >
        These are the patterns Anthropic's own migration guidance recommends —
        distilled into eight habits. Each one includes a snippet you can paste
        straight into a system prompt or first message.
      </SectionHead>
      <Reveal>
        <div className="hairline overflow-hidden rounded-2xl border bg-ink-2">
          {PLAYBOOK.map((p, i) => (
            <div key={p.title} className={i > 0 ? "hairline border-t" : ""}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left text-[1.05rem] transition hover:text-gold"
              >
                {p.title}
                <motion.span
                  className="shrink-0 font-serif text-2xl text-gold"
                  animate={{ rotate: open === i ? 45 : 0 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-7 text-[0.95rem] font-light text-paper-dim">
                      {p.body}
                      {p.snippet && (
                        <div className="mt-3.5 rounded-r-xl border-l-[3px] border-gold bg-[#0a0910] px-4.5 py-4 font-mono text-[0.8rem] whitespace-pre-wrap text-gold-soft">
                          {p.snippet}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ============ Money ============ */
const DIFF_STYLES: Record<string, string> = {
  teal: "text-teal border-teal/40",
  gold: "text-gold border-gold/40",
  ember: "text-ember border-ember/40",
};

export function Money() {
  return (
    <section id="money" className="mx-auto max-w-7xl px-[6vw] py-28">
      <SectionHead
        num="04 — EARNING WITH IT"
        title={
          <>
            Turning capability into{" "}
            <em className="text-gold italic">income</em>.
          </>
        }
      >
        The honest framing first: Fable 5 doesn't print money — it compresses
        skilled labor. Every model below works because the model does in hours
        what used to take days, and you sell the outcome, not the tokens.
        Margins live in the gap between what clients pay for results and what
        compute costs you (see the calculator above).
      </SectionHead>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MONEY.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 0.08}>
            <div className="hairline card-hover flex h-full flex-col rounded-2xl border bg-ink-2 p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl font-medium">{m.title}</h3>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.66rem] tracking-widest ${DIFF_STYLES[m.diffColor]}`}
                >
                  {m.diff}
                </span>
              </div>
              <p className="mt-3 text-[0.95rem] font-light text-paper-dim">
                {m.body}
              </p>
              <ul className="mt-3.5 list-disc space-y-1.5 pl-4.5 text-[0.9rem] font-light text-paper-dim">
                {m.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="rounded-2xl border border-gold/35 bg-ink-2 p-7">
          <h3 className="mb-2.5 font-serif text-xl font-medium text-gold">
            The unit-economics habit
          </h3>
          <p className="text-[0.95rem] font-light text-paper-dim">
            Before launching anything: estimate cost-per-job with the
            calculator above, price the outcome at what the <em>labor</em> used
            to cost, and keep the spread. Example: a research report that costs
            you ~$4 in compute and 1 hour of review, sold at $400, is a real
            business. A $0.02 API wrapper sold at $0.05 is a hobby. Cache
            aggressively, batch what isn't urgent, and run routine routes at
            lower effort.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ============ Creative ============ */
function MarqueeItem({ text }: { text: string }) {
  const parts = text.split("|");
  return (
    <span className="font-serif text-xl text-paper-dim italic">
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <b key={i} className="font-medium text-gold not-italic">
            {p}
          </b>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}

export function Creative() {
  return (
    <>
      <section id="creative" className="mx-auto max-w-7xl px-[6vw] pt-28 pb-14">
        <SectionHead
          num="05 — THE CREATIVE FRONTIER"
          title={
            <>
              Uses nobody's <em className="text-gold italic">bored of</em> yet.
            </>
          }
        >
          A 1M-token context, dependable sub-agents, real memory, and
          minutes-long deep reasoning unlock genres of project that simply
          weren't possible before. Steal any of these.
        </SectionHead>
      </section>

      <Reveal>
        <div className="hairline marquee-pause overflow-hidden border-y py-5">
          <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <MarqueeItem key={i} text={m} />
            ))}
          </div>
        </div>
      </Reveal>

      <section className="mx-auto max-w-7xl px-[6vw] pt-14 pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CREATIVE.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <div className="hairline card-hover h-full rounded-2xl border bg-ink-2 p-7">
                <span className="mb-3.5 block text-2xl">{c.icon}</span>
                <h3 className="mb-2.5 font-serif text-xl font-medium">
                  {c.title}
                </h3>
                <p className="text-[0.95rem] font-light text-paper-dim">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
