import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, User, Clock, Shuffle, RotateCcw } from "lucide-react";

const CommentsList = ({ comments, onSelectWinner, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-orange rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Comments Found</h3>
            <p className="text-accent-gray text-sm">
              {comments.length} eligible participants
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectWinner}
            className="btn-primary flex items-center space-x-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Pick Winner</span>
          </motion.button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-secondary-black-lighter rounded-xl p-4 border border-accent-gray/10 hover:border-primary-orange/30 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-orange rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-primary-orange">
                    @{comment.username}
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-accent-gray">
                    <Clock className="w-3 h-3" />
                    <span>{comment.timestamp}</span>
                  </div>
                </div>
                <p className="text-accent-white text-sm leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-orange/10 rounded-lg border border-primary-orange/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-orange">
                Ready for Selection
              </p>
              <p className="text-xs text-accent-gray">
                All comments have been processed
              </p>
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-bold text-primary-orange"
          >
            {comments.length}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentsList;
