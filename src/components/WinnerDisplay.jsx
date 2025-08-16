import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  User,
  MessageCircle,
  Copy,
  Shuffle,
  RotateCcw,
  Download,
  Share2,
} from "lucide-react";

const WinnerDisplay = ({ winner, onReset, onSelectAgain, pickNumber = 1 }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const shareWinner = () => {
    const text = `🎉 Giveaway Pick #${pickNumber} Winner: @${winner.username}\n"${winner.text}"`;
    if (navigator.share) {
      navigator.share({
        title: `Giveaway Pick #${pickNumber} Winner`,
        text: text,
      });
    } else {
      copyToClipboard(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      className="card text-center mb-8"
    >
      {/* Celebration Animation */}
      <div className="relative mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-24 h-24 bg-gradient-orange rounded-full flex items-center justify-center mx-auto relative"
        >
          <Trophy className="w-12 h-12 text-white" />

          {/* Confetti Animation */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                x: [0, (i % 2 === 0 ? 1 : -1) * (50 + i * 10)],
                y: [0, -30 - i * 5],
              }}
              transition={{
                duration: 2,
                delay: 0.5 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className={`absolute w-2 h-2 rounded-full ${
                i % 3 === 0
                  ? "bg-primary-orange"
                  : i % 3 === 1
                  ? "bg-yellow-400"
                  : "bg-pink-400"
              }`}
            />
          ))}
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold mb-2"
      >
        🎉 <span className="gradient-text">Pick #{pickNumber} Winner!</span> 🎉
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-accent-gray mb-8"
      >
        Congratulations! This is participant #{pickNumber} from the list.
      </motion.p>

      {/* Winner Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-orange p-6 rounded-2xl mb-8 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full" />
          <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full" />
          <div className="absolute bottom-6 left-8 w-6 h-6 border-2 border-white rounded-full" />
        </div>

        <div className="relative">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            @{winner.username}
          </h3>

          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-2">
              <MessageCircle className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
              <p className="text-white text-left leading-relaxed">
                {winner.text}
              </p>
            </div>
          </div>

          <p className="text-white/80 text-sm">{winner.timestamp}</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => copyToClipboard(`@${winner.username}`)}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">Copy</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareWinner}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectAgain}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <Shuffle className="w-4 h-4" />
          <span className="hidden sm:inline">Reroll</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </motion.button>
      </div>

      {/* Winner Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 bg-secondary-black-lighter/50 rounded-xl border border-accent-gray/10"
      >
        <h4 className="text-sm font-semibold text-primary-orange mb-2">
          Selection Details
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-orange">
              {winner.id}
            </p>
            <p className="text-xs text-accent-gray">Winner ID</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-orange">100%</p>
            <p className="text-xs text-accent-gray">Fair & Random</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-orange">✓</p>
            <p className="text-xs text-accent-gray">Verified</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WinnerDisplay;
