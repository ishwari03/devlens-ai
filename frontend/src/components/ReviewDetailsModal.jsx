// src/components/ReviewDetailsModal.jsx
import React, { useState, useEffect } from 'react';
import { getReviewById, deleteReview } from '../services/api';
import { X, Trash2, Calendar, Code2, Bot, Loader2, AlertTriangle, CheckCircle2, Copy, Check, Download } from 'lucide-react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { marked } from 'marked';

const ReviewDetailsModal = ({ isOpen, onClose, reviewId, onDeleted }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset states whenever modal opens or switches to a different review ID
  useEffect(() => {
    if (!isOpen || !reviewId) return;

    const fetchReviewDetails = async () => {
      setLoading(true);
      setError('');
      setShowConfirm(false);
      setToastMessage('');
      setIsDeleting(false);
      try {
        const data = await getReviewById(reviewId);
        setReview(data.review || data);
      } catch (err) {
        setError('Failed to load review details.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [isOpen, reviewId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');
    try {
      await deleteReview(reviewId);
      onDeleted(); // Immediately refresh parent history
      onClose();   // Immediately close modal safely without lagging timers
    } catch (err) {
      setError('Failed to delete review.');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  // Handler for copying only the fixed/improved code block from AI response
  const handleCopyCode = () => {
    if (!review || !review.response) return;

    // Regex to locate text inside markdown code fences (```lang ... ```)
    const codeBlockRegex = /```[\w]*\n([\s\S]*?)```/;
    const match = review.response.match(codeBlockRegex);

    // Fallback to full response text if no markdown block exists
    const textToCopy = match ? match[1].trim() : review.response;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handler for downloading report via clean browser print-to-PDF
  const handleDownloadPDF = () => {
    if (!review) return;

    // Convert markdown response string into actual HTML elements
    const parsedAiAnalysis = marked.parse(review.response);

    const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>DevLens AI Review - ${review.language}</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 40px; 
            color: #1e293b; 
            line-height: 1.6; 
          }
          h1 { color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-size: 22px; }
          h3 { color: #0f172a; margin-top: 24px; font-size: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
          pre { background: #0f172a; color: #f8fafc; padding: 15px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 13px; }
          code { font-family: monospace; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
          th { background: #f8fafc; font-weight: 600; }
          .meta { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px; font-size: 13px; color: #475569; }
          .section { margin-top: 24px; }
        </style>
      </head>
      <body>
        <h1>DevLens AI Code Review Report</h1>
        <div class="meta">
          <p style="margin: 0 0 6px 0;"><strong>Language:</strong> ${review.language}</p>
          <p style="margin: 0 0 6px 0;"><strong>Action Type:</strong> <span style="text-transform: uppercase;">${review.action}</span></p>
          <p style="margin: 0;"><strong>Generated On:</strong> ${new Date(review.createdAt).toLocaleDateString()} at ${new Date(review.createdAt).toLocaleTimeString()}</p>
        </div>
        
        <div class="section">
          <h3>Original Code</h3>
          <pre><code>${review.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
        </div>

        <div class="section">
          <h3>AI Analysis & Evaluation</h3>
          <div>${parsedAiAnalysis}</div>
        </div>

        <script>
          window.onload = function() { 
            setTimeout(() => {
              window.print(); 
            }, 300);
          }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#020617]/80 shadow-2xl backdrop-blur-sm">
      <div className="flex h-full w-full max-w-3xl flex-col border-l border-white/[0.08] bg-[#0F172A] shadow-2xl transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#111827] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600/20 p-2 text-blue-500">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-200">Review Details</h2>
              {review && (
                <p className="text-xs text-slate-400 capitalize">
                  {review.action} • {review.language}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {review && (
              <>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  title="Copy improved code block"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Fixed Code"}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white"
                  title="Download Report as PDF"
                >
                  <Download size={14} />
                  PDF Report
                </button>
              </>
            )}
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isDeleting || loading}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Custom Inline Confirmation Box */}
        {showConfirm && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 text-sm">
              <AlertTriangle size={18} />
              <span>Are you sure you want to delete this review?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 text-slate-300">
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center text-slate-500 gap-3">
              <Loader2 size={32} className="animate-spin" />
              <p>Loading details...</p>
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-600/30 bg-red-900/20 p-4 text-red-400">
              {error}
            </div>
          ) : review ? (
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 size={16} />
                  {review.language}
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#020617] overflow-hidden">
                <div className="border-b border-white/[0.08] bg-[#111827] px-4 py-2 text-xs font-semibold text-slate-400">
                  Original Code
                </div>
                <pre className="overflow-x-auto p-4 text-sm text-slate-300">
                  <code>{review.code}</code>
                </pre>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#020617] overflow-hidden">
                <div className="border-b border-white/[0.08] bg-[#111827] px-4 py-2 text-xs font-semibold text-blue-400">
                  AI Analysis
                </div>
                <div className="p-6">
                  <article className="prose prose-invert prose-sm max-w-none prose-pre:bg-[#0F172A] prose-pre:border prose-pre:border-white/[0.08]">
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                      {review.response}
                    </Markdown>
                  </article>
                </div>
              </div>
              
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailsModal;