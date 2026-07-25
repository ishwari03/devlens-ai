import React, { useState } from 'react';
import { X, Settings, Trash2, Cpu, Download, Loader2, Check, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = "https://devlens-ai-backend-i0tg.onrender.com";

const SettingsModal = ({ isOpen, onClose }) => {
  const [clearing, setClearing] = useState(false);
  const [message, setMessage] = useState('');
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to delete ALL your review history? This cannot be undone.")) return;

    setClearing(true);
    setMessage('');
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('All history cleared successfully!');
      setTimeout(() => {
        setClearing(false);
        onClose();
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage('Failed to clear history.');
      setClearing(false);
    }
  };

  const handleExportData = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `devlens_history_backup_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch (err) {
      setMessage('Failed to export data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-lg flex-col rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-blue-600/20 p-2 text-blue-400">
              <Settings size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-100">Settings & System Info</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {message && (
          <div className="mt-4 rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-xs text-green-400">
            {message}
          </div>
        )}

        {exported && (
          <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-xs text-blue-400 flex items-center gap-2">
            <Check size={14} /> Review history backed up to JSON successfully!
          </div>
        )}

        {/* Options */}
        <div className="my-6 space-y-4">
          
          {/* AI Backend Info */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#111827] p-4">
            <div className="flex items-center gap-3">
              <Cpu size={18} className="text-purple-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">AI Engine</p>
                <p className="text-xs text-slate-500">Groq Cloud (Llama 3 Accelerated)</p>
              </div>
            </div>
            <span className="rounded-full bg-purple-500/20 px-2.5 py-1 text-xs text-purple-300 font-medium">Active</span>
          </div>

          {/* Export History Backup */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#111827] p-4">
            <div className="flex items-center gap-3">
              <Download size={18} className="text-blue-400" />
              <div>
                <p className="text-sm font-medium text-slate-200">Export All Reviews</p>
                <p className="text-xs text-slate-500">Download your review logs as a JSON backup</p>
              </div>
            </div>
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-600/10 px-3 py-2 text-xs font-medium text-blue-400 transition hover:bg-blue-600 hover:text-white"
            >
              Export JSON
            </button>
          </div>

          {/* Clear History Danger Zone */}
          <div className="flex items-center justify-between rounded-xl border border-red-500/10 bg-red-500/5 p-4">
            <div>
              <p className="text-sm font-medium text-red-400">Clear All History</p>
              <p className="text-xs text-slate-500">Permanently delete all saved review records</p>
            </div>
            <button
              onClick={handleClearHistory}
              disabled={clearing}
              className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-500 disabled:opacity-50"
            >
              {clearing ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Clear History
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-white/[0.08]">
          <button onClick={onClose} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal