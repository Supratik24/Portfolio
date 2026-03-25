@echo off
cd /d "%~dp0"
echo Starting local server for Portfolio...
echo Open http://localhost:4174 in your browser
python -m http.server 4174
