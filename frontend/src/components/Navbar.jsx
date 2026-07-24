import { useState } from "react";
import { Code2, History, Settings, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/auth";

// Import modals (we will ensure these components are ready)
import ReviewHistory from "./ReviewHistory";
import SettingsModal from "./SettingsModal";
import ProfileModal from "./ProfileModal";

function Navbar() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'history' | 'settings' | 'profile' | null

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left: Brand / Logo navigates to Home */}
          <div 
            onClick={() => navigate("/")} 
            className="flex min-w-0 cursor-pointer items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img src="/logo.png" alt="DevLens AI Logo" className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-lg shadow-blue-600/30" />
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight text-white sm:text-lg">
                DevLens AI
              </h1>
              <p className="hidden text-xs text-slate-400 sm:block">
                AI Developer Workspace
              </p>
            </div>
          </div>

          {/* Right: Navbar Action Buttons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            
            {/* History Button */}
            <button
              onClick={() => setActiveModal('history')}
              title="History"
              className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white"
            >
              <History size={18} />
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setActiveModal('settings')}
              title="Settings"
              className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white"
            >
              <Settings size={18} />
            </button>

            <div className="mx-1 hidden h-6 w-px bg-slate-700 sm:block" />

            {/* Profile Button */}
            <button
              onClick={() => setActiveModal('profile')}
              title="Profile & Account"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-200 hover:bg-slate-700 hover:text-white sm:h-10 sm:w-10"
            >
              <UserCircle2 size={20} />
            </button>

          </div>
        </div>
      </header>

      {/* --- MODALS MANAGED BY NAVBAR --- */}

      {/* 1. History Modal */}
      {activeModal === 'history' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 shadow-2xl overflow-hidden">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h2 className="text-xl font-bold text-slate-100">Full Review History</h2>
              <button 
                onClick={() => setActiveModal(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1">
              <ReviewHistory />
            </div>
          </div>
        </div>
      )}

      {/* 2. Settings Modal */}
      {activeModal === 'settings' && (
        <SettingsModal isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)} />
      )}

      {/* 3. Profile Modal */}
      {activeModal === 'profile' && (
        <ProfileModal isOpen={activeModal === 'profile'} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}

export default Navbar;