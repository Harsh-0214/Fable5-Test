import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ } from "../data";
import { Reveal, SectionHead } from "./ui";

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];
  const last = idx === QUIZ.length - 1;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.a) setScore((s) => s + 1);
  };

  const next = () => {
    if (last) setDone(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  const verdict =
    score === QUIZ.length
      ? `Perfect — ${score}/${QUIZ.length}. You're ready to ship with Fable 5.`
      : score >= 3
        ? `Solid — ${score}/${QUIZ.length}. Skim the Playbook once more and you're set.`
        : `${score}/${QUIZ.length} — worth a second pass through "Under the Hood" above.`;

  return (
    <section id="quiz" className="mx-auto max-w-7xl px-[6vw] py-28">
      <SectionHead
        num="06 — CHECK YOUR KNOWLEDGE"
        title={
          <>
            Five questions. <em className="text-gold italic">No stakes.</em>
          </>
        }
      >
        If you can pass this, you know more about driving Fable 5 than most
        people shipping with it.
      </SectionHead>

      <Reveal>
        <div className="hairline rounded-2xl border bg-ink-2 p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="font-serif text-2xl font-medium">{verdict}</div>
                <button
                  onClick={reset}
                  className="mt-7 rounded-full bg-gold px-7 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
                >
                  Try again ↺
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 font-serif text-[1.35rem] font-medium">
                  {q.q}
                </div>
                <div className="grid gap-3">
                  {q.o.map((opt, i) => {
                    const state =
                      picked === null
                        ? "idle"
                        : i === q.a
                          ? "right"
                          : i === picked
                            ? "wrong"
                            : "idle";
                    return (
                      <button
                        key={opt}
                        onClick={() => pick(i)}
                        className={`rounded-xl border px-5 py-4 text-left text-[0.95rem] transition ${
                          state === "right"
                            ? "border-teal bg-teal/10"
                            : state === "wrong"
                              ? "border-ember bg-ember/10"
                              : "hairline bg-ink-3 hover:border-gold-soft"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-5 border-l-[3px] border-teal pl-4 text-[0.92rem] text-paper-dim"
                  >
                    {q.e}
                  </motion.div>
                )}
                <div className="mt-7 flex items-center justify-between">
                  <span className="font-mono text-[0.82rem] text-gold">
                    Question {idx + 1} / {QUIZ.length} · Score {score}
                  </span>
                  {picked !== null && (
                    <button
                      onClick={next}
                      className="rounded-full bg-gold px-7 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
                    >
                      {last ? "See result →" : "Next →"}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
