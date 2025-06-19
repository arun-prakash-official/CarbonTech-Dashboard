# CarbonTech Dashboard

A modern, pixel-perfect sustainability portfolio management application featuring interactive brand kits, data visualizations, and sophisticated animations with comprehensive dark/light mode support.

## ✨ Features

- **Interactive Brand Kits**: Manage sustainability brands with dynamic selection
- **Carbon Analytics Dashboard**: Real-time carbon footprint tracking and visualization
- **Portfolio Statistics**: Comprehensive performance metrics with progress tracking
- **Water Ripple Effects**: Striking hover animations throughout all interactive elements
- **Immersive Loader**: Lusion-style loading experience with geometric animations
- **Dark/Light Theme**: Seamless theme switching with smooth transitions
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Modern Animations**: Powered by Framer Motion for smooth user interactions

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and build tooling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library built on Radix UI
- **Framer Motion** for animations and transitions
- **TanStack Query** for server state management
- **Wouter** for lightweight routing
- **Recharts** for data visualization

### Backend
- **Node.js** with TypeScript
- **Express.js** REST API server
- **Drizzle ORM** for type-safe database operations
- **In-memory storage** (no external database required)

### UI & Animation
- **Radix UI** primitives for accessibility
- **Lucide React** icons
- **Custom water ripple effects**
- **Glass morphism** design elements

## 📋 Prerequisites

- **Node.js** version 18 or higher
- **npm** (comes with Node.js)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carbontech-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

That's it! The application will start with both frontend and backend running on the same port.

## 📜 Available Scripts

- **`npm run dev`** - Start the development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm start`** - Run the production build
- **`npm run db:push`** - Apply database schema changes (if using external DB)

## 🏗️ Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions and configurations
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data storage interface
│   └── vite.ts          # Vite integration
├── shared/              # Shared types and schemas
└── components.json      # shadcn/ui configuration
```

## 🎨 Key Components

### Brand Kits
Interactive cards for managing sustainability brand portfolios with:
- Dynamic selection states
- Hover animations with water ripple effects
- Progress tracking and metrics

### Carbon Analytics
Real-time dashboard featuring:
- Carbon footprint visualization
- Interactive charts and graphs
- Performance metrics tracking

### Portfolio Statistics
Comprehensive stats display with:
- Progress bars and trend indicators
- Color-coded performance metrics
- Interactive hover states

### Water Ripple Effects
Sophisticated hover animations that create:
- Dynamic ripple effects on click/hover
- Varying intensities and colors
- Smooth visual feedback across all interactive elements

## 🌙 Theme System

The application features a comprehensive dark/light theme system:
- Automatic theme detection
- Manual theme toggle
- Smooth transitions between themes
- CSS variable-based color management

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process using port 5000
npx kill-port 5000
npm run dev
```

**Dependencies not installing:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clean build and restart
rm -rf dist
npm run build
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the project structure and documentation
3. Ensure all prerequisites are met
4. Verify Node.js version compatibility

---

Built with Replit AI using modern web technologies for an exceptional user experience.
