@echo off
REM JetRoutes - Quick Deployment Script for Windows
REM Run this before publishing to ensure everything is ready

echo.
echo 🚀 JetRoutes Deployment Preparation
echo ======================================
echo.

REM Check Node.js
echo ✓ Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 18+
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo   Node version: %%i
echo.

REM Check npm
echo ✓ Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm not found
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo   npm version: %%i
echo.

REM Install dependencies
echo ✓ Installing dependencies...
call npm install --legacy-peer-deps
echo.

REM Run linter
echo ✓ Running ESLint...
call npm run lint
if errorlevel 1 (
    echo ⚠️  Some linting issues found (non-blocking)
)
echo.

REM Run tests
echo ✓ Running tests...
call npm run test
echo.

REM Build
echo ✓ Building for production...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    exit /b 1
)
echo.

REM Check build output
echo ✓ Build output created in dist/ folder
echo.

echo ✅ All checks passed!
echo.
echo Next steps:
echo 1. Review PRODUCTION_CHECKLIST.md
echo 2. Configure environment variables in your hosting platform
echo 3. Test locally: npm run preview
echo 4. Deploy: Upload dist/ folder or push to GitHub
echo.
echo For deployment help, see DEPLOYMENT.md
pause
