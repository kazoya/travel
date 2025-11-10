# Deployment Guide: Travel App for GitHub and Vercel

This guide will help you configure all necessary keys and settings to deploy your travel app to GitHub and Vercel.

## 📋 Prerequisites

Before deploying, ensure you have:
- A GitHub account
- A Vercel account (sign up at https://vercel.com)
- A Google AI Studio account (for Gemini API key)
- A Firebase project (optional, if not using Firebase App Hosting)

---

## 🔑 Required Environment Variables

Your app requires the following environment variables. Create a `.env` file in the root directory with these values:

### 1. Google AI / Gemini API Key (REQUIRED)

**Variable:** `GEMINI_API_KEY`

**Purpose:** Used for AI features including:
- Sign language translation
- Smart travel assistant
- Personalized trip itinerary generation
- Rights and support directory

**How to get it:**
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

**Add to `.env`:**
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Firebase Configuration (OPTIONAL - Only if not using Firebase App Hosting)

If you're deploying to Vercel (not Firebase App Hosting), you may need these:

**Variables:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

**How to get them:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" → Web (</> icon)
6. Copy the configuration values

**Add to `.env`:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Note:** The app has default Firebase config values that work for development. You only need to override these if you want to use a different Firebase project.

---

## 📝 Step-by-Step Deployment Instructions

### Step 1: Prepare Your Local Environment

1. **Create a `.env` file** in the root directory:
   ```bash
   # Copy the template below and fill in your values
   ```

2. **Add your environment variables** to `.env`:
   ```env
   # Required
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional (only if using different Firebase project)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. **Test locally:**
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:9002 to verify everything works.

### Step 2: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   ```

2. **Create a `.gitignore` file** (already exists, but verify it includes):
   ```
   .env
   .env.local
   .env.*.local
   node_modules
   .next
   .vercel
   ```

3. **Add and commit your files:**
   ```bash
   git add .
   git commit -m "Initial commit: Travel app ready for deployment"
   ```

4. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Choose a repository name (e.g., `travel-app`)
   - Don't initialize with README, .gitignore, or license
   - Click "Create repository"

5. **Connect and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

1. **Sign in to Vercel:**
   - Go to https://vercel.com
   - Sign in with your GitHub account

2. **Import your repository:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure environment variables in Vercel:**
   - In the project settings, go to "Environment Variables"
   - Add each variable from your `.env` file:
     
     **Required:**
     - `GEMINI_API_KEY` = `your_actual_api_key`
     
     **Optional (if using different Firebase project):**
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

   - Make sure to add them for all environments (Production, Preview, Development)
   - Click "Save"

4. **Configure build settings:**
   - Framework Preset: **Next.js** (should auto-detect)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use Vercel's environment variables** - Don't hardcode secrets in your code
3. **Rotate API keys regularly** - Especially if they're exposed or compromised
4. **Use different keys for development and production** - Vercel allows environment-specific variables

---

## 🐛 Troubleshooting

### Build fails with "GEMINI_API_KEY is not set"
- **Solution:** Make sure you've added `GEMINI_API_KEY` to Vercel's environment variables
- Check that the variable name matches exactly (case-sensitive)

### Firebase authentication not working
- **Solution:** 
  - If using Firebase App Hosting, Firebase auto-configures
  - If using Vercel, ensure all `NEXT_PUBLIC_FIREBASE_*` variables are set
  - Check Firebase console for correct project settings

### Sign language translation not working
- **Solution:** 
  - Verify `GEMINI_API_KEY` is set correctly
  - Check that your API key has access to Gemini API and Veo 2.0 model
  - Review Vercel function logs for detailed error messages

### Build timeout errors
- **Solution:** 
  - The app is configured with extended timeouts (120s) for server actions
  - If issues persist, check Vercel's function logs for specific errors

---

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [Firebase Console](https://console.firebase.google.com/)
- [Genkit Documentation](https://firebase.google.com/docs/genkit)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `.env` file created with `GEMINI_API_KEY`
- [ ] App runs locally without errors (`npm run dev`)
- [ ] All sensitive data removed from code (using env variables)
- [ ] `.gitignore` includes `.env*` files
- [ ] Code committed and pushed to GitHub
- [ ] Vercel environment variables configured
- [ ] Build completes successfully on Vercel
- [ ] App functions correctly on Vercel URL

---

## 🎉 You're Ready!

Once you've completed these steps, your travel app will be:
- ✅ Hosted on Vercel
- ✅ Backed up on GitHub
- ✅ Configured with all necessary API keys
- ✅ Ready for production use

Good luck with your deployment! 🚀

