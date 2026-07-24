import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import {
  Bot,
  Check,
  Copy,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import "highlight.js/styles/github-dark.css";

function ReviewPanel({
  review,
  error,
  loading,
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!review) return;

    try {
      await navigator.clipboard.writeText(review);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {}
  }

  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

      {/* Header */}

      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">

        <div className="flex items-center gap-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15">

            <Bot size={18} className="text-blue-400" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-base font-semibold text-white">
                AI Assistant
              </h2>

              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                Llama 3.3 70B
              </span>

            </div>

            <p className="mt-1 text-xs text-slate-400">
              AI Review • Explain • Fix • Optimize
            </p>

          </div>

        </div>

        <button
          onClick={onCopy}
          disabled={!review}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>

      </header>

      {/* Error */}

      {error && (
        <div className="mx-6 mt-5 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">

          <AlertCircle size={18} />

          <span>{error}</span>

        </div>
      )}

      {/* Body */}

      <div className="flex-1 overflow-y-auto px-6 py-6">

        {loading ? (
          <ReviewSkeleton />
        ) : review ? (

          <article className="dl-prose">

            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {review}
            </Markdown>

          </article>

        ) : (
          <EmptyState />
        )}

      </div>

    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">

      <div className="relative mb-8">

        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700 bg-slate-800">

          <Sparkles
            size={34}
            className="text-blue-400"
          />

        </div>

      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-white">
        Ready for Review
      </h3>

      <p className="mt-4 max-w-sm sm:max-w-md leading-7 text-slate-400">
        Paste your source code into the editor and choose an AI action.
        DevLens AI will analyze your code, explain it, detect bugs,
        suggest fixes, optimize performance, and provide detailed
        feedback.
      </p>

    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="space-y-5">

      <div className="h-6 w-1/2 animate-pulse rounded-lg bg-slate-800" />

      <div className="h-4 animate-pulse rounded-lg bg-slate-800" />

      <div className="h-4 w-11/12 animate-pulse rounded-lg bg-slate-800" />

      <div className="h-4 w-10/12 animate-pulse rounded-lg bg-slate-800" />

      <div className="mt-8 h-40 animate-pulse rounded-2xl bg-slate-800" />

      <div className="h-4 w-3/4 animate-pulse rounded-lg bg-slate-800" />

      <div className="h-4 w-2/3 animate-pulse rounded-lg bg-slate-800" />

    </div>
  );
}

export default ReviewPanel;