@echo off
setlocal
cd /d "%~dp0"

set "PATH=%~dp0..\..\..\Git\cmd;%PATH%"
where git >nul 2>nul
if errorlevel 1 set "PATH=D:\Git\cmd;%PATH%"

call node tools\publish.js %*

echo.
pause
