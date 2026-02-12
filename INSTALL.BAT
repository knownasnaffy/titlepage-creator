@echo off
echo Installing Bun...
powershell -c "irm bun.sh/install.ps1 | iex"

echo.
echo Installing project dependencies...
bun install

echo.
echo Installation complete! Run START.BAT to launch the application.
pause
