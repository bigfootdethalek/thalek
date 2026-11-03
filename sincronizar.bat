@echo off
title Sincronizar Big-Foot de Thalek
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync.ps1"
pause
