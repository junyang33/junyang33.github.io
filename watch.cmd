@echo off
setlocal
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 set "PATH=D:\Git\cmd;%PATH%"

echo.
echo   Watching for changes. Press Ctrl+C to stop.
echo.
call node tools\watch.js

echo.
pause
