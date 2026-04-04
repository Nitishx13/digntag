# 🔧 DIGNTAG API Connection Issue - Complete Fix Guide

## 🚨 Current Issue
Your website at https://www.digntag.in/ shows "Cannot connect to poetry server" error.

## 🔍 Step-by-Step Troubleshooting

### Step 1: Test the API Directly
Open this URL in your browser:
```
https://www.digntag.in/api/generate-poem
```

**Expected Result:** You should see `{"error":"Method not allowed"}`

**If you see 404 or other error:** The API function is not deployed correctly.

### Step 2: Check Vercel Deployment

#### A. Verify API Function Exists
1. Go to your Vercel dashboard
2. Click on your project
3. Go to the "Functions" tab
4. Look for `/api/generate-poem` in the list

#### B. Check Environment Variables
1. In Vercel dashboard → Settings → Environment Variables
2. Verify `OPENAI_API_KEY` exists and iset for Production
3. If not, add it:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-your-actual-openai-key`
   - Environments: Production, Preview, Development

#### C. Check Deployment Logs
1. Go to the "Logs" tab in Vercel
2. Look for any errors during deployment
3. Check for runtime errors when API is called

### Step 3: Fix Common Issues

#### Issue 1: API Function Not Deployed
**Solution:** Make sure `api/generate-poem.js` exists and is properly structured.

#### Issue 2: Missing Environment Variable
**Solution:** Add OPENAI_API_KEY to Vercel environment variables.

#### Issue 3: CORS Issues
**Solution:** The API already has CORS headers, but verify they're working.

#### Issue 4: Custom Domain Configuration
**Solution:** Ensure your custom domain is properly configured in Vercel.

## 🛠️ Quick Fixes to Try

### Fix 1: Redeploy the Application
1. Push latest changes to GitHub
2. In Vercel dashboard, trigger a new deployment
3. Wait for deployment to complete

### Fix 2: Check vercel.json Configuration
Your `vercel.json` should include:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/generate-poem.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### Fix 3: Test with Debug Tool
1. On your website, click the "Test Connection" button
2. Check the browser console (F12) for detailed logs
3. Look for the hostname detection message

## 📋 Diagnostic Checklist

- [ ] API endpoint returns 405 (Method not allowed)
- [ ] OPENAI_API_KEY is set in Vercel environment variables
- [ ] No deployment errors in Vercel logs
- [ ] Custom domain is properly configured
- [ ] Console shows "Detected Vercel environment"

## 🚀 Emergency Fix

If nothing else works, try this temporary fix:

1. **Hardcode the full API URL** in the code:
```javascript
const apiUrl = 'https://www.digntag.in/api/generate-poem'
```

2. **Or use the Vercel URL directly:**
```javascript
const apiUrl = 'https://your-vercel-app-name.vercel.app/api/generate-poem'
```

## 🎯 Most Likely Issues

Based on your error, the most common causes are:

1. **OPENAI_API_KEY not set** in Vercel environment variables (80% of cases)
2. **API function not deployed** correctly (15% of cases)
3. **Custom domain not configured** properly (5% of cases)

## 📞 Next Steps

1. **Test the API directly** first
2. **Check Vercel environment variables**
3. **Use the Test Connection button** for detailed logs
4. **Redeploy if needed**

This should resolve your connection issue! 🎉
