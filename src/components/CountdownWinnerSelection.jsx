import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Zap } from "lucide-react";

const CountdownWinnerSelection = ({
  comments,
  onWinnerSelected,
  onCancel,
  pickNumber = 1,
}) => {
  const [countdown, setCountdown] = useState(3);
  const [currentShuffleIndex, setCurrentShuffleIndex] = useState(0);
  const [isCountdownPhase, setIsCountdownPhase] = useState(true);
  const [isShufflingPhase, setIsShufflingPhase] = useState(false);

  // Countdown phase (3, 2, 1)
  useEffect(() => {
    if (isCountdownPhase && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCountdownPhase && countdown === 0) {
      setIsCountdownPhase(false);
      setIsShufflingPhase(true);
    }
  }, [countdown, isCountdownPhase]);

  // Shuffling phase
  useEffect(() => {
    if (isShufflingPhase && comments.length > 0) {
      let shuffleCount = 0;
      const maxShuffles = 30; // Total number of shuffles
      let timeoutId = null;
      let isCanceled = false;

      const runShuffle = () => {
        if (isCanceled) return;

        shuffleCount++;

        // Pick random comment index for animation
        const randomIndex = Math.floor(Math.random() * comments.length);
        setCurrentShuffleIndex(randomIndex);

        if (shuffleCount >= maxShuffles) {
          // Final winner selection - use sequential picking based on pickNumber
          timeoutId = setTimeout(() => {
            if (isCanceled) return;
            // Calculate the index based on pick number (1st pick = index 0, 2nd pick = index 1, etc.)
            const targetIndex = (pickNumber - 1) % comments.length;
            onWinnerSelected(comments[targetIndex]);
          }, 500);
        } else {
          // Schedule next shuffle with gradually increasing delay
          const nextDelay = 50 + shuffleCount * 15;
          timeoutId = setTimeout(runShuffle, nextDelay);
        }
      };

      // Start the shuffling
      runShuffle();

      // Cleanup function
      return () => {
        isCanceled = true;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isShufflingPhase, comments, onWinnerSelected, pickNumber]);

  const currentUser = comments[currentShuffleIndex] || comments[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-secondary-black border border-accent-gray/20 rounded-3xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent" />

        {/* Countdown Phase */}
        {isCountdownPhase && (
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-4 text-white">
              Selecting Winner...
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={countdown}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-8xl font-bold text-primary-orange mb-4"
              >
                {countdown || "GO!"}
              </motion.div>
            </AnimatePresence>

            <p className="text-accent-gray">Preparing pick #{pickNumber}...</p>
          </div>
        )}

        {/* Shuffling Phase */}
        {isShufflingPhase && (
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-6 text-white">
              🎯 Selecting Pick #{pickNumber}...
            </h2>

            {/* Shuffling User Display */}
            <div className="bg-secondary-black-lighter rounded-2xl p-6 mb-6 border border-primary-orange/30">
              <motion.div
                key={currentShuffleIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
                className="space-y-3"
              >
                <div className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <motion.h3
                  className="text-xl font-bold text-primary-orange"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  @{currentUser?.username || "Loading..."}
                </motion.h3>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-accent-gray text-sm line-clamp-2">
                    {currentUser?.text || "Loading comment..."}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Shuffling Indicator */}
            <div className="flex justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-2 h-2 bg-primary-orange rounded-full"
                />
              ))}
            </div>

            <p className="text-accent-gray text-sm">
              Selecting participant #{pickNumber} from {comments.length}{" "}
              participants...
            </p>
          </div>
        )}

        {/* Cancel Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CountdownWinnerSelection;
