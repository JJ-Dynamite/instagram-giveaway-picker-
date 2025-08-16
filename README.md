# 🎉 Instagram Giveaway Picker

A modern, creative web application for conducting fair and transparent Instagram giveaways. Built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Modern Design**: Beautiful orange and black color scheme with smooth animations
- **Fair Selection**: Random algorithm ensures transparent winner selection
- **Instagram Ready**: Designed to work with Instagram post URLs
- **Responsive**: Works perfectly on desktop and mobile devices
- **Interactive**: Smooth animations and engaging user experience
- **Export Results**: Copy winner details and share results

## 🎨 Design Highlights

- **Color Palette**: Orange (#FF6B35) and Black (#0D1117) theme
- **Animations**: Framer Motion powered smooth transitions
- **Typography**: Inter font for modern readability
- **Components**: Modular React components for maintainability
- **Icons**: Lucide React icons for consistency

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd instagram-giveaway-picker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 How to Use

1. **Enter Instagram URL**: Paste the Instagram post URL you want to run a giveaway for
2. **Scrape Comments**: Click "Start Giveaway" to fetch all comments (currently shows demo data)
3. **Review Participants**: See all eligible participants and their comments
4. **Pick Winner**: Click "Pick Winner" to randomly select a winner
5. **Share Results**: Copy, share, or export the winner details

## ⚠️ Important Notice About Instagram Integration

**Current Status**: This application uses mock data for demonstration purposes.

### Why Real Scraping Doesn't Work

- **Instagram's Terms of Service** prohibit direct web scraping
- **Anti-bot measures** actively block scraping attempts
- **Dynamic content loading** prevents simple HTTP requests
- **CORS policies** block direct API calls from browsers

### To Implement Real Instagram Integration

You need to use Instagram's **official API** with proper authentication:

1. **Instagram Basic Display API** - Requires Facebook app registration
2. **OAuth Authentication** - Users must authorize your app
3. **Backend Server** - Handle API keys securely
4. **Rate Limiting** - 200 requests per hour per user
5. **Business Accounts** - Only works with Instagram Business/Creator accounts

### Quick Setup Guide

1. Create a Facebook Developer account
2. Register your app and add Instagram Basic Display
3. Implement OAuth flow for user authentication
4. Set up backend server to handle API calls
5. Follow rate limits and terms of service

See `INSTAGRAM_API_GUIDE.md` for detailed implementation instructions.

### Alternative Solutions

- Use Instagram's built-in giveaway tools
- Manual entry collection through forms
- Third-party services (Gleam.io, Rafflecopter)
- Ask users to tag friends instead of scraping comments

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── InputForm.jsx       # URL input form
│   ├── LoadingSpinner.jsx  # Loading animation
│   ├── CommentsList.jsx    # Comments display
│   └── WinnerDisplay.jsx   # Winner announcement
├── App.jsx                 # Main application
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## 🎯 Features in Detail

### Winner Selection Algorithm

- Cryptographically secure random number generation
- Equal probability for all participants
- Transparent selection process
- Instant results with animations

### User Experience

- Smooth page transitions
- Loading states with progress indicators
- Interactive buttons with hover effects
- Responsive design for all devices
- Accessibility considerations

### Data Handling

- Comment validation and filtering
- Duplicate detection (future feature)
- Export capabilities
- Share functionality

## 🔮 Future Enhancements

- [ ] Real Instagram API integration
- [ ] Multiple winner selection
- [ ] Comment filtering options
- [ ] Export to CSV/PDF
- [ ] User authentication
- [ ] Giveaway history
- [ ] Advanced analytics
- [ ] Custom themes
- [ ] Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 🙏 Acknowledgments

- Instagram for the platform inspiration
- React community for amazing tools
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations

---

Made with ❤️ for fair and transparent giveaways!
