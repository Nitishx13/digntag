# Vercel Deployment Setup Guide

## 🔧 Environment Variable Setup

### 1. Set OpenAI API Key in Vercel Dashboard

Go to your Vercel project dashboard:
1. Navigate to your project
2. Go to **Settings** → **Environment Variables**
3. Add the following environment variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your actual OpenAI API key
   - **Environments**: Production, Preview, Development

### 2. Verify Your vercel.json Configuration

Your `vercel.json` should look like this:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/generate-poem.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "OPENAI_API_KEY": "@openai_api_key"
  }
}
```

### 3. API Route Configuration

The `api/generate-poem.js` file is already configured correctly for Vercel.

### 4. Frontend API Configuration

The frontend is configured to work with both local and Vercel environments:

```javascript
const apiUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api/generate-poem'
  : '/api/generate-poem'
```

## 🚀 Deployment Steps

1. **Push your code to GitHub**
2. **Connect your repository to Vercel**
3. **Set the OPENAI_API_KEY environment variable**
4. **Deploy your application**

## 🔍 Troubleshooting

### If you still get "Cannot connect to poetry server":

1. **Check Vercel Function Logs**:
   - Go to Vercel dashboard → Functions tab
   - Look for any error messages in the `/api/generate-poem` function

2. **Verify Environment Variable**:
   - Make sure the OPENAI_API_KEY is set correctly
   - Check that it's available in all environments

3. **Test the API directly**:
   - Try accessing `https://your-app.vercel.app/api/generate-poem` in your browser
   - You should see a "Method not allowed" message (this confirms the route exists)

4. **Check Network Tab**:
   - Open browser DevTools → Network tab
   - Try generating a poem and check for any failed requests

## 📝 Alternative: Use Serverless Function Directly

If the above doesn't work, you can modify the frontend to use the Vercel function URL directly:

```javascript
const apiUrl = 'https://your-app.vercel.app/api/generate-poem'
```

## 🎯 Quick Fix

If you need an immediate solution, you can:

1. **Hardcode the API URL temporarily** in `src/poet/poet.jsx`:
   ```javascript
   const apiUrl = 'https://your-app-name.vercel.app/api/generate-poem'
   ```

2. **Make sure your OpenAI API key is set** in Vercel environment variables

3. **Redeploy** your application

This should resolve the connection issue on Vercel!
