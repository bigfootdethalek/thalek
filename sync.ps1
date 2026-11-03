# Script de Sincronizacion Bidireccional para Big-Foot de Thalek
$ErrorActionPreference = "Continue"

$gitCmd = "C:\Users\bigfo\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"
$env:Path = "C:\Users\bigfo\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;" + $env:Path
Set-Location "D:\Documentos\0 WEB"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  SINCRONIZANDO CON GITHUB (THALEK)" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Traer cambios desde GitHub (Pull)
Write-Host "`n[1/2] Verificando cambios en GitHub..." -ForegroundColor Yellow
& $gitCmd fetch origin main
$behind = & $gitCmd rev-list HEAD..origin/main --count

if ($behind -gt 0) {
    Write-Host "Se encontraron $behind cambio(s) en GitHub. Descargando..." -ForegroundColor Green
    & $gitCmd pull --rebase origin main
} else {
    Write-Host "El repositorio local esta al dia con GitHub." -ForegroundColor Green
}

# 2. Enviar cambios locales hacia GitHub (Push)
Write-Host "`n[2/2] Verificando cambios locales en 'D:\Documentos\0 WEB'..." -ForegroundColor Yellow
$status = & $gitCmd status --porcelain

if ($status) {
    Write-Host "Se detectaron cambios locales. Preparando envio..." -ForegroundColor Green
    & $gitCmd add -A
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    & $gitCmd commit -m "Auto-sync: $timestamp"
    Write-Host "Subiendo cambios a GitHub..." -ForegroundColor Green
    & $gitCmd push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Sincronizacion completada con exito." -ForegroundColor Green
    } else {
        Write-Host "Aviso: Para enviar cambios sin pedir contrasena, recuerda configurar tu GitHub Personal Access Token." -ForegroundColor Yellow
    }
} else {
    Write-Host "No hay cambios locales pendientes de subir." -ForegroundColor Green
}

Write-Host "`nProceso finalizado." -ForegroundColor Cyan
