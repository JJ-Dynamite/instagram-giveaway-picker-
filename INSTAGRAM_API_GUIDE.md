# Instagram API Integration Guide

## Why Real Scraping Doesn't Work

The current application shows mock data because:

1. **Instagram's Terms of Service** - Direct web scraping is prohibited
2. **Anti-bot Measures** - Instagram actively blocks scraping attempts
3. **Dynamic Content** - Comments load via JavaScript, making simple HTTP requests ineffective
4. **CORS Policies** - Browser security prevents direct API calls from web apps

## Official Instagram API Solution

### 1. Instagram Basic Display API

```javascript
// Example API integration (requires backend)
const fetchInstagramComments = async (postId, accessToken) => {
  try {
    // Step 1: Get media details
    const mediaResponse = await fetch(
      `https://graph.instagram.com/${postId}?fields=id,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
    );
    const mediaData = await mediaResponse.json();

    // Step 2: Get comments (requires additional permissions)
    const commentsResponse = await fetch(
      `https://graph.instagram.com/${postId}/comments?fields=id,text,username,timestamp&access_token=${accessToken}`
    );
    const commentsData = await commentsResponse.json();

    return commentsData.data;
  } catch (error) {
    console.error("Instagram API Error:", error);
    return [];
  }
};
```

### 2. Required Setup Steps

#### A. Create Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com/apps/)
2. Create a new app
3. Add "Instagram Basic Display" product
4. Configure OAuth settings

#### B. Environment Variables

```env
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret
INSTAGRAM_REDIRECT_URI=https://yourapp.com/auth/callback
```

#### C. OAuth Flow Implementation

```javascript
// Frontend: Redirect to Instagram OAuth
const authenticateUser = () => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  window.location.href = authUrl;
};

// Backend: Exchange code for access token
const exchangeCodeForToken = async (code) => {
  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.INSTAGRAM_APP_ID,
      client_secret: process.env.INSTAGRAM_APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
      code: code,
    }),
  });

  return await response.json();
};
```

### 3. Backend Implementation Example

```javascript
// Express.js backend example
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Instagram OAuth callback
app.get("/auth/instagram/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const tokenData = await exchangeCodeForToken(code);
    // Store access token securely
    res.redirect(`http://localhost:3000?token=${tokenData.access_token}`);
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Fetch Instagram comments
app.post("/api/instagram/comments", async (req, res) => {
  const { postId, accessToken } = req.body;

  try {
    const comments = await fetchInstagramComments(postId, accessToken);
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

### 4. Frontend Integration

```javascript
// Update your App.jsx
const fetchInstagramComments = async (postId) => {
  const accessToken = localStorage.getItem("instagram_access_token");

  if (!accessToken) {
    // Redirect to authentication
    authenticateUser();
    return null;
  }

  const response = await fetch("http://localhost:5000/api/instagram/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, accessToken }),
  });

  const data = await response.json();
  return data.comments;
};
```

## Limitations & Considerations

### API Limitations

- **Rate Limits**: 200 requests per hour per user
- **User Consent**: Users must authorize your app
- **Business Accounts**: Only works with Instagram Business/Creator accounts
- **App Review**: Public apps need Instagram approval
- **Comment Access**: Limited comment data available

### Alternative Approaches

#### 1. Manual Collection

```javascript
// Simple form-based entry collection
const ManualEntryForm = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = (username, comment) => {
    setEntries([
      ...entries,
      {
        id: Date.now(),
        username,
        comment,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // ... rest of component
};
```

#### 2. Third-Party Services

- **Gleam.io** - Professional giveaway platform
- **Rafflecopter** - Social media contest tools
- **Woobox** - Comprehensive social campaigns

#### 3. Instagram's Built-in Tools

- Instagram Shopping tags
- Instagram Reels Play Bonus
- Brand Collaboration Manager

## Security Best Practices

1. **Never expose API secrets** in frontend code
2. **Use HTTPS** for all API communications
3. **Validate all inputs** to prevent injection attacks
4. **Implement rate limiting** to prevent abuse
5. **Store tokens securely** using proper encryption

## Legal Compliance

- ✅ Use official Instagram API
- ✅ Follow Instagram's Terms of Service
- ✅ Respect user privacy and data protection laws
- ✅ Implement proper consent mechanisms
- ❌ Don't scrape Instagram directly
- ❌ Don't violate rate limits
- ❌ Don't access data without permission

## Testing Your Implementation

```javascript
// Test with Instagram's test users
const testInstagramAPI = async () => {
  const testPostId = "your_test_post_id";
  const testAccessToken = "your_test_access_token";

  try {
    const comments = await fetchInstagramComments(testPostId, testAccessToken);
    console.log("API Test Successful:", comments);
  } catch (error) {
    console.error("API Test Failed:", error);
  }
};
```

## Production Deployment

1. **Environment Setup**

   - Secure server with HTTPS
   - Environment variables for API keys
   - Database for storing user data and tokens

2. **Monitoring**

   - API usage tracking
   - Error logging
   - Performance monitoring

3. **Compliance**
   - Privacy policy updates
   - Terms of service
   - GDPR/CCPA compliance if applicable

Remember: This is a complex integration that requires careful planning, proper authentication, and compliance with Instagram's policies. The mock data in this demo serves as a placeholder while you implement the real API integration.
