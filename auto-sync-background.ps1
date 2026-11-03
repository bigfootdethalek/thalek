# Sincronizador continuo en segundo plano para Big-Foot de Thalek
$gitCmd = "C:\Users\bigfo\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"
$env:Path = "C:\Users\bigfo\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;" + $env:Path
$projectDir = "D:\Documentos\0 WEB"
Set-Location $projectDir

Write-Host "Iniciando monitor de sincronizacion continua en $projectDir..." -ForegroundColor Cyan
Write-Host "Cierra esta ventana si deseas detener la sincronizacion automatica.`n" -ForegroundColor DarkGray

$lastSync = [DateTime]::MinValue
$intervalSeconds = 30

while ($true) {
    try {
        # 1. Comprobar remoto (GitHub)
        & $gitCmd fetch origin main 2>$null
        $behind = & $gitCmd rev-list HEAD..origin/main --count 2>$null

        if ([int]$behind -gt 0) {
            $now = Get-Date -Format "HH:mm:ss"
            Write-Host "[$now] Se detectaron cambios remotos en GitHub. Actualizando localmente..." -ForegroundColor Green
            & $gitCmd pull --rebase origin main
        }

        # 2. Comprobar local
        $status = & $gitCmd status --porcelain 2>$null
        if ($status) {
            $now = Get-Date -Format "HH:mm:ss"
            Write-Host "[$now] Se detectaron cambios locales. Guardando y subiendo a GitHub..." -ForegroundColor Yellow
            & $gitCmd add -A
            & $gitCmd commit -m "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" 2>$null
            & $gitCmd push origin main 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$now] Subida a GitHub completada exitosamente." -ForegroundColor Green
            }
        }
    } catch {
        Write-Host "Error en ciclo de sincronizacion: $_" -ForegroundColor Red
    }

    Start-Sleep -Seconds $intervalSeconds
}
