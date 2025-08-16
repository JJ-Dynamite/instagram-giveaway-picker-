import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Server,
  Code,
  Globe,
  Copy,
  ExternalLink,
  CheckCircle,
  Settings,
  Zap,
} from "lucide-react";

const ScrapingFailureHelp = ({ error, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code, type) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const solutions = [
    {
      id: "proxy-server",
      title: "Set Up a Proxy Server",
      icon: Server,
      difficulty: "Advanced",
      description: "Create a backend service to bypass CORS restrictions",
      steps: [
        "Create a Node.js/Express backend",
        "Add CORS middleware",
        "Proxy Instagram requests through your server",
        "Deploy to Vercel/Netlify/Heroku",
      ],
      code: `// Backend proxy server (server.js)
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/api/instagram', createProxyMiddleware({
  target: 'https://www.instagram.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/instagram': ''
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}));

app.listen(3001);`,
      pros: ["Bypasses CORS", "Full control", "Can add authentication"],
      cons: ["Requires backend setup", "Still violates ToS", "Hosting costs"],
    },
    {
      id: "browser-extension",
      title: "Browser Extension",
      icon: Globe,
      difficulty: "Advanced",
      description: "Create a browser extension with elevated permissions",
      steps: [
        "Create manifest.json with host permissions",
        "Inject content script into Instagram",
        "Extract comments via DOM manipulation",
        "Send data back to your app",
      ],
      code: `// manifest.json
{
  "manifest_version": 3,
  "name": "Instagram Comment Extractor",
  "permissions": ["activeTab"],
  "host_permissions": ["https://www.instagram.com/*"],
  "content_scripts": [{
    "matches": ["https://www.instagram.com/p/*"],
    "js": ["content.js"]
  }]
}

// content.js
const extractComments = () => {
  const comments = [];
  document.querySelectorAll('[role="button"] span').forEach(el => {
    if (el.textContent.includes('@')) {
      comments.push({
        username: el.textContent,
        text: el.parentElement.textContent
      });
    }
  });
  return comments;
};`,
      pros: ["No CORS issues", "Direct DOM access", "Real-time data"],
      cons: ["Complex development", "User must install", "Still violates ToS"],
    },
    {
      id: "scraping-api",
      title: "Use a Scraping API Service",
      icon: Zap,
      difficulty: "Easy",
      description: "Integrate with professional scraping services",
      steps: [
        "Sign up for a scraping API service",
        "Get API credentials",
        "Update the scrapeUsingProxy method",
        "Handle API responses",
      ],
      code: `// Update scrapeUsingProxy method
async scrapeUsingProxy(postId) {
  const apiKey = 'YOUR_SCRAPING_API_KEY';
  const url = \`https://api.scrapingbee.com/api/v1/?api_key=\${apiKey}&url=https://www.instagram.com/p/\${postId}/&render_js=true\`;
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    return this.parseCommentsFromHTML(html);
  } catch (error) {
    throw new Error('Scraping API failed: ' + error.message);
  }
}`,
      pros: ["Professional service", "Handles detection", "Reliable"],
      cons: ["Monthly costs", "Still violates ToS", "Rate limits"],
      services: [
        { name: "ScrapingBee", url: "https://scrapingbee.com" },
        { name: "Bright Data", url: "https://brightdata.com" },
        { name: "Apify", url: "https://apify.com" },
      ],
    },
    {
      id: "official-api",
      title: "Instagram Basic Display API",
      icon: CheckCircle,
      difficulty: "Medium",
      description: "Use Instagram's official API (recommended)",
      steps: [
        "Create Facebook Developer account",
        "Create a new app",
        "Add Instagram Basic Display product",
        "Configure OAuth and get access tokens",
      ],
      code: `// Official API implementation
const getInstagramComments = async (accessToken, mediaId) => {
  const response = await fetch(
    \`https://graph.instagram.com/\${mediaId}/comments?access_token=\${accessToken}&fields=id,text,username,timestamp\`
  );
  return await response.json();
};

// Get user media first
const getUserMedia = async (accessToken) => {
  const response = await fetch(
    \`https://graph.instagram.com/me/media?access_token=\${accessToken}&fields=id,caption,media_type,media_url,permalink,timestamp\`
  );
  return await response.json();
};`,
      pros: ["Fully legal", "Reliable", "No blocking risk", "Official support"],
      cons: ["Complex setup", "User auth required", "Limited access"],
      important: "This is the only fully legal method!",
    },
  ];

  const quickFixes = [
    {
      title: "Try Different Browser",
      description: "Some browsers have different CORS policies",
      action: "Test in Chrome, Firefox, Safari",
    },
    {
      title: "Disable Browser Security (Dev Only)",
      description:
        "Launch Chrome with --disable-web-security --user-data-dir (NOT for production)",
      action: "Only for testing purposes",
    },
    {
      title: "Use Browser Dev Tools",
      description: "Manually extract comments using browser console",
      action: "Copy-paste solution",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-secondary-black border border-red-500/30 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-red-500/10 border-b border-red-500/20 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <div>
              <h2 className="text-2xl font-bold text-red-400">
                Scraping Failed - Here's How to Fix It
              </h2>
              <p className="text-accent-gray mt-1">Error: {error}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Quick Fixes */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Quick Fixes (Try First)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickFixes.map((fix, index) => (
                <div
                  key={index}
                  className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3"
                >
                  <h4 className="font-semibold text-yellow-300 text-sm mb-1">
                    {fix.title}
                  </h4>
                  <p className="text-accent-gray text-xs mb-2">
                    {fix.description}
                  </p>
                  <p className="text-yellow-400 text-xs font-medium">
                    {fix.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>Long-term Solutions</span>
          </h3>

          <div className="space-y-6">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-xl p-4 ${
                    solution.id === "official-api"
                      ? "bg-green-500/5 border-green-500/30"
                      : "bg-secondary-black-lighter/50 border-accent-gray/20"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        solution.id === "official-api"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4
                          className={`font-bold text-lg ${
                            solution.id === "official-api"
                              ? "text-green-300"
                              : "text-blue-300"
                          }`}
                        >
                          {solution.title}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            solution.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : solution.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {solution.difficulty}
                        </span>
                        {solution.important && (
                          <span className="px-2 py-1 bg-green-500/30 text-green-300 rounded-full text-xs font-bold">
                            RECOMMENDED
                          </span>
                        )}
                      </div>

                      <p className="text-accent-gray mb-3">
                        {solution.description}
                      </p>

                      {/* Steps */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-accent-white text-sm mb-2">
                          Steps:
                        </h5>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-accent-gray">
                          {solution.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Code Example */}
                      <div className="bg-black/30 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-accent-gray">
                            Code Example:
                          </span>
                          <button
                            onClick={() => copyCode(solution.code, solution.id)}
                            className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300"
                          >
                            {copiedCode === solution.id ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-xs text-accent-white overflow-x-auto">
                          <code>{solution.code}</code>
                        </pre>
                      </div>

                      {/* Pros/Cons */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <h6 className="text-xs font-semibold text-green-400 mb-1">
                            Pros:
                          </h6>
                          <ul className="text-xs text-accent-gray space-y-1">
                            {solution.pros.map((pro, index) => (
                              <li key={index}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-xs font-semibold text-red-400 mb-1">
                            Cons:
                          </h6>
                          <ul className="text-xs text-accent-gray space-y-1">
                            {solution.cons.map((con, index) => (
                              <li key={index}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* External Services */}
                      {solution.services && (
                        <div>
                          <h6 className="text-xs font-semibold text-blue-400 mb-1">
                            Recommended Services:
                          </h6>
                          <div className="flex space-x-2">
                            {solution.services.map((service, index) => (
                              <a
                                key={index}
                                href={service.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                              >
                                <span>{service.name}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-accent-gray/10 p-4 bg-secondary-black-lighter/30">
          <div className="text-center">
            <p className="text-xs text-accent-gray mb-2">
              <strong>Note:</strong> All scraping methods except the official
              API violate Instagram's Terms of Service.
            </p>
            <p className="text-xs text-green-400">
              We strongly recommend using the{" "}
              <strong>Instagram Basic Display API</strong> for production
              applications.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrapingFailureHelp;
