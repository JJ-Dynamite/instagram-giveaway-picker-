import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  Scale,
  X,
  CheckCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

const LegalWarning = ({ onAccept, onDecline }) => {
  const [hasRead, setHasRead] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const warnings = [
    {
      icon: AlertTriangle,
      title: "Terms of Service Violation",
      content:
        "Instagram's Terms of Service explicitly prohibit automated data collection and web scraping. Using this tool violates these terms.",
      severity: "high",
    },
    {
      icon: Scale,
      title: "Legal Consequences",
      content:
        "Potential legal actions include cease and desist orders, DMCA takedown notices, and civil lawsuits for contract breach and unauthorized access.",
      severity: "high",
    },
    {
      icon: Shield,
      title: "Technical Risks",
      content:
        "Your IP address may be permanently blocked, affecting access to Instagram from your network. Rate limiting and CAPTCHA challenges are common.",
      severity: "medium",
    },
    {
      icon: AlertCircle,
      title: "Account Suspension",
      content:
        "Instagram may suspend or terminate accounts associated with scraping activities, including personal and business accounts.",
      severity: "medium",
    },
  ];

  const alternatives = [
    {
      name: "Instagram Basic Display API",
      description: "Official API for accessing Instagram data",
      url: "https://developers.facebook.com/docs/instagram-basic-display-api/",
      recommended: true,
    },
    {
      name: "Manual Collection",
      description: "Manually collect participant usernames",
      recommended: true,
    },
    {
      name: "Third-party Tools",
      description: "Use compliant giveaway management platforms",
      examples: ["Gleam", "Rafflecopter", "Woobox"],
    },
    {
      name: "Instagram Creator Tools",
      description: "Use Instagram's built-in promotional tools",
      recommended: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-secondary-black border border-red-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-red-500/10 border-b border-red-500/20 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-400">
                ⚠️ LEGAL WARNING ⚠️
              </h2>
              <p className="text-accent-gray">
                Please read carefully before proceeding
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Critical Notice */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <h3 className="text-red-400 font-bold text-lg mb-2">
              🚨 CRITICAL NOTICE
            </h3>
            <p className="text-red-300 text-sm leading-relaxed">
              This tool implements Instagram data scraping which{" "}
              <strong>violates Instagram's Terms of Service</strong>. By
              proceeding, you acknowledge full responsibility for any
              consequences including but not limited to: account suspension, IP
              blocking, legal action, and violation of applicable laws.
            </p>
          </div>

          {/* Warnings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {warnings.map((warning, index) => {
              const Icon = warning.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    warning.severity === "high"
                      ? "bg-red-500/5 border-red-500/20"
                      : "bg-yellow-500/5 border-yellow-500/20"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      className={`w-5 h-5 mt-0.5 ${
                        warning.severity === "high"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    />
                    <div>
                      <h4
                        className={`font-semibold text-sm mb-1 ${
                          warning.severity === "high"
                            ? "text-red-300"
                            : "text-yellow-300"
                        }`}
                      >
                        {warning.title}
                      </h4>
                      <p className="text-accent-gray text-xs leading-relaxed">
                        {warning.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legal Alternatives */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 mb-6">
            <h3 className="text-green-400 font-bold text-lg mb-3 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Legal Alternatives</span>
            </h3>
            <div className="space-y-3">
              {alternatives.map((alt, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alt.recommended ? "bg-green-400" : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-green-300 text-sm">
                        {alt.name}
                      </h4>
                      {alt.recommended && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-accent-gray text-xs leading-relaxed">
                      {alt.description}
                    </p>
                    {alt.url && (
                      <a
                        href={alt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs mt-1"
                      >
                        <span>Learn more</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {alt.examples && (
                      <p className="text-accent-gray text-xs mt-1">
                        Examples: {alt.examples.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer Text */}
          <div className="bg-secondary-black-lighter/50 rounded-xl p-4 border border-accent-gray/10">
            <h3 className="font-semibold text-accent-white mb-2">Disclaimer</h3>
            <div className="text-xs text-accent-gray leading-relaxed space-y-2">
              <p>
                <strong>Legal Responsibility:</strong> You are solely
                responsible for compliance with Instagram's Terms of Service,
                applicable laws, and regulations in your jurisdiction.
              </p>
              <p>
                <strong>No Warranty:</strong> This software is provided "as is"
                without warranty of any kind. The developers disclaim all
                liability for damages resulting from its use.
              </p>
              <p>
                <strong>Detection Risk:</strong> Instagram actively monitors for
                scraping activities using sophisticated detection systems. There
                is no guarantee that these methods will work or remain
                undetected.
              </p>
              <p>
                <strong>Rate Limiting:</strong> Aggressive scraping may trigger
                Instagram's rate limiting, affecting legitimate use of the
                platform.
              </p>
            </div>
          </div>

          {/* Acknowledgment Checkbox */}
          <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasRead}
                onChange={(e) => setHasRead(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-500 border-red-500/30 rounded focus:ring-red-500/20"
              />
              <span className="text-sm text-accent-gray leading-relaxed">
                I acknowledge that I have read and understand the legal risks,
                take full responsibility for any consequences, and understand
                that this violates Instagram's Terms of Service. I proceed at my
                own risk.
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-accent-gray/10 p-6 flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDecline}
            className="flex-1 bg-secondary-black-lighter border border-accent-gray/20 text-accent-gray hover:text-white rounded-xl py-3 px-4 font-medium transition-colors"
          >
            Use Legal Alternatives
          </motion.button>
          <motion.button
            whileHover={{ scale: hasRead ? 1.02 : 1 }}
            whileTap={{ scale: hasRead ? 0.98 : 1 }}
            onClick={hasRead ? onAccept : undefined}
            disabled={!hasRead}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              hasRead
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-500/20 text-red-400/50 cursor-not-allowed"
            }`}
          >
            I Accept the Risks
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalWarning;
