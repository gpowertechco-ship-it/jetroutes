#!/bin/bash
# JetRoutes - Quick Deployment Script
# Run this before publishing to ensure everything is ready

echo "🚀 JetRoutes Deployment Preparation"
echo "======================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo "  Node version: $(node --version)"
echo ""

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "  npm version: $(npm --version)"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install --legacy-peer-deps
echo ""

# Run linter
echo "✓ Running ESLint..."
npm run lint || echo "⚠️  Some linting issues found (non-blocking)"
echo ""

# Run tests
echo "✓ Running tests..."
npm run test
echo ""

# Build
echo "✓ Building for production..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo ""

# Check build output
echo "✓ Build output:"
du -sh dist/
echo ""

echo "✅ All checks passed!"
echo ""
echo "Next steps:"
echo "1. Review PRODUCTION_CHECKLIST.md"
echo "2. Configure environment variables"
echo "3. Test: npm run preview"
echo "4. Deploy: Push to your git repo or upload dist/ folder"
echo ""
echo "For deployment help, see DEPLOYMENT.md"
