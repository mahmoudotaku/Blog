# Personal Portfolio Website with AI Chat

## Overview

This is a minimalist personal portfolio website for "mahmoudotaku24" built with a modern full-stack architecture. The application features a dark-themed React frontend with an elegant card design matching the user's reference image, an Express.js backend, and an integrated AI chatbot powered by Google's Gemini AI. The site serves as a personal showcase with colorful social media buttons and an interactive AI chat assistant.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom dark theme variables and glass morphism effects
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but currently using in-memory storage)
- **Session Management**: Memory-based storage with plans for PostgreSQL sessions
- **API Integration**: Google Gemini AI for chat functionality

### Development Tools
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Code Quality**: TypeScript for type safety across the entire stack
- **Package Management**: npm with lockfile for consistent dependencies

## Key Components

### 1. Chat System
- **AI Integration**: Google Gemini AI with Arabic language support
- **Message Storage**: In-memory storage with database schema ready for persistence
- **Real-time UI**: Responsive chat interface with message history
- **Error Handling**: Comprehensive error handling for API failures and rate limits

### 2. UI Components
- **Design System**: Complete set of reusable components based on Radix UI
- **Theme**: Custom dark theme with CSS variables and multiple accent colors
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Animations**: Smooth transitions and hover effects throughout

### 3. Database Schema
- **Users Table**: Basic user management structure (ready for authentication)
- **Chat Messages Table**: Stores conversation history with timestamps and sender identification
- **Migration Support**: Drizzle Kit configured for database migrations

### 4. API Structure
- **Chat Endpoints**: 
  - `POST /api/chat` - Send message to AI and get response
  - `GET /api/chat/history` - Retrieve chat message history
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Request/response logging for API debugging

## Data Flow

1. **User Interaction**: User submits a message through the chat interface
2. **Frontend Processing**: React Hook Form validates input, TanStack Query manages the request
3. **API Request**: Frontend sends POST request to `/api/chat` endpoint
4. **Message Storage**: Backend stores user message in memory storage
5. **AI Processing**: Backend forwards message to Google Gemini AI service
6. **Response Handling**: AI response is received and stored as an AI message
7. **Data Return**: Both user and AI messages are returned to frontend
8. **UI Update**: Chat interface updates with new messages, history is refreshed

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration for chat functionality
- **@neondatabase/serverless**: PostgreSQL driver for future database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Comprehensive UI component library
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: Database migration and introspection tools

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **API Development**: tsx for running TypeScript backend with auto-reload
- **Environment Variables**: GEMINI_API_KEY required for AI functionality

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Serving**: Express serves frontend static files in production
- **Database**: PostgreSQL connection ready via DATABASE_URL environment variable

### Environment Configuration
- **Development**: Uses Vite dev server with proxy to Express backend
- **Production**: Single Express server serves both API and static frontend
- **Database**: Drizzle configured for PostgreSQL with connection pooling
- **AI Service**: Requires valid Google Gemini API key

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 29, 2025. Initial setup