# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# 🏠 NomadNest - Ultra Modern Travel App

<div align="center">
  <h3>A next-generation property rental platform with Apple-inspired design</h3>
  <p>Built with React Native, Expo, and TypeScript</p>
</div>

## ✨ Features

- 🎨 **Ultra Modern UI** - Sleek dark theme with neon green accents
- 🌟 **Glassmorphism Effects** - Beautiful blur effects throughout the app
- 🎭 **Smooth Animations** - Fluid animations powered by Reanimated
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🏗️ **Clean Architecture** - Modular components and typed data models
- 🎯 **Type Safety** - Full TypeScript support

## 🎨 Design System

### Color Palette
- **Primary**: Electric Neon Green (`#00FF94`)
- **Background**: Pure Black (`#000000`)
- **Text**: White & Gray scale
- **Accents**: Gradient greens for CTAs

### Components
- `Header` - Glassmorphic header with search bar
- `CategoryList` - Horizontal scrollable category chips
- `PropertyCard` - Beautiful property cards with images and ratings
- `InspirationBanner` - Gradient CTA banner

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

### Run on Device
1. Install Expo Go on your phone
2. Scan the QR code from the terminal
3. Enjoy NomadNest! 🎉

## 📁 Project Structure

```
nomadnest/
├── app/                    # App screens
│   └── (tabs)/            # Tab navigation
│       └── index.tsx      # Home screen
├── components/            # Reusable components
│   └── home/             # Home screen components
│       ├── Header.tsx
│       ├── CategoryList.tsx
│       ├── PropertyCard.tsx
│       └── InspirationBanner.tsx
├── constants/            # App constants
│   ├── colors.ts        # Color system
│   └── data.ts          # Mock data
├── types/               # TypeScript types
│   └── property.ts      # Property models
└── assets/              # Images and fonts
```

## 🛠️ Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Reanimated** - Advanced animations
- **Expo Blur** - Glassmorphism effects
- **Expo Linear Gradient** - Beautiful gradients
- **Expo Image** - Optimized image loading

## 📱 Screenshots

> Coming soon...

## 🎯 Roadmap

- [ ] Property detail screen
- [ ] Search functionality
- [ ] User authentication
- [ ] Favorites system
- [ ] Booking flow
- [ ] User profile
- [ ] Map integration
- [ ] Reviews & ratings

## 👨‍💻 Author

Built with ❤️ by Martin

## 📄 License

MIT License - feel free to use this project for learning!

---

<div align="center">
  <p>⭐ Star this repo if you like it!</p>
</div>

