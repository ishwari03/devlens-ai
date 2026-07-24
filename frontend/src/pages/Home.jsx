import { Link } from "react-router-dom";
import {
  Code2,
  Sparkles,
  Bug,
  Wand2,
  Zap,
  BookOpen,
  FileText,
  History,
  ArrowRight,
  Rocket,
  Check,
  ClipboardPaste,
  MousePointerClick,
  Download,
  Globe,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { isAuthenticated } from "../utils/auth";

/* ----------------------------- helpers ----------------------------- */

const scrollToTop = (e) => {
  e?.preventDefault?.();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollToId = (id) => (e) => {
  e?.preventDefault?.();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ----------------------------- navbar ------------------------------ */

function Navbar() {
  const loggedIn = isAuthenticated();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/70 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img src="/logo.png" alt="DevLens AI Logo" className="h-8 w-8 rounded-xl object-cover shadow-lg shadow-blue-500/20" />
          <span className="text-sm font-bold tracking-tight text-white">DevLens <span className="text-blue-500">AI</span></span>
          <span className="hidden sm:inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-300">v1.0</span>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <a
              href="#top"
              onClick={scrollToTop}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:text-slate-50"
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href="#features"
              onClick={scrollToId("features")}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:text-slate-50"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#workflow"
              onClick={scrollToId("workflow")}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:text-slate-50"
            >
              How it Works
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {loggedIn ? (
            <>
              <Link
                to="/editor"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-slate-50 sm:inline-flex"
              >
                Workspace
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(79,70,229,0.8)] transition-transform hover:-translate-y-0.5"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-slate-50 sm:inline-flex"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(79,70,229,0.8)] transition-transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="size-3.5" />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------ hero ------------------------------- */

const HERO_PILLS = [
  { label: "Review", color: "from-blue-500/25 to-blue-500/5 text-blue-300 border-blue-400/30" },
  { label: "Explain", color: "from-indigo-500/25 to-indigo-500/5 text-indigo-300 border-indigo-400/30" },
  { label: "Fix", color: "from-violet-500/25 to-violet-500/5 text-violet-300 border-violet-400/30" },
  { label: "Optimize", color: "from-fuchsia-500/25 to-fuchsia-500/5 text-fuchsia-300 border-fuchsia-400/30" },
  { label: "Find Bugs", color: "from-rose-500/25 to-rose-500/5 text-rose-300 border-rose-400/30" },
];

function Hero() {
  const loggedIn = isAuthenticated();

  return (
    <section id="top" className="relative overflow-hidden pt-16 sm:pt-24">
      {/* soft glowing background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-6rem] size-[38rem] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[140px]" />
        <div className="absolute left-[15%] top-32 size-72 rounded-full bg-blue-600/25 blur-[120px]" />
        <div className="absolute right-[10%] top-40 size-72 rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-xl">
          <Sparkles className="size-3.5 text-indigo-300" />
          Powered by Groq Cloud & Llama 3
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-50 sm:text-6xl md:text-7xl">
          Your AI{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent [text-shadow:0_0_60px_rgba(99,102,241,0.35)]">
            Developer Assistant
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Review, explain, debug, optimize, and improve your code from one
          intelligent workspace.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {HERO_PILLS.map((p) => (
            <li
              key={p.label}
              className={`rounded-full border bg-gradient-to-b ${p.color} px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md`}
            >
              {p.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={loggedIn ? "/dashboard" : "/register"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(79,70,229,0.9)] transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Start Building Smarter
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/editor"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
          >
            <Rocket className="size-4" />
            Launch Workspace
          </Link>
        </div>
      </div>

      <WorkspacePreview />
    </section>
  );
}

/* ------------------------- workspace preview ------------------------ */

function WorkspacePreview() {
  const codeLines = [
    { n: 1, tokens: [["kw", "function"], ["fn", " calculateComplexity"], ["p", "(data) {"]] },
    { n: 2, tokens: [["p", "  "], ["kw", "const"], ["v", " result"], ["p", " = data."], ["fn", "map"], ["p", "((item) => {"]] },
    { n: 3, tokens: [["p", "    "], ["kw", "return"], ["v", " item"], ["p", "."], ["v", "value"], ["p", " * "], ["num", "2"], ["p", ";"]] },
    { n: 4, tokens: [["p", "  });"]] },
    { n: 5, tokens: [["c", "  // Slow: two passes over the array"]] },
    { n: 6, tokens: [["p", "  "], ["kw", "for"], ["p", " ("], ["kw", "let"], ["v", " i"], ["p", " = "], ["num", "0"], ["p", "; i < result.length; i++) {"]] },
    { n: 7, tokens: [["p", "    "], ["v", "console"], ["p", "."], ["fn", "log"], ["p", "(result[i]);"]] },
    { n: 8, tokens: [["p", "  }"]] },
    { n: 9, tokens: [["p", "  "], ["kw", "return"], ["v", " result"], ["p", ";"]] },
    { n: 10, tokens: [["p", "}"]] },
  ];

  const tokenClass = {
    kw: "text-fuchsia-300",
    fn: "text-blue-300",
    v: "text-slate-200",
    p: "text-slate-400",
    num: "text-amber-300",
    c: "text-slate-500 italic",
  };

  return (
    <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-2 shadow-[0_40px_120px_-40px_rgba(79,70,229,0.7)] backdrop-blur-xl sm:p-3">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-fuchsia-500/30 blur-2xl"
        />

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
          {/* Editor */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0f1c]">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-rose-500/80" />
                <span className="size-2.5 rounded-full bg-amber-400/80" />
                <span className="size-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[11px] font-medium text-slate-500">
                calculateComplexity.js
              </span>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                JS
              </span>
            </div>
            <pre className="overflow-x-auto px-2 py-4 font-mono text-[12.5px] leading-6">
              <code>
                {codeLines.map((l) => (
                  <div key={l.n} className="flex">
                    <span className="w-8 shrink-0 select-none text-right pr-3 text-slate-600">
                      {l.n}
                    </span>
                    <span className="whitespace-pre">
                      {l.tokens.map(([t, s], i) => (
                        <span key={i} className={tokenClass[t]}>
                          {s}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Review */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Sparkles className="size-3.5 text-white" />
                </span>
                <span className="text-[12px] font-semibold text-slate-200">
                  AI Review
                </span>
                <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                  Llama 3 · 70B
                </span>
              </div>
              <span className="text-[11px] text-slate-500">2.4s</span>
            </div>

            <div className="space-y-4 px-5 py-4 text-[13px] leading-6 text-slate-300">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs font-medium text-slate-400">
                  Overall Score
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
                  </div>
                  <span className="text-xs font-bold text-slate-100">7.2 / 10</span>
                </div>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  <Bug className="size-3.5" /> Detected Bug
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-100">item.value</span> throws when
                  an entry is <span className="text-fuchsia-300">null</span> —
                  no guard on the input array.
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  <Wand2 className="size-3.5" /> Suggestion
                </p>
                <p className="text-slate-300">
                  Collapse the two passes into a single{" "}
                  <span className="text-slate-100">reduce</span> and pre-size
                  the output.
                </p>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  <Check className="size-3.5" /> Optimized Code
                </p>
                <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-[11.5px] leading-5">
                  <code>
                    <span className="text-fuchsia-300">const</span>
                    <span className="text-slate-200"> doubled </span>
                    <span className="text-slate-400">= data.</span>
                    <span className="text-blue-300">reduce</span>
                    <span className="text-slate-400">((acc, item) {"=>"} {"{"}</span>
                    {"\n  "}
                    <span className="text-fuchsia-300">if</span>
                    <span className="text-slate-400"> (item?.value != </span>
                    <span className="text-amber-300">null</span>
                    <span className="text-slate-400">) acc.push(item.value * </span>
                    <span className="text-amber-300">2</span>
                    <span className="text-slate-400">);</span>
                    {"\n  "}
                    <span className="text-fuchsia-300">return</span>
                    <span className="text-slate-400"> acc;</span>
                    {"\n"}
                    <span className="text-slate-400">{"}"}, []);</span>
                  </code>
                </pre>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-fuchsia-300">
                  <Zap className="size-3.5" /> Performance Tips
                </p>
                <ul className="space-y-1 text-slate-400">
                  <li>• 1 pass instead of 2 — ~1.6× faster on 100k items</li>
                  <li>• Removes intermediate array from <span className="text-slate-200">map</span></li>
                  <li>• Drop <span className="text-slate-200">console.log</span> before shipping</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- features ----------------------------- */

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Code Review",
    desc: "Review code quality with detailed, line-aware explanations.",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.55)] hover:border-blue-400/40",
    accent: "text-blue-300",
  },
  {
    icon: BookOpen,
    title: "Explain Code",
    desc: "Understand unfamiliar code instantly, in plain English.",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.55)] hover:border-indigo-400/40",
    accent: "text-indigo-300",
  },
  {
    icon: Bug,
    title: "Find Bugs",
    desc: "Detect logical mistakes and runtime issues before they ship.",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)] hover:border-rose-400/40",
    accent: "text-rose-300",
  },
  {
    icon: Zap,
    title: "Optimize Performance",
    desc: "Receive cleaner, faster implementations with clear reasoning.",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.5)] hover:border-fuchsia-400/40",
    accent: "text-fuchsia-300",
  },
  {
    icon: FileText,
    title: "Professional Reports",
    desc: "Export beautiful markdown or PDF reports for your team.",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.55)] hover:border-violet-400/40",
    accent: "text-violet-300",
  },
  {
    icon: History,
    title: "Review History",
    desc: "Access searchable MongoDB-backed review history anytime.",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] hover:border-sky-400/40",
    accent: "text-sky-300",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            Everything you need to ship better code
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Six AI capabilities designed to fit naturally into your existing
            development workflow.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] ${f.glow}`}
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
                <f.icon className={`size-5 ${f.accent}`} />
              </div>
              <h3 className="text-base font-semibold text-slate-50">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- workflow ----------------------------- */

const STEPS = [
  {
    n: "01",
    icon: ClipboardPaste,
    title: "Paste Code",
    desc: "Drop any snippet into the Monaco editor — JavaScript, Python, Java or C++.",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    n: "02",
    icon: MousePointerClick,
    title: "Choose AI Action",
    desc: "Pick Review, Explain, Fix, Optimize or Find Bugs — results stream in seconds.",
    accent: "from-indigo-500 to-fuchsia-500",
    chips: ["Review", "Explain", "Fix", "Optimize", "Find Bugs"],
  },
  {
    n: "03",
    icon: Download,
    title: "Copy or Export",
    desc: "Copy the improved code or download a professional markdown / PDF report.",
    accent: "from-fuchsia-500 to-purple-500",
  },
];

function Workflow() {
  return (
    <section id="workflow" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      >
        <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
            How it Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            From code to insight in three steps
          </h2>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-transform hover:-translate-y-1">
                <div
                  className={`absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-3xl`}
                />
                <div className="flex items-center gap-4">
                  <span
                    className={`bg-gradient-to-br ${s.accent} bg-clip-text text-4xl font-bold tracking-tighter text-transparent`}
                  >
                    {s.n}
                  </span>
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                    <s.icon className="size-5 text-slate-200" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {s.desc}
                </p>
                {s.chips && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:absolute md:top-1/2 md:-right-3 md:z-10 md:block md:-translate-y-1/2"
                >
                  <ArrowRight className="size-5 text-slate-600" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */

function CallToAction() {
  const loggedIn = isAuthenticated();

  return (
    <section className="relative px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-indigo-950/40 px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/4 top-0 size-64 rounded-full bg-blue-600/25 blur-[100px]" />
          <div className="absolute right-1/4 bottom-0 size-64 rounded-full bg-fuchsia-600/25 blur-[100px]" />
        </div>

        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
          <ShieldCheck className="size-3.5 text-emerald-300" />
          No credit card required
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          Ready to write{" "}
          <span className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            better code
          </span>
          ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
          Start using DevLens AI today and supercharge your development
          workflow.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to={loggedIn ? "/dashboard" : "/register"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(79,70,229,0.9)] transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Get Started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/editor"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
          >
            <Cpu className="size-4" />
            Launch Workspace
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ footer ----------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030712]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8 items-center">
        <div>
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="DevLens AI Logo" 
              className="size-9 rounded-xl object-cover shadow-[0_0_20px_-4px_rgba(37,99,235,0.7)]" 
            />
            <span className="text-[15px] font-semibold text-slate-50">
              DevLens AI
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            AI Developer Assistant for reviewing, explaining, debugging and
            optimizing code.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-4">
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-slate-50"
              >
                {/* Clean inline GitHub SVG */}
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub Repository
              </a>
            </li>
          </ul>

          <div className="md:text-right space-y-1 pt-2">
            <p className="text-sm text-slate-400">
              Made with <span className="text-rose-400">❤</span> by{" "}
              <span className="text-slate-100 font-medium">Ishwari Pusadkar</span>
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} DevLens AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ page ------------------------------- */

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 antialiased [scroll-behavior:smooth]">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}