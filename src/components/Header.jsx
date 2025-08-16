import React from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Heart } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="bg-secondary-black-light/80 backdrop-blur-sm border-b border-accent-gray/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Giveaway Picker</h1>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-accent-gray">Fair & Transparent</p>
                <span className="text-xs text-primary-orange font-medium">
                  •
                </span>
                <p className="text-xs text-primary-orange font-medium">
                  Powered by Val-X International
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-secondary-black-lighter hover:bg-accent-gray/10 transition-colors"
            >
              <Github className="w-5 h-5 text-accent-gray hover:text-primary-orange transition-colors" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://val-x.com", "_blank")}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-orange rounded-lg text-white font-medium hover:shadow-lg hover:shadow-primary-orange/25 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">Sponsor</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
