import React from 'react';
import { X, UserCircle2, Mail, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clearToken, getUserDataFromToken } from '../utils/auth';

const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Extract user info directly from the stored JWT token payload
  const user = getUserDataFromToken() || {};
  const userEmail = user.email || user.username || 'developer@devlens.ai';
  const userName = user.name || user.username || 'Developer Account';

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-blue-600/20 p-2 text-blue-400">
              <UserCircle2 size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-100">User Profile</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* User Card Info */}
        <div className="my-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg">
            <UserCircle2 size={36} />
          </div>
          <h3 className="text-base font-semibold text-slate-200 capitalize">
            {userName}
          </h3>
          <p className="text-xs text-blue-400 font-medium mt-0.5">DevLens AI Contributor</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-[#111827] p-3 text-xs text-slate-300">
            <Mail size={16} className="text-slate-500" />
            <span className="truncate">{userEmail}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-[#111827] p-3 text-xs text-slate-300">
            <ShieldCheck size={16} className="text-green-400" />
            <span>Active JWT Session & Secure Auth</span>
          </div>
        </div>

        {/* Logout Action */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <button onClick={onClose} className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200">
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-600/10 border border-red-500/20 px-4 py-2 text-xs font-medium text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;