@echo off
setlocal
cd /d "%~dp0"

echo.
echo   Starting admin panel on http://127.0.0.1:8090
echo   Stop: press Ctrl+C or close this window
echo.

call node admin.js 8090 --open

echo.
echo   Admin stopped.
pause
