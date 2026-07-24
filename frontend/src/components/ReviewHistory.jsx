import React, { useState, useEffect } from 'react';
import { getReviews } from '../services/api';
import { Calendar, Clock, Code2, Sparkles, SearchCheck, Zap, Wrench, Bug, ChevronRight, Loader2, Search, Filter } from 'lucide-react';
import ReviewDetailsModal from './ReviewDetailsModal';

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

const ReviewHistory = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getReviews();
      const sortedReviews = (data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviews(sortedReviews);
    } catch (err) {
      setError('Failed to load review history.');
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
  // Extract unique languages dynamically for the filter dropdown
  const uniqueLanguages = ['all', ...new Set(reviews.map((r) => r.language))];

  // Filter reviews based on search query and selected language
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = selectedLanguage === 'all' || review.language.toLowerCase() === selectedLanguage.toLowerCase();

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header & Stats */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Review History</h2>
          <p className="text-xs text-slate-400 mt-1">Manage and track your past AI code evaluations</p>
        </div>
        <span className="w-fit rounded-full border border-white/[0.08] bg-[#0F172A] px-3 py-1 text-xs text-slate-400">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </span>
      </div>

      {/* Search and Filter Bar */}
      {!loading && reviews.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search language or action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0F172A] pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
            />
          </div>

          {/* Language Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-slate-500 hidden sm:block" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full sm:w-48 rounded-xl border border-white/[0.08] bg-[#0F172A] px-3 py-2 text-sm text-slate-200 capitalize focus:border-blue-500/50 focus:outline-none cursor-pointer"
            >
              <option value="all">All Languages</option>
              {uniqueLanguages.filter(l => l !== 'all').map((lang) => (
                <option key={lang} value={lang} className="bg-[#0F172A] text-slate-200">
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center text-slate-500 flex-col gap-3">
          <Loader2 size={32} className="animate-spin" />
          <p>Loading history...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#0F172A] opacity-70">
          <Clock size={48} className="mb-4 text-slate-600" />
          <p className="text-slate-300">No reviews found.</p>
          <p className="text-sm text-slate-500">Your past AI analyses will appear here.</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#0F172A] opacity-80">
          <Search size={36} className="mb-3 text-slate-600" />
          <p className="text-slate-300 text-sm">No matching reviews found</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedLanguage('all'); }}
            className="mt-2 text-xs text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review) => {
            const date = new Date(review.createdAt);
            return (
              <div
                key={review._id}
                onClick={() => openReviewDetails(review._id)}
                className="group cursor-pointer rounded-xl border border-white/[0.08] bg-[#0F172A] p-5 transition-all hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg bg-[#111827] px-2.5 py-1.5 text-xs font-medium capitalize text-slate-200 border border-white/[0.05]">
                    {getActionIcon(review.action)}
                    {review.action}
                  </div>
                  <ChevronRight size={18} className="text-slate-600 transition-colors group-hover:text-blue-400" />
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Code2 size={16} />
                    <span className="font-medium text-slate-300">{review.language}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ReviewDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewId={selectedReviewId}
        onDeleted={fetchReviews}
      />
    </div>
  );
};

export default ReviewHistory;