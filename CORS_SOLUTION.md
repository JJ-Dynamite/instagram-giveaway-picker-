# Fixing "Failed to fetch" Error - CORS Solution Guide

## 🚨 The Problem: CORS (Cross-Origin Resource Sharing)

The "Failed to fetch" error occurs because **browsers block requests to Instagram from your web app** due to CORS security policies. This is Instagram's intentional security measure to prevent scraping.

## 🔧 Quick Solutions (Choose One)

### 1. **EASIEST: Use a Proxy Server** ⭐ RECOMMENDED

Create a simple backend that acts as a proxy:

```bash
# Create a new Node.js project
mkdir instagram-proxy
cd instagram-proxy
npm init -y
npm install express cors axios
```

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/instagram/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const url = `https://www.instagram.com/p/${postId}/`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on http://localhost:3001");
});
```

```bash
# Run the server
node server.js
```

Then update your scraper to use the proxy:

```javascript
// In instagramScraper.js, update scrapeFromHTML method:
const url = `http://localhost:3001/api/instagram/${postId}`;
// Remove the headers since the proxy handles them
```

### 2. **Deploy to Cloud (Free Options)**

Deploy your proxy to:

- **Vercel**: `vercel --prod`
- **Netlify**: Netlify Functions
- **Railway**: `railway deploy`
- **Render**: Free tier available

### 3. **Browser Extension Solution**

Create a Chrome extension that bypasses CORS:

```json
// manifest.json
{
  "manifest_version": 3,
  "name": "Instagram Comment Extractor",
  "version": "1.0",
  "permissions": ["activeTab"],
  "host_permissions": ["https://www.instagram.com/*"],
  "action": {
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "matches": ["https://www.instagram.com/p/*"],
      "js": ["content.js"]
    }
  ]
}
```

### 4. **Use Official Instagram API** ⭐ LEGAL

Switch to Instagram's official API:

```javascript
// Get access token first, then:
const getComments = async (mediaId, accessToken) => {
  const response = await fetch(
    `https://graph.instagram.com/${mediaId}/comments?access_token=${accessToken}`
  );
  return response.json();
};
```

## 🛠️ Development Workarounds

### Disable CORS (DEVELOPMENT ONLY)

**Chrome:**

```bash
# Windows
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

# Mac
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

# Linux
google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev_test"
```

**Firefox:**

1. Type `about:config` in address bar
2. Set `security.fileuri.strict_origin_policy` to `false`
3. Set `privacy.file_unique_origin` to `false`

### Browser Extensions for Development

- **CORS Unblock** (Chrome Extension)
- **CORS Everywhere** (Firefox Add-on)

## 📱 Alternative Approaches

### 1. Manual Collection Method

```javascript
// Add this to your app for manual entry
const ManualEntryForm = () => {
  const [usernames, setUsernames] = useState("");

  const processUsernames = () => {
    const users = usernames
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    const comments = users.map((username, index) => ({
      id: index + 1,
      username: username.replace("@", ""),
      text: "Manual entry",
      timestamp: "Just now",
    }));
    return comments;
  };

  return (
    <div className="card">
      <h3>Manual Entry (CORS-Free)</h3>
      <textarea
        value={usernames}
        onChange={(e) => setUsernames(e.target.value)}
        placeholder="Enter usernames (one per line):&#10;@user1&#10;@user2&#10;@user3"
        className="w-full h-32 p-3 bg-secondary-black-lighter border border-accent-gray/20 rounded-lg"
      />
      <button onClick={() => setComments(processUsernames())}>
        Create Giveaway from Manual Entry
      </button>
    </div>
  );
};
```

### 2. Third-Party Services

Use existing giveaway platforms:

- **Gleam.io** - Professional giveaway platform
- **Rafflecopter** - Simple contest creation
- **Woobox** - Social media contests

### 3. Instagram Creator Tools

Use Instagram's built-in features:

- Instagram Stories polls
- Instagram Live Q&A
- Instagram Reels challenges

## 🔍 Testing Your Solution

1. **Test the proxy server:**

   ```bash
   curl http://localhost:3001/api/instagram/YOUR_POST_ID
   ```

2. **Check CORS headers:**

   ```javascript
   fetch("http://localhost:3001/api/instagram/test")
     .then((response) => console.log("CORS working!"))
     .catch((error) => console.log("CORS blocked:", error));
   ```

3. **Verify in browser console:**
   ```javascript
   // This should work with proxy
   fetch("/api/instagram/your-post-id")
     .then((r) => r.text())
     .then((html) => console.log("HTML length:", html.length));
   ```

## ⚡ Quick Fix for Current Error

For immediate testing, add this to your existing app:

```javascript
// Add to App.jsx - temporary CORS bypass for development
const testWithoutCORS = async () => {
  try {
    // Use a CORS proxy service for testing
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = "https://www.instagram.com/p/your-post-id/";

    const response = await fetch(proxyUrl + targetUrl);
    const html = await response.text();
    console.log("Success!", html.length);
  } catch (error) {
    console.log("Still blocked:", error);
  }
};
```

## 🎯 Production Recommendations

1. **Use Official API** - Only fully legal option
2. **Deploy a proxy server** - Best balance of functionality and ease
3. **Manual collection** - Safest fallback option
4. **Third-party services** - Most professional approach

## 🚨 Important Notes

- **CORS bypass methods still violate Instagram's ToS**
- **Use at your own risk**
- **Consider legal alternatives for production**
- **Test thoroughly before deployment**

## 🆘 Need Help?

If you're still having issues:

1. Check the browser console for specific error messages
2. Verify the Instagram post URL is correct and public
3. Test with a simple proxy server first
4. Consider using the manual entry method as a fallback

Remember: The error message shows the system is working correctly by falling back to demo data when scraping fails!
