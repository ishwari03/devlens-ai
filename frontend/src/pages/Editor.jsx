import { useState } from "react";

import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import ReviewPanel from "../components/ReviewPanel";

import {
  reviewCode,
  explainCode,
  fixCode,
  optimizeCode,
  findBugs,
} from "../services/api";

function Editor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [error, setError] = useState("");

  async function handleAction(action) {
    if (!code.trim()) {
      setError("Please enter some code.");
      return;
    }

    setLoading(true);
    setError("");
    setReview("");
    setActiveAction(action);

    try {
      let result = "";

      switch (action) {
        case "review":
          result = await reviewCode(code, language);
          break;

        case "explain":
          result = await explainCode(code, language);
          break;

        case "fix":
          result = await fixCode(code, language);
          break;

        case "optimize":
          result = await optimizeCode(code, language);
          break;

        case "bugs":
          result = await findBugs(code, language);
          break;

        default:
          result = "";
      }

      setReview(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
      setActiveAction("");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="grid gap-6 p-6 lg:grid-cols-2">

        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          handleAction={handleAction}
          loading={loading}
          activeAction={activeAction}
        />

        <ReviewPanel
          review={review}
          loading={loading}
          error={error}
        />

      </div>
    </div>
  );
}

export default Editor;