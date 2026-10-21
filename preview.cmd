@echo off
setlocal
cd /d "%~dp0"

echo.
echo   [1/2] Building site...
call node build.js
echo.
echo   [2/2] Starting preview server (browser opens automatically)
echo   Stop: press Ctrl+C or just close this window
echo.

call node serve.js --open

echo.
echo   Server stopped.
pause
