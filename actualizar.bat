@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "GIT=C:\Program Files\Git\cmd\git.exe"
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Actualizacion del sitio"

"%GIT%" add -A
"%GIT%" commit -m "%MSG%"
"%GIT%" push

echo.
echo Hecho. Cambios subidos a GitHub Pages.
pause
