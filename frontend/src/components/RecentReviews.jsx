import React, { useState, useEffect } from "react";
import { getReviews } from "../services/api";
import { Clock, ChevronRight, Sparkles, SearchCheck, Zap, Wrench, Bug, Loader2 } from "lucide-react";
import ReviewDetailsModal from "./ReviewDetailsModal";

const getActionIcon = (action) => {
  switch (action) {
    case 'explain': return <Sparkles size={16} className="text-yellow-400" />;
    case 'review': return <SearchCheck size={16} className="text-blue-400" />;
    case 'optimize': return <Zap size={16} className="text-purple-400" />;
    case 'fix': return <Wrench size={16} className="text-green-400" />;
    case 'bugs': return <Bug size={16} className="text-red-400" />;
    default: return <Sparkles size={16} className="text-blue-400" />;
  }
};

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRecentReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getReviews();
      const recent = (data || []).slice(0, 5);
      setReviews(recent);
    } catch (err) {
      setError("Failed to load recent activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentReviews();
  }, []);

  const openReview = (id) => {
    setSelectedReviewId(id);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 size={28} className="animate-spin text-blue-500" />
        <p className="text-sm">Loading activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0F172A] opacity-80">
        <Clock size={40} className="mb-4 text-slate-600" />
        <p className="font-medium text-slate-300">No reviews yet.</p>
        <p className="mt-1 text-sm text-slate-500">Start your first AI review and it will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {reviews.map((review) => {
          const date = new Date(review.createdAt);
          return (
            <div
              key={review._id}
              onClick={() => openReview(review._id)}
              className="group cursor-pointer rounded-xl border border-white/[0.08] bg-[#0F172A] p-5 transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-[#111827] px-2.5 py-1.5 text-xs font-medium capitalize text-slate-200">
                  {getActionIcon(review.action)}
                  {review.action}
                </div>
                <ChevronRight size={18} className="text-slate-600 transition-colors group-hover:text-blue-400" />
              </div>
              
              <div className="space-y-1.5">
                <div className="text-sm font-medium text-slate-300">
                  {review.language}
                </div>
                <div className="text-xs text-slate-500">
                  {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReviewDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewId={selectedReviewId}
        onDeleted={fetchRecentReviews}
      />
    </>
  );
};

export default RecentReviews;