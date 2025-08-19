import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import CommentsList from "./components/CommentsList";
import WinnerDisplay from "./components/WinnerDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ApiNotice from "./components/ApiNotice";
import CountdownWinnerSelection from "./components/CountdownWinnerSelection";
import LegalWarning from "./components/LegalWarning";
import ScrapingFailureHelp from "./components/ScrapingFailureHelp";
import CSVDataNotice from "./components/CSVDataNotice";
import InstagramScraper from "./services/instagramScraper";
import CSVParser from "./services/csvParser";
import CSVLoader from "./services/csvLoader";
// Removed mock data fallback; always use real CSV loader
import { Instagram, Gift, Users, Trophy, AlertTriangle } from "lucide-react";

function App() {
  const [comments, setComments] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const [isSelectingWinner, setIsSelectingWinner] = useState(false);
  const [showLegalWarning, setShowLegalWarning] = useState(false);
  const [userAcceptedRisk, setUserAcceptedRisk] = useState(false);
  const [scrapingError, setScrapingError] = useState(null);
  const [showScrapingHelp, setShowScrapingHelp] = useState(false);
  const [currentPickNumber, setCurrentPickNumber] = useState(1);

  // Function to attempt Instagram comment scraping
  const scrapeComments = async (url) => {
    if (!userAcceptedRisk) {
      setShowLegalWarning(true);
      return;
    }

    setIsLoading(true);
    setWinner(null);
    setScrapingError(null);

    try {
      const scraper = new InstagramScraper();
      console.log("Attempting to scrape Instagram comments...");

      // Try real scraping first
      const comments = await scraper.scrapeComments(url, {
        maxRetries: 2,
        useAllMethods: true,
      });

      if (comments && comments.length > 0) {
        console.log(`Successfully scraped ${comments.length} real comments`);
        setComments(comments);
        setScrapingError(null);
      } else {
        throw new Error("No comments found or scraping failed");
      }
    } catch (error) {
      console.error("Real scraping failed:", error);
      setScrapingError(error.message);

      // Fallback to CSV in public folder
      console.log("Falling back to CSV data from public/comments.csv...");
      showApiLimitationMessage();
      const csvComments = await CSVLoader.loadCommentsFromCSV();
      setComments(csvComments);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract Instagram post ID from URL
  const extractPostId = (url) => {
    const regex = /(?:instagram\.com\/(?:p|reel)\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Legal warning handlers
  const handleAcceptRisk = () => {
    setUserAcceptedRisk(true);
    setShowLegalWarning(false);
    // Continue with scraping after user accepts risk
    if (postUrl) {
      scrapeComments(postUrl);
    }
  };

  const handleDeclineRisk = async () => {
    setShowLegalWarning(false);
    // Show CSV data instead
    showApiLimitationMessage();
    const csvComments = await CSVLoader.loadCommentsFromCSV();
    setComments(csvComments);
  };

  // Show API limitation message
  const showApiLimitationMessage = () => {
    console.log(
      "Using real CSV data from Instagram export - Live scraping failed"
    );
  };

  // Generate fallback comments when CSV loading fails
  const generateFallbackComments = () => [
    {
      id: 1,
      username: "user123",
      text: "I love this giveaway! 🎉",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      username: "sarah_jones",
      text: "Pick me please! This would be amazing 💕",
      timestamp: "3 hours ago",
    },
    {
      id: 3,
      username: "mike_photography",
      text: "Great content as always! Count me in 📸",
      timestamp: "4 hours ago",
    },
    {
      id: 4,
      username: "emma_artist",
      text: "Following all the rules! Good luck everyone ✨",
      timestamp: "5 hours ago",
    },
    {
      id: 5,
      username: "alex_runner",
      text: "This is exactly what I need! 🏃‍♂️",
      timestamp: "6 hours ago",
    },
    {
      id: 6,
      username: "lisa_chef",
      text: "Amazing giveaway! Thanks for the opportunity 👨‍🍳",
      timestamp: "7 hours ago",
    },
    {
      id: 7,
      username: "david_tech",
      text: "Fingers crossed! 🤞",
      timestamp: "8 hours ago",
    },
    {
      id: 8,
      username: "anna_travel",
      text: "Would love to win this for my next adventure! ✈️",
      timestamp: "9 hours ago",
    },
    {
      id: 9,
      username: "chris_fitness",
      text: "Perfect timing for this giveaway! 💪",
      timestamp: "10 hours ago",
    },
    {
      id: 10,
      username: "maya_designer",
      text: "Such a generous giveaway! Thank you 🎨",
      timestamp: "11 hours ago",
    },
  ];

  const selectWinner = () => {
    if (comments.length === 0) return;
    setIsSelectingWinner(true);
  };

  const handleWinnerSelected = (selectedWinner) => {
    setWinner(selectedWinner);
    setIsSelectingWinner(false);
    // Increment pick number for next selection
    setCurrentPickNumber((prev) => prev + 1);
  };

  const handleCancelSelection = () => {
    setIsSelectingWinner(false);
  };

  const resetGiveaway = () => {
    setComments([]);
    setWinner(null);
    setPostUrl("");
    setIsSelectingWinner(false);
    setScrapingError(null);
    setShowScrapingHelp(false);
    setCurrentPickNumber(1); // Reset pick number
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-orange rounded-full mb-6"
            >
              <Gift className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Instagram <span className="gradient-text">Giveaway</span> Picker
            </h1>
            <p className="text-xl text-accent-gray max-w-2xl mx-auto">
              Sequential and transparent winner selection for your Instagram
              giveaways. Load real CSV comment data and let our tool do the
              magic!
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="text-sm text-accent-gray">Developed by</span>
              <span className="text-sm font-semibold text-primary-orange">
                Val-X International
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card text-center"
            >
              <Instagram className="w-8 h-8 text-primary-orange mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Instagram Ready</h3>
              <p className="text-accent-gray">
                Works with any public Instagram post
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card text-center"
            >
              <Trophy className="w-8 h-8 text-primary-orange mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-accent-gray">Get your winner in seconds</p>
            </motion.div>
          </div>

          {/* Instagram URL Input Form */}
          {comments.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-white text-center">
                Enter Instagram Post URL
              </h3>
              <p className="text-accent-gray mb-6 text-center">
                Paste the Instagram post URL below to load comments and start
                the giveaway
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    placeholder="https://www.instagram.com/p/ABC123..."
                    className="w-full px-4 py-3 bg-secondary-black-lighter border border-accent-gray/20 rounded-lg text-white placeholder-accent-gray focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent transition-all"
                  />
                  {postUrl && (
                    <div className="absolute right-3 top-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      const csvComments = await CSVLoader.loadCommentsFromCSV();
                      setComments(csvComments);
                    } catch (error) {
                      console.error("Failed to load CSV comments:", error);
                      // Keep current state; show notice instead of mock data
                      showApiLimitationMessage();
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={!postUrl.trim() || isLoading}
                  className="w-full bg-gradient-orange text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "⏳ Loading..."
                    : "🎯 Load Comments & Start Giveaway"}
                </motion.button>
              </div>

              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-blue-300 text-sm text-center">
                  💡 <strong>Note:</strong> This loads real CSV data from your
                  Instagram export file located in the project's data folder.
                  The URL is used for display purposes only.
                </p>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && <LoadingSpinner />}

          {/* Winner Display */}
          {winner && (
            <WinnerDisplay
              winner={winner}
              onReset={resetGiveaway}
              onSelectAgain={selectWinner}
              pickNumber={currentPickNumber - 1} // Show the number that was just selected
            />
          )}

          {/* CSV Data Notice */}
          {comments.length > 0 && !winner && !isSelectingWinner && (
            <CSVDataNotice />
          )}

          {/* Comments List */}
          {comments.length > 0 && !winner && !isSelectingWinner && (
            <CommentsList
              comments={comments}
              onSelectWinner={selectWinner}
              onReset={resetGiveaway}
            />
          )}

          {/* Countdown Winner Selection */}
          {isSelectingWinner && (
            <CountdownWinnerSelection
              comments={comments}
              onWinnerSelected={handleWinnerSelected}
              onCancel={handleCancelSelection}
              pickNumber={currentPickNumber}
            />
          )}
        </motion.div>
      </main>

      {/* Footer with Val-X International branding */}
      <footer className="mt-20 py-8 border-t border-accent-gray/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-accent-gray">
                  © 2024 Instagram Giveaway Picker
                </p>
                <p className="text-xs text-primary-orange font-medium">
                  Powered by Val-X International
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="https://val-x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-gray hover:text-primary-orange transition-colors"
              >
                Visit Val-X International
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-gray hover:text-primary-orange transition-colors"
              >
                GitHub
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open("https://val-x.com/contact", "_blank")
                }
                className="text-sm text-primary-orange hover:text-primary-orange-light font-medium transition-colors"
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
