@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 set "PATH=D:\Git\cmd;%PATH%"

call node tools\watch.js

echo.
pause
