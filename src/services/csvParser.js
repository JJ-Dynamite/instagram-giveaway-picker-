/**
 * CSV Parser Service for Instagram Comments
 * Parses CSV data from exported Instagram comments
 */

class CSVParser {
  /**
   * Parse CSV content and convert to comment objects
   * @param {string} csvContent - Raw CSV content
   * @returns {Array} Array of comment objects
   */
  static parseCSV(csvContent) {
    try {
      const lines = csvContent.trim().split("\n");

      if (lines.length < 2) {
        throw new Error(
          "CSV file must contain at least a header and one data row"
        );
      }

      // Parse header to get column indices
      const header = this.parseCSVLine(lines[0]);
      const columnMap = this.createColumnMap(header);

      // Parse data rows
      const comments = [];
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = this.parseCSVLine(lines[i]);
          const comment = this.createCommentObject(values, columnMap, i);
          if (comment) {
            comments.push(comment);
          }
        } catch (error) {
          console.warn(`Skipping malformed line ${i + 1}:`, error.message);
        }
      }

      return comments;
    } catch (error) {
      console.error("Error parsing CSV:", error);
      throw new Error(`Failed to parse CSV: ${error.message}`);
    }
  }

  /**
   * Parse a single CSV line handling quoted values
   * @param {string} line - CSV line
   * @returns {Array} Array of values
   */
  static parseCSVLine(line) {
    const values = [];
    let current = "";
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i += 2;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === "," && !inQuotes) {
        // End of field
        values.push(current.trim());
        current = "";
        i++;
      } else {
        current += char;
        i++;
      }
    }

    // Add last field
    values.push(current.trim());

    return values;
  }

  /**
   * Create column mapping from header
   * @param {Array} header - Header row values
   * @returns {Object} Column index mapping
   */
  static createColumnMap(header) {
    const map = {};

    header.forEach((col, index) => {
      const normalizedCol = col.toLowerCase().trim();

      // Map various possible column names to our standard format
      if (normalizedCol.includes("user") && normalizedCol.includes("id")) {
        map.userId = index;
      } else if (
        normalizedCol.includes("username") ||
        normalizedCol === "user"
      ) {
        map.username = index;
      } else if (
        normalizedCol.includes("comment") &&
        normalizedCol.includes("id")
      ) {
        map.commentId = index;
      } else if (
        normalizedCol.includes("comment") &&
        (normalizedCol.includes("text") || normalizedCol.includes("content"))
      ) {
        map.commentText = index;
      } else if (
        normalizedCol.includes("profile") &&
        normalizedCol.includes("url")
      ) {
        map.profileUrl = index;
      } else if (
        normalizedCol.includes("avatar") &&
        normalizedCol.includes("url")
      ) {
        map.avatarUrl = index;
      } else if (
        normalizedCol.includes("date") ||
        normalizedCol.includes("time") ||
        normalizedCol === "timestamp"
      ) {
        map.date = index;
      }
    });

    return map;
  }

  /**
   * Create comment object from CSV values
   * @param {Array} values - CSV row values
   * @param {Object} columnMap - Column mapping
   * @param {number} lineNumber - Line number for ID fallback
   * @returns {Object|null} Comment object or null if invalid
   */
  static createCommentObject(values, columnMap, lineNumber) {
    // Extract values using column mapping
    const userId = values[columnMap.userId] || "";
    const username = values[columnMap.username] || "";
    const commentId = values[columnMap.commentId] || "";
    const commentText = values[columnMap.commentText] || "";
    const profileUrl = values[columnMap.profileUrl] || "";
    const avatarUrl = values[columnMap.avatarUrl] || "";
    const date = values[columnMap.date] || "";

    // Validate required fields
    if (!username.trim() || !commentText.trim()) {
      return null; // Skip invalid entries
    }

    // Create standardized comment object
    return {
      id: commentId || `comment_${lineNumber}`,
      userId: userId,
      username: this.cleanUsername(username),
      text: this.cleanCommentText(commentText),
      timestamp: this.formatTimestamp(date),
      profileUrl: profileUrl,
      avatarUrl: avatarUrl,
      originalDate: date,
    };
  }

  /**
   * Clean and normalize username
   * @param {string} username - Raw username
   * @returns {string} Cleaned username
   */
  static cleanUsername(username) {
    return username
      .trim()
      .replace(/^@/, "") // Remove @ prefix if present
      .replace(/[^a-zA-Z0-9._]/g, "") // Keep only valid Instagram username characters
      .toLowerCase();
  }

  /**
   * Clean and normalize comment text
   * @param {string} text - Raw comment text
   * @returns {string} Cleaned comment text
   */
  static cleanCommentText(text) {
    return text
      .trim()
      .replace(/[\r\n]+/g, " ") // Replace line breaks with spaces
      .replace(/\s+/g, " ") // Normalize whitespace
      .substring(0, 500); // Limit length to prevent UI issues
  }

  /**
   * Format timestamp to relative time
   * @param {string} dateStr - Date string from CSV
   * @returns {string} Formatted relative time
   */
  static formatTimestamp(dateStr) {
    if (!dateStr) return "Unknown time";

    try {
      // Try to parse different date formats
      let date;

      if (dateStr.includes("/")) {
        // Format: "07/08/2025, 23:38:10"
        date = new Date(
          dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
        );
      } else {
        date = new Date(dateStr);
      }

      if (isNaN(date.getTime())) {
        return dateStr; // Return original if parsing fails
      }

      const now = new Date();
      const diffMs = now - date;
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      } else {
        return "Just now";
      }
    } catch (error) {
      console.warn("Error parsing date:", dateStr, error);
      return dateStr;
    }
  }

  /**
   * Get statistics about parsed comments
   * @param {Array} comments - Array of comment objects
   * @returns {Object} Statistics object
   */
  static getStatistics(comments) {
    const uniqueUsers = new Set(comments.map((c) => c.username)).size;
    const totalComments = comments.length;
    const avgCommentLength =
      comments.reduce((sum, c) => sum + c.text.length, 0) / totalComments;

    return {
      totalComments,
      uniqueUsers,
      avgCommentLength: Math.round(avgCommentLength),
      duplicateComments: totalComments - uniqueUsers,
    };
  }

  /**
   * Remove duplicate comments (by username)
   * @param {Array} comments - Array of comment objects
   * @param {string} strategy - 'first', 'last', or 'longest'
   * @returns {Array} Deduplicated comments
   */
  static deduplicateComments(comments, strategy = "first") {
    const seen = new Map();

    comments.forEach((comment) => {
      const key = comment.username.toLowerCase();

      if (!seen.has(key)) {
        seen.set(key, comment);
      } else if (strategy === "last") {
        seen.set(key, comment);
      } else if (strategy === "longest") {
        const existing = seen.get(key);
        if (comment.text.length > existing.text.length) {
          seen.set(key, comment);
        }
      }
      // For 'first' strategy, we keep the first occurrence (do nothing)
    });

    return Array.from(seen.values());
  }
}

export default CSVParser;
