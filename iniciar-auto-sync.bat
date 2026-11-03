@echo off
title Auto-Sync Thalek (Segundo Plano)
powershell -WindowStyle Minimized -NoProfile -ExecutionPolicy Bypass -File "%~dp0auto-sync-background.ps1"
