#!/bin/bash

# 🚀 DIGNTAG Deployment Script
# This script helps deploy and fix all connection issues

echo "🎨 DIGNTAG Deployment & Fix Script"
echo "=================================="

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from project root."
    exit 1
fi

echo "✅ Found package.json in project root"

# Step 2: Check environment variables
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file - please add your OPENAI_API_KEY"
    echo "🔑 Get your API key from: https://platform.openai.com/api-keys"
else
    echo "✅ .env file exists"
fi

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 4: Build for production
echo "🏗️ Building for production..."
npm run build

# Step 5: Git operations
echo "📝 Committing changes..."
git add .
git commit -m "Fix CORS issues and API configuration for Vercel deployment"

echo "📤 Pushing to GitHub..."
git push

echo ""
echo "🎉 Deployment steps completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to your Vercel dashboard"
echo "2. Set OPENAI_API_KEY environment variable:"
echo "   Name: OPENAI_API_KEY"
echo "   Value: sk-your-actual-openai-api-key"
echo "   Environments: Production, Preview, Development"
echo "3. Trigger new deployment or wait for auto-deploy"
echo "4. Test at: https://www.digntag.in"
echo ""
echo "🔍 If issues persist, check browser console (F12) for detailed logs"
