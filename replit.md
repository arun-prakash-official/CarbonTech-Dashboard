# CarbonTech Dashboard - Architecture Guide

## Overview

CarbonTech Dashboard is a full-stack web application for carbon emissions tracking and sustainability portfolio management. The application features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence through Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom styling
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth animations

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Layer
- **Schema Definition**: Centralized in `shared/schema.ts` using Drizzle ORM
- **Current Schema**: User management with username/password authentication
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Database Configuration**: PostgreSQL connection via environment variables

### API Layer
- **Route Registration**: Centralized in `server/routes.ts`
- **Storage Access**: Through abstracted storage interface
- **Error Handling**: Global error middleware with structured responses
- **Request Logging**: Custom middleware for API request logging

### Frontend Components
- **Dashboard Layout**: Multi-section landing page with navigation
- **Component Library**: Comprehensive UI components from shadcn/ui
- **Custom Components**: Brand kits, carbon analytics, portfolio stats
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Development Tools
- **Hot Reload**: Vite development server with HMR
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: Configured linting and formatting (implied by tsconfig)

## Data Flow

### Client-Server Communication
1. Frontend makes HTTP requests to `/api/*` endpoints
2. Express server routes requests through registered handlers
3. Business logic accesses data through storage interface
4. Database operations performed via Drizzle ORM
5. Responses formatted as JSON and returned to client

### State Management
1. TanStack Query manages server state with automatic caching
2. Local component state for UI interactions
3. Query client configured with custom fetch functions
4. Error boundaries handle API failures gracefully

### Authentication Flow
- User schema supports username/password authentication
- Storage interface provides user lookup and creation methods
- Session management ready for implementation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **framer-motion**: Animation library
- **recharts**: Chart visualization

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler
- **vite**: Frontend build tool and dev server
- **tailwindcss**: Utility-first CSS framework

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling integration

## Deployment Strategy

### Build Process
1. **Development**: `npm run dev` starts both frontend and backend with hot reload
2. **Production Build**: 
   - Frontend: Vite builds React app to `dist/public`
   - Backend: esbuild bundles server to `dist/index.js`
3. **Database**: `npm run db:push` applies schema changes

### Environment Configuration
- **Development**: Local development with in-memory storage fallback
- **Production**: Requires `DATABASE_URL` environment variable
- **Replit**: Configured for autoscale deployment target

### Port Configuration
- **Development**: Server runs on port 5000
- **Production**: External port 80 maps to internal port 5000

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 19, 2025. Initial setup