import React, { useState } from "react";
import { FaTimes, FaPaperPlane, FaStar } from "react-icons/fa";

interface ReviewFormProps {
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add your submission logic (API call, etc.)
    console.log({ name, role, rating, feedback });
    setSubmitted(true);

    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFeedback("");
      setName("");
      setRole("");
      setRating(5);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#111625] border border-slate-200 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Share Your Experience
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Help us improve Algo
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <FaTimes size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
            How would you rate Algo?
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-4xl transition-transform hover:scale-110 active:scale-90"
              >
                <FaStar
                  className={
                    star <= rating
                      ? "text-yellow-400"
                      : "text-slate-300 dark:text-slate-600"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-[#0a0f1c] focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Alex Rivera"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Your Role / Title
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-[#0a0f1c] focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Software Engineer @ Google"
            />
          </div>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Your Review / Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={6}
            className="w-full px-5 py-4 rounded-3xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-[#0a0f1c] focus:outline-none focus:border-cyan-500 transition-colors resize-y"
            placeholder="What did you like most about Algo? Any suggestions for improvement?"
          />
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {submitted ? (
            "Thank You! Submitting..."
          ) : (
            <>
              <FaPaperPlane /> Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
