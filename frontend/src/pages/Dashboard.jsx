import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../services/api";
import Navbar from "../components/Navbar";
import ReviewDetailsModal from "../components/ReviewDetailsModal";
import {
  Calendar,
  Clock,
  Code2,
  Sparkles,
  SearchCheck,
  Zap,
  Wrench,
  Bug,
  ChevronRight,
  Loader2,
  Plus,
  Terminal
} from "lucide-react";

const getActionIcon = (action) => {
  switch (action) {
    case "explain":
      return <Sparkles size={16} className="text-yellow-400" />;
    case "review":
      return <SearchCheck size={16} className="text-blue-400" />;
    case "optimize":
      return <Zap size={16} className="text-purple-400" />;
    case "fix":
      return <Wrench size={16} className="text-green-400" />;
    case "bugs":
      return <Bug size={16} className="text-red-400" />;
    default:
      return <Sparkles size={16} className="text-blue-400" />;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getReviews();
      setReviews(data || []);
    } catch (err) {
      setError("Failed to load review history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openReviewDetails = (id) => {
    setSelectedReviewId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#020617] text-slate-100">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1700px] flex-1 flex-col gap-8 p-6 md:p-8">
        
        {/* Simplified Hero Section */}
        {/* Simplified Hero Section */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 sm:flex-row sm:items-center sm:p-8 shadow-xl">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome back 👋
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Ready to analyze, optimize, and debug your source code?
            </p>
          </div>
          <button
            onClick={() => navigate("/editor")}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:scale-[1.02]"
          >
            <Plus size={18} />
            Start New Review
          </button>
        </div>

        {/* Core Content: Review History */}
        <div className="flex flex-col flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-100">Your Review History</h2>
            <span className="rounded-full border border-white/[0.08] bg-[#0F172A] px-3 py-1 text-xs text-slate-400">
              {reviews.length} total reviews
            </span>
          </div>

          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-slate-500">
              <Loader2 size={32} className="animate-spin" />
              <p>Loading history...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0F172A] p-6 text-center opacity-80">
              <Code2 size={48} className="mb-4 text-slate-600" />
              <p className="text-base font-medium text-slate-300">No reviews yet.</p>
              <p className="mt-1 text-sm text-slate-500">
                Start your first AI review and your architectural insights will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => {
                const date = new Date(review.createdAt);
                return (
                  <div
                    key={review._id}
                    onClick={() => openReviewDetails(review._id)}
                    className="group flex cursor-pointer flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0F172A] p-5 transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-[#111827] px-2.5 py-1.5 text-xs font-medium capitalize text-slate-200">
                          {getActionIcon(review.action)}
                          {review.action}
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-slate-600 transition-colors group-hover:text-blue-400"
                        />
                      </div>

                      <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
                        <Code2 size={16} />
                        <span className="font-medium text-slate-200">
                          {review.language}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.05] pt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      <ReviewDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewId={selectedReviewId}
        onDeleted={fetchReviews}
      />
    </div>
  );
};

export default Dashboard;