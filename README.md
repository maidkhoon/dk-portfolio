# Dharmender Kumar Thakur - Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, Tailwind CSS, and Express.js backend.

![Portfolio Preview](https://imdksunny.glitch.me)

## Features

- **Modern React Frontend**: Built with React 19, TypeScript, and Vite
- **Responsive Design**: Fully responsive across all devices
- **Visitor Tracking**: Backend API to track profile visits and analytics
- **Contact Form**: Functional contact form with backend storage
- **Social Media Integration**: Links and embed placeholders for all social platforms
- **Smooth Animations**: Beautiful UI with smooth scrolling and hover effects
- **Dark Theme**: Professional dark theme with gradient accents

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite (Build Tool)
- Tailwind CSS 3.4
- shadcn/ui Components
- Lucide React Icons
- Sonner (Toast Notifications)

### Backend
- Express.js
- CORS
- JSON File Storage (SQLite optional)

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Custom styles
│   ├── index.css        # Global styles & Tailwind
│   ├── main.tsx         # Entry point
│   └── components/      # UI components
├── server.js            # Express backend server
├── data/                # Data storage (auto-created)
│   ├── visits.json      # Visit tracking data
│   └── contacts.json    # Contact form submissions
├── dist/                # Production build
└── index.html           # HTML template
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download the project:
```bash
cd /mnt/okcomputer/output/app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Start frontend only
npm run dev

# Start backend only
npm run server

# Start both (frontend + backend)
npm start
```

4. Open your browser:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/visit` | Record a page visit |
| GET | `/api/stats` | Get visit statistics |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Get all contact submissions |
| GET | `/api/health` | Health check |

## Sections

1. **Hero**: Introduction with social links and visitor stats
2. **About**: Professional summary with key metrics
3. **Skills**: Technical skills organized by category
4. **Experience**: Work history with achievements
5. **Education**: Academic background
6. **Achievements**: Key accomplishments and awards
7. **Portfolio**: Projects and social media embeds
8. **Contact**: Contact form and information

## Adding Social Media Embeds

To embed your social media posts:

1. **LinkedIn**: 
   - Go to your LinkedIn post
   - Click "Embed this post"
   - Copy the iframe code
   - Paste in the Portfolio section

2. **Instagram**:
   - Go to your Instagram post
   - Click the three dots → "Embed"
   - Copy the code
   - Paste in the Portfolio section

3. **Twitter/X**:
   - Click "Share" → "Embed Tweet"
   - Copy the code
   - Paste in the Portfolio section

## Customization

### Update Personal Information
Edit `src/App.tsx` to update:
- Name and title
- Contact information
- Work experience
- Education
- Skills
- Achievements

### Update Colors
Edit `tailwind.config.js` to customize the color scheme.

### Update Styles
Edit `src/App.css` and `src/index.css` for custom styling.

## Deployment

### Static Hosting (Vercel, Netlify, GitHub Pages)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder

### With Backend (Heroku, Railway, VPS)
1. Deploy the entire project
2. Set environment variable: `PORT=3001`
3. Start with: `npm start`

## Environment Variables

Create a `.env` file for custom configuration:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Data Storage

The backend uses JSON files for data storage by default:
- `data/visits.json` - Visit tracking
- `data/contacts.json` - Contact form submissions

To use SQLite instead, modify `server.js` to use the sqlite3 package.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- Email: imdharamdk@gmail.com
- LinkedIn: https://www.linkedin.com/in/imdharamdk
- Website: https://imdksunny.glitch.me

---

Built with ❤️ by Dharmender Kumar Thakur
