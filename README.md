# Zyra 🎨✨

> Open-source, node-based AI image generation platform powered by Gemini 2.5 Flash

Unleash endless creativity with Zyra - a collaborative platform for AI-powered visual creativity. Create, merge, and inspire with our intuitive node-based interface.

## 🚀 Features

- **Node-based Interface**: Intuitive visual workflow for AI image generation
- **Powered by Gemini 2.5 Flash**: State-of-the-art AI image generation
- **Open Source**: Community-driven development and collaboration
- **Real-time Collaboration**: Work together on creative projects
- **Modern Stack**: Built with Next.js, TypeScript, and Tailwind CSS

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/UmarGit/zyra.git
cd zyra
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```bash
# Firebase Configuration (for Analytics)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Gemini API Configuration (for Image Generation)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📊 Analytics & Tracking

Zyra includes Firebase Analytics integration to help understand user behavior and improve the platform:

### Tracked Events
- **Page Views**: Automatic tracking of page navigation
- **Button Clicks**: User interactions with key interface elements
- **Playground Actions**: Node creation, settings toggles, and workflow actions
- **GitHub Interactions**: Stars, forks, and repository engagement
- **Image Generation**: Success/failure rates and performance metrics

### Privacy
- All analytics data is anonymized and aggregated
- No personal information is collected without consent
- Analytics help improve user experience and platform performance

### Setup Firebase Analytics

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Analytics for your project
3. Get your Firebase configuration from Project Settings
4. Add the configuration to your `.env.local` file
5. Analytics will automatically start tracking user interactions

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, your help makes Zyra better for everyone.

### Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? [Open an issue](https://github.com/UmarGit/zyra/issues/new)
- 💡 **Feature Requests**: Have an idea? [Start a discussion](https://github.com/UmarGit/zyra/discussions)
- 🔧 **Code Contributions**: Submit pull requests for bug fixes or new features
- 📚 **Documentation**: Help improve our docs and examples
- 🎨 **Design**: Contribute to UI/UX improvements
- 🧪 **Testing**: Help us test new features and report issues

### Development Workflow

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies** as described in the Getting Started section
3. **Make your changes** with clear, descriptive commit messages
4. **Test your changes** thoroughly
5. **Submit a pull request** with a clear description of your changes

### Coding Guidelines

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write clear, self-documenting code
- Add comments for complex logic
- Ensure your code is properly formatted (we use Prettier)
- Write tests for new features when applicable

### Pull Request Process

1. Ensure your PR has a clear title and description
2. Link any related issues or discussions
3. Make sure all checks pass
4. Be responsive to feedback and suggestions
5. Keep your PR focused and atomic (one feature/fix per PR)

### Code of Conduct

We are committed to fostering a welcoming and inclusive community. Please be respectful and constructive in all interactions.

### Getting Help

- 💬 **Discussions**: [GitHub Discussions](https://github.com/UmarGit/zyra/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/UmarGit/zyra/issues)
- 📧 **Contact**: Reach out to the maintainers

## 📖 Learn More

To learn more about the technologies used in Zyra:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Gemini API](https://ai.google.dev/docs)

## 🚀 Deploy on Vercel

The easiest way to deploy your Zyra instance is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⭐ Support the Project

If you find Zyra useful, please consider:

- ⭐ Starring the repository
- 🍴 Forking and contributing
- 📢 Sharing with others
- 💬 Joining our community discussions

---

<div align="center">
  <strong>Built with ❤️ by the open-source community</strong>
</div>
