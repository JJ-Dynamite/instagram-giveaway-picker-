/**
 * Instagram Comment Scraper Service
 *
 * ⚠️ LEGAL WARNING ⚠️
 * This implementation violates Instagram's Terms of Service.
 * Use at your own risk. Consider these alternatives:
 * 1. Instagram Basic Display API (official)
 * 2. Manual comment collection
 * 3. Third-party compliant tools
 *
 * Risks include:
 * - IP blocking
 * - Legal action
 * - Account suspension
 * - Rate limiting
 */

class InstagramScraper {
  constructor() {
    this.userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    ];

    this.proxyList = [
      // Add your proxy servers here
      // Format: { host: 'proxy.example.com', port: 8080, auth: { username: 'user', password: 'pass' } }
    ];

    this.currentProxyIndex = 0;
    this.requestCount = 0;
    this.lastRequestTime = 0;
    this.minRequestInterval = 2000; // 2 seconds between requests
  }

  getRandomUserAgent() {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async rateLimitDelay() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minRequestInterval) {
      const delayTime = this.minRequestInterval - timeSinceLastRequest;
      await this.delay(delayTime);
    }

    this.lastRequestTime = Date.now();
  }

  extractPostId(url) {
    const patterns = [
      /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
      /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
      /instagr\.am\/p\/([A-Za-z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    throw new Error("Invalid Instagram URL format");
  }

  /**
   * Method 1: Direct HTML scraping (High risk, often blocked)
   */
  async scrapeFromHTML(postId) {
    await this.rateLimitDelay();

    const url = `https://www.instagram.com/p/${postId}/`;
    const headers = {
      "User-Agent": this.getRandomUserAgent(),
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      DNT: "1",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Cache-Control": "max-age=0",
    };

    try {
      const response = await fetch(url, {
        headers,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      return this.parseCommentsFromHTML(html);
    } catch (error) {
      console.error("HTML scraping failed:", error);

      // Provide more specific error information
      if (error.message.includes("Failed to fetch")) {
        throw new Error(
          "CORS Error: Browser blocks direct Instagram requests. Use a proxy server or backend service."
        );
      } else if (error.message.includes("403")) {
        throw new Error(
          "Instagram blocked the request (IP banned or rate limited)"
        );
      } else if (error.message.includes("404")) {
        throw new Error("Instagram post not found or is private");
      } else if (error.message.includes("429")) {
        throw new Error("Rate limited by Instagram - too many requests");
      }

      throw error;
    }
  }

  /**
   * Method 2: GraphQL endpoint scraping (Medium risk)
   */
  async scrapeFromGraphQL(postId) {
    await this.rateLimitDelay();

    // First, get the post's numeric ID
    const postData = await this.getPostData(postId);
    if (!postData) throw new Error("Could not fetch post data");

    const numericId = postData.id;
    const variables = {
      id: numericId,
      first: 50, // Number of comments to fetch
    };

    const url = "https://www.instagram.com/graphql/query/";
    const headers = {
      "User-Agent": this.getRandomUserAgent(),
      "X-Requested-With": "XMLHttpRequest",
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": await this.getCSRFToken(),
      "X-Instagram-AJAX": "1",
      Referer: `https://www.instagram.com/p/${postId}/`,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: new URLSearchParams({
          query_hash: "bc3296d1ce80a24b1b6e40b1e72903f5", // Comments query hash
          variables: JSON.stringify(variables),
        }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status}`);
      }

      const data = await response.json();
      return this.parseGraphQLComments(data);
    } catch (error) {
      console.error("GraphQL scraping failed:", error);
      throw error;
    }
  }

  /**
   * Method 3: Using a proxy service (Lower risk, but requires external service)
   */
  async scrapeUsingProxy(postId) {
    // Example using a hypothetical proxy service
    // You would need to implement this with a actual proxy service
    const proxyUrl = `https://your-proxy-service.com/instagram/${postId}/comments`;

    try {
      const response = await fetch(proxyUrl, {
        headers: {
          Authorization: "Bearer YOUR_PROXY_API_KEY",
          "User-Agent": this.getRandomUserAgent(),
        },
      });

      if (!response.ok) {
        throw new Error(`Proxy service failed: ${response.status}`);
      }

      const data = await response.json();
      return this.normalizeProxyData(data);
    } catch (error) {
      console.error("Proxy scraping failed:", error);
      throw error;
    }
  }

  /**
   * Main scraping method with fallbacks
   */
  async scrapeComments(postUrl, options = {}) {
    const { maxRetries = 3, useAllMethods = true } = options;

    try {
      const postId = this.extractPostId(postUrl);
      console.log(`Attempting to scrape comments for post: ${postId}`);

      const methods = [];

      if (useAllMethods) {
        methods.push(
          () => this.scrapeFromHTML(postId),
          () => this.scrapeFromGraphQL(postId),
          () => this.scrapeUsingProxy(postId)
        );
      } else {
        // Start with the least risky method
        methods.push(() => this.scrapeUsingProxy(postId));
      }

      let lastError;

      for (const method of methods) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(
              `Attempting scraping method ${
                methods.indexOf(method) + 1
              }, attempt ${attempt}`
            );
            const comments = await method();

            if (comments && comments.length > 0) {
              console.log(`Successfully scraped ${comments.length} comments`);
              return this.deduplicateComments(comments);
            }
          } catch (error) {
            lastError = error;
            console.warn(
              `Method ${
                methods.indexOf(method) + 1
              }, attempt ${attempt} failed:`,
              error.message
            );

            if (attempt < maxRetries) {
              const backoffTime = Math.pow(2, attempt) * 1000; // Exponential backoff
              console.log(`Retrying in ${backoffTime}ms...`);
              await this.delay(backoffTime);
            }
          }
        }
      }

      throw lastError || new Error("All scraping methods failed");
    } catch (error) {
      console.error("Scraping failed completely:", error);
      throw error;
    }
  }

  parseCommentsFromHTML(html) {
    const comments = [];

    try {
      // Look for JSON data in script tags
      const scriptRegex =
        /<script[^>]*>window\._sharedData\s*=\s*({.*?})\s*;<\/script>/;
      const match = html.match(scriptRegex);

      if (match) {
        const sharedData = JSON.parse(match[1]);
        const media =
          sharedData?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;

        if (media?.edge_media_to_parent_comment?.edges) {
          media.edge_media_to_parent_comment.edges.forEach((edge) => {
            const comment = edge.node;
            comments.push({
              id: comment.id,
              username: comment.owner.username,
              text: comment.text,
              timestamp: this.formatTimestamp(comment.created_at),
              likes: comment.edge_liked_by?.count || 0,
            });
          });
        }
      }

      // Fallback: Parse from React props
      if (comments.length === 0) {
        const propsRegex = /"props":({.*?"comments".*?})/g;
        let propsMatch;
        while ((propsMatch = propsRegex.exec(html)) !== null) {
          try {
            const props = JSON.parse(propsMatch[1]);
            // Extract comments from props structure
            // This would need to be adapted based on current Instagram structure
          } catch (e) {
            continue;
          }
        }
      }
    } catch (error) {
      console.error("Error parsing HTML:", error);
    }

    return comments;
  }

  parseGraphQLComments(data) {
    const comments = [];

    try {
      const edges =
        data?.data?.media?.edge_media_to_parent_comment?.edges || [];

      edges.forEach((edge) => {
        const comment = edge.node;
        comments.push({
          id: comment.id,
          username: comment.owner.username,
          text: comment.text,
          timestamp: this.formatTimestamp(comment.created_at),
          likes: comment.edge_liked_by?.count || 0,
        });
      });
    } catch (error) {
      console.error("Error parsing GraphQL data:", error);
    }

    return comments;
  }

  normalizeProxyData(data) {
    // Normalize data from proxy service to our format
    return (
      data.comments?.map((comment) => ({
        id: comment.id || Math.random().toString(36),
        username: comment.username || comment.user?.username,
        text: comment.text || comment.content,
        timestamp: this.formatTimestamp(
          comment.timestamp || comment.created_at
        ),
        likes: comment.likes || 0,
      })) || []
    );
  }

  deduplicateComments(comments) {
    const seen = new Set();
    return comments.filter((comment) => {
      const key = `${comment.username}-${comment.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  formatTimestamp(timestamp) {
    if (!timestamp) return "Unknown";

    const date = new Date(
      typeof timestamp === "string" ? timestamp : timestamp * 1000
    );
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    }
  }

  async getPostData(postId) {
    // Implementation to get post's numeric ID
    // This would require additional scraping
    return null;
  }

  async getCSRFToken() {
    // Implementation to get CSRF token
    // Required for GraphQL requests
    return "";
  }
}

export default InstagramScraper;
