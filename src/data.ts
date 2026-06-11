export const STATS = [
  { value: 1, suffix: "M", label: "Token context window" },
  { value: 128, suffix: "K", label: "Max output tokens" },
  { value: 5, suffix: "", label: "Effort levels, low → max" },
  { value: 15, suffix: "+ min", label: "Single-turn deep work, normal" },
];

export const CAPABILITIES = [
  {
    icon: "🌙",
    title: "Long-horizon autonomy",
    body: "State-of-the-art on long, autonomous agentic runs — complex refactors and overnight builds that finish without human correction. Give the full spec up front in one well-specified turn and let it run.",
    tag: "overnight runs",
  },
  {
    icon: "🏗️",
    title: "First-shot system builds",
    body: "Hand it a well-specified design and it can deliver a working implementation in one pass — gathering context, building, and self-verifying inside a single long turn.",
    tag: "spec → working code",
  },
  {
    icon: "📊",
    title: "End-to-end knowledge work",
    body: "Financial analysis, spreadsheets, slide decks, formatted documents — full enterprise deliverables produced and checked end-to-end, not just drafted.",
    tag: "deliverables, not drafts",
  },
  {
    icon: "🔍",
    title: "Code review & debugging",
    body: "Stronger real-bug finding with clearer explanations — including repository-history search to trace when and why a defect was introduced.",
    tag: "finds the real bug",
  },
  {
    icon: "👁️",
    title: "Vision on hard images",
    body: "Dense charts, degraded scans, flipped or blurry photos — it's explicitly trained to reach for crop and shell tools to clean up an image before reading it. High-resolution input, no downscaling cap.",
    tag: "degraded-input vision",
  },
  {
    icon: "🕸️",
    title: "Parallel sub-agents",
    body: "Delegation is dependable now. It sustains ongoing, asynchronous communication with long-running sub-agents and peer agents — an orchestrator that actually orchestrates.",
    tag: "multi-agent native",
  },
  {
    icon: "🧭",
    title: "Navigating ambiguity",
    body: "Performs notably better when it understands why you're asking. It connects a task to relevant context instead of guessing intent — and asks sharp questions when the brief is genuinely unclear.",
    tag: "intent-aware",
  },
  {
    icon: "🧠",
    title: "Thinking, always on",
    body: "Reasoning is built in and adaptive — the model decides how deeply to think per request. You steer depth with one parameter (effort), from quick passes to maximum rigor.",
    tag: "adaptive reasoning",
  },
  {
    icon: "📓",
    title: "Memory that compounds",
    body: "Give it a place to write notes — even a plain markdown file — and it gets measurably better over time, recording corrections and confirmed approaches for future sessions.",
    tag: "learns your project",
  },
];

export const EFFORT_LEVELS = [
  {
    key: "low",
    name: "low — faster than you think",
    desc: "Short, scoped, latency-sensitive work. On Fable 5, low effort often still exceeds the maximum-effort performance of previous-generation models — ideal for sub-agents, classification, and routine pipeline steps.",
    intelligence: 35,
    speed: 95,
    cost: 95,
    bestFor: "sub-agents, routine tasks",
  },
  {
    key: "medium",
    name: "medium — the cost-saver",
    desc: "Routine production work where you want to trim tokens without giving up much. A great setting to A/B against high on routes that complete correctly but take longer than they need to.",
    intelligence: 55,
    speed: 80,
    cost: 80,
    bestFor: "high-volume production routes",
  },
  {
    key: "high",
    name: "high — the everyday default",
    desc: "The recommended starting point for most tasks. Strong reasoning, excellent verification behavior, and a sensible token bill. Start here, then sweep up or down per route based on your own evals.",
    intelligence: 75,
    speed: 55,
    cost: 55,
    bestFor: "most tasks — the default",
  },
  {
    key: "xhigh",
    name: "xhigh — for the hard stuff",
    desc: "The setting for the most capability-sensitive workloads: complex coding, long agentic runs, intelligence-bound analysis. Pair with a large max_tokens so it has room to think and act.",
    intelligence: 90,
    speed: 35,
    cost: 35,
    bestFor: "coding & long agentic runs",
  },
  {
    key: "max",
    name: "max — correctness over everything",
    desc: "Reserve for extremely hard, latency-insensitive problems where being right matters more than cost. Watch for diminishing returns — and for over-delivering beyond the brief.",
    intelligence: 100,
    speed: 18,
    cost: 18,
    bestFor: "hardest problems, no rush",
  },
];

export const PLAYBOOK = [
  {
    title: "1 · Front-load the whole spec — then get out of the way",
    body: "Fable 5's long-horizon coherence comes from intelligent planning against a clear goal. Drip-feeding requirements across ten turns wastes that. Put the task, the intent, the constraints, and what \"done\" looks like in the first message, run at high effort, and let it work.",
    snippet:
      "I'm working on [the larger task] for [who it's for]. They need [what the output enables]. Done means: [checkable criteria]. Constraints: [list]. With that in mind: [request].",
  },
  {
    title: "2 · Give the reason, not just the request",
    body: "Fable 5 performs measurably better when it understands the intent behind a task — it connects the work to relevant context instead of inferring your goal. Two extra sentences of \"why\" routinely change the quality of \"what.\"",
    snippet:
      "Context: this report goes to non-technical executives deciding next quarter's budget. They care about trend direction and risk, not methodology. Now — analyze this dataset.",
  },
  {
    title: "3 · Sweep the effort dial — including downward",
    body: "Default to high; reserve xhigh for the most capability-sensitive work. But test low and medium on routine routes — lower effort on Fable 5 often exceeds the max-effort output of previous-generation models, at a fraction of the latency and cost. The relationship isn't monotonic: more effort up front can reduce total cost on agentic work by cutting turn count.",
    snippet: null,
  },
  {
    title: "4 · De-prescribe your old prompts",
    body: "Prompts written for prior models are usually too prescriptive for Fable 5 and actively reduce output quality. Step-by-step scaffolding, \"CRITICAL: YOU MUST\" tool nudges, forced progress updates — A/B test removing them. State the goal and the constraints; skip enumerating the steps.",
    snippet: null,
  },
  {
    title: "5 · Ground its progress claims in evidence",
    body: "On long autonomous runs, require every status claim to be auditable against a tool result. In Anthropic's testing this nearly eliminated fabricated progress reports on tasks designed to elicit them.",
    snippet:
      "Before reporting progress, audit each claim against a tool result from this session. Only report work you can point to evidence for; if something is not yet verified, say so explicitly. If tests fail, say so with the output.",
  },
  {
    title: "6 · Give it a memory file",
    body: "Even a plain NOTES.md makes it better over time. Tell it where the file lives, to consult it at session start, and give it a format. It will record corrections, confirmed approaches, and project quirks — and actually use them next time.",
    snippet:
      "Store one lesson per file with a one-line summary at the top. Record corrections and confirmed approaches alike, including why they mattered. Update an existing note rather than duplicating; delete notes that turn out wrong.",
  },
  {
    title: "7 · Let it delegate — asynchronously",
    body: "Older models needed guardrails against sub-agent sprawl. Fable 5 is the opposite: parallel sub-agents are dependable, and async delegation (orchestrator keeps working while sub-agents run) beats spawn-and-block on both speed and cost.",
    snippet:
      "Delegate independent subtasks to sub-agents and keep working while they run. Intervene if a sub-agent goes off track or is missing relevant context.",
  },
  {
    title: "8 · Set explicit boundaries & verification loops",
    body: "High capability cuts both ways: at high effort it can over-deliver — unrequested refactors, adjacent actions you didn't ask for. Say what it should not do, and for long builds, have it construct its own checking harness with fresh-context verifier sub-agents (they outperform self-critique).",
    snippet:
      "Don't add features, refactor, or introduce abstractions beyond what the task requires. Establish a method for checking your own work as you build; run it on a regular cadence, verifying against the specification with sub-agents.",
  },
];

export const MONEY = [
  {
    title: "Productized services",
    diff: "LOW BARRIER",
    diffColor: "teal",
    body: "Sell a fixed-scope deliverable — not hours. Fable 5's end-to-end knowledge work (analysis → spreadsheet → deck → memo) means one person can run an agency-shaped offer.",
    items: [
      "Financial model + investor-deck packages for startups",
      "Competitive research reports with sourced citations",
      "\"Codebase audit in 72 hours\" for dev teams",
      "Contract / policy summarization for small firms",
    ],
  },
  {
    title: "Freelance, amplified",
    diff: "LOW BARRIER",
    diffColor: "teal",
    body: "Keep your existing freelance lane, but quote on outcomes and use Fable 5 as your back office. The win is throughput: take three clients where you used to take one — quality-checked by you, every time.",
    items: [
      "Technical writing & documentation overhauls",
      "Data cleaning + analysis gigs (it verifies its own work)",
      "Localization passes with a native-speaker review layer",
      "Grant and proposal drafting for nonprofits",
    ],
  },
  {
    title: "Vertical AI products",
    diff: "MEDIUM",
    diffColor: "gold",
    body: "Wrap the API in a workflow a specific industry already pays for. The moat isn't the model — it's your domain data, integrations, and distribution. Charge per outcome or per seat.",
    items: [
      "Lease-abstraction tool for commercial real estate",
      "Compliance-doc checker for a regulated niche",
      "Customer-support triage trained on a vertical's tickets",
      "Use prompt caching + Batch API to keep COGS low",
    ],
  },
  {
    title: "Autonomous agent services",
    diff: "MEDIUM",
    diffColor: "gold",
    body: "Fable 5's long-horizon reliability makes \"agent does the whole job overnight\" a sellable SLA for the first time. Scheduled agents (cron-fired sessions) run without you in the loop.",
    items: [
      "Nightly code-review & PR-triage bots for eng teams",
      "Weekly competitor / market monitoring digests",
      "Automated QA sweeps with evidence-linked reports",
      "Bill monthly; your cost is per-run compute",
    ],
  },
  {
    title: "Consulting & enablement",
    diff: "MEDIUM",
    diffColor: "gold",
    body: "Most companies are still prompting Fable 5 like it's 2023. Everything in the Playbook section is billable knowledge: effort tuning, de-prescribing prompts, agent architecture, cost engineering.",
    items: [
      "Migration engagements (older models → Fable 5)",
      "Prompt & eval audits with before/after metrics",
      "Internal workshops — sell the playbook, twice",
      "Retainers for ongoing agent-ops",
    ],
  },
  {
    title: "Content & education engines",
    diff: "CROWDED",
    diffColor: "ember",
    body: "Pure AI content is a race to the bottom — but AI-assisted expertise compounds. Use Fable 5 for research depth and drafting; your taste, niche, and audience are the product.",
    items: [
      "Deep-dive newsletters in a niche you actually know",
      "Course production: it drafts, you teach",
      "YouTube research pipelines (scripts, fact-checks, cuts)",
      "Differentiate on judgment, not volume",
    ],
  },
];

export const MARQUEE = [
  "📚 feed it your |entire novel draft| and get a developmental edit in one pass",
  "🏛️ a |family-archive historian| that reads decades of letters, photos & scans",
  "🎲 a persistent |D&D dungeon master| with a memory file per campaign",
  "🧬 |codebase archaeology| — “when did this bug culture start, and why?”",
  "🎼 a |songwriting partner| that tracks your catalog's themes across years",
  "🗣️ a |debate sparring partner| that argues the strongest version of the other side",
  "🏠 a |renovation copilot| reading quotes, codes & floor plans together",
  "🌍 a |language tutor| that remembers every mistake you've ever made",
];

export const CREATIVE = [
  {
    icon: "🗂️",
    title: "Whole-corpus companions",
    body: "The 1M context means \"upload everything\" is a real workflow: your full thesis plus every source, a company's entire policy library, ten years of journal entries. Then converse with the whole thing at once — cross-referencing, contradicting, connecting.",
  },
  {
    icon: "🎭",
    title: "Living simulations",
    body: "Run a writers'-room of sub-agents: one drafts, one plays the skeptical editor, one fact-checks against your research notes, one guards continuity. The orchestrator pattern that powers engineering agents works just as well for fiction.",
  },
  {
    icon: "🔬",
    title: "Personal research lab",
    body: "Hand it a question you've always wondered about and a high effort setting. It will scope the question, decompose it, gather and reconcile sources, and write you the report — the \"deep research\" experience, on your own terms.",
  },
  {
    icon: "🧩",
    title: "Games that remember",
    body: "Persistent memory turns one-off play into campaigns: an interactive-fiction world that evolves across months, a chess coach that knows your blind spots, a puzzle-setter that calibrates to exactly your edge of ability.",
  },
  {
    icon: "🛠️",
    title: "Overnight makers",
    body: "Describe the tool you wish existed before bed; review a working build with tests in the morning. Long-horizon autonomy makes \"side projects on autopilot\" a genuine creative medium — your taste in what to build becomes the craft.",
  },
  {
    icon: "🖼️",
    title: "Archive rescue",
    body: "Its degraded-image vision (it crops, rotates, and enhances before reading) makes it a restoration assistant for the unscannable: handwritten recipes, faded ledgers, tilted photos of documents — digitized, transcribed, and organized.",
  },
];

export const QUIZ = [
  {
    q: "You want Fable 5 to think harder on a tough problem. What do you do?",
    o: [
      "Set thinking budget_tokens to 50,000",
      "Raise output_config.effort (e.g. to xhigh)",
      'Add "think step by step" three times',
      "Switch to temperature 0",
    ],
    a: 1,
    e: "Thinking is always on and adaptive — fixed thinking budgets and sampling params like temperature are rejected on Fable 5. The effort parameter (low → max) is the depth control.",
  },
  {
    q: "Your Fable 5 request returned HTTP 200 but the content array is empty. Most likely cause?",
    o: [
      "The API is down",
      "You hit the rate limit",
      'stop_reason is "refusal" — a safety classifier declined it',
      "Your prompt was too short",
    ],
    a: 2,
    e: 'Safety declines return a successful 200 with stop_reason: "refusal" and empty content (pre-output refusals aren\'t billed). Always check stop_reason before reading content — and consider a fallback model for false positives.',
  },
  {
    q: "You migrated from Opus and your token bills jumped ~30% for the same prompts. Why?",
    o: [
      "Fable 5 has a new tokenizer — same text, more tokens",
      "Your cache broke",
      "Thinking tokens are billed double",
      "It's a bug",
    ],
    a: 0,
    e: "Fable 5's new tokenizer produces roughly 30% more tokens for the same content vs Opus-tier. Re-baseline with count_tokens (it returns counts under both tokenizers) instead of reusing old budgets.",
  },
  {
    q: "Best way to brief Fable 5 on a big autonomous task?",
    o: [
      "Drip-feed requirements turn by turn so it doesn't get overwhelmed",
      'Give the full spec, intent, and "done" criteria up front in one turn',
      "Keep it vague so it stays creative",
      "Paste only the error message",
    ],
    a: 1,
    e: "Fable 5's long-horizon strength comes from planning against a clear goal. Well-specified single-turn briefs at high effort outperform progressive disclosure — which actually reduces token efficiency and sometimes quality.",
  },
  {
    q: "A prompt that worked great on an older model performs worse on Fable 5. The most likely fix is…",
    o: [
      "Add more CAPITAL LETTERS and MUST statements",
      "Remove prescriptive step-by-step scaffolding and state the goal instead",
      "Lower max_tokens",
      "Repeat the instructions twice",
    ],
    a: 1,
    e: "Prompts tuned for prior models are often too prescriptive for Fable 5 and reduce output quality. De-prescribe: goal + constraints, not enumerated steps. A/B it — this is the most common migration win.",
  },
];
