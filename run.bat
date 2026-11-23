@echo off
title GPT Architecture // Interactive Blueprint
color 0B

echo =====================================================================
echo    GPT ARCHITECTURE: INTERACTIVE TECHNICAL BLUEPRINT
echo =====================================================================
echo.

:: Navigate to the directory of this batch file
cd /d "%~dp0"

:: 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please install Node.js from https://nodejs.org/ to run this project.
    echo.
    pause
    exit /b 1
)

:: 2. Check if node_modules exists, if not run npm install
if not exist "node_modules\" (
    echo [SETUP] First-time setup detected. Installing dependencies...
    echo This may take a minute...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] npm install encountered an issue.
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully.
    echo.
)

:: 3. Open browser automatically after a short 2-second timeout in background
echo [START] Launching Vite development server...
echo [INFO] Opening default browser at http://localhost:5173/
echo.
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173/"

:: 4. Start Vite Dev Server
call npm run dev -- --host --port 5173

pause
