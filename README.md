# Sustainify

![Sustainify Banner](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200&h=400)

Sustainify is a comprehensive sustainability tracking and improvement platform that helps users monitor their environmental impact, compete with others, and make more eco-conscious decisions.

## 🌱 Features

### 1. Personal Impact Dashboard
- Real-time sustainability score tracking
- Weekly progress visualization
- Carbon footprint monitoring
- Investment credit system

### 2. Global Leaderboard
- Compete with other eco-warriors
- Track your ranking
- View sustainability achievements
- Get personalized improvement suggestions

### 3. AI-Powered Eco Assistant
- Get personalized sustainability advice
- Analyze shopping patterns
- Receive eco-friendly product recommendations
- Learn about sustainable alternatives

### 4. Sustainable Places Map
- Find eco-friendly stores and services
- Discover refill stations
- Locate zero-waste shops
- Search by category (Food, Clothing, Refill, etc.)

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sustainify.git
cd sustainify
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Platform Support

- Web (Primary Platform)
- iOS (Coming Soon)
- Android (Coming Soon)

## 🛠️ Built With

- [Expo](https://expo.dev/) - The React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [React Native](https://reactnative.dev/) - Cross-platform development
- [Google Gemini AI](https://ai.google.dev/) - AI-powered sustainability assistant
- [Lucide Icons](https://lucide.dev/) - Beautiful icon system
- [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit) - Data visualization
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) - Gradient effects
- [React Native WebView](https://github.com/react-native-webview/react-native-webview) - Web content integration

## 📂 Project Structure

```
sustainify/
├── app/                    # Application routes
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── _layout.tsx    # Tab configuration
│   │   ├── index.tsx      # Impact dashboard
│   │   ├── leaderboard.tsx# Global leaderboard
│   │   ├── chat.tsx       # AI assistant
│   │   └── map.tsx        # Sustainable places
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
└── assets/              # Static assets
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API key for the sustainability assistant |

## 🎨 Design System

### Colors
- Primary: `#4ade80` (Green)
- Background: `#1a1a1a` (Dark)
- Text: `#ffffff` (White)
- Accent: `#facc15` (Yellow)
- Error: `#f87171` (Red)

### Typography
- Headings: System font, bold
- Body: System font, regular
- Scores: System font, semi-bold

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/sustainify](https://github.com/yourusername/sustainify)

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for beautiful images
- [OpenStreetMap](https://www.openstreetmap.org) for map data
- All contributors who have helped this project grow