# Personalized Study Schedule Creator

## Problem
Students often struggle to organize their study time effectively across multiple subjects and topics, leading to inefficient learning and increased stress. They need a structured approach to allocate time without manual calculation or external tools.

## Solution
This web application provides a solution by allowing users to input their subjects, specific topics, estimated time required for each, and their weekly availability. The site then generates a personalized, color-coded study schedule. While the drag-and-drop functionality for adjusting time slots is conceptualized for this initial build, the framework is set for future implementation.

## Features
- **Subject & Topic Management**: Add and manage subjects and their associated topics with estimated study times.
- **Availability Input**: Define your weekly study availability.
- **Personalized Schedule Generation**: Automatically generates a color-coded study schedule based on your inputs.
- **Weekly View**: Visualize your schedule in a clear, intuitive weekly layout.
- **Settings**: Customize application preferences.

## Technology Stack
- **Next.js 14**: App Router for modern React applications.
- **React**: Frontend UI library.
- **Client-Side Logic**: All data and functionality are handled client-side, with no external APIs or databases.
- **Pure CSS**: Styling with `globals.css` for a unique, glassmorphic dark theme.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js (v18 or higher) and npm installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd study-schedule-creator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the application for production:

```bash
npm run build
```

This will create an optimized build of your application in the `.next` folder.

### Running in Production Mode

To start the production server after building:

```bash
npm run start
```

## Project Structure

```
.
├── app/
│   ├── layout.js                 # Root layout for the application
│   ├── page.js                   # Home page
│   ├── globals.css               # Global styles
│   ├── schedule-builder/
│   │   └── page.js               # Schedule Builder page
│   ├── weekly-view/
│   │   └── page.js               # Weekly Schedule View page
│   └── settings/
│       └── page.js               # User Settings page
├── public/                       # Static assets
├── next.config.js                # Next.js configuration
├── package.json                  # Project dependencies and scripts
├── .gitignore                    # Files to ignore in Git
└── README.md                     # Project README
```
