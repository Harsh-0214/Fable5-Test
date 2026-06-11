import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EFFORT_LEVELS } from "../data";
import { SectionHead, Reveal } from "./ui";

const TABS = [
  { id: "thinking", label: "Thinking" },
  { id: "effort", label: "Effort dial" },
  { id: "tokens", label: "New tokenizer" },
  { id: "safety", label: "Safety & refusals" },
  { id: "cost", label: "Cost calculator" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <pre className="hairline relative overflow-x-auto rounded-xl border bg-[#0a0910] p-6 font-mono text-[0.84rem] leading-7 text-paper">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="hairline absolute top-3 right-3 rounded-lg border bg-ink-3 px-3 py-1.5 font-mono text-[0.68rem] text-paper-dim transition hover:border-gold hover:text-gold"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
      <code>{code}</code>
    </pre>
  );
}

function Card({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="hairline card-hover rounded-2xl border bg-ink-2 p-8">
      <h3 className="mb-3 font-serif text-xl font-medium">{title}</h3>
      <div className="space-y-3 text-[0.95rem] font-light text-paper-dim">
        {children}
      </div>
    </div>
  );
}

function Meter({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="mb-3 flex items-center gap-3 text-[0.78rem] tracking-[0.1em] text-paper-dim uppercase">
      <span className="w-28 shrink-0">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink">
        <motion.i
          className="block h-full rounded-full bg-gradient-to-r from-teal to-gold"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

function EffortDial() {
  const [idx, setIdx] = useState(2);
  const level = EFFORT_LEVELS[idx];
  return (
    <div className="hairline rounded-2xl border bg-ink-2 p-10">
      <p className="text-paper-dim">
        The <b className="text-gold">effort parameter</b> is your single most
        important control: it sets how much the model thinks <em>and</em> acts.
        Click a level to see when to use it. Surprise: <em>low</em> on Fable 5
        often beats <em>max</em> on previous-generation models.
      </p>
      <div className="my-7 grid grid-cols-5 gap-2">
        {EFFORT_LEVELS.map((l, i) => (
          <button
            key={l.key}
            onClick={() => setIdx(i)}
            className={`hairline rounded-xl border px-1.5 py-4 text-center font-mono text-[0.8rem] tracking-wide transition ${
              i === idx
                ? "border-gold bg-gradient-to-br from-gold/20 to-ember/15 font-semibold text-gold"
                : "bg-ink-3 text-paper-dim hover:border-gold-soft"
            }`}
          >
            {l.key}
          </button>
        ))}
      </div>
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={level.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h4 className="mb-2.5 font-serif text-2xl font-medium text-gold">
                {level.name}
              </h4>
              <p className="text-[0.97rem] text-paper-dim">{level.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-1">
          <Meter label="Intelligence" pct={level.intelligence} />
          <Meter label="Speed" pct={level.speed} />
          <Meter label="Cost control" pct={level.cost} />
          <div className="mt-4 flex items-center gap-3 text-[0.78rem] tracking-[0.1em] text-paper-dim uppercase">
            <span className="w-28 shrink-0">Best for</span>
            <span className="font-mono text-[0.8rem] tracking-normal text-gold normal-case">
              {level.bestFor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const usd = (n: number) =>
  "$" +
  (n < 10
    ? n.toFixed(n < 0.1 ? 4 : 2)
    : n.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }));

function Calculator() {
  const [input, setInput] = useState(20000);
  const [output, setOutput] = useState(4000);
  const [reqs, setReqs] = useState(50);
  const [cached, setCached] = useState(false);

  const { perReq, inCost, outCost } = useMemo(() => {
    // $10/M input, $50/M output; cache: 80% of input at 0.1×
    const inCost = cached
      ? (input * 0.2 * 10 + input * 0.8 * 1) / 1e6
      : (input * 10) / 1e6;
    const outCost = (output * 50) / 1e6;
    return { perReq: inCost + outCost, inCost, outCost };
  }, [input, output, cached]);

  const slider = (
    label: string,
    value: number,
    set: (n: number) => void,
    min: number,
    max: number,
    step: number,
  ) => (
    <div key={label}>
      <label className="mt-6 mb-2.5 block text-[0.78rem] tracking-[0.14em] text-paper-dim uppercase">
        {label}{" "}
        <span className="ml-2 font-mono text-[0.95rem] text-gold normal-case">
          {value.toLocaleString("en-US")}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(+e.target.value)}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="hairline rounded-2xl border bg-ink-2 p-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-paper-dim">
            Pricing: <b className="text-gold">$10 / 1M input</b> tokens,{" "}
            <b className="text-gold">$50 / 1M output</b> tokens. Drag to
            estimate a workload. Prompt caching can cut repeated-context input
            cost by up to ~90%; the Batch API halves everything for non-urgent
            jobs.
          </p>
          {slider("Input tokens per request", input, setInput, 1000, 500000, 1000)}
          {slider("Output tokens per request", output, setOutput, 500, 128000, 500)}
          {slider("Requests per day", reqs, setReqs, 1, 5000, 1)}
          <label className="mt-6 flex items-center gap-2.5 text-[0.9rem]">
            <input
              type="checkbox"
              checked={cached}
              onChange={(e) => setCached(e.target.checked)}
              className="h-4.5 w-4.5"
            />
            Assume 80% of input served from cache (~0.1× price)
          </label>
        </div>
        <div className="flex flex-col justify-center rounded-xl bg-ink-3 p-8">
          <div className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-medium text-gold">
            {usd(perReq * reqs)}
          </div>
          <div className="mt-1.5 text-[0.9rem] text-paper-dim">
            estimated per day
          </div>
          <hr className="hairline my-5 border-t" />
          {(
            [
              ["Per request", perReq],
              ["Per month (30d)", perReq * reqs * 30],
              ["Input share", inCost],
              ["Output share", outCost],
            ] as const
          ).map(([k, v]) => (
            <div
              key={k}
              className="my-1.5 flex justify-between text-[0.9rem] text-paper-dim"
            >
              <span>{k}</span>
              <b className="font-mono font-semibold text-paper">{usd(v)}</b>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-[0.8rem] text-paper-dim/80">
        Estimates only — actual usage varies with thinking depth, tool calls,
        and the new tokenizer (~30% more tokens than Opus-tier for the same
        text). Verify against your own usage objects.
      </p>
    </div>
  );
}

const THINKING_CODE = `# Python — minimal Fable 5 call
import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-fable-5",
    max_tokens=16000,
    # no \`thinking\` param — it's always on.
    # (an explicit disabled/budget config is rejected)
    output_config={"effort": "high"},
    messages=[{"role": "user",
               "content": "Design a rate limiter for..."}],
)

# always check stop_reason before reading content
if response.stop_reason == "refusal":
    handle_refusal(response.stop_details)
else:
    print(response.content[0].text)`;

const TOKEN_CODE = `# measure the tokenizer delta on YOUR prompts
resp = client.messages.count_tokens(
    model="claude-fable-5",
    messages=[{"role": "user", "content": my_prompt}],
)
print(resp.input_tokens)                  # new tokenizer (billed)
print(resp.input_tokens_prior_tokenizer)  # prior generation`;

export default function UnderHood() {
  const [tab, setTab] = useState<TabId>("thinking");

  return (
    <section id="under-hood" className="mx-auto max-w-7xl px-[6vw] py-28">
      <SectionHead
        num="02 — UNDER THE HOOD"
        title={
          <>
            What's actually <em className="text-gold italic">different</em>{" "}
            about it.
          </>
        }
      >
        Fable 5 isn't just "Opus but bigger." Several things changed at the API
        level — knowing them is the difference between fighting the model and
        flying it.
      </SectionHead>

      <Reveal className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-5 py-2.5 text-[0.88rem] transition ${
              tab === t.id
                ? "border-gold bg-gold font-semibold text-ink"
                : "hairline bg-ink-2 text-paper-dim hover:text-paper"
            }`}
          >
            {t.label}
          </button>
        ))}
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "thinking" && (
            <div className="grid gap-5 lg:grid-cols-2">
              <Card title="Always-on, protected reasoning">
                <p>
                  Thinking can't be turned off on Fable 5 — adaptive reasoning
                  is part of how the model works. You never see the raw chain
                  of thought (it's protected); instead you can request a
                  readable <em>summary</em> of the reasoning, or leave it
                  omitted for speed-of-display. Either way, the thinking
                  happens and informs the answer.
                </p>
                <p>
                  Practical upshot: stop budgeting "thinking tokens." Steer
                  depth with{" "}
                  <span className="font-mono text-gold">effort</span>, and if
                  your app shows reasoning to users, ask for the summarized
                  display so they see progress instead of a long pause.
                </p>
              </Card>
              <CodeBlock code={THINKING_CODE} />
            </div>
          )}

          {tab === "effort" && <EffortDial />}

          {tab === "tokens" && (
            <div className="grid gap-5 lg:grid-cols-2">
              <Card title="A new tokenizer — re-baseline everything">
                <p>
                  Fable 5 tokenizes the same content into roughly{" "}
                  <b className="text-gold">30% more tokens</b> than Opus-tier
                  models. Billing is per token, so an unchanged workload costs
                  more after migration even before the price difference — and
                  any max_tokens, context budgets, or cost dashboards
                  calibrated on older models are now wrong.
                </p>
                <p>
                  The fix is one call: the token-counting endpoint returns
                  counts under <em>both</em> tokenizers when you pass the
                  Fable 5 model ID, so you can measure the delta on your own
                  prompts before switching anything.
                </p>
              </Card>
              <div>
                <CodeBlock code={TOKEN_CODE} />
                <p className="mt-4 text-[0.8rem] text-paper-dim/80">
                  Rule of thumb: don't reuse <em>any</em> token math from
                  another model. Re-measure, then set budgets.
                </p>
              </div>
            </div>
          )}

          {tab === "safety" && (
            <div className="grid gap-5 lg:grid-cols-2">
              <Card
                title={
                  <>
                    The <span className="font-mono text-gold">refusal</span>{" "}
                    stop reason
                  </>
                }
              >
                <p>
                  Fable 5 runs safety classifiers on requests (targeting
                  research biology and most cybersecurity content). A declined
                  request still returns HTTP 200 — but with{" "}
                  <span className="font-mono">stop_reason: "refusal"</span> and
                  an empty or partial content array. Code that blindly reads{" "}
                  <span className="font-mono">content[0]</span> will crash on
                  it.
                </p>
                <p>
                  Benign adjacent work can occasionally trip a false positive,
                  so production apps configure a <b>fallback</b>: the beta{" "}
                  <span className="font-mono">fallbacks</span> parameter
                  retries the same request server-side on Opus 4.8 in one round
                  trip.
                </p>
              </Card>
              <Card title="Two operational requirements">
                <p>
                  <b className="text-gold">Data retention.</b> Fable 5 requires
                  30-day data retention — it's not available under
                  zero-data-retention configurations. If every request 400s
                  with a valid payload, check the org's retention setting
                  before debugging the request.
                </p>
                <p>
                  <b className="text-gold">Plan for long turns.</b> A single
                  request on a hard task can legitimately run many minutes.
                  Build with streaming, generous timeouts, and async check-ins
                  — don't block a web request on a 15-minute reasoning run.
                </p>
              </Card>
            </div>
          )}

          {tab === "cost" && <Calculator />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
