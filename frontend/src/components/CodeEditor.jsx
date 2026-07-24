import Editor from "@monaco-editor/react";
import { ChevronDown, Code2 } from "lucide-react";
import { useRef } from "react";
import ActionButtons from "./ActionButtons";

const languageMap = {
  JavaScript: "javascript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
};

const LANGUAGES = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
];

function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  handleAction,
  activeAction,
  loading,
}) {
  const editorRef = useRef(null);

  const handleMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("devlens-dark", {
      base: "vs-dark",
      inherit: true,

      rules: [
        {
          token: "comment",
          foreground: "64748b",
          fontStyle: "italic",
        },
        {
          token: "keyword",
          foreground: "f472b6",
        },
        {
          token: "string",
          foreground: "fcd34d",
        },
        {
          token: "number",
          foreground: "fdba74",
        },
        {
          token: "type",
          foreground: "67e8f9",
        },
        {
          token: "function",
          foreground: "93c5fd",
        },
      ],

      colors: {
        "editor.background": "#0B1120",
        "editor.foreground": "#E2E8F0",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#CBD5E1",
        "editor.selectionBackground": "#2563EB55",
        "editor.lineHighlightBackground": "#17255466",
        "editorCursor.foreground": "#60A5FA",
        "editorIndentGuide.background": "#1E293B",
        "editorIndentGuide.activeBackground": "#334155",
        "editorGutter.background": "#0B1120",
      },
    });

    monaco.editor.setTheme("devlens-dark");
  };

  return (
    <section
      className="
        flex
        w-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        shadow-2xl

        lg:h-full
      "
    >
      {/* Header */}

      <header
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-800
          bg-slate-900/80
          px-4
          py-4

          sm:flex-row
          sm:items-center
          sm:justify-between

          backdrop-blur
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/15">
            <Code2 size={18} className="text-blue-400" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-white">
              Code Editor
            </h2>

            <p className="truncate text-xs text-slate-400">
              Write or paste your source code
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-slate-700
              bg-slate-950
              px-4
              py-2
              pr-10
              text-sm
              text-white
              outline-none
              transition

              hover:border-slate-500
              focus:border-blue-500

              sm:min-w-[170px]
            "
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </header>

      {/* Monaco */}

      <div
        className="
          w-full
          bg-[#0B1120]

          h-[420px]

          sm:h-[500px]

          lg:h-auto
          lg:min-h-0
          lg:flex-1
        "
      >
        <Editor
          height="100%"
          language={languageMap[language]}
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleMount}
          loading={
            <div className="grid h-full place-items-center text-slate-400">
              Loading editor...
            </div>
          }
          options={{
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            wordWrap: "on",
            tabSize: 2,
            fontSize: 15,
            fontLigatures: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            roundedSelection: true,
            padding: {
              top: 20,
              bottom: 20,
            },
            fontFamily:
              "JetBrains Mono, Fira Code, monospace",
          }}
        />
      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 bg-slate-900">
        <ActionButtons
          loading={loading}
          handleAction={handleAction}
          activeAction={activeAction}
        />
      </div>
    </section>
  );
}

export default CodeEditor;