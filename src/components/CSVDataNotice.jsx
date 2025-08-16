import React from "react";
import { motion } from "framer-motion";
import { FileText, Users, CheckCircle } from "lucide-react";

const CSVDataNotice = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card mb-8 border-l-4 border-l-green-500"
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center space-x-2">
            <span>Using Real Instagram Comments Data</span>
            <CheckCircle className="w-4 h-4" />
          </h3>
          <p className="text-accent-gray text-sm mb-3">
            This giveaway picker now uses real Instagram comments data exported
            from an actual Instagram post. This provides a more authentic
            experience than mock data.
          </p>
          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400">
                    Real Data Source
                  </p>
                  <p className="text-xs text-green-300">
                    "data/comments.csv" (loaded from project folder)
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">30+</p>
                <p className="text-xs text-green-300">Unique Participants</p>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-accent-gray">
            <p className="mb-1">
              <strong>Data includes:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Real Instagram usernames and comments</li>
              <li>Authentic timestamps and engagement patterns</li>
              <li>Duplicate comments filtered (one entry per user)</li>
              <li>Emoji and multi-language content preserved</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CSVDataNotice;
