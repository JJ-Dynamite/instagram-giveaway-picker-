/**
 * CSV Loader Service
 * Loads CSV data from the public folder and parses it
 */

import CSVParser from "./csvParser.js";

class CSVLoader {
  /**
   * Load CSV data from the public folder
   * @returns {Promise<Array>} Parsed comments array
   */
  static async loadCommentsFromCSV() {
    try {
      console.log("Loading CSV data from public folder...");

      // Fetch the CSV file from the public folder
      const response = await fetch("/comments.csv");

      if (!response.ok) {
        throw new Error(
          `Failed to load CSV file: ${response.status} ${response.statusText}`
        );
      }

      const csvContent = await response.text();
      console.log("CSV file loaded successfully, parsing content...");

      // Parse the CSV content using our existing parser
      const comments = CSVParser.parseCSV(csvContent);
      console.log(`Successfully parsed ${comments.length} comments from CSV`);

      // Remove duplicates (keep first occurrence of each username)
      const uniqueComments = CSVParser.deduplicateComments(comments, "first");
      console.log(
        `After deduplication: ${uniqueComments.length} unique comments`
      );

      return uniqueComments;
    } catch (error) {
      console.error("Failed to load CSV data:", error);

      // Return fallback data if CSV loading fails
      return this.getFallbackComments();
    }
  }

  /**
   * Fallback comments if CSV loading fails
   * @returns {Array} Array of fallback comment objects
   */
  static getFallbackComments() {
    console.log("Using fallback comment data...");

    return [
      {
        id: "fallback_1",
        userId: "12345",
        username: "user123",
        text: "I love this giveaway! 🎉",
        timestamp: "2 hours ago",
        profileUrl: "",
        avatarUrl: "",
        originalDate: "",
      },
      {
        id: "fallback_2",
        userId: "67890",
        username: "sarah_jones",
        text: "Pick me please! This would be amazing 💕",
        timestamp: "3 hours ago",
        profileUrl: "",
        avatarUrl: "",
        originalDate: "",
      },
      {
        id: "fallback_3",
        userId: "54321",
        username: "mike_photography",
        text: "Great content as always! Count me in 📸",
        timestamp: "4 hours ago",
        profileUrl: "",
        avatarUrl: "",
        originalDate: "",
      },
      {
        id: "fallback_4",
        userId: "98765",
        username: "emma_artist",
        text: "Following all the rules! Good luck everyone ✨",
        timestamp: "5 hours ago",
        profileUrl: "",
        avatarUrl: "",
        originalDate: "",
      },
      {
        id: "fallback_5",
        userId: "13579",
        username: "alex_runner",
        text: "This is exactly what I need! 🏃‍♂️",
        timestamp: "6 hours ago",
        profileUrl: "",
        avatarUrl: "",
        originalDate: "",
      },
    ];
  }

  /**
   * Get statistics about the loaded CSV data
   * @param {Array} comments - Array of comment objects
   * @returns {Object} Statistics object
   */
  static getStatistics(comments) {
    return CSVParser.getStatistics(comments);
  }
}

export default CSVLoader;
