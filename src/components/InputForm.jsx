import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Instagram, AlertCircle } from "lucide-react";

const InputForm = ({ onScrape, isLoading, postUrl, setPostUrl }) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!postUrl.trim()) {
      setError("Please enter an Instagram post URL");
      return;
    }

    // Basic URL validation
    if (!postUrl.includes("instagram.com")) {
      setError("Please enter a valid Instagram URL");
      return;
    }

    onScrape(postUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card mb-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Enter Instagram Post URL</h2>
        <p className="text-accent-gray">
          Paste the URL of the Instagram post you want to run the giveaway for
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Instagram className="w-5 h-5 text-accent-gray" />
          </div>
          <input
            type="url"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/your-post-id/"
            className="input-field pl-12"
            disabled={isLoading}
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full btn-primary flex items-center justify-center space-x-3 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Search className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Scraping Comments..." : "Start Giveaway"}</span>
        </motion.button>
      </form>

      <div className="mt-6 p-4 bg-primary-orange/10 rounded-lg border border-primary-orange/20">
        <h3 className="text-sm font-semibold text-primary-orange mb-2">
          Example URLs:
        </h3>
        <div className="space-y-1 text-sm text-accent-gray">
          <p>• https://www.instagram.com/p/ABC123/</p>
          <p>• https://instagram.com/p/XYZ789/</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InputForm;
