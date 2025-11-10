# 🚀 Quick Start Guide

## Essential Steps to Deploy

### 1. Get Your API Key (2 minutes)
1. Go to: https://aistudio.google.com/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 2. Create `.env` File (1 minute)
Create a file named `.env` in the root directory:
```env
GEMINI_API_KEY=paste_your_key_here
```

### 3. Test Locally (optional)
```bash
npm run dev
```
Visit: http://localhost:9002

### 4. Deploy to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 5. Deploy to Vercel
1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository
5. **Add Environment Variable:**
   - Name: `GEMINI_API_KEY`
   - Value: (paste your key)
   - Apply to: All environments
6. Click "Deploy"

### 6. Done! 🎉
Your app will be live at: `https://your-project.vercel.app`

---

## 📚 Need More Details?

- **Full deployment guide:** See `DEPLOYMENT_GUIDE.md`
- **Environment variables:** See `env.template`
- **Setup summary:** See `SETUP_SUMMARY.md`

---

## ⚠️ Important Notes

- **Never commit `.env`** - It's already in `.gitignore`
- **Add `GEMINI_API_KEY` to Vercel** - Required for AI features to work
- **Firebase config is optional** - Default values work for development

---

## 🆘 Quick Troubleshooting

**Build fails?**
- Make sure `GEMINI_API_KEY` is set in Vercel environment variables

**AI features not working?**
- Verify your API key is correct
- Check Vercel function logs for errors

**Need help?**
- Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting

