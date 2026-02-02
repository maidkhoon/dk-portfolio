# GitHub Pages Deployment Guide

This guide will walk you through deploying your portfolio website to GitHub Pages.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Step-by-Step Instructions](#step-by-step-instructions)
3. [Custom Domain Setup](#custom-domain-setup)
4. [Updating Your Site](#updating-your-site)
5. [Troubleshooting](#troubleshooting)

---

## Quick Start

Your portfolio is ready for GitHub Pages deployment! Follow these steps:

1. Create a GitHub repository named `dk-portfolio`
2. Push this code to the repository
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://yourusername.github.io/dk-portfolio/`

---

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Enter repository name: `dk-portfolio`
4. Make it **Public** (required for GitHub Pages free hosting)
5. Click **Create repository**

### Step 2: Initialize Git and Push Code

Open terminal in your project folder and run:

```bash
# Navigate to your project folder
cd /mnt/okcomputer/output/app

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/dk-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (or click "Pages" in left sidebar)
4. Under **Source**, select **GitHub Actions**
5. The workflow file (`.github/workflows/deploy.yml`) will automatically deploy your site

### Step 4: Wait for Deployment

1. Go to **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Once done, your site will be live!

### Step 5: Access Your Live Site

Your portfolio will be available at:
```
https://yourusername.github.io/dk-portfolio/
```

Replace `yourusername` with your actual GitHub username.

---

## Custom Domain Setup (Optional)

If you want to use your own domain (e.g., `www.dharmenderthakur.com`):

### Step 1: Buy a Domain
Purchase a domain from:
- [GoDaddy](https://godaddy.com)
- [Namecheap](https://namecheap.com)
- [Google Domains](https://domains.google)

### Step 2: Configure DNS

In your domain provider's DNS settings, add these records:

**For apex domain (dharmenderthakur.com):**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

**For www subdomain (www.dharmenderthakur.com):**
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 3: Add CNAME File

Create a file named `CNAME` in the `public` folder:

```bash
# Create public folder if it doesn't exist
mkdir -p public

# Create CNAME file
echo "www.dharmenderthakur.com" > public/CNAME
```

### Step 4: Update vite.config.ts

Change the base path:
```typescript
export default defineConfig({
  base: '/',  // Change from '/dk-portfolio/' to '/'
  // ... rest of config
})
```

### Step 5: Enable Custom Domain in GitHub

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Check **Enforce HTTPS**
5. Wait for DNS verification (can take up to 24 hours)

---

## Updating Your Site

### Method 1: Automatic Deployment (Recommended)

The GitHub Actions workflow automatically deploys when you push to the main branch:

```bash
# Make your changes to the code

# Commit and push
git add .
git commit -m "Updated experience section"
git push origin main

# GitHub Actions will automatically build and deploy!
```

### Method 2: Manual Deployment

1. Build locally:
```bash
npm run build
```

2. The `dist` folder contains your built site

3. For manual upload, you can use the `gh-pages` branch approach

---

## Project Structure for GitHub Pages

```
dk-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml       # Auto-deployment workflow
├── src/                      # Source code
│   ├── App.tsx              # Main component
│   ├── App.css              # Custom styles
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── dist/                     # Built files (auto-generated)
├── index.html               # HTML template
├── vite.config.ts           # Vite config (base: '/dk-portfolio/')
├── package.json             # Dependencies
└── README.md                # This file
```

---

## Configuration Changes

### Change Repository Name

If you want a different repository name:

1. Rename your repository on GitHub
2. Update `vite.config.ts`:
```typescript
base: '/new-repo-name/',
```
3. Commit and push changes

### Change Base Path for User/Org Site

If you want to deploy to `username.github.io` (without repo name):

1. Create a repository named `yourusername.github.io`
2. Update `vite.config.ts`:
```typescript
base: '/',
```
3. Your site will be at `https://yourusername.github.io/`

---

## Features

### What's Included

- **Responsive Design**: Works on all devices
- **Visitor Counter**: Tracks visits using localStorage
- **Contact Form**: Opens email client with pre-filled message
- **Smooth Scrolling**: Navigation between sections
- **Social Links**: LinkedIn, GitHub, Facebook, Instagram, Twitter
- **SEO Ready**: Meta tags for search engines

### No Backend Required

This GitHub Pages version uses:
- **localStorage** for visit tracking
- **mailto:** links for contact form
- **Static files** only - no server needed

---

## Troubleshooting

### Issue: Site shows 404 error

**Solution**: 
- Check that GitHub Pages is enabled in Settings
- Ensure repository is public
- Wait 5-10 minutes after first deployment

### Issue: CSS/JS not loading

**Solution**:
- Check `vite.config.ts` base path matches your repo name
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

### Issue: Images not showing

**Solution**:
- Place images in `public/` folder
- Reference with relative paths: `/image-name.jpg`
- Ensure correct file extensions

### Issue: Deployment failed

**Solution**:
1. Go to **Actions** tab
2. Click on the failed workflow
3. Check the error message
4. Common fixes:
   - Ensure `package.json` exists
   - Check for syntax errors in code
   - Verify Node.js version compatibility

---

## Customization Guide

### Change Your Name

Edit `src/App.tsx` (around line 340):
```tsx
<h1 className="text-5xl md:text-7xl font-bold...">
  Your Name Here
</h1>
```

### Add New Experience

Edit `src/App.tsx` (around line 159):
```typescript
const experiences: Experience[] = [
  {
    title: 'New Job Title',
    company: 'Company Name',
    location: 'City, Country',
    period: 'Jan 2023 -- Present',
    achievements: [
      'Achievement 1',
      'Achievement 2'
    ]
  },
  // ... existing entries
];
```

### Change Colors

Edit `tailwind.config.js` or use Tailwind classes:
```tsx
<div className="bg-blue-600">  {/* Change to bg-red-600, etc. */}
```

### Add New Section

1. Add to navigation (line 255):
```typescript
{ id: 'newsection', label: 'New Section' }
```

2. Add section JSX (after line 784):
```tsx
<section id="newsection" className="py-20">
  <h2>New Section</h2>
</section>
```

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

## Need Help?

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Look at the Actions tab for deployment errors
3. Open an issue in your repository

---

**Your portfolio is ready to go live! 🚀**
