# Complete Code Documentation - DK Thakur Portfolio

## Table of Contents
1. [Project Overview](#project-overview)
2. [Languages Used](#languages-used)
3. [File Structure](#file-structure)
4. [Detailed File Explanations](#detailed-file-explanations)
5. [How to Edit](#how-to-edit)
6. [Common Modifications](#common-modifications)

---

## Project Overview

This is a **Full-Stack Portfolio Website** built with:
- **Frontend**: React 19 + TypeScript + Tailwind CSS + Vite
- **Backend**: Express.js (Node.js)
- **Data Storage**: JSON files (can be upgraded to SQLite)

---

## Languages Used

| Language | Purpose | Files |
|----------|---------|-------|
| **TypeScript (TSX)** | Frontend React components | `src/App.tsx`, `src/main.tsx` |
| **JavaScript (JS)** | Backend server | `server.js` |
| **CSS** | Styling | `src/App.css`, `src/index.css` |
| **HTML** | Page template | `index.html` |
| **JSON** | Configuration & data | `package.json`, `tsconfig.json`, data files |

---

## File Structure

```
/mnt/okcomputer/output/app/
│
├── src/                          # Frontend source code
│   ├── App.tsx                   # Main React component (ALL sections)
│   ├── App.css                   # Custom CSS styles
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles + Tailwind
│
├── server.js                     # Express backend server
├── index.html                    # HTML template
├── package.json                  # Dependencies & scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.ts                # Vite build configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Project readme
└── CODE_DOCUMENTATION.md         # This file
```

---

## Detailed File Explanations

### 1. `server.js` (Backend - JavaScript)

**Purpose**: Express.js server that handles API requests for visitor tracking and contact forms.

**Key Components**:

```javascript
// Lines 1-7: Import dependencies and setup
const express = require('express');  // Web framework
const cors = require('cors');         // Enable Cross-Origin requests
const fs = require('fs');             // File system operations
const path = require('path');         // Path utilities

const app = express();
const PORT = process.env.PORT || 3001;  // Server port
```

**Data Files**:
- `data/visits.json` - Stores visit statistics
- `data/contacts.json` - Stores contact form submissions

**API Endpoints**:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/visit` | POST | Records a new visit |
| `/api/stats` | GET | Gets visit statistics |
| `/api/contact` | POST | Submits contact form |
| `/api/contacts` | GET | Gets all contacts (admin) |
| `/api/health` | GET | Health check |

**How to Edit**:
```javascript
// To change the port (Line 7)
const PORT = process.env.PORT || 3001;  // Change 3001 to your port

// To add a new API endpoint (add after line 148)
app.get('/api/new-endpoint', (req, res) => {
  res.json({ message: 'Hello!' });
});
```

---

### 2. `src/App.tsx` (Frontend - TypeScript/React)

**Purpose**: Main React component containing ALL portfolio sections.

**Structure**:

#### Imports (Lines 1-16)
```typescript
import { useEffect, useState } from 'react';  // React hooks
import { Menu, X, Linkedin, ... } from 'lucide-react';  // Icons
import { Button, Card, ... } from '@/components/ui';  // UI components
import { toast } from 'sonner';  // Notifications
import './App.css';  // Custom styles
```

**To add a new icon**: Import it from `lucide-react`
```typescript
import { NewIcon } from 'lucide-react';
```

#### Type Definitions (Lines 18-43)
```typescript
interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}
// ... more interfaces
```

**To add a new type**:
```typescript
interface NewSection {
  title: string;
  content: string;
}
```

#### State Management (Lines 45-49)
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [visitStats, setVisitStats] = useState<VisitStats>({...});
const [activeSection, setActiveSection] = useState('home');
const [contactForm, setContactForm] = useState({...});
```

**What each state does**:
- `isMenuOpen`: Controls mobile menu visibility
- `visitStats`: Stores visitor statistics
- `activeSection`: Tracks which section is active
- `contactForm`: Stores contact form input values

#### Visit Tracking (Lines 51-125)
```typescript
useEffect(() => {
  // Tracks visits using backend OR localStorage fallback
  const trackVisit = async () => { ... };
  trackVisit();
  fetchStats();
}, []);
```

**How it works**:
1. Tries to connect to backend (`localhost:3001`)
2. If backend fails, uses browser's `localStorage`
3. Stores unique visitor ID in `localStorage`

#### Data Arrays (Lines 159-253)

**Experiences Array** (Lines 159-207):
```typescript
const experiences: Experience[] = [
  {
    title: 'Analyst (Sales Agent)',
    company: 'eClerx Services Limited',
    location: 'Chandigarh IT Park',
    period: 'July 2023 -- April 2025',
    achievements: [
      'Drove sales of premium technology products...',
      // ... more achievements
    ]
  },
  // ... more experiences
];
```

**To add a new job**:
```typescript
{
  title: 'Your New Job Title',
  company: 'Company Name',
  location: 'City, State',
  period: 'Start Date -- End Date',
  achievements: [
    'Achievement 1',
    'Achievement 2',
    'Achievement 3'
  ]
}
```

**Skills Array** (Lines 209-230):
```typescript
const skills: Skill[] = [
  {
    category: 'Web Development',
    items: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'React', 'TypeScript'],
    icon: <Code className="w-6 h-6" />
  },
  // ... more skills
];
```

**To add a new skill category**:
```typescript
{
  category: 'Your Category Name',
  items: ['Skill 1', 'Skill 2', 'Skill 3'],
  icon: <YourIcon className="w-6 h-6" />
}
```

**Achievements Array** (Lines 232-253):
```typescript
const achievements: Achievement[] = [
  {
    title: 'Training Champion',
    description: 'Selected as batch training champion...',
    icon: <Award className="w-8 h-8" />
  },
  // ... more achievements
];
```

**Navigation Items** (Lines 255-264):
```typescript
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  // ... add new navigation items here
];
```

#### JSX Sections (Lines 266-919)

Each section is wrapped in a `<section>` tag with an `id`:

| Section | ID | Line Range |
|---------|-----|------------|
| Navigation | - | 268-325 |
| Hero | `home` | 327-445 |
| About | `about` | 447-500 |
| Skills | `skills` | 502-534 |
| Experience | `experience` | 536-575 |
| Education | `education` | 577-613 |
| Achievements | `achievements` | 615-637 |
| Portfolio | `portfolio` | 639-784 |
| Contact | `contact` | 786-898 |
| Footer | - | 900-917 |

**Hero Section Details** (Lines 327-445):
```tsx
<section id="home" className="min-h-screen flex items-center...">
  {/* Profile Image/Avatar */}
  <div className="w-32 h-32 rounded-full bg-slate-800...">
    <span className="text-5xl font-bold text-white">DK</span>
  </div>
  
  {/* Name */}
  <h1 className="text-5xl md:text-7xl font-bold...">
    Dharmender Kumar Thakur
  </h1>
  
  {/* Title/Tagline */}
  <p className="text-xl md:text-2xl text-gray-300...">
    Technology Professional | Web Developer | Cloud Enthusiast
  </p>
  
  {/* Social Links */}
  <div className="flex justify-center gap-4...">
    <a href="https://www.linkedin.com/in/imdharamdk">
      <Linkedin className="w-6 h-6" />
    </a>
    {/* ... more social links */}
  </div>
</section>
```

**To change your name** (Line 340-342):
```tsx
<h1 className="text-5xl md:text-7xl font-bold mb-4...">
  Your Name Here
</h1>
```

**To change social links** (Lines 362-409):
```tsx
<a href="https://your-new-link.com" target="_blank" rel="noopener noreferrer">
  <YourIcon className="w-6 h-6" />
</a>
```

---

### 3. `src/App.css` (Custom CSS)

**Purpose**: Additional custom styles beyond Tailwind.

**Key Sections**:

```css
/* Custom Scrollbar (Lines 1-17) */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #3b82f6;  /* Blue color */
  border-radius: 4px;
}

/* Animations (Lines 24-51) */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* To use animation */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Gradient Text (Lines 53-59) */
.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Glass Effect (Lines 61-66) */
.glass {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
}
```

**To add a new animation**:
```css
@keyframes yourAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.your-animation-class {
  animation: yourAnimation 2s ease-in-out infinite;
}
```

---

### 4. `src/index.css` (Global Styles)

**Purpose**: Tailwind directives + global styles.

```css
/* Tailwind Directives (Lines 1-3) */
@tailwind base;      /* Reset + base styles */
@tailwind components; /* Component classes */
@tailwind utilities;  /* Utility classes */

/* CSS Variables for theming (Lines 5-66) */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more variables */
}

/* Font Import (Line 79) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

**To change the font**:
```css
/* Replace line 79 */
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

/* Update line 74 */
font-family: 'Your Font', sans-serif;
```

---

### 5. `index.html` (HTML Template)

**Purpose**: Main HTML file that loads the React app.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Your description here" />
    <meta name="keywords" content="your, keywords, here" />
    <meta name="author" content="Your Name" />
    
    <!-- Open Graph (Social Media) -->
    <meta property="og:title" content="Your Title" />
    <meta property="og:description" content="Your description" />
    
    <title>Your Page Title</title>
  </head>
  <body>
    <div id="root"></div>  <!-- React mounts here -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**To change the page title** (Line 14):
```html
<title>Your Name - Portfolio</title>
```

---

### 6. `tailwind.config.js` (Tailwind Configuration)

**Purpose**: Customize Tailwind CSS.

```javascript
module.exports = {
  darkMode: ["class"],  // Enable dark mode
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],  // Files to scan
  theme: {
    extend: {
      colors: {
        // Custom colors
        border: "hsl(var(--border))",
        primary: { ... },
        // ...
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        // ...
      },
      keyframes: {
        // Custom animations
        "accordion-down": { ... },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],  // Animation plugin
}
```

**To add a custom color**:
```javascript
colors: {
  'your-color': '#ff0000',
  'your-color-light': '#ff6666',
}
```

**Usage in components**:
```tsx
<div className="bg-your-color text-your-color-light">
```

---

### 7. `vite.config.ts` (Vite Configuration)

**Purpose**: Configure the Vite build tool.

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: './',  // Base URL for deployment
  plugins: [react()],  // React plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // @/ imports point to src/
    },
  },
});
```

---

### 8. `package.json` (Dependencies & Scripts)

**Purpose**: Define project metadata, dependencies, and scripts.

```json
{
  "name": "dk-thakur-portfolio",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",           // Start development server
    "build": "tsc -b && vite build",  // Build for production
    "preview": "vite preview",  // Preview production build
    "server": "node server.js",  // Start backend server
    "start": "npm run server & npm run preview"  // Start both
  },
  "dependencies": {
    "react": "^19.2.0",
    "express": "^5.2.1",
    // ... more packages
  }
}
```

**Available Scripts**:
```bash
npm run dev       # Start frontend only (port 5173)
npm run server    # Start backend only (port 3001)
npm run build     # Build for production
npm run preview   # Preview production build
npm start         # Start both frontend and backend
```

---

## How to Edit

### 1. Change Personal Information

**In `src/App.tsx`**:

| What to Change | Line Number | Example |
|----------------|-------------|---------|
| Name | 340-342 | `<h1>Your Name</h1>` |
| Title | 344-346 | `<p>Your Title</p>` |
| Location | 349-351 | `<MapPin /> Your Location` |
| Phone | 352-354 | `<Phone /> +91-XXXXXXXXXX` |
| Email | 355-357 | `<Mail /> your@email.com` |
| Social Links | 362-409 | Update `href` attributes |

### 2. Add/Edit Work Experience

**In `src/App.tsx`, lines 159-207**:

Find the `experiences` array and add/modify:
```typescript
const experiences: Experience[] = [
  {
    title: 'Your Job Title',
    company: 'Company Name',
    location: 'City, Country',
    period: 'Jan 2020 -- Present',
    achievements: [
      'Your achievement 1',
      'Your achievement 2',
      'Your achievement 3'
    ]
  },
  // ... existing entries
];
```

### 3. Add/Edit Skills

**In `src/App.tsx`, lines 209-230**:

```typescript
const skills: Skill[] = [
  {
    category: 'Your Category',
    items: ['Skill 1', 'Skill 2', 'Skill 3'],
    icon: <YourIcon className="w-6 h-6" />
  },
  // ... existing categories
];
```

### 4. Change Colors

**In `tailwind.config.js`**:
```javascript
colors: {
  primary: {
    DEFAULT: "#your-color",
    foreground: "#your-text-color",
  },
}
```

**Or use inline Tailwind classes**:
```tsx
<div className="bg-blue-600">  {/* Change to bg-red-600, bg-green-600, etc. */}
```

Available Tailwind colors: `slate`, `gray`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

### 5. Add a New Section

**Step 1**: Add to navigation (Line 255-264):
```typescript
const navItems = [
  // ... existing items
  { id: 'newsection', label: 'New Section' },
];
```

**Step 2**: Add the section JSX (after line 784):
```tsx
<section id="newsection" className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold mb-4">New Section</h2>
    {/* Your content here */}
  </div>
</section>
```

### 6. Add Social Media Embeds

**In Portfolio section (Lines 676-755)**:

Replace the placeholder text with actual embed code:
```tsx
{/* LinkedIn Embed */}
<div className="text-center text-gray-500 text-sm italic">
  {/* PASTE EMBED CODE HERE */}
  <iframe 
    src="https://www.linkedin.com/embed/feed/update/..." 
    height="500" 
    width="100%"
    frameBorder="0"
  />
</div>
```

---

## Common Modifications

### Change Profile Picture

**Option 1: Use initials (current)**:
```tsx
<div className="w-32 h-32 rounded-full bg-slate-800...">
  <span className="text-5xl font-bold text-white">DK</span>
</div>
```

**Option 2: Use an image**:
```tsx
<img 
  src="/path-to-your-image.jpg" 
  alt="Your Name"
  className="w-32 h-32 rounded-full object-cover"
/>
```

### Change Background Gradient

**In `src/App.tsx`, line 267**:
```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900">
```

Available directions: `to-t`, `to-tr`, `to-r`, `to-br`, `to-b`, `to-bl`, `to-l`, `to-tl`

### Add a New Skill Badge

**In Skills section, add to the items array**:
```typescript
{
  category: 'Web Development',
  items: ['HTML', 'CSS', 'JavaScript', 'NEW SKILL'],  // Add here
  icon: <Code className="w-6 h-6" />
}
```

### Change Contact Information

**In Contact section (Lines 799-827)**:
```tsx
<div>
  <p className="text-gray-400 text-sm">Phone</p>
  <p className="text-white">+91-YOUR-NEW-NUMBER</p>
</div>
```

### Modify Footer

**In Footer section (Lines 900-917)**:
```tsx
<footer>
  <p className="text-white font-semibold">Your Name</p>
  <p className="text-gray-400 text-sm">Your Tagline</p>
</footer>
```

---

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Backend Not Connecting
- Check if port 3001 is available
- Run `npm run server` separately to see errors
- Frontend will fallback to localStorage automatically

### Styles Not Applying
- Check className syntax (Tailwind uses kebab-case: `bg-blue-500`)
- Ensure no typos in class names
- Run `npm run dev` to see hot-reload updates

---

## Resources

- **React Docs**: https://react.dev
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **Express.js Docs**: https://expressjs.com/en/guide/routing.html
- **Lucide Icons**: https://lucide.dev/icons

---

**Need help?** Refer to the README.md or check the inline comments in each file.
