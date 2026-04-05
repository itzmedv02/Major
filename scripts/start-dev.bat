@echo off
REM Start Development Servers for Rainfall Prediction System

echo ========================================
echo  Rainfall Prediction System
echo  Starting Development Servers
echo ========================================
echo.

echo [1/2] Starting Python Backend...
echo.
start "Backend Server" cmd /k "cd backend && python -m venv venv 2>nul && venv\Scripts\activate && python app.py"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo.
echo [2/2] Starting React Frontend...
echo.

REM Check if Major folder exists (old name)
if exist Major (
    start "Frontend Server" cmd /k "cd Major && npm run dev"
) else if exist frontend (
    start "Frontend Server" cmd /k "cd frontend && npm run dev"
) else (
    echo ERROR: Frontend folder not found!
    echo Please rename 'Major' folder to 'frontend' first.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Servers Starting!
echo ========================================
echo.
echo Python Backend:  http://localhost:5000
echo React Frontend:  http://localhost:8080
echo.
echo Press any key to close this window...
echo (Servers will continue running in separate windows)
pause > nul
