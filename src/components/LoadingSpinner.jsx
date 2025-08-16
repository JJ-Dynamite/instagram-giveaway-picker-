import React from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Users } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card text-center py-12"
    >
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center"
        >
          <Instagram className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <h3 className="text-xl font-semibold mb-3">Scraping Comments</h3>
      <p className="text-accent-gray mb-8">
        We're gathering all the comments from your Instagram post...
      </p>

      <div className="flex justify-center space-x-8">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-secondary-black-lighter rounded-full flex items-center justify-center mb-2">
            <MessageCircle className="w-6 h-6 text-primary-orange" />
          </div>
          <span className="text-sm text-accent-gray">Comments</span>
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-secondary-black-lighter rounded-full flex items-center justify-center mb-2">
            <Users className="w-6 h-6 text-primary-orange" />
          </div>
          <span className="text-sm text-accent-gray">Users</span>
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 0, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-secondary-black-lighter rounded-full flex items-center justify-center mb-2">
            <Instagram className="w-6 h-6 text-primary-orange" />
          </div>
          <span className="text-sm text-accent-gray">Processing</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="mt-8 h-1 bg-gradient-orange rounded-full mx-auto max-w-md"
      />
    </motion.div>
  );
};

export default LoadingSpinner;
