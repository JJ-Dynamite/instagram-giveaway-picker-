import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Code,
  Shield,
} from "lucide-react";

const ApiNotice = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-8 border border-yellow-500/20 bg-yellow-500/5"
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-500 mb-2">
            Instagram API Integration Required
          </h3>
          <p className="text-accent-gray mb-4">
            This application currently shows demo data. Real Instagram comment
            scraping requires official API integration.
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-primary-orange hover:text-primary-orange-light transition-colors"
          >
            <span className="text-sm font-medium">
              {isExpanded
                ? "Hide Details"
                : "Learn How to Implement Real Scraping"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pl-14 space-y-6"
          >
            {/* Steps */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-primary-orange flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Implementation Steps</span>
              </h4>

              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: "Create Facebook App",
                    description:
                      "Register your app at developers.facebook.com and add Instagram Basic Display product",
                    link: "https://developers.facebook.com/apps/",
                  },
                  {
                    step: 2,
                    title: "Configure OAuth",
                    description:
                      "Set up redirect URIs and get your App ID and App Secret",
                    link: null,
                  },
                  {
                    step: 3,
                    title: "User Authorization",
                    description:
                      "Implement OAuth flow to get user access tokens with instagram_basic scope",
                    link: null,
                  },
                  {
                    step: 4,
                    title: "API Integration",
                    description:
                      "Use Instagram Basic Display API to fetch media and comments",
                    link: "https://developers.facebook.com/docs/instagram-basic-display-api",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start space-x-3 p-3 bg-secondary-black-lighter rounded-lg"
                  >
                    <div className="w-6 h-6 bg-primary-orange rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-accent-white">
                        {item.title}
                      </h5>
                      <p className="text-sm text-accent-gray mt-1">
                        {item.description}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs text-primary-orange hover:text-primary-orange-light mt-2"
                        >
                          <span>Documentation</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-primary-orange flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Important Limitations</span>
              </h4>

              <div className="space-y-2">
                {[
                  "Only works with Instagram Business/Creator accounts",
                  "Users must authorize your app to access their content",
                  "Rate limits: 200 requests per hour per user",
                  "Comments API has additional restrictions and requirements",
                  "App must go through Instagram's review process for public use",
                ].map((limitation, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-accent-gray">{limitation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Solutions */}
            <div className="p-4 bg-primary-orange/10 rounded-lg border border-primary-orange/20">
              <h5 className="font-semibold text-primary-orange mb-2 flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>Recommended Alternatives</span>
              </h5>
              <ul className="text-sm text-accent-gray space-y-1">
                <li>• Use Instagram's official giveaway tools</li>
                <li>• Manually collect entries through DMs or forms</li>
                <li>
                  • Use third-party services that comply with Instagram's ToS
                </li>
                <li>
                  • Ask participants to tag friends instead of scraping comments
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ApiNotice;
